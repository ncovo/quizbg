var models = require('../models/models.js');

//GET /quizes
exports.index = function(req, res){
    models.Quiz.findAll().then(function(Quizes){
	res.render('quizes/index.ejs', {Quizes: Quizes})
    })
};

//GET /quizes/show
exports.show = function(req, res){
    models.Quiz.findById(req.params.quizId).then(function(Quiz){
	res.render('quizes/show', {question: Quiz})
    })
};

//GET /quizes/answer
exports.answer = function(req, res){
    models.Quiz.findById(req.params.quizId).then(function(Quiz){
        if(req.query.answer === Quiz.respuesta){
            res.render('quizes/answer', {question: Quiz, answer: 'Correcto!!', title: 'Quiz'});
        } else {
            res.render('quizes/answer', {question: Quiz, answer: 'Incorrecto!!', title: 'Quiz'});
        }
    })
};
