var express = require("express");
var app = express();
var mySQLDAO = require('./mySQLDAO.js');
var bodyParser = require("body-parser");
app.set('view engine', 'ejs')
var mongoDAO = require('./mongoDAO');

app.use(bodyParser.urlencoded({extended:false}))



app.get('/', (req, res)=>{
  // goes to the html page
   
  res.sendFile(__dirname+ "/views/homePage.html");



});

app.get('/listStudents', (req, res)=>{
  
    
   
    mySQLDAO.getStudents()
    .then((result)=>{
       
        res.render('studentList',{students:result})
    })
    .catch((error)=>{
        res.send(error)
    })
    
});

app.get('/listModules', (req, res)=>{

    mySQLDAO.getModules()
    .then((result)=>{
       
        res.render('modulesList',{modules:result})
    })
    .catch((error)=>{
        res.send(error)
    })
  
   
   
});


app.get('/addStudent', (req, res)=>{
  
   res.render("addStudent")
   res.render('index.ejs', { link: "http://localhost:3000/addStudent" })


});

// mongodb

app.get('/listLecturers', (req, res)=>{
 
mongoDAO.getLecturers()
.then((documents)=>{

    res.render('lecturerList',{lecturer:documents})

})
.catch((error)=>{

     res.send(error)

})

});

app.get('/addLecturer', (req, res)=>{

    res.render("addLecturer")

})

app.post('/addLecturer', (req,res)=>{
 
    mongoDAO.addLecturer(req.body._id, req.body.name, req.body.dept)
    .then((result)=>{
        res.redirect("/listLecturers")
    })
    .catch((error)=>{
       res.send("Not ok")

    })
})




app.listen(3000, ()=>{
  console.log("Listening to port 3000")


});