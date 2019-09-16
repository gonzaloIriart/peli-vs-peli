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
    //console.log(id_competencia, id_pelicula)
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

module.exports= {
    competencias: competencias,
    peliculasCompetencia: peliculasCompetencia,
    agregarVoto: agregarVoto
  };