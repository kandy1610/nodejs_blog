const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class MyController {
    // GET /my/stored/courses
    storeCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('my/store-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render('my/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

// xuất news
module.exports = new MyController();
