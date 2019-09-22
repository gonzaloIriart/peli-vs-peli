var connection = require('../lib/conexiondb');


/*INSERT INTO voto (id_pelicula,cantidad_votos) 
SELECT p.id, 0 
FROM pelicula p    
WHERE  
LIMIT 10
 */

function actores(req,res){
    connection.query("SELECT * FROM actor", function (err, result, fields) {
        if (err) {
            console.log(err)
            throw err;
       }   
      res.send(result);
    })
}

function generos(req,res){
    connection.query("SELECT * FROM genero", function (err, result, fields) {
        if (err) {
            console.log(err)
            throw err;
       }   
      res.send(result);
    })
}

function directores(req,res){
    connection.query("SELECT * FROM director", function (err, result, fields) {
        if (err) {
            console.log(err)
            throw err;
       }   
      res.send(result);
    })
}

function competencias(req, res){
    connection.query("SELECT * FROM competencia", function (err, result, fields) {
        if (err) {
            console.log(err)
            throw err;
       }   
      res.send(result);
    })
}

function peliculasCompetencia(req,res){
    var id = parseInt(req.params.id);
    connection.query(`SELECT p.id,p.poster,p.titulo,c.nombre FROM pelicula p    
    INNER JOIN voto v ON v.id_pelicula = p.id
    INNER JOIN competencia c ON c.id = v.id_competencia
    WHERE c.id = ${id}
    ORDER BY RAND() LIMIT 2`, function (err, result, fields) {
        if (err) {
            console.log(err)
            throw err;
       }   
       if(result.length === 0){
           return res.status(404).json("No existe la competencia")
       }
       
       let respuesta = {
           competencia : result[0].nombre,
           peliculas : result
       }
       
      res.send(JSON.stringify(respuesta));
    })
}

function agregarVoto(req,res){
    var id_competencia = req.params.idCompetencia;
    var id_pelicula = req.body.idPelicula;
    connection.query(`UPDATE voto SET cantidad_votos = cantidad_votos + 1
     WHERE id_pelicula = ${id_pelicula} AND id_competencia = ${id_competencia};`, function (err, result, fields) {
        if (err) {
            console.log(err)
            throw err;
       }   
       console.log(result)
       res.json(result)
     }) 
}

function agregarCompetencia(req,res){
    let nombre = req.body;
    connection.query(`SELECT * FROM competencia WHERE nombre LIKE ${nombre}`, function(err, result,fields){
        if (err) {
            console.log(err);
            throw err;
        }
        if(result.length === 0){
            return res.status(422).json("La competencia ya existe")
        }else {
            connection.query(`POST INTO competencia (nombre) VALUE (${nombre})`)
            return res.status(200).json("La competencia fue agregada correctamente")
        }
    })
}

function resultadosCompetencia(req, res){
    var id = req.params.id;
    connection.query(`SELECT p.id as pelicula_id , p.poster,p.titulo, v.cantidad_votos as votos, c.nombre  FROM pelicula p    
    INNER JOIN voto v ON v.id_pelicula = p.id
    INNER JOIN competencia c ON c.id = v.id_competencia
    WHERE c.id = ${id}
    ORDER BY v.cantidad_votos DESC LIMIT 3`, function(err, result, fields){
        if(err){
            console.log(err);
            throw err;
        }
        let respuesta = {
            competencia : result[0].nombre,
            resultados : result
        }
        console.log(respuesta.resultados)
        res.send(respuesta);
    })
}

function eliminarVotos(req, res){
    let id = req.params.idCompetencia
    connection.query(`UPDATE voto
    SET cantidad_voto = 0
    WHERE competencia_id = ${id}`, function(err,result,fields){
        if(err){
            console.log(err);
            throw err;
        }
        console.log(result)
        res.send(respuesta);
    })
}

module.exports= {
    competencias: competencias,
    generos: generos,
    actores: actores,
    directores: directores,
    peliculasCompetencia: peliculasCompetencia,
    agregarVoto: agregarVoto,
    resultadosCompetencia: resultadosCompetencia,
    agregarCompetencia: agregarCompetencia,
    eliminarVotos: eliminarVotos
  };