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
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'bi bi-filter',
                    asc: 'bi bi-sort-down',
                    desc: 'bi bi-sort-up',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span></a>`;
            },
        },
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
