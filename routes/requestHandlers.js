// Funciones que manejan los request-response del servidor
var mongo = require('mongodb'),
    fs = require('fs'),
    aux = require('./aux');
var exec = require("child_process").exec


var Server = mongo.Server,
    Db = mongo.Db;
    BSON = mongo.BSONPure;
    
var server = new Server('localhost', 27017, {auto_reconect:true})
db = new Db('perceptiondb', server);


//var projects = [];
//var newProject = "";





db.open(function(err, db){//crea coleciones dependiendo de los archivos en /media/projects
     exec("ls media/projects", function(error, stdout, sterr){
           var projects = stdout.toString().split('\n');
           
           projects.pop();
           for (var i=0 ; i<projects.length; i++){
                db.createCollection(projects[i], function(err, collection){});    
                }
                        
           
           
    });
}); 


function findAllProject(req, res){
	exec("ls media/projects", function(error, stdout, sterr){
	   console.log(stdout);
	   res.send(stdout);           
	});
}

function getAdjetivos(req, res){
    var proyect = req.params.proyect;

    db.collection(proyect, function(err, collection){
        collection.find().toArray(function(err, items){

            console.log(items[10].adjectives);
            res.send(items[10].adjectives);

        });
    });
}

function getModaGeneral(req, res){
    var proyect = req.params.proyect;
	//var collect = req.params.collect;
	
	db.collection(proyect, function(err, collection){
		if(err){
			console.log(err);
		}else{
			collection.find( {'nombre': 'termos'}, {'limit': 1}).toArray(function(err, item){
				if(err){
					console.log(err);
				}else{
					console.log(item);
					res.send(item);
				}
			});
		}
    });

}

function findByGenero(req, res){
    var request = {};
    var genero = req.params.genero;
    var concept = req.params.concept;
    var estrato = req.params.estrato;
    var edad = req.params.edad;
    
    
    if(estrato != "none"){
        request["users.estrato"] =  estrato.toString();
    }
    if(genero != "none"){
        request['users.genero'] = genero;
    }
    if(edad != "none"){
        request['users.edad'] = edad.toString();
    }
	
    console.log(request);
	//db.termo.find({'users.genero': 'Masculino'})
    db.collection("default", function(err, collection){
        
        collection.find(request).toArray(function(err, items){
            var resp = [];
            var finalResp = [];
            if(items.length>0){

                for(var i=0; i<items.length; i++){

                    resp.push(items[i].users.conceptsEvaluation[concept]);
                }

                finalResp[0] = aux.calcMode(resp);
                finalResp[1] = aux.calcProm(resp);
            }
            
            res.send(finalResp);

        });
    });
    
}

function findAllPerception(req, res){
    //var project = req.params.project;
    //console.log('Retrieving perception from project: ' + project);
	db.collectionNames(function(err, collections){
		console.log(collections);
		res.send(collections);
	});

}

function findById(req, res){
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('wines', function(err, collection){
        collection.findOne( {'_id': new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
        });
    });
}


function addPerception(req, res){
    var perception = req.body;
    var project = req.params.project;
    console.log('Adding perception: '+ JSON.stringify(wine));
    db.collection(project, function(err, collection){
        collection.insert(perception, {safe:true}, function(err, result){
            if(err){
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}


function updateWine(req, res){
    var id = req.params.id;
    var wine = req.body;
    console.log('updating wine: '+ id);
    console.log(JSON.stringify(wine));
    db.collection('wines', function(err, collection){
        collection.update({'_id': new BSON.ObjectID(id)}, wine, {safe: true}, function(err, result){
            if (err){
                console.log('Error updating wine: ' + err);
                res.send({'Error': 'An error occurred'});
            } else{
                console.log(''+ result + 'document(s) updated');
                res.send(wine);
            }
        });
    });
}


function deleteWine(req, resp){
    var id = req.params.id;
    console.log('Deleting wine: '+ id);
    db.collection('wines', function(err, collection){
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe:true}, function(err, result){
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


//populate data base

var populateDB = function(){
    //ejemplo de documentos 
         
        
    
    // esto hay que reemplazalo por el nuevo formato del json
    //ver example.json
    var perception = [
    {
        segmentation:{
            birth: 1987,
            gender: "masculino",
            Ocupation: "estudiante",
            SocialStratification: 4,
        },
        SemanticDiferential:{
            adjectives:[  ["lindo", "feo"], ["simple", "complejo"], ["real", "abstracto"]  ],
            qualification: [-2, 1, 0],
        },
        lightning: [200, 256, 250],
        contextColors: [[120, 30, 50], [40, 190, 40], [40,250, 200], [30, 140, 120], [60, 120, 125]],   
    }
    
    ];
    
    //db.collection('perception', function(err, collection){
        //collection.insert(perception, {safe:true}, function(err, result){});
    //});
};




function loadProject(req, res){
    console.log("Request handler 'start' was called. ");
    
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/uploadProject" enctype="multipart/form-data" '+
        'method="post">'+
        
        'Project Name: <input type="text" name="projectName"><br>'+
        'Project File: <input type="file" name="upload"><br>'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
    
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();

}


function uploadProject(req, res) {
    console.log("Request handler 'upload' was called.");
    
    fs.readFile(req.files.upload.path, function(err, data){
        var projectName =  req.body.projectName;
        var projectPath = './media/projects/' + projectName;
         
        try{
        fs.writeFile(projectPath, data, function (err) {
            //if (err) throw err;
            //creando collection para el projecto
            db.createCollection(projectName, function(err, collection){});    
            
            console.log("Project uploaded and collection created: " + projectName);
            
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("Received Project: "+ projectName +  "<br/>");
            res.end();
        
        });
        }catch(err){
            console.log("Error recieving " + projectName);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("can't upload': "+ projectName +  "<br/>");
            res.end();
        }    
    });
}


exports.findAllProject = findAllProject;

exports.getAdjetivos = getAdjetivos;
exports.getModaGeneral = getModaGeneral;
exports.findByGenero = findByGenero;

exports.loadProject = loadProject;
exports.uploadProject = uploadProject;

exports.findAllPerception = findAllPerception;
exports.findById = findById;
exports.addPerception = addPerception;

exports.updateWine = updateWine;
exports.deleteWine = deleteWine;


