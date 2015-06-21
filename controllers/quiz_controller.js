var models = require('../models/models.js');

//Autoload - Factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
    models.Quiz.findById(quizId).then(
        function(quiz){
	    if(quiz){
  	        req.Quiz = quiz;
    	        next();
	    } else {
		next(new Error('No existe quizId=' + quizId));}
	}
    ).catch(function(error) {next(error);});
};

//GET /quizes
exports.index = function(req, res){
    if (req.param('search')){
        var cadena = req.param('search');
        var search = cadena.replace(/\s/g, "%");
        models.Quiz.findAll( {where: ["pregunta like ?", '%' + search + '%']} ).then(function(Quizes){
	    res.render('quizes/index.ejs', {Quizes: Quizes, search: search})
	})
    } else {
	var search = "Utiliza la busqueda";
        models.Quiz.findAll().then(function(Quizes){
	    res.render('quizes/index.ejs', {Quizes: Quizes, search: search})
	})
    }
};

//GET /quizes/show
exports.show = function(req, res){
	res.render('quizes/show', {question: req.Quiz});
};

//GET /quizes/answer
exports.answer = function(req, res){
    var resultado = 'Incorrecto!!';
    if(req.query.answer === req.Quiz.respuesta){
	var resultado = 'Correcto!!';
    }
    res.render('quizes/answer', {question: req.Quiz, answer: resultado, title: 'Quiz'});
};

