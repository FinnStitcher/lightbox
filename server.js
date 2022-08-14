const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3005;

// handlebars init
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({helpers});

// handlebars init
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// session init
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// session init
const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// general express init
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use(routes);

// startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('http://localhost:' + PORT);
    });
});