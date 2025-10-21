const Router =  require('express')
const router = new Router();
const FeedbackController = require('../controllers/feedback.controllers');

router.post ('/feedback', FeedbackController.AddFeedBack);

module.exports = router;