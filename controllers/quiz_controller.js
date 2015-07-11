var model = require('../models/model');


exports.load = function(req,res,next,quizId){
	
	model.Quiz.find({
		where: {id:Number(quizId)},
		include: [{model:model.Comment}]	
	}).then(function(quiz){
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

			res.render('quizes/index',{quizes : quizes,errors:[]});

		}).catch(function(error){next(error)});

	}else{
		model.Quiz.findAll().then(function(quizes){

			res.render('quizes/index',{quizes : quizes,errors:[]});
		}).catch(function(error){next(error)});	
	}


	
}

exports.show = function(req,res){
	
	res.render('quizes/show',{quiz : req.quiz,errors:[]});
	
	
}

exports.new = function(req,res){
	
	var quiz = model.Quiz.build({
		pregunta:'Pregunta',respuesta:'Respuesta',indice:'otro'
	});

	res.render('quizes/new',{quiz : quiz,errors:[]});
}


exports.create = function(req,res){
	console.log(req.body);
	
	var quiz = model.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new',{quiz:quiz,errors:err.errors})
		}else{
			quiz.save({fields:['pregunta','respuesta','indice']}).then(function(){
				res.redirect('/quizes');
			});		
		}
	});

}

exports.edit = function(req,res){
	
	var quiz = req.quiz;

	res.render('quizes/edit',{quiz : quiz,errors:[]});
}
exports.update = function(req,res){
	console.log("update");
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.indice = req.body.quiz.indice;
	
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new',{quiz:req.quiz,errors:err.errors})
		}else{
			req.quiz.save({fields:['pregunta','respuesta','indice']}).then(function(){
				res.redirect('/quizes');
			});		
		}
	});

}

exports.destroy = function(req,res){
	
	var quiz = req.quiz;

	quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
	
}

exports.respuesta = function(req,res){

	if(req.quiz.respuesta.toLowerCase() == req.query.respuesta.toLowerCase()){
		res.render('quizes/respuesta',{'respuesta':'Correcto','quizId':req.quiz.id,errors:[]});
	}else{
		res.render('quizes/respuesta',{'respuesta':'Incorrecto','quizId':req.quiz.id,errors:[]});
	}
	
}
