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
	    res.render('quizes/index.ejs', {Quizes: Quizes, search: search, errors: []})
	})
    } else {
	var search = "Utiliza la busqueda";
        models.Quiz.findAll().then(function(Quizes){
	    res.render('quizes/index.ejs', {Quizes: Quizes, search: search, errors: []})
	})
    }
};

//GET /quizes/show
exports.show = function(req, res){
	res.render('quizes/show', {question: req.Quiz, errors: []});
};

//GET /quizes/answer
exports.answer = function(req, res){
    var resultado = 'Incorrecto!!';
    if(req.query.answer === req.Quiz.respuesta){
	var resultado = 'Correcto!!';
    }
    res.render('quizes/answer', {question: req.Quiz, answer: resultado, title: 'Quiz', errors: []});
};

//GET /quizes/new
exports.new = function(req, res){
    var quiz = models.Quiz.build(
 	{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
    );
    res.render('quizes/new', {quiz: quiz, errors: []});
};

//GET /quizes/create
exports.create = function(req, res){
    var quiz = models.Quiz.build( req.body.quiz );

    quiz
    .validate()
    .then(
        function(err){
	    if (err){
		res.render('quizes/new', {quiz: quiz, errors: err.errors});
	    } else {
		quiz
		.save({fields: ["pregunta", "respuesta", "tema"]})
		.then(function(){ res.redirect('/quizes')})
	    }
	}	
    );
};

//GET quizes/:id/edit
exports.edit = function(req, res){
    var quiz = req.Quiz

    res.render('quizes/edit', {quiz: quiz, errors: []});
};

//PUT quizes/:id/
exports.update = function(req, res){
    req.Quiz.pregunta = req.body.quiz.pregunta;
    req.Quiz.respuesta = req.body.quiz.respuesta;
    req.Quiz.tema = req.body.quiz.tema;

    req.Quiz
    .validate()
    .then(
        function(err){
	    if (err){
		res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
	    } else {
		req.Quiz
		.save({fields: ["pregunta", "respuesta", "tema"]})
		.then(function(){ res.redirect('/quizes')})
	    }
	}	
    );
};

//DELETE quizes/:id/
exports.destroy = function(req, res){
	req.Quiz.destroy().then( function() { 
		res.redirect('/quizes');
	}).catch(function(){next(error)});
};

