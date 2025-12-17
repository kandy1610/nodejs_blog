const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');

const SortMiddleware = require('./app/middleware/SortMiddleware');

//connect db
const db = require('./config/db');
db.connect();

const app = express();
const port = 3000;

const route = require('./routes');
const handlebars = require('./helpers/handlebars');

app.use(express.static(path.join(__dirname, 'public')));
//HTTP
//app.use(morgan('combined'))

app.use(express.urlencoded());
app.use(express.json());

app.use(methodOverride('_method'));

// custom SortMiddleware
app.use(SortMiddleware);

//templace engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
        helpers: require('./helpers/handlebars'),
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// create -> POST
// update -> PUT, PATCH
// delete -> DELETE
// read -> GET
