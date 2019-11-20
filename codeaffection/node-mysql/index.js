const mysql = require('mysql');

// Start the express server
const express = require('express');

var app = express();
 //const bodyParser = require('body-parser');

 //app.use(bodyParser.json);

const mysqlconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'EmpDB',
    multipleStatements: true
});

//GEt All Employee
app.get('/emp',async(req, res)=>{
    console.log('/emp');
    // res.send('browser test');
    mysqlconnection.query('SELECT * FROM Employee', (err, rows, feilds)=>{
        if(!err)
        //res.send(rows);
        res.send(rows);
        else
        console.log(err);
    }) 
});


//Get Employee by ID
app.get('/emp/:id', async(req, res)=>{
    mysqlconnection.query('SELECT * FROM Employee Where EmpID=?',[req.params.id], (err, rows, fields)=>{
        if(err) throw err;
        res.send(rows[0])
    })
})

//Delete Emplyee By ID
app.delete('/emp/:id', async(req, res)=>{
    mysqlconnection.query('DELETE FROM Employee Where EmpID=?',[req.params.id], (err, rows, fields)=>{
        if(err) throw err;
        res.send('Deleted Susscessfully..')
    })
})

// Insert or Update an Employee
app.post('/emp', async(req, res)=>{
    let newemp = req.body;
    console.log(req.body);
    console.log(newemp);
    var sql = "SET @EmpID = ?; SET @Name=?; SET @EmpCode=?; SET @Salary=?; CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlconnection.query(sql,[newemp.EmpID, newemp.Name, newemp.EmpCode, newemp.Salary],(err, rows, fields)=>{
        if(err) throw err;
        res.send(rows);
    })
})


app.listen(3001,() => {console.log('Express server is running at port ...3001')});
