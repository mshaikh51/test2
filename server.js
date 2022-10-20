/*I acknowledge the College’s academic integrity policy – and my own integrity- remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates… even when no one is watching. I declare I will not break that trust.
Name- Mohammed Mahi Shaikh
Student Number- 147891212
*/
var express = require("express");
var app = express();
var data_prep = require("./data_prep.js");
var path=require('path');
var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() 
{
    console.log("Express http server listening on " + HTTP_PORT);
}

app.get("/",(req,res)=>{
    let resText = "<h2>Declaration (text size in heading 2): </h2> ";
    resText += "<p> The rest text is displayed in paragraph as shown in screenshot. </p>";
    resText += " <p> I acknowledge the College’s academic integrity policy – and my own integrity ";
    resText += "– remain in effect whether my work is done remotely or onsite.";
    resText += " Any test or assignment is an act of trust between me and my instructor, ";
    resText += " and especially with my classmates… even when no one is watching.";
    resText += " I declare I will not break that trust. </p>";
    resText += "<p>Name: <mark> <b> Mohammed Mahi Shaikh </b> </mark> </p>";
    resText += "<p>Student Number: <mark><b> 147891212 </b> </mark> </p>";
    
    resText += `    <ul>
    <li><a href = "/CPA">CPA Students </a></li>
    <li><a href = "/highGPA">Highest GPA </a></li>
    <li><a href = "/allStudents">All Students </a></li>
    <li><a href = "/addStudent">Add a New Student</a></li>
</ul>`
    res.send(resText);
});

app.get("/allStudents",(req,res)=>{
    data_prep.allStudents().then((data)=>{
        res.json(data);
    })

})

app.get("/addStudent",(req,res)=>{
    res.sendFile(path.join(__dirname,"./test3_views/addStudent.html"));
})
app.get("/addStudent",(req,res)=>{
    data_prep.addStudent(req.body).then((data)=>{
        let resText = `<h2 style="color: red;">The New Student Information: </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> `;
        resText+='<a href = "/allStudents">All Students </a><br>';
        resText+='<a href = "/">Go Home</a>';
        res.send(resText);
    })
})
app.get("/student/:studId",(req,res)=>{
    data_prep.getStudent(req.params.studId).then((data)=>{
        let resText = `<h2 style="color: red;">This Student Information: </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> `;
        resText+='<a href = "/allStudents">All Students </a><br>';
        resText+='<a href = "/">Go Home</a>';
        res.send(resText);
    })
});


app.get("/CPA", (req,res)=>{
    data_prep.cpa().then((data)=>{
        res.json(data);
    }).catch((reason)=>{
        res.json({message:reason});
    });
});

app.get("/highGPA", (req, res)=>{
    data_prep.highGPA().then((data)=>{
        let resText = `<h2> Highest GPA: </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> `;
        res.send(resText);
    });
});


app.get("*", (req, res)=>{
    res.status(404).send("Error 404: page not found.")
})

data_prep.prep().then((data)=>{
    //console.log(data);
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err)=>{
    console.log(err);
});