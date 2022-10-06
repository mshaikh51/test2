var path = require("path");
var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
 var data=require("./data_prep");

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
app.use(express.static('public'));
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
});
app.get("/CPA", function(req,res){
    data.cpa().then(function(data){
        res.json(data);
    }).catch(function(err){
       res.json({message: err});
    });
});

app.get("/highGPA", function(req,res){
    data.highGPA().then(function(data){
        res.json(data);
    }).catch(function(err){
       res.json({message: err});
    });
});
app.get('*', function(req, res){
    res.send('Error 404: page not found', 404);
  });


data.prep().then(function() {
app.listen(HTTP_PORT, onHttpStart);    
}).catch(function(data){
//when data is not loaded at all
    console.log(data);
});


