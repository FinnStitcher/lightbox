const router = require('express').Router();
const {Comment, User, Post} = require('../../models');

// /api/comments

// get all
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['comment_text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['title']
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post
router.post('/', (req, res) => {
    // again, will need to change this to req.session.user_id
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;