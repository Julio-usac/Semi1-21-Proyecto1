var bodyParser = require('body-parser');
var express = require('express');
var AWS = require('aws-sdk');
var cors = require('cors');
var uuid = require('uuid');

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

//--------------------------------------------------Prueba---------------------------------------

app.get('/', function (req, res) {

  res.json({ mensaje: 'Hola semi 1 - A'})

});

app.post('/subirfoto', function (req, res) {

    var id = req.body.id;
    var foto = req.body.foto;     //base64
    //carpeta y nombre que quieran darle a la imagen
    var nombrei = "fotos/" + id + ".png";
  
    //se convierte la base64 a bytes
    let buff = new Buffer.from(foto, 'base64');
  
    const params = {
      Bucket: "archivos-21-p1",
      Key: nombrei,
      Body: buff,
      ContentType: "image",
      ACL: 'public-read'
    };
  
    const putResult = s3.putObject(params).promise();
    res.json({ mensaje: putResult })
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