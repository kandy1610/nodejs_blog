class SiteController {
    // get /
    home(req, res) {
        res.render('home');
    }
    // get /search
    search(req, res) {
        res.render('search');
    }
}
// xuất news
module.exports = new SiteController();
