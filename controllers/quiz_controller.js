var model = require('../models/model');

exports.pregunta = function(req,res){
	
	var pregunta ;

	model.Quiz.findAll().then(function(quiz){

		res.render('quizes/pregunta',{pregunta : quiz[0].pregunta,id:quiz[0].id});
	});
	
	
}
exports.respuesta = function(req,res){

	
	model.Quiz.findById(1)
	.then(function(quiz){
		if(quiz.respuesta.toLowerCase() === req.query.respuesta.toLowerCase()){
			res.render('quizes/respuesta',{'respuesta':'Correcto'});		
		}else{
			res.render('quizes/respuesta',{'respuesta':'Incorrecto'});
		}
	});
	

}
