const express = require('express');
const router = express.Router();

const MyController = require('../app/controllers/MyController');
// mycontroller index

router.get('/stored/courses', MyController.storeCourses);

module.exports = router;
