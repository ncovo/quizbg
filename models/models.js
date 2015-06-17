var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite   DATABASE_URL = slite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]|null);
var user     = (url[2]|null);
var pwd      = (url[3]|null);
var protocol = (url[1]|null);
var dialect  = (url[1]|null);
var port     = (url[5]|null);
var host     = (url[4]|null);
var storage  = process.env.DATABASE_STORAGE;

console.log(url[1]);

//cargar model ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
    { dialect:   url[1],
      protocol:  url[1],
      port:      port,
      host:      host,
      storage:   storage, //solo SQLite (.env)
      omitNull:  true     //solo Postgres
    }
);

var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; //Exportar la definicion de la tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
    //success(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count){
	if (count === 0){ // la tabla se inicializa solo si está vacia
	    Quiz.create({ pregunta: 'Capital de Italiza',
	    		  respuesta:'Roma',
			})
	.then(function(){console.log('Base de datos inicializada')});
    };
  });
});