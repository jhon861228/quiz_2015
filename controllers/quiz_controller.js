var model = require('../models/model');


exports.load = function(req,res,next,quizId){
	
	model.Quiz.findById(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error('No existe quiz para '+quizId))
		}
	}).catch(function(error){next(error)});
	
}

exports.index = function(req,res){
	
	if(req.query.search){
		
		var search = req.query.search;
		
		
		search = '%'+search+'%';
		search = search.replace(/[\s+]+/g,'%');

		console.log(search.replace(/[\s+]+/g,'%'));
		

		model.Quiz.findAll({
			where: ["pregunta like ?",search]
		})
		.then(function(quizes){

			res.render('quizes/index',{quizes : quizes});

		}).catch(function(error){next(error)});

	}else{
		model.Quiz.findAll().then(function(quizes){

			res.render('quizes/index',{quizes : quizes});
		}).catch(function(error){next(error)});	
	}

	
	
	
}

exports.show = function(req,res){
	
	res.render('quizes/show',{quiz : req.quiz});
	
	
}
exports.respuesta = function(req,res){

	if(req.quiz.respuesta.toLowerCase() == req.query.respuesta.toLowerCase()){
		res.render('quizes/respuesta',{'respuesta':'Correcto','quizId':req.quiz.id});
	}else{
		res.render('quizes/respuesta',{'respuesta':'Incorrecto','quizId':req.quiz.id});
	}
	
}
