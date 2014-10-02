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
				$("#divIzq ul").append("<li>"+pal+"</li>");
			}
		  },
		});
	}
	CargarProyectos();
	
});