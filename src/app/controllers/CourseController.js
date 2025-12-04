const Course = require('../models/Course');
const { mongooseToObject } = require('../../until/mongoose');

class CourseController {
    // get /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //post /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //post /courses/store
    store(req, res, next) {
        const formdata = req.body;
        formdata.image = `https://i.ytimg.com/vi/${formdata.videoId}/hq720.jpg`;
        const course = new Course(formdata);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((err) => {});
    }
}
// xuất news
module.exports = new CourseController();
