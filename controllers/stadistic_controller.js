var model         = require('../models/model');

exports.index =function(req,res){
	res.render('stadistics/index',{errors:[]});
}

exports.stadistic =function(req,res){

	var cantidad_preguntas,cantidad_comentarios;

	model.Quiz.findAll({
		include: [{model:model.Comment}]
	}).then(function(quizes){

		var totales_quizes = quizes.length;
		var totales_comentarios = 0;
		var totales_quizes_no_comment = 0;
		var totales_quizes_si_comment = 0;

		for(i in quizes){
			totales_comentarios = totales_comentarios + quizes[i].Comments.length;
			if(quizes[i].Comments.length == 0){
				totales_quizes_no_comment ++;
			}else{
				totales_quizes_si_comment ++;
			}
		}

		var media_comentarios = totales_comentarios/totales_quizes;
		res.json({
			totales_quizes:totales_quizes,
			totales_comentarios:totales_comentarios,
			totales_quizes_no_comment:totales_quizes_no_comment,
			totales_quizes_si_comment:totales_quizes_si_comment,
			media_comentarios:media_comentarios.toFixed(2)
		});

	});

}
