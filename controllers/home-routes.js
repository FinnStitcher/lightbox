const router = require('express').Router();
const {Post, User, Comment} = require('../models');
const checkAuth = require('../utils/auth');

router.get('/login', (req, res) => {
    res.render('login', { loggedIn: req.session.loggedIn });
});

// if user is logged in, send them to the logout page
// else, send them to the "you need to be logged in" page
router.get('/logout', (req, res) => {
    res.render('logout', { loggedIn: req.session.loggedIn });
});

router.get('/unauthorized', (req, res) => {
    res.render('redirect-to-login', {loggedIn: false});
});

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

router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Comment,
                attributes: ['comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with that ID was found.'});
        } else {
            const post = dbPostData.get({plain: true});

            // adding a value that identifies if the user made this post
            post.belongsToUser = post.user.id === req.session.user_id;

            res.render('single-post', {post, loggedIn: req.session.loggedIn});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/dashboard', checkAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: ['username'],
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'text', 'created_at'],
                order: [
                    ['created_at', 'DESC']
                ],
                include: {
                    model: Comment,
                    attributes: ['id']
                }
            },
            {
                model: Comment,
                attributes: ['created_at', 'comment_text'],
                include: {
                    model: Post,
                    attributes: ['id', 'title']
                }
            }
        ]
    })
    .then(dbUserData => {
        const user = dbUserData.get({plain: true});

        res.render('dashboard', { user, loggedIn: req.session.loggedIn });
    });
});

router.get('/create', (req, res) => {
    res.render('new-post', { loggedIn: req.session.loggedIn });
});

router.get('/edit/:id', checkAuth, (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'text'],
        include: [
            {
                model: User,
                attributes: ['id']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with that ID was found.'});
        } else {
            const post = dbPostData.get({plain: true});

            // adding a value that identifies if the user made this post
            // makes sure you can't edit 
            post.belongsToUser = post.user.id === req.session.user_id;

            res.render('edit-post', {post, loggedIn: req.session.loggedIn});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;