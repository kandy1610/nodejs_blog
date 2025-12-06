const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class MyController {
    // GET /my/stored/courses
    storeCourses(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('my/store-courses', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

// xuất news
module.exports = new MyController();
