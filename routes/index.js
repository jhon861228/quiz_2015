var express = require('express');
var router = express.Router();
var quiz_controller = require('../controllers/quiz_controller');
var comment_controller = require('../controllers/comment_controller');
var stadistic_controller = require('../controllers/stadistic_controller');
var session_controller = require('../controllers/session_controller');



/* GET home page. */
router.get('/', function(req,res){
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('index',{mensaje:'Bienvenidos a la aplicación de Quizes',title:'Quizes',errors:errors});
});


/*Auto loads*/
router.param('quizId',quiz_controller.load);
router.param('commentId',comment_controller.load);


/*Rutas para quizes*/
router.get('/quizes',quiz_controller.index);
router.get('/quizes/:quizId(\\d+)',quiz_controller.show);
router.get('/quizes/:quizId(\\d+)/respuesta',quiz_controller.respuesta);
router.get('/quizes/new'                , session_controller.loginRequired,quiz_controller.new);
router.post('/quizes/create'            , session_controller.loginRequired,quiz_controller.create);
router.get('/quizes/:quizId(\\d+)/edit' , session_controller.loginRequired,quiz_controller.edit);
router.put('/quizes/:quizId(\\d+)'      , session_controller.loginRequired,quiz_controller.update);
router.delete('/quizes/:quizId(\\d+)'   , session_controller.loginRequired,quiz_controller.destroy);

/*Rutas comentarios*/
router.get('/quizes/:quizId(\\d+)/comments/new',comment_controller.new);
router.post('/quizes/:quizId(\\d+)/comments',comment_controller.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',session_controller.loginRequired,comment_controller.publish);


/*Rest estadisticas*/

router.get('/stadisticview',session_controller.loginRequired,stadistic_controller.index);
router.get('/api/stadistic',stadistic_controller.stadistic);

/*Rutas para la sesión*/
router.get('/login',session_controller.new);
router.post('/login',session_controller.create);
router.get('/logout',session_controller.destroy);


/* Créditos */
router.get('/author', function(req,res){
	var descripcion = "Apasionado por la tecnología, lenguajes de programación y diseño web";
	res.render('author',{imagen:"/images/pp.jpg",nombre:"Jhon Jairo Diaz Rueda",profesion:"Tecnólogo en sistemas",descripcion:descripcion,errors:[]});
});


module.exports = router;
