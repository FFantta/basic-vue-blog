const express = require('express');
const Post = require('../models/post');

const router = express.Router();

// 创建文章
router.post('/create', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const post = await Post.create({ title, content, author });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 获取所有文章
router.get('/list', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 更新文章
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.title = title;
        post.content = content;
        post.author = author;
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 删除文章
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 获取单个文章详情
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
