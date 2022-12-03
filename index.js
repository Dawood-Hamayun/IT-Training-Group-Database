var db = require('./connection');
var express = require('express');
var app = express();


var bodyParser = require('body-parser');
const { createConnection } = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.sendFile(__dirname+'/register.html');
});



app.post('/', function(req, res){
    var name = req.body.name;
    var presence= req.body.presence;
    var years= req.body.years;
    var season= req.body.season;
    var emp_name = req.body.trainee_name;
    var emp_email = req.body.trainee_email;

    db.connect(function(error){
        if(error) throw error;

        var sql = "INSERT INTO course(name, presence, years, season ) VALUES (?, ?, ?, ?)";
        db.query(sql, [name,presence, years, season],(error, result) =>{
            if(error) throw error;
            res.send('Course registered successfully '+result.insertId);
        });
    });
});

//SET ROUTES
app.get('/course', function(req, res){
    db.connect(function(error){
        if (error) console.log(error);
        var sql ="SELECT * FROM course";
        db.query(sql, function(error,result){
            if (error) console.log(error);
            console.log(result);
            return res.render(__dirname+'/course',{course: result});
        });
    });
})
app.listen(30036);
