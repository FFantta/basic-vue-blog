const { Sequelize } = require('sequelize');

// 初始化 Sequelize
const sequelize = new Sequelize('vue_blog', 'vue_user', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // 关闭 SQL 日志输出（可选）
});

// 测试数据库连接
sequelize.authenticate()
    .then(() => console.log('Connected to MySQL successfully!'))
    .catch(err => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
