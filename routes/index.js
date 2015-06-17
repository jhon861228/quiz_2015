var express = require('express');
var router = express.Router();
var quiz_controller = require('../controllers/quiz_controller')

/* GET home page. */

router.get('/', quiz_controller.pregunta);
router.get('/author', function(req,res){
	
	var descripcion = "Apasionado por la tecnología, lenguajes de programación y diseño web";
	res.render('author',{imagen:"/images/pp.jpg",nombre:"Jhon Jairo Diaz Rueda",profesion:"Tecnólogo en sistemas",descripcion:descripcion});
});

router.get('/quizes/pregunta',quiz_controller.pregunta);
router.get('/quizes/respuesta',quiz_controller.respuesta);

module.exports = router;
