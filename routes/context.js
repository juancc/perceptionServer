
    
    //calcula la luz promedio de un usuario
function lightProm(lightList){//lightList = [-723984, -723984,-723984....]
        var prom =[0,0,0];

        for(var i=0; i<lightList.length; i++){

            var color = colorShift(lightList[i]);
            prom = [prom[0]+color[0], prom[1]+color[1], prom[2]+color[2] ]
            
        }
    
    prom = [prom[0]/lightList.length, prom[1]/lightList.length, prom[2]/lightList.length]
    
    
    //console.log(prom);
    return prom;
};


//devuelve lista de los 5 luces mas representativas del projecto
function projectLights(allLights){
    var projectLightList = [allLights[0]];
    var threshold = 55; // valor minimo para ser considerado una luz diferente
    for(var i=1; i<allLights.length; i++){
        var toAdd = true;
        for(var j=0; j<projectLightList.length; j++){
            
            
            var dist = colorDistance(projectLightList[j], allLights[i]);
            //console.log(dist);
            if(dist < threshold){
                toAdd = false;
            }
        }
        if(toAdd){
            projectLightList.push(allLights[i]);
        }
        
    }
    //console.log(projectLightList);
    return projectLightList;
}


function isLight(light, match){
    var threshold = 55;
    
    match = match.split(',');
    for(var i=0; i<light.length; i++){
        light = [parseInt(light[0]), parseInt(light[1]), parseInt(light[2])];
        match = [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
    }

    return (colorDistance(light, match) < threshold)? true : false;

};



//projectLights([ [100, 40, 80], [10,50, 200], [200, 200, 200], [210, 200, 210]]);







//funcion que retorna los colores del contexto de un usuario
function userContextColors(colorList){
    var contextColors = [];
    for(var i=0; i<Object.keys(colorList).length; i++){
        var color = Object.keys(colorList)[i];
        var cant = colorList[color];

        //contextColors[cant] = color;
        if(color != 0){
            contextColors.push([cant, color]);
        }
        //contextColors[cant] = color;
    }

contextColors.sort(//ordena la lista de mayor a menos
    function(a,b){
        if (a[0] > b[0]) return -1;
        if (a[0] < b[0]) return 1;
        return 0;
    });

    
    
    var threshold = 60;
    
    for(var i=0; i<contextColors.length; i++){
        var colorA = colorShift(contextColors[i][1]);

        for(var j=1; j<contextColors.length-1; j++){
            var colorB = colorShift(contextColors[j][1]);
            
           
            if(colorDistance(colorA, colorB) < threshold ){          
                contextColors.splice(j, 1);

            }
        }
    }
   
    
    
    while(contextColors.length>10){
        for(var i=0; i<contextColors.length; i++){
            var colorA = colorShift(contextColors[i][1]);

            for(var j=1; j<contextColors.length-1; j++){
                var colorB = colorShift(contextColors[j][1]);


                if(colorDistance(colorA, colorB) < threshold ){          
                    contextColors.splice(j, 1);

                }
            }
        }
        threshold +=10;
    }
    
    
    for(var i=0; i<contextColors.length; i++){
        contextColors[i] = contextColors[i][1];
    }
  
//console.log(contextColors);  
return contextColors
};





//retorna la lista de los colores del contexto de un proyecto

function projectContextColors(usersColorList){//[["-123223", "234134"],["12332", "342123"] ...]
    var projectContextColors = [];
    for(var i=0; i<usersColorList.length; i++){//agrega los colores a un array
        for(var j=0; j<usersColorList[i].length; j++){
            projectContextColors.push(usersColorList[i][j]);
        }
    }
    
    var threshold = 60;
                               
    while(projectContextColors.length>5){
    for(var i=0; i<projectContextColors.length; i++){
        var colorA = colorShift(projectContextColors[i][1]);

        for(var j=1; j<projectContextColors.length-1; j++){
            var colorB = colorShift(projectContextColors[j][1]);


            if(colorDistance(colorA, colorB) < threshold ){          
            projectContextColors.splice(j, 1);

            }
        }
    }
    threshold +=10;
    }
    
    for(var i=0; i<projectContextColors.length; i++){
        projectContextColors[i] = colorShift(projectContextColors[i]); 
    }
    //console.log(projectContextColors);
    return projectContextColors;
};




function isColor(colors, match){
    var threshold = 50;
    var IsColor = false;

    for(var i=0; i<colors.length; i++){
        var contextColor = colorShift(colors[i]);
        if(colorDistance(contextColor, match) < threshold){
            IsColor = true;
            break;
        }
    }

    return IsColor;
};




//Bit shifting un int32 (notacion de processing) retorna un rgb
function colorShift(intColor){//colorShift( -7896975);

    var RED = 0;
    var GREEN = 1;
    var BLUE = 2;

    var rgb=[];


    rgb[RED]= (intColor >> 16) & 0xFF;
    rgb[GREEN]=(intColor >> 8) & 0xFF;
    rgb[BLUE]= intColor & 0xFF;

    return rgb;

};


//distancia euclidiana entre dos colores
function colorDistance(colorA, colorB){
    var dist = Math.sqrt(
        Math.pow(colorA[0]-colorB[0], 2)+
        Math.pow(colorA[1]-colorB[1], 2)+
        Math.pow(colorA[2]-colorB[2], 2));
    return dist;

};


//funciones a exportar
exports.lightProm = lightProm;
exports.projectLights = projectLights;
exports.isLight = isLight;

exports.userContextColors = userContextColors;
exports.projectContextColors = projectContextColors;
exports.isColor = isColor;