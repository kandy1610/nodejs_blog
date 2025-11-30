class NewsController {
    // get /news
    index(req, res) {
        res.render('news');
    }

    show(req, res) {
        res.send('NEWS DETAIL');
    }
}
// xuất news
module.exports = new NewsController();
