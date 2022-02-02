const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    // This code sets up an Express.js session and connects the session to our Sequelize database.
    // As you may be able to guess, "Super secret secret" should be replaced by an actual secret
    // and stored in the .env file. All we need to do to tell our session to use cookies
    // is to set cookie to be {}. If we wanted to set additional options on the cookie,
    // like a maximum age, we would add the options to that object.
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// set up Handlebars
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// The express.static() method is a built-in Express.js middleware function 
// that can take all of the contents of a folder and serve them as static assets. 
// This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(require('./controllers/'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
// In the sync method, there is a configuration parameter { force: false }.
// If we change the value of the force property to true, 
// then the database connection must sync with the model definitions and associations. 
// By forcing the sync method to true, 
// we will make the tables re-create if there are any association changes.