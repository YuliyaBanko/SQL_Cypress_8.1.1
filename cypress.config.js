const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    db: {
      host: "sql7.freesqldatabase.com",
      user: "sql7747303", 
      password: "wSEf7IJPPm", 
      database: "sql7747303", 
      port: 3306 
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
     on("task", {
      queryDb: (query)=>{
       return queryTestDb(query,config)

      }
     })
    },
  },
});

const mysql = require("mysql");
function queryTestDb(query,config){
  const connection = mysql.createConnection(config.env.db)
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query,(error, results) => {
      if (error) reject(error);
      else{
        connection.end();
        return resolve (results);
      }
    })
  })
}

