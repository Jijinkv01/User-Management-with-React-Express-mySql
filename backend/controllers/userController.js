const User = require('../model/user');
const bcrypt = require('bcryptjs');
const { generateToken, generateRefreshToken, generateResetToken } = require('../utils/token');
const sendEmail = require('../utils/sendEmail');
const redisClient = require('../config/redis');
const jwt = require('jsonwebtoken');




const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  //  console.log("req.body", req.body);
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = generateToken({ email });
    const verificationLink = `${process.env.CLIENT_URL}/verifyEmail?token=${token}`;
    // console.log("verificationLink", verificationLink);
    const html = `<h3>Hello ${username}</h3>
      <p>Click below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>`;

    await sendEmail(email, 'Verify Your Email', html);


    await redisClient.set(email, JSON.stringify({
      username,
      email,
      password: hashedPassword,
      role,
    }), 'EX', 300);

    res.status(200).json({ message: 'Verification email sent' });

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
};

const verifyEmail = async (req, res) => {
  const token = req.query.token;
  // console.log("token", token);

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await redisClient.get(email);
    // console.log("userData", userData);
    if (!userData) return res.status(400).json({ message: 'Verification expired' });

    const userObj = JSON.parse(userData);
    await User.create({ ...userObj, isVerified: true });
    await redisClient.del(email);

    res.status(201).json({ message: 'Email verified and user registered' });

  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.status(200).json({ message: 'Logged out successfully' });
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log("req.body", req.body);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ message: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = generateToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    await redisClient.set(`refresh_${user.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60);


    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token: accessToken, user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const userId = decoded.id;

    const storedToken = await redisClient.get(`refresh_${userId}`);
    if (!storedToken || storedToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    const newAccessToken = generateToken({ id: userId });
    res.status(200).json({ token: newAccessToken });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const token = generateResetToken(email);
    await redisClient.set(email, token, { EX: 900 });
    const resetUrl = `${process.env.CLIENT_URL}/resetPassword?token=${token}`;
    const html = `<p>You requested a password reset</p>
                  <a href="${resetUrl}">Click here to reset your password</a>`;

    await sendEmail(email, 'Password Reset', html);

    res.json({ msg: 'Reset link sent to your email' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ msg: 'Something went wrong. Please try again later.' });
  }
}

const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;

  if (!token) return res.status(400).json({ msg: 'Token is missing' });
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    const [updated] = await User.update(
      { password: hashedPassword },
      { where: { email } }
    );

    if (updated === 0) {
      return res.status(404).json({ msg: 'User not found or password not updated' });
    }


    await redisClient.del(email);

    res.json({ msg: 'Password has been reset successfully' });

  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(400).json({ msg: 'Invalid or expired token' });
  }
}

const updateProfile = async (req, res) => {
   const userId = req.user.id;
  //  console.log("userId", userId);
  const { username } = req.body;
  //  console.log("username", username);
  const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const updateData = { username };
    if (profilePic) updateData.profilePic = profilePic;

    await User.update(updateData, { where: { id: userId } });

    return res.status(200).json({updateData, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}


module.exports = {
  registerUser,
  verifyEmail,
  logoutUser,
  loginUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  updateProfile
}