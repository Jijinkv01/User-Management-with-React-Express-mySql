const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const UserRouter = require('./routes/userRoutes');
const AdminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.CLIENT_URL ,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

sequelize.sync()


app.use("/",UserRouter)
app.use("/admin",AdminRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});