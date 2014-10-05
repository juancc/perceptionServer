// Funciones auxliares de los Handlers




//toma una lista de calificaciones y devuelve la moda
// la lista tiene el formato
// [[1,2,3], [3,4,5], ...]
function calcMode(list){
    
    var modeList = [];
       for(var i=0; i<list[0].length; i++){
           var max=0;
           var frequency = [];
           var value;
           for(var j=0; j<list.length; j++){
               frequency[list[j][i]]=(frequency[list[j][i]] || 0)+1; // increment frequency.
               if(frequency[list[j][i]] > max) { // is this frequency > max so far ?
                   max = frequency[list[j][i]];  // update max.
                   value = list[j][i];  
                }
           }
            modeList.push(value);         
       }
    console.log("Moda eval: " + modeList);
    return modeList;
};



function calcProm(list){
    var promList = [];
    for(var i=0; i<list[0].length; i++){
        var max=0;
        var frequency = [];
        var value=0;
        for(var j=0; j<list.length; j++){
            value += list[j][i]; // increment frequency.

        }
        promList.push(value/list.length);
    }
    console.log("Prom eval: " + promList);
    return promList;
};





//calcMode(blanco_natural_oscuro);
//calcProm(blanco_natural_oscuro);





//funciones a exportar
exports.calcMode = calcMode;