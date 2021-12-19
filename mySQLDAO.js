var mysql = require('promise-mysql');

var pool

mysql.createPool({
     connectionLimit : 3,
     host            : 'localhost',
     user            : 'root',
     password        : '',
     database        : 'collegedb'

})
.then((result)=>{
    pool =result
})
.catch((error)=>{
    console.log(error)
})

var getStudents= function(){
  return new Promise((resolve, reject)=>{
  pool.query('select * from student')
  .then((result)=>{
      
      resolve(result)
  })
  .catch((error)=>{
      
      reject(error)
  })

 })

}

var getModules= function(){
    return new Promise((resolve, reject)=>{
    pool.query('select * from module')
    .then((result)=>{
        
        resolve(result)
    })
    .catch((error)=>{
        
        reject(error)
    })
  
   })
  
}




module.exports = {getStudents, getModules}