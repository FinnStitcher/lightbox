const router = require('express').Router();
const {User, Post} = require('../../models');

// /api/users

// get all
router.get('/', (req, res) => {
    // not going to pull all posts with all users; too much
    User.findAll({
        attributes: ['username', 'email', 'created_at']
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['username', 'email', 'created_at'],
        include: {
            model: Post,
            attributes: ['title']
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user with that ID was found.'});
        } else {
            res.json(dbUserData);
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;