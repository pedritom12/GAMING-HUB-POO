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

 /// CUENTA
// esta es la funcion agregar cuenta
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

// esta es la funcion eliminar cuenta
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
// esta es la funcion listar cuenta
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

 /// CATEGORIA
// esta es la funcion agregar categoria
 function agregarCategoria(nombre){
    const sql= `
            INSER INTO categoria (nombre) VALUES (?)
    `;
    db.query(sql, [nombre],
        (err, resultado) => {
            if (err) { console.log ("error al agregar la categoria:", err);
                return ;
            }
            console.log("categoria agregada correctamente")
        }
    
    )
 };

// esta es la funcion eliminar categoria
 function eliminarCategoria(id){
    const sql = `
        DELETE FROM categoria 
        WHERE id_categoria= ?
    `;
        db.query(sql, [id], (err,resultado) => {
            if (err){console.log("error al eliminar la categoria:", err);
                return;
            }
            if (resultado.affectedRows === 0){ console.log("no se encontro esa categoria");
                return;
            }
            console.log("categoria eliminada");
        })
 }
// esta es la funcion listar categoria
function listarCategoria(){
    const sql= `SELECT *
    FROM categoria`;

    db.query(sql,(err, resultado) => {
        if (err){console.log("error al listar categorias:", err);
            return;
        }
        console.log("resultados");
    })

 }
/// RESEÑA
// esta es la funcion agregar reseña
 function agregarReseña(calificacion,comentario,cuenta,juego){
    const sql= `
            INSER INTO reseña (calificacion,comentario,cuenta,juego) VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [calificacion,comentario,cuenta,juego],
        (err, resultado) => {
            if (err) { console.log ("error al agregar la reseña:", err);
                return ;
            }
            console.log("reseña agregada correctamente")
        }
    
    )
 };

// esta es la funcion eliminar reseña
 function eliminarReseña(id){
    const sql = `
        DELETE FROM reseña 
        WHERE id_reseña= ?
    `;
        db.query(sql, [id], (err,resultado) => {
            if (err){console.log("error al eliminar la reseña:", err);
                return;
            }
            if (resultado.affectedRows === 0){ console.log("no se encontro esa reseña");
                return;
            }
            console.log("reseña eliminada");
        })
 }
// esta es la funcion listar reseña
function listarReseña(){
    const sql= `SELECT *
    FROM reseña`;

    db.query(sql,(err, resultado) => {
        if (err){console.log("error al listar reseñas:", err);
            return;
        }
        console.log("resultados");
    })

 }

/// BIBLIOTECA
// esta es la funcion agregar biblioteca
 function agregarBiblioteca(biblio,juego){
    const sql= `
            INSER INTO bliblioteca (biblio,juego) VALUES (?, ?)
    `;
    db.query(sql, [nombre],
        (err, resultado) => {
            if (err) { console.log ("error al agregar la biblioteca:", err);
                return ;
            }
            console.log("biblioteca agregada correctamente")
        }
    
    )
 };

// esta es la funcion eliminar biblioteca
 function eliminarCategoria(id){
    const sql = `
        DELETE FROM biblioteca 
        WHERE id_biblioteca= ?
    `;
        db.query(sql, [id], (err,resultado) => {
            if (err){console.log("error al eliminar la biblioteca:", err);
                return;
            }
            if (resultado.affectedRows === 0){ console.log("no se encontro esa biblioteca");
                return;
            }
            console.log("biblioteca eliminada");
        })
 }
// esta es la funcion listar biblioteca
function listarBiblioteca(){
    const sql= `SELECT *
    FROM biblioteca`;

    db.query(sql,(err, resultado) => {
        if (err){console.log("error al listar bibliotecas:", err);
            return;
        }
        console.log("resultados");
    })

 }

/// MI_JUEGO
// esta es la funcion agregar tabla de mi juego
 function agregarMi_juego(nombre_zip, ruta_zip, ruta_extraida, archivo){
    const sql= `
            INSER INTO Mi_juego (nombre_zip, ruta_zip, ruta_extraida, archivo) VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [nombre_zip, ruta_zip, ruta_extraida, archivo],
        (err, resultado) => {
            if (err) { console.log ("error al agregar la categoria:", err);
                return ;
            }
            console.log("categoria agregada correctamente")
        }
    
    )
 };

// esta es la funcion eliminar Mi_juego
 function eliminarMi_juego(id){
    const sql = `
        DELETE FROM Mi_juego 
        WHERE id_mi_juego= ?
    `;
        db.query(sql, [id], (err,resultado) => {
            if (err){console.log("error al eliminar Mi_juego:", err);
                return;
            }
            if (resultado.affectedRows === 0){ console.log("no se encontro mi_juego");
                return;
            }
            console.log("mi_juego eliminado");
        })
 }
// esta es la funcion listar Mi_juego
function listarMi_juego(){
    const sql= `SELECT *
    FROM mi_juego`;

    db.query(sql,(err, resultado) => {
        if (err){console.log("error al listar mi_juego:", err);
            return;
        }
        console.log("resultados");
    })

 }
