function checkAuth (req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/unauthorized');
        return;
    } else {
        next();
    }
};

module.exports = checkAuth;