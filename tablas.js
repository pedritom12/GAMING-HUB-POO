const conexion = require("./db");

/// tabla de juego
const sql_juego =`
    CREATE TABLE IF NOT EXISTS juegos (
        id_juego INT AUTO_INCREMENT PRIMARY,
        nombre VARCHAR(40) NOT null,
        descripcion VARCHAR(240) NOT null,
        fk_cat INT,
        fk_reseña INT,
        FOREIGN KEY (fk_cat) REFERENCE categoria(id_cat),
        FOREIGN KEY (fk_reseña) REFERNCE reseña(id_reseña) 
)
`;     
/// esto es solo para decirme por terminal si la creacion de la tabla salio bien
//  y si no es asi que salio mal
 db.query(sql_juego, (err,resultado) => {
    if (err) { console.log("error al crear la tabla juego:", err);
        return;
    } 
    console.log("tabla juego creada correctamente");
 })

 /// tabla de categoria

 const sql_categoria =`
    CREATE TABLE IF NOT EXISTS juegos (
        id_cat INT AUTO_INCREMENT PRIMARY,
        nombre VARCHAR(40) NOT null,
    
)
`; 
// revicion de error
 db.query(sql_categoria, (err,resultado) => {
    if (err) { console.log("error al crear la tabla categoria:", err);
        return;
    } 
    console.log("tabla categoria creada correctamente");
 })

 /// tabla de reseña

 const sql_reseña =`
    CREATE TABLE IF NOT EXISTS juegos (
        id_reeseña INT AUTO_INCREMENT PRIMARY,
        calificacon INT NOT NULL CHECK(calificacion BETWEEN 1 AND 5),
        comentario TEXT,
        fk_cuenta INT NOT NULL,
        fk_juego INT NOT NULL,
        FOREIGNT KEY (fk_cuenta) REFERENCE cuenta(id_cuenta),
        FOREING KEY (fk_juego) REFERNCE juego(id_juego)
)
`;
// revicion de error
 db.query(sql_reseña, (err,resultado) => {
    if (err) { console.log("error al crear la tabla reseña:", err);
        return;
    } 
    console.log("tabla reseña creada correctamente");
 })

  /// tabla de cuenta

 const sql_cuenta =`
    CREATE TABLE IF NOT EXISTS juegos (
        id_cuenta INT AUTO_INCREMENT PRIMARY,
        nombre VARCHAR(20) NOT NULL,
        gamil TEXT NOT NULL UNIQUE,
        contraseña TEXT NOT NULL UNIQUE,
        fk_bibloteca INT NOT NULL,
        fk_mi_juego INT NOT NULL,
        FOREIGNT KEY (fk_bibloteca) REFERENCE bibloteca(id_biblo),
        FOREIGNT KEY (fk_mi_juego) REFERENCE mi_juego(id_mijuego)


)
`;
// revicion de error
 db.query(sql_cuenta, (err,resultado) => {
    if (err) { console.log("error al crear la tabla cuenta:", err);
        return;
    } 
    console.log("tabla cuenta creada correctamente");
 })

 /// tabla de bibloteca

 const sql_biblo =`
    CREATE TABLE IF NOT EXISTS juegos (
        id_biblo INT AUTO_INCREMENT PRIMARY,
        fk_juego INT NOT NULL,
        FOREIGNT KEY (fk_juego) REFERENCE juego(id_juego),
        


)
`;
// revicion de error
 db.query(sql_cuenta, (err,resultado) => {
    if (err) { console.log("error al crear la tabla cuenta:", err);
        return;
    } 
    console.log("tabla cuenta creada correctamente");
 })

 /// tabla de mi_juego

 const sql_mi_juego =`
    CREATE TABLE IF NOT EXISTS juegos (
        id_mijuego INT AUTO_INCREMENT PRIMARY,
        nombre_zip TEXT NOT NULL,
        ruta_zip TEXT NOT NULL,
        ruta_extraida TEXT NOT NULL,
        archivo_inicio TEXT NOT NULL,
        estado VARCHAR(10) CHECK(estado IN ("pendiente","procesando","completado","error") )
        FOREIGNT KEY (fk_cuenta) REFERENCE cuenta(id_mijuego)


)
`;
// revicion de error
 db.query(sql_mi_juego, (err,resultado) => {
    if (err) { console.log("error al crear la tabla mi_juego:", err);
        return;
    } 
    console.log("tabla mi juego creada correctamente");
 })

 /// funciones ///

 // JUEGO

 function agregarCuenta(nombre,gmail,contraseña){
    const sql= `
            INSER INTO cuenta (nombre,gmail,contraseña) VALUES (?, ?, ?)
    `;
    db.query(sql, [nombre, gmail, contraseña],
        (err, resultado) => {
            if (err) { console.log ("error al agregar la cuenta:", err);
                return ;
            }
            console.log("cuenta agregada correctamente")
        }
    
    )
 };

/// CATEGORIA

 function eliminarCuenta(id){
    const sql = `
        DELETE FROM cuenta 
        WHERE id_cuenta= ?
    `;
        db.query(sql, [id], (err,resultado) => {
            if (err){console.log("error al eliminar la cuenta:", err);
                return;
            }
            if (resultado.affectedRows === 0){ console.log("no se encontro esa cuenta");
                return;
            }
            console.log("cuenta eliminada");
        })
 }

/// RESEÑAS

function listarCuenta(){
    const sql= `SELECT *
    FROM cuenta`;

    db.query(sql,(err, resultado) => {
        if (err){console.log("error al listar cuentas:", err);
            return;
        }
        console.log("resultados");
    })

 }
