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

        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.render('login-redirect', { loggedIn: req.session.loggedIn });
    } else {
        res.render('login', { loggedIn: req.session.loggedIn });
    }
});

// if user is logged in, send them to the logout page
// else, send them to the "you need to be logged in" page
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        res.render('logout', { loggedIn: req.session.loggedIn });
    } else {
        res.render('auth-redirect', { loggedIn: req.session.loggedIn });
    }
});

module.exports = router;