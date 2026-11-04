require("dotenv").config();
const mysql = require("mysql2");

const conexion= mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWARD

});

conexion.connect((error) => {
    if (error) { console.log("error al conectar", error.message);
        return;
    }
    console.log("conexion exito");
    conexion.query("CREATE DATABASE gamingdb", (error) => {
        if (error) { 
            console.log("error al crear la base de datos", error.message);
        
    
        } else {console.log("se creo la base de datos");}
        conexion.end();
    });
}
);

module.exports = conexion;