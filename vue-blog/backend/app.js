const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./models/index'); // 引入 Sequelize 配置
const userRoutes = require('./routes/userRoutes'); // 引入用户路由

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 路由
app.use('/users', userRoutes);

// 同步数据库
sequelize.sync({ force: true }) // 每次重启清空表，开发时使用，生产环境请改为 false
    .then(() => console.log('Database synced successfully!'))
    .catch(err => console.error('Error syncing database:', err));

// 启动服务器
app.listen(3000, () => {
    console.log('Backend server is running on http://localhost:3000');
});
