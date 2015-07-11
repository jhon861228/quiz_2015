var model = require('../models/model');


exports.load = function(req,res,next,commentId){
	
	model.Comment.find({
		where: {id:Number(commentId)}	
	}).then(function(comment){
		if(comment){
			req.comment = comment;
			next();
		}else{
			next(new Error('No existe quiz para '+commentId))
		}
	}).catch(function(error){next(error)});
	
}

exports.new = function(req,res){
	res.render('comments/new',{quiz:req.quiz,errors:[]});
}

exports.create = function(req,res){

	var comment = model.Comment.build({
		texto:req.body.comment.texto,
		QuizId:req.params.quizId
	});

	comment
	.validate()
	.then(function(err){
		if(err){
			res.render('comments/new',{comment:comment,errors:[]});
		}else{
			comment.save().then(function(){
				res.redirect('/quizes/'+req.params.quizId);
			});
		}
	}).catch(function(error){next(error)});
}

exports.publish = function(req,res) {
	req.comment.publicado = true;
	req.comment.save({fields:['publicado']})
	.then(function(){ res.redirect('/quizes/'+req.params.quizId); })
	.catch(function(err){ next(err); });
}