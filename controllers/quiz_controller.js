exports.pregunta = function(req,res){
	
	var json_preguntas = [{'pregunta':'Quien descubrió América','oculto':'america'}
								,{'pregunta':'Capital de Portugal','oculto':'portugal'}];
	res.render('quizes/pregunta',{preguntas : json_preguntas});
}
exports.respuesta = function(req,res){

	var mensaje = 'Incorrecto';
	if(req.query.pregunta==='portugal' && req.query.respuesta.toLowerCase() ==='lisboa'){
	 mensaje = 'Correcto';
	}else if(req.query.pregunta === 'america' && req.query.respuesta.toLowerCase() == 'cristobal colón'){
	 mensaje = 'Correcto';
	}
	res.render('quizes/respuesta',{'respuesta':mensaje});	
}
