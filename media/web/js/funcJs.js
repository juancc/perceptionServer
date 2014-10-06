$(document).on("ready", function(){
	function CargarProyectos(){
		$.ajax({
		  url: '/listPerceptions/termo',
		  type: 'GET',
		  async: true,
		  //data: 'parametro1=valor1&parametro2=valor2',
		  success: function(resp){
			for(var i=0;i<resp.length;i++){
				var pos = resp[i].name.indexOf(".");
				var tam = resp[i].name.length;
				var pal = resp[i].name.substring(pos+1, tam);
				$("#divIzq ul").append("<li id='"+pal+"'>"+pal+"</li>");
			}
		  },
		});
	}
	CargarProyectos();
	
	var respuestaInicial = {};
	
	$("#divIzq li").live("click",function(){
		$("#divDer h1").html($(this).attr("id"));
		$("#adjetivos").html("");
		
		$.ajax({
		  url: '/getAdjetivos/'+$(this).attr("id"),
		  type: 'GET',
		  async: true,
		  //data: 'parametro1=valor1&parametro2=valor2',
		  success: function(resp){
			respuestaInicial[0] = resp;
			for(var i=0;i<resp[0].adjectives.length;i++){
				for(var j=0;j<resp[0].adjectives[0].length;j++){
					$("#adjetivos").append(resp[0].adjectives[i][j]);
				}
				$("#adjetivos").append("</br>");
			}
		  },
		});
		
		$.ajax({
		  url: '/getModaGeneral/'+$(this).attr("id"),
		  type: 'GET',
		  async: true,
		  success: function(resp){
			respuestaInicial[0] = resp;
			
		  },
		});
		
	});
	
	
	$(".cambio").on("change", function(){
		
		//var h = respuestaInicial[0][0].adjectives[0][0]; formato
		
		radio_button_value = $('input:radio[name=sex]:checked').val();
		alert(radio_button_value);
		$.ajax({
		  url: '/genGraph/'+radio_button_value,
		  type: 'GET',
		  async: true,
		  //data: 'parametro1=valor1&parametro2=valor2',
		  success: function(resp){
			for(var i=0;i<resp.length;i++){
				var pos = resp[i];
			}
		  },
		});
	});
});