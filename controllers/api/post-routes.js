const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');

// /api/posts

// get all
router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: 'username'
            },
            {
                model: Comment,
                attributes: [[sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']]
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: 'username'
            },
            {
                model: Comment,
                attributes: ['comment_text', 'created_at'],
                include: [{
                    model: User,
                    attributes: 'username'
                }]
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with that ID was found.'});
        } else {
            res.json(dbPostData);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        text: req.body.text,
        user_id: req.body.user_id
        // will need to change this to req.session later
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// put
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            text: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with that ID was found.'});
        } else {
            res.json(dbPostData);
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with that ID was found.'});
        } else {
            res.json(dbPostData);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;