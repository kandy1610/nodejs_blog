const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class SiteController {
    // get /
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);

        // res.render('home');
    }
    // get /search
    search(req, res) {
        res.render('search');
    }
}
// xuất news
module.exports = new SiteController();
