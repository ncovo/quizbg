var models = require('../models/models.js');

//GET /quizes/question
exports.question = function(req, res){
    models.Quiz.findAll().then(function(Quiz){
	res.render('quizes/question', {question: Quiz[0].pregunta})
    })
};

//GET /quizes/answer
exports.answer = function(req, res){
    models.Quiz.findAll().then(function(Quiz){
        if(req.query.answer === "Roma"){
            res.render('quizes/answer', {answer: 'Correcto!!', title: 'Quiz'});
        } else {
            res.render('quizes/answer', {answer: 'Incorrecto!!', title: 'Quiz'});
        }
    })
};
