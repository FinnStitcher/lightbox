const router = require('express').Router();
const {Post, User, Comment} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}));

        res.render('homepage', { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/unauthorized', (req, res) => {
    res.render('unauthorized');
});

module.exports = router;