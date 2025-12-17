const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class MyController {
    // GET /my/stored/courses
    storeCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
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
