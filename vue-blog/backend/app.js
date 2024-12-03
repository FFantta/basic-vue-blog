const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/index');
const userRoutes = require('./routes/userRoutes'); // 引入用户路由
const postRoutes = require('./routes/postRoutes'); // 引入文章路由

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 加载路由
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// 启动服务器
const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    try {
        await sequelize.authenticate(); // 确保数据库连接成功
        console.log('Connected to the database successfully!');
        await sequelize.sync({ force: false }); // 同步数据库
        console.log('Database synced successfully!');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});

// 全局错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
