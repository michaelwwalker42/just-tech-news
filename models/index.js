const User = require("./User");
const Post = require("./Post");

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

// These association changes will not take affect in the User table, 
// because there isn't a way to make changes to the table dynamically. 
// We will need to drop the table and create a new one 
// in order for the associations to take affect.

module.exports = { User, Post };