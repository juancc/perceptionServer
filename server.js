var express = require('express'),
    handler = require('./routes/requestHandlers');

var app = express();

app.configure(function(){
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use("/projects", express.static(__dirname + "/media/projects"));
});

app.get('/listProjects', handler.findAllProject);//lista los achivos de la carpeta /projects
app.get('/listPerceptions/:project', handler.findAllPerception);// lista todas las percepciones de un projecto
app.get('/loadProject', handler.loadProject);
app.post('/uploadProject', handler.uploadProject);

app.post('/postPerception/:project', handler.addPerception);
//app.get('/getPerception/:project/:id', handler.findById);
//app.put('/project/:id', projects.updateWine);
//app.delete('/project/:id', projects.deleteWine);



app.listen(3000);
console.log('Perception Server running  at 3000, 127.0.0.1 ');
