const Course = require('../models/Course');

class SiteController {
    // get /
    async home(req, res) {
        try {
            const courses = await Course.find({});
            res.json(courses);
        } catch (err) {
            res.status(400).json({ error: 'ERROR!' });
        }

        // res.render('home');
    }
    // get /search
    search(req, res) {
        res.render('search');
    }
}
// xuất news
module.exports = new SiteController();
