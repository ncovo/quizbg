var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET Creditos. */
router.get('/creditos', function(req, res){
  res.render('creditos', { title: 'Quiz' });
});


router.get('/quizes', 				quizController.index);
router.get('/quizes/:quizId(\\d+)',		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);

module.exports = router;
