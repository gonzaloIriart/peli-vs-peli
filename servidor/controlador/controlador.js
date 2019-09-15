var connection = require('../lib/conexiondb');

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
       console.log(result)
       let respuesta = {
           competencia : result[0].nombre,
           peliculas : result
       }
       console.log(respuesta)
      res.send(JSON.stringify(respuesta));
    })
}

function agregarVoto(req,res){
    var id_competencia = req.params.idCompetencia;
    var id_pelicula = data.idPelicula;
    connection.query(`UPDATE voto SET cantidad = cantidad * 1.25
     WHERE id_pelicula = ${id_pelicula} AND id_competencia = ${id_competencia};`, function (err, result, fields) {}) 
}

module.exports= {
    competencias: competencias,
    peliculasCompetencia: peliculasCompetencia,
    agregarVoto: agregarVoto
  };