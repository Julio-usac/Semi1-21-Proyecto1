var bodyParser = require('body-parser');
var express = require('express');
var AWS = require('aws-sdk');
var cors = require('cors');
var uuid = require('uuid');
const bcrypt = require('bcrypt');
var port = 9000;

var app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.listen(port);
console.log('Listening on port', port);

const aws_keys = require('./credsS3');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };

const s3 = new AWS.S3(aws_keys.s3);

var mysql =require('mysql');
var connection = mysql.createConnection({
  host: 'pruebadb.clazasnbabej.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'admin1234',
  database: 'semi',
  port: 3306
});

//--------------------------------------------------Prueba---------------------------------------

app.get('/', function (req, res) {
  /*
  const hash = bcrypt.hashSync("1234", 1);
  const lol= bcrypt.compareSync("12345","$2b$04$DqYMNOxq0xY/NNXwGmYkF.Pe9rYA3PiKBU/q.dr53mYvsLrcsvfbS")
  */
  res.json({ mensaje:"funciono"})

});

app.post('/iniciarsesion', function (req, res) {

  var auth = req.body.auth;
  var pass = req.body.pass;

  var sql="SELECT pass, foto, nombre, id_usuario FROM usuario WHERE (nombre='"+auth+"' or correo='"+auth+"');"
  
  connection.query(sql, async function(error,result){
    if(error || result.length==0){
      console.log("Error al conectar");
      res.json({mensaje:"el usuario no existe"});
    }else{
      console.log(JSON.stringify(result));
      const verificacion= bcrypt.compareSync(pass,result[0].pass)
      if (verificacion==true){

        res.json({id:result[0].id_usuario, nombre:result[0].nombre, foto:result[0].foto })
 
      }else{
        res.json({mensaje: "Contraseña no coincide"})
      }
    }
  });
});

//Subir archivo
/*
{
"idarchivo":"nombre archivo.png",
"archivo":"base64",
"idusuario":"id usuario",
"tipoar":"publico/privado",
"tipo":".pdf/.txt/etc"
}

*/
app.post('/subirarchivo', function (req, res) {

  var id = uuid.v4() + req.body.idarchivo;
  var archivo = req.body.archivo;   
  var nombrei = "fotos/" + id;
  let buff = new Buffer.from(archivo, 'base64');

  var sql="INSERT INTO archivo(id_archivo,nombre,tipo,id_usu) VALUES ('"+req.body.idarchivo+"','"+id+"','"+req.body.tipoar+"',"+req.body.idusuario+");"
  
  connection.query(sql, async function(error,result){
    if(error){
      console.log("Error al conectar");
    }else{
      console.log(JSON.stringify(result));
    }
  });

  if (req.body.tipo==".jpg" || req.body.tipo==".jpeg" || req.body.tipo==".png"){
    const params = {
      Bucket: "archivos-21-p1",
      Key: nombrei,
      Body: buff,
      ContentType: "image",
      ACL: 'public-read'
    };
    const putResult = s3.putObject(params).promise();
    res.json({ mensaje: "listo" })
  }else if (req.body.tipo==".pdf"){
    const params = {
      Bucket: "archivos-21-p1",
      Key: nombrei,
      Body: buff,
      ContentType: "application/pdf",
      ACL: 'public-read'
    };
    const putResult = s3.putObject(params).promise();
    res.json({ mensaje: "listo" })
  }else if(req.body.tipo==".txt"){
    const params = {
      Bucket: "archivos-21-p1",
      Key: nombrei,
      Body: buff,
      ContentType: "text/plain",
      ACL: 'public-read'
    };
    const putResult = s3.putObject(params).promise();
    res.json({ mensaje: "listo" })
  }else{
    res.json({ mensaje: "error" })
  }
});
//Crear usuario

/*
{
"idimagen":"nombre imagen",
"foto":"base64",
"nombre":"nombre del usuario",
"correo":"",
"pass":""
}
*/

app.post('/crearusuario', function (req, res) {
   
    var id =  uuid.v4() + req.body.idimagen ;
    var foto = req.body.foto;     //base64
    var nombrei = "fotos/" + id;
    let buff = new Buffer.from(foto, 'base64');
  
    const params = {
      Bucket: "archivos-21-p1",
      Key: nombrei,
      Body: buff,
      ContentType: "image",
      ACL: 'public-read'
    };

    const hash = bcrypt.hashSync(req.body.pass, 1);
    const putResult = s3.putObject(params).promise();
    
    var sql="INSERT INTO usuario(nombre,correo,foto,pass) VALUES ('"+req.body.nombre+"','"+req.body.correo+"','"+id+"','"+hash+"');"
    
    connection.query(sql,async function(error,result){
      if(error){
        console.log("Error al conectar");
        res.json({ mensaje: "Error"})
      }else{
        console.log(JSON.stringify(result));
        res.json({ mensaje: "Registrado"})
      }
    });
  });

//NO ES NECESARIO PARA SU PROYECTO PERO PUEDEN USARLO obtener objeto en s3
app.post('/obtenerfoto', function (req, res) {
    var id = req.body.id;
    //direcccion donde esta el archivo a obtener
    var nombrei = "fotos/" + id + ".png";
    
    var getParams = {
      Bucket: 'archivos-21-p1',
      Key: nombrei
    }

    s3.getObject(getParams, function (err, data) {
      if (err)
        res.json({ mensaje: "error" })
      //de bytes a base64
      var dataBase64 = Buffer.from(data.Body).toString('base64');
      res.json({ mensaje: dataBase64 })
  
    });
  });