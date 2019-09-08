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

module.exports= {
    competencias: competencias,
  };