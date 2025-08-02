const User = require('../model/user');
const bcrypt = require('bcryptjs');
const redisClient = require('../config/redis');
const { generateToken, generateRefreshToken } = require('../utils/token');
const { Op } = require('sequelize');




const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Email not verified' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Not an admin' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const accessToken = generateToken({ id: user.id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id });

        await redisClient.set(`refresh_${user.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60); // 7 days

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

const logout = async (req, res) => {
    res.clearCookie('adminToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const whereCondition = search
      ? {
          [Op.or]: [
            { username: { [Op.like]: `%${search}%` } },
            { role: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const { rows: users, count: totalUsers } = await User.findAndCountAll({
      where: whereCondition,
      attributes: ['id', 'username', 'email', 'role', 'isVerified', 'profilePic'],
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    res.status(200).json({
      users,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
    } catch (error) {
        console.error('Error fetching users:', error);
         res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
}





module.exports = {
    login,
    logout,
    getUsers
}