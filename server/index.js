var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
const cassandra = require('cassandra-driver');

app.use(cors())
app.use(bodyParser({ extended: false }))
app.use(bodyParser.json())

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'practica3'
});

client.connect(function (err, result) {
    console.log('conectado a cassandra')
})


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/operacionesCuentahabiente', function (req, res) {
    client.execute('select * from operaciones_cuentahabiente_debito where CUI_1 = ?', [req.query.cui]).then(
        result => {
            res.json(result.rows);
        }
    );
});


app.get('/listaDebitosInstitucion', function (req, res) {
    console.log(req.query.institucion)
    client.execute(`select blobAsText(textAsBlob('Debito')) as Tipo, Nombre1,Apellido1,CUI_1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,Nombre2,Apellido2,CUI_2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,Monto,Fecha 
    from operaciones_institucion_debito where InstitucionBancaria1 = ? order by fecha desc`, [req.query.institucion]).then(
        result => {
            res.json(result.rows);
        }
    );
});

app.get('/listaCreditosInstitucion', function (req, res) {
    console.log(req.query.institucion)
    client.execute(`select blobAsText(textAsBlob('Credito')) as Tipo, Nombre1,Apellido1,CUI_1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,Nombre2,Apellido2,CUI_2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,Monto,Fecha 
    from operaciones_institucion_credito where InstitucionBancaria2 = ? order by fecha desc`, [req.query.institucion]).then(
        result => {
            res.json(result.rows);
        }
    );
});

app.get('/totalDebitosInstitucion', function (req, res) {
    console.log(req.query.institucion)
    client.execute(`select blobAsText(textAsBlob('Debito')) as Tipo, SUM(MONTO) as Total
    from operaciones_institucion_debito where InstitucionBancaria1 =  ? order by fecha desc`, [req.query.institucion]).then(
        result => {
            res.json(result.rows);
        }
    );
});

app.get('/totalCreditosInstitucion', function (req, res) {
    console.log(req.query.institucion)
    client.execute(`select blobAsText(textAsBlob('Credito')) as Tipo, SUM(MONTO) as Total
    from operaciones_institucion_credito where InstitucionBancaria2 = ? order by fecha desc`, [req.query.institucion]).then(
        result => {
            res.json(result.rows);
        }
    );
});


app.get('/cuentahabientes', function (req, res) {
    client.execute('SELECT * FROM cuentahabiente').then(
        result => {
            res.json(result.rows);
        }
    );
});

app.get('/cuentahabiente', function (req, res) {
    client.execute(`SELECT * FROM cuentahabiente where CUI = ${req.query.cui}`).then(
        result => {
            res.json(result.rows);
        }
    );
});

app.get('/institucionesBancarias', function (req, res) {
    client.execute('SELECT * FROM institucion_bancaria').then(
        result => {
            res.json(result.rows);
        }
    );
});


app.get('/debitoCuentaHabiente', function (req, res) {
    console.log(req.query.institucion)
    client.execute(`select blobAsText(textAsBlob('Debito')) as Tipo ,Nombre1,Apellido1,CUI_1,Email1,FechaRegistro1,Genero1,InstitucionBancaria1,
    Abreviatura1,TipoCuenta1,SaldoInicial1,Nombre2,Apellido2,CUI_2,Email2,
    FechaRegistro2,Genero2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,SaldoInicial2,Monto,Fecha 
    from operaciones_cuentahabiente_debito where CUI_1 = '${req.query.cui}' and fecha >= '${req.query.fecha1}' and fecha <= '${req.query.fecha2}'`).then(
        result => {
            res.json(result.rows);
        }
    );
});

app.get('/creditoCuentaHabiente', function (req, res) {
    console.log(req.query.institucion)
    client.execute(`select blobAsText(textAsBlob('Credito')) as Tipo,Nombre1,Apellido1,CUI_1,Email1,FechaRegistro1,Genero1,InstitucionBancaria1,
    Abreviatura1,TipoCuenta1,SaldoInicial1,Nombre2,Apellido2,CUI_2,Email2,
    FechaRegistro2,Genero2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,SaldoInicial2,Monto,Fecha 
    from operaciones_cuentahabiente_credito where CUI_2  = '${req.query.cui}' and fecha >= '${req.query.fecha1}' and fecha <= '${req.query.fecha2}'`).then(
        result => {
            res.json(result.rows);
        }
    );
});

app.post('/registrarOperacionCuentahabienteDebito', function (req, res) {
    let total = 0;
    let { Nombre1, Apellido1, CUI_1, Email1, FechaRegistro1, Genero1, InstitucionBancaria1, Abreviatura1, TipoCuenta1, SaldoInicial1, Nombre2, Apellido2,
        CUI_2, Email2, FechaRegistro2, Genero2, InstitucionBancaria2, Abreviatura2, TipoCuenta2, SaldoInicial2, Monto, Fecha } = req.body;

    // Guardar Debito de el cuentahabiente

    const queries = [
        {
            query: `INSERT INTO operaciones_cuentahabiente_debito(Nombre1,Apellido1,CUI_1,Email1,FechaRegistro1,Genero1,
            InstitucionBancaria1,Abreviatura1,TipoCuenta1,SaldoInicial1,Nombre2,Apellido2,CUI_2,Email2,FechaRegistro2,Genero2,InstitucionBancaria2,
            Abreviatura2,TipoCuenta2,SaldoInicial2,Monto,Fecha) VALUES('${Nombre1}','${Apellido1}','${CUI_1}','${Email1}','${FechaRegistro1}','${Genero1}','${InstitucionBancaria1}',
            '${Abreviatura1}','${TipoCuenta1}',${SaldoInicial1},'${Nombre2}','${Apellido2}','${CUI_2}','${Email2}','${FechaRegistro2}',
            '${Genero2}','${InstitucionBancaria2}','${Abreviatura2}','${TipoCuenta2}',${SaldoInicial2},${Monto},dateof(now()))`, params: []
        },
        {
            query: `INSERT INTO operaciones_cuentahabiente_credito(Nombre1,Apellido1,CUI_1,Email1,FechaRegistro1,Genero1,
                InstitucionBancaria1,Abreviatura1,TipoCuenta1,SaldoInicial1,Nombre2,Apellido2,CUI_2,Email2,FechaRegistro2,Genero2,InstitucionBancaria2,
                Abreviatura2,TipoCuenta2,SaldoInicial2,Monto,Fecha) VALUES('${Nombre1}','${Apellido1}','${CUI_1}','${Email1}','${FechaRegistro1}','${Genero1}','${InstitucionBancaria1}',
                '${Abreviatura1}','${TipoCuenta1}',${SaldoInicial1},'${Nombre2}','${Apellido2}','${CUI_2}','${Email2}','${FechaRegistro2}',
                '${Genero2}','${InstitucionBancaria2}','${Abreviatura2}','${TipoCuenta2}',${SaldoInicial2},${Monto},dateof(now()))`, params: []
        },
        {
            query: `INSERT INTO operaciones_institucion_credito(Nombre1,Apellido1,CUI_1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,Nombre2,
                Apellido2,CUI_2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,Monto,Fecha) VALUES('${Nombre1}','${Apellido1}','${CUI_1}',
                '${InstitucionBancaria1}','${Abreviatura1}','${TipoCuenta1}','${Nombre2}','${Apellido2}','${CUI_2}','${InstitucionBancaria2}'
                ,'${Abreviatura2}','${TipoCuenta2}',${Monto},dateof(now()))`, params: []
        },
        {
            query: `INSERT INTO operaciones_institucion_debito(Nombre1,Apellido1,CUI_1,InstitucionBancaria1,Abreviatura1,TipoCuenta1,Nombre2,
                Apellido2,CUI_2,InstitucionBancaria2,Abreviatura2,TipoCuenta2,Monto,Fecha) VALUES('${Nombre1}','${Apellido1}','${CUI_1}',
                '${InstitucionBancaria1}','${Abreviatura1}','${TipoCuenta1}','${Nombre2}','${Apellido2}','${CUI_2}','${InstitucionBancaria2}'
                ,'${Abreviatura2}','${TipoCuenta2}',${Monto},dateof(now()))`, params: []
        },
        {
            query: `INSERT INTO cuentahabiente(Nombre,Apellido,CUI,Email,FechaRegistro,Genero,InstitucionBancaria,TipoCuenta,SaldoInicial) 
            VALUES('${Nombre1}','${Apellido1}','${CUI_1}','${Email1}','${FechaRegistro1}','${Genero1}','${InstitucionBancaria1}','${TipoCuenta1}',${SaldoInicial1})`, params: []
        },
        {
            query: `INSERT INTO cuentahabiente(Nombre,Apellido,CUI,Email,FechaRegistro,Genero,InstitucionBancaria,TipoCuenta,SaldoInicial) 
            VALUES('${Nombre2}','${Apellido2}','${CUI_2}','${Email2}','${FechaRegistro2}','${Genero2}','${InstitucionBancaria2}','${TipoCuenta2}',${SaldoInicial2})`, params: []
        }
    ]

    client.batch(queries, { prepare: true })
        .then(function () {
            console.log('OK')
            res.json({ mensaje: 'OK' })
        })
        .catch(function (err) {
            console.log(err)
            res.json({ mensaje: err })
        });



});




app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
