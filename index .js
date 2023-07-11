const mysql = require('mysql');
const express = require('express');
const cors = require('cors')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'test'
  });
 

const app = express()
app.use(cors('*'))

    app.get("/:e_name",(request,response)=>{
    
        connection.query(`select * from Employee_Tb where e_name='${request.params.e_name}'`,(error,result)=>{
            if(error==null){
                var data =JSON.stringify(result)
                response.setHeader("Content-Type","application/json");
                response.write(data);
            }
            else{
                console.log(error);
                        response.setHeader("Content-Type","application/json");
                        response.write(error)
            }
            response.end();
        })
    })

    app.post("/",(request,response)=>{
        console.log(request.body.id)
        connection.query(`insert into Employee_Tb         values(${request.body.id},'${request.body.e_name}','${request.body.email}','${request.body.password}','${request.body.dname}','${request.body.doj}')`,(error,result)=>{
            if(error==null){
                var data =JSON.stringify(result)
                response.setHeader("Content-Type","application/json");
                response.write(data);
            }
            else{
                console.log(error);
                        response.setHeader("Content-Type","application/json");
                        response.write(error)
            }
            response.end();
        })
    })

    
    

app.listen(9999, '0.0.0.0', () => {
('server started on port 9999')
})
