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
		//$("#adjetivos").html("");
		
		$.ajax({
		  url: '/getAdjetivos/'+$(this).attr("id"),
		  type: 'GET',
		  async: true,
		  //data: 'parametro1=valor1&parametro2=valor2',
		  success: function(resp){
              adjetivos = resp;
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
        var concept = $('input:radio[name=concept]:checked').val();
        var genero = $('input:radio[name=sex]:checked').val() || "none";
        var estrato = $('input:radio[name=estrato]:checked').val() || "none";
        var edad = $('input:radio[name=edad]:checked').val() || "none";
        
        
        
        $.ajax({
            url: '/findByGenero/'+genero +"/" +concept +"/"+ estrato +"/"+ edad,
            type: 'GET',
            async: true,
            //data: 'parametro1=valor1&parametro2=valor2',
            success: function(resp){
                ds.draw("svg", adjetivos, resp[0], resp[1]);
            },
        });
        
        
        
        

	});
});