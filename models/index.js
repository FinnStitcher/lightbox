const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// each post belongs to one user; each user can have many posts
Post.belongsTo(User, {
    foreign_key: 'user_id'
});

User.hasMany(Post, {
    foreign_key: 'user_id'
});

// each comment belongs to a single user and post
// users and posts may have many comments
Comment.belongsTo(User, {
    foreign_key: 'user_id'
});

User.hasMany(Comment, {
    foreign_key: 'user_id'
});

Comment.belongsTo(Post, {
    foreign_key: 'post_id'
});

Post.hasMany(Comment, {
    foreign_key: 'post_id'
});

module.exports = {
    User,
    Post,
    Comment
}