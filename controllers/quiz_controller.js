
exports.question = function(req, res){
    res.render('quizes/question', {question: 'Capital de Italia', title: 'Quiz'});
};

exports.answer = function(req, res){
    if(req.query.answer === "Roma"){
        res.render('quizes/answer', {answer: 'Correcto!!', title: 'Quiz'});
    } else {
        res.render('quizes/answer', {answer: 'Incorrecto!!', title: 'Quiz'});
    }
};