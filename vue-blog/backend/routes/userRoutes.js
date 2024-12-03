const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// 注册用户
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 对密码加密
        const user = await User.create({ username, password: hashedPassword, email });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 登录用户
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password); // 校验密码
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        res.json({ message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
