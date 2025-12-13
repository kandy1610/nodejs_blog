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

    //get /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //post /courses/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/my/stored/courses'))
            .catch((err) => {});
    }

    //get /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //put /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/my/stored/courses'))
            .catch(next);
    }

    // delete /corses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/my/stored/courses'))
            .catch(next);
    }

    // delete /corses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/my/stored/courses'))
            .catch(next);
    }

    // patch /corses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/my/stored/courses'))
            .catch(next);
    }

    //post /courses/handle-form-action
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body['courseIds[]'] } })
                    .then(() => res.redirect('/my/stored/courses'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

// xuất news
module.exports = new CourseController();
