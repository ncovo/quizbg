//GET login -- Formulario de login
exports.loginRequired = function(req, res, next){
	if (req.session.user){
		next();
	} else {
		res.redirect('/login');
	}
};

exports.new = function(req.res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
}

//POST /login -- Crear la session
exports.create = function(req, res){
	var login	= req.body.login;
	var password	= req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if (error){
			req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
			req.redirect("/login");
			return;
		}

		req.session.user = {id: user.id, username: user.username};

		req.redirect(req.session.redir.toStrong());
	});
};

//DELETE /logout -- Destruir session
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toStrong());
};