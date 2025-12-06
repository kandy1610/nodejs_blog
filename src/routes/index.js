const newsRouter = require('./news');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const myRouter = require('./my');

function route(app) {
    app.use('/my', myRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
