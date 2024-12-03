const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/index');
const userRoutes = require('./routes/userRoutes'); // 引入路由
const Post = require('./models/post'); // 引入 Post 模型
const postRoutes = require('./routes/postRoutes'); // 引入文章路由

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 加载路由
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// 启动服务器
app.listen(3000, () => {
    console.log('Backend server is running on http://localhost:3000');
});

// 同步数据库
sequelize.sync({ force: false })
    .then(() => console.log('Database synced successfully!'))
    .catch((err) => console.error('Error syncing database:', err));

