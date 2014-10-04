// Objeto que grafica el diferencial semantico
/*
se llama esta funcion cada vez que se desee graficar un diferencial semantico
ds.draw("svg", [["Lindo", "Feo"], ["Suave", "Rugoso"], ["Corto", "Largo"], ["Silencioso", "Ruidoso"]], [0, 4, 1, 3]);

*/

var ds = {
    draw: function(svgId, adjetivesList , evalList){
        //solucion rapida borrar svg y volver a graficar las evaluaciones
        var svg = document.getElementById(svgId);
        $("#svgId").empty();
        
        //incrementos para dibujo de las bolitas
        var dW = svg.getAttribute("width").replace("px", '')/6;
        var dH = (svg.getAttribute("height").replace("px", '')-svg.getAttribute("height").replace("px", '')/4)/ adjetivesList.length;
        
        
        for (var i=1; i<6; i++){
            for(var j=1; j<adjetivesList.length+1; j++){
                if (i==1){ds.text(i*dW, j*dH+15,adjetivesList[j-1][0] ,svg);};// dibuja adjetivo inicial
                if(i==5){ds.text(i*dW, j*dH+15,adjetivesList[j-1][1] ,svg);};// dibuja adjetivo final
                ds.circle(i*dW, j*dH, svg, "black");
                
                
                if(evalList[j-1] == i-1){
                    ds.circle(i*dW, j*dH, svg, "red");
                };
                
                
            }
        }
        for (var i=1; i<evalList.length; i++){
            ds.line((evalList[i-1]+1)*dW, i*dH, (evalList[i]+1)*dW, (i+1)*dH, "red", svg);
        }
        
        
        
    },
    
    
    
    circle: function(x, y, svg, color){
        var element = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

        element.setAttribute("cx", x);
        element.setAttribute("cy", y);
        element.setAttribute("r", 2);
        element.style.fill = color;
        element.style.stroke =  color;
        element.style.strokeWidth =  "1.5px";
        
        svg.appendChild(element);
        
        return element;
    },
    
    text: function(x,y, text, svg){
        var element = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        element.setAttribute( "x", x);
        element.setAttribute("y", y);



        element.setAttributeNS(null,"font-size","11");
        element.style.dominantBaseline = "middle";
        element.setAttributeNS(null,"fill","Black");
        element.setAttributeNS(null,"text-anchor","middle");
        var textNode = document.createTextNode(text);
        element.appendChild(textNode);
        
        svg.appendChild(element);
        return element;

    },
    
    line: function(x1,y1, x2, y2, color, svg){
        var element = document.createElementNS("http://www.w3.org/2000/svg", 'line');

        element.setAttribute("x1", x1);
        element.setAttribute("y1", y1);
        element.setAttribute("x2", x2);
        element.setAttribute("y2", y2);
        //element.setAttribute("r", 6);



        //element.setAttribute("fill", "#98d0ff");
        element.style.stroke =  color;
        element.style.strokeWidth =  "1px";
        
        svg.appendChild(element);

        return element;
        
    },
    
    
    

}