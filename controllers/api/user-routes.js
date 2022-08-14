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
    .then(dbUserData => {
        // log the new user in
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user with that ID was found.'});
        } else {
            res.json(dbUserData);
        };
    })
});

// login
router.post('/login', (req, res) => {
    // check if this user actually exists
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user with that username was found.'});
        } else {
            // compare encryped and unencrypted passwords
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({message: 'Password is incorrect.'});
            } else {
                // log user in
                req.session.save(() => {
                    req.session.user_id = dbUserData.id;
                    req.session.username = dbUserData.username;
                    req.session.loggedIn = true;

                    res.json({
                        user: dbUserData,
                        message: 'You are now logged in.'
                    });
                });
            }
        }
    })
    .catch(err => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
});

module.exports = router;