var express = require('express');
var router = express.Router();
var quiz_controller = require('../controllers/quiz_controller')

/* GET home page. */
router.get('/', function(req,res){
	res.render('index',{mensaje:'Bienvenidos a la aplicación de Quizes',title:'Quizes',errors:[]});
});


/*Auto loads*/
router.param('quizId',quiz_controller.load);


/*Rutas para quizes*/
router.get('/quizes',quiz_controller.index);
router.get('/quizes/:quizId(\\d+)',quiz_controller.show);
router.get('/quizes/:quizId(\\d+)/respuesta',quiz_controller.respuesta);
router.get('/quizes/new',quiz_controller.new);
router.post('/quizes/create',quiz_controller.create);
router.get('/quizes/:quizId(\\d+)/edit',quiz_controller.edit);
router.put('/quizes/:quizId(\\d+)',quiz_controller.update);
router.delete('/quizes/:quizId(\\d+)',quiz_controller.destroy);


/* Créditos */
router.get('/author', function(req,res){
	var descripcion = "Apasionado por la tecnología, lenguajes de programación y diseño web";
	res.render('author',{imagen:"/images/pp.jpg",nombre:"Jhon Jairo Diaz Rueda",profesion:"Tecnólogo en sistemas",descripcion:descripcion});
});


module.exports = router;
