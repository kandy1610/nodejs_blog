const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

const route = require('./routes');

            app.use(express.static(path.join(__dirname, 'public')));
//HTTP
//app.use(morgan('combined'))

            app.use(express.urlencoded());
app.use(express.json());

//templace engine
              app.engine(
    'hbs',
    engine        ({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'resources/views/layouts'),
        partialsDir: path.join(__dirname, 'resources/views/partials'),
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

// route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
