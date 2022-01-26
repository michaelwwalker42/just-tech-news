const User = require("./User");
const Post = require("./Post");
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations

// This association creates the reference for the id column in
// the User model to link to the corresponding foreign key pair,
// which is the user_id in the Post model.
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// The constraint we impose here is that a post can belong to one user,
// but not many users
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// With these two .belongsToMany() methods in place,
// we're allowing both the User and Post models
// to query each other's information in the context of a vote

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// By also creating one-to-many associations directly between these models,
// we can perform aggregated SQL functions between models.
// In this case, we'll see a total count of votes for a single post when queried.
// This would be difficult if we hadn't directly associated
// the Vote model with the other two.

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// These association changes will not take affect in the User table, 
// because there isn't a way to make changes to the table dynamically. 
// We will need to drop the table and create a new one 
// in order for the associations to take affect.

module.exports = { User, Post, Vote, Comment };