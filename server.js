const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./controllers/');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

// set up Handlebars
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// The express.static() method is a built-in Express.js middleware function 
// that can take all of the contents of a folder and serve them as static assets. 
// This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
// In the sync method, there is a configuration parameter { force: false }. 
// If we change the value of the force property to true, 
// then the database connection must sync with the model definitions and associations. 
// By forcing the sync method to true, 
// we will make the tables re-create if there are any association changes.