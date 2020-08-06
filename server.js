console.log("Iniciando arquivo server.js");

//Iniciar o servidor express  
const express = require('express'); 
const app = express();  
//para remover: app.use(express.static('./'));
console.log("Express: OK");

//Definição da porta do servidor
//const http = require('http').Server(app);
const porta = process.env.PORT || 5500;
console.log("Servidor - Porta: " + porta)

//Importa o mongoose para criar os modelos de dados (Schemas) e conectar ao banco
const mongoose = require('mongoose')
mongoose.connect( process.env.mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true }, 
    (err, dbpbsc) => {console.log('MongoDB ok.')}
)

//Importa o MongoClient para realizar operações CRUD
const MongoClient = require('mongodb').MongoClient
//ObjectID ajuda no controle das chaves de identificação
const ObjectID = require('mongodb').ObjectID

//Importar o bodyParser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
console.log("BodyParser: OK.")

//Ativar o CORS
const cors = require('cors')
app.use(cors())
console.log("CORS: OK.")

//Prepara a sessão de cookies
const sessaoCookie = require('cookie-session');
app.use(sessaoCookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.chaveCookie]
}));
console.log("Sessão de Cookies: OK: ", process.env.chaveCookie);

//Importar o PassportJS para auxiliar no processo de login
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
//Importar as configurações do PassportJS
const passportSetup = require('./config/passport-setup');
console.log("Passport-Setup: OK.")

// Define a View Engine como EJS
app.set('view engine', 'ejs');
console.log("EJS engine view: OK.")

// Definição das variáveis para criar a DOM para o JQuery funcionar com o EJS
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

//Criar a rota principal
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

//Prepara as rotas de autenticação do login via FB, G+ ou LinkedIn
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

//Define a rota para realizar a operação de autenticação
const profileRoutes = require('./routes/profile-routes');
const { data, isArray } = require('jquery');
const { json } = require('body-parser');
app.use('/profile', profileRoutes);

// Carrega arquivos estáticos
app.use("/img", express.static('img')); 
app.use("/styles", express.static('styles')); 
app.use("/src", express.static('src'));

//Variáveis para operações CRUD 
var ordemAtiv = { ativDataFim: 1, ativStat: 1, ativIni: 1, ativDataCria: 1, ativNome: 1 }
var ordemIni = { iniDataFim: 1, iniStat: 1, iniObj: -1, iniDataCria: 1, iniNome: 1 }
var ordemObj = { objDataFim: 1, objStat: 1, objDataCria: 1, objNome: 1 }
var ordemRun = { DataCorridaOrigem: 1 }

var ordemKm1 = { Km1: 1 }
var ordemKm2 = { Km2: 1 }
var ordemKm3 = { Km3: 1 }
var ordemKm4 = { Km4: 1 }
var ordemKm5 = { Km5: 1 }
var ordemKm6 = { Km6: 1 }
var ordemKm7 = { Km7: 1 }
var ordemKm8 = { Km8: 1 }
var ordemKm9 = { Km9: 1 }
var ordemKm10 = { Km10: 1 }
var ordemKm11 = { Km11: 1 }
var ordemKm12 = { Km12: 1 }
var ordemKm13 = { Km13: 1 }
var ordemKm14 = { Km14: 1 }
var ordemKm15 = { Km15: 1 }
var ordemKm16 = { Km16: 1 }
var ordemKm17 = { Km17: 1 }
var ordemKm18 = { Km18: 1 }
var ordemKm19 = { Km19: 1 }
var ordemKm20 = { Km20: 1 }
var ordemKm21 = { Km21: 1 }

var ordemKmAcc1 = { KmAcc1: 1 }
var ordemKmAcc2 = { KmAcc2: 1 }
var ordemKmAcc3 = { KmAcc3: 1 }
var ordemKmAcc4 = { KmAcc4: 1 }
var ordemKmAcc5 = { KmAcc5: 1 }
var ordemKmAcc6 = { KmAcc6: 1 }
var ordemKmAcc7 = { KmAcc7: 1 }
var ordemKmAcc8 = { KmAcc8: 1 }
var ordemKmAcc9 = { KmAcc9: 1 }
var ordemKmAcc10 = { KmAcc10: 1 }
var ordemKmAcc11 = { KmAcc11: 1 }
var ordemKmAcc12 = { KmAcc12: 1 }
var ordemKmAcc13 = { KmAcc13: 1 }
var ordemKmAcc14 = { KmAcc14: 1 }
var ordemKmAcc15 = { KmAcc15: 1 }
var ordemKmAcc16 = { KmAcc16: 1 }
var ordemKmAcc17 = { KmAcc17: 1 }
var ordemKmAcc18 = { KmAcc18: 1 }
var ordemKmAcc19 = { KmAcc19: 1 }
var ordemKmAcc20 = { KmAcc20: 1 }
var ordemKmAcc21 = { KmAcc21: 1 }

//Ajustes de data
var dataagora = new Date()
var dataBR = ajustaDataHoraParaBrasil();
console.log("Data Agora(Brasil): ", dataBR)

// Definação das rotas GET
app.get('/commits/', (req, res) => {res.render('commits', { user: req.user } ) } );
app.get('/plan/', (req, res) => { res.render('planHome', { user: req.user } ) } );
app.get('/ativ/', (req, res) => { res.render('atividades', { user: req.user } ) } );
app.get('/ativ/nova', (req, res) => { res.render('novaAtividade', { user: req.user } ) } );
app.get('/ini/', (req, res) => { res.render('iniciativas', { user: req.user } ) } );
app.get('/ini/nova', (req, res) => { res.render('novaIniciativa', { user: req.user } ) } );
app.get('/obj/', (req, res) => { res.render('objetivos', { user: req.user } ) } );
app.get('/obj/nova', (req, res) => { res.render('novoObjetivo', { user: req.user } ) } );
app.get('/alim/', (req, res) => { res.render('alimHome', { user: req.user } ) } );
app.get('/gym/', (req, res) => { res.render('gymHome', { user: req.user } ) } );
app.get('/run/', (req, res) => { res.render('runHome', { user: req.user } ) } );
app.get('/run/nova', (req, res) => { res.render('novaCorrida', { user: req.user } ) } );
app.get('/run/best', (req, res) => { res.render('recordesCorridas', { user: req.user } ) } );
app.get('/run/lista', (req, res) => { res.render('corridas', { user: req.user } ) } );
app.get('/corridas', (req, res) => {
    var busca = { $and: [ {userID: ObjectID(req.user._id)} /*, { ativStat: { $not: { $regex: "^3 - Concluído.*" } } }*/ ] }
    dbModelRun.find(busca, (err, corridas) => {
        if (err) throw err
        res.send(corridas)    
    }).sort(ordemRun) 
})
app.get('/atividades', (req, res) => {
    var busca = { $and: [ {userID: ObjectID(req.user._id)} /*, { ativStat: { $not: { $regex: "^3 - Concluído.*" } } }*/ ] }
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv) 
})
app.get('/iniciativas', (req, res) => {
    var busca = { userID: ObjectID(req.user._id) }
    dbModelIni.find(busca, (err, iniciativas) => {
        if (err) throw err
        res.send(iniciativas)    
    }).sort(ordemIni)
})
app.get('/objetivos', (req, res) => {
    var busca = { userID: ObjectID(req.user._id) }
    dbModelObj.find(busca, (err, objetivos) => {
        if (err) throw err
        res.send(objetivos)    
    }).sort(ordemObj)
})

//Criar rotar dinâmica para recordes discretos
function RotaDinMelhorDisc(km, ordem) {
    var endURI = '/corridas/best/disc' + (km)
    app.get(endURI, (req, res) => {
        var busca = { 
            $and: [ 
                {userID: ObjectID(req.user._id)},
                {DistanciaTotal: { $gte: km}}              
            ]
        }
        dbModelRun.find(busca, (err, corridas) => {
            if (err) throw err
            res.send(corridas)    
        }).sort(ordem).limit(1)
    })
}

RotaDinMelhorDisc(1, ordemKm1)
RotaDinMelhorDisc(2, ordemKm2)
RotaDinMelhorDisc(3, ordemKm3)
RotaDinMelhorDisc(4, ordemKm4)
RotaDinMelhorDisc(5, ordemKm5)
RotaDinMelhorDisc(6, ordemKm6)
RotaDinMelhorDisc(7, ordemKm7)
RotaDinMelhorDisc(8, ordemKm8)
RotaDinMelhorDisc(9, ordemKm9)
RotaDinMelhorDisc(10, ordemKm10)
RotaDinMelhorDisc(11, ordemKm11)
RotaDinMelhorDisc(12, ordemKm12)
RotaDinMelhorDisc(13, ordemKm13)
RotaDinMelhorDisc(14, ordemKm14)
RotaDinMelhorDisc(15, ordemKm15)
RotaDinMelhorDisc(16, ordemKm16)
RotaDinMelhorDisc(17, ordemKm17)
RotaDinMelhorDisc(18, ordemKm18)
RotaDinMelhorDisc(19, ordemKm19)
RotaDinMelhorDisc(20, ordemKm20)
RotaDinMelhorDisc(21, ordemKm21)

//Criar rotar dinâmica para recordes discretos
function RotaDinMelhorAcc(km, ordem, ende) {
    var endURI = '/corridas/best/acc' + (km)
    app.get(endURI, (req, res) => {
        var busca = { 
            $and: [ 
                {userID: ObjectID(req.user._id)},
                {DistanciaTotal: { $gte: km }},
                ende         
            ]
        }
        dbModelRun.find(busca, (err, corridas) => {
            if (err) throw err
            res.send(corridas)    
        }).sort(ordem).limit(1)
    })
}

for(let i=1; i<22; i++) {
    var endereco = ("KmAcc" + 1)
    var ordem = "ordemKmAcc" + i    
    var ende = { 
    }
    ende[endereco] = { '$exists' : true}
    RotaDinMelhorAcc(i, ordem, ende)
}
/*
RotaDinMelhorAcc(2, ordemKmAcc2)
RotaDinMelhorAcc(3, ordemKmAcc3)
RotaDinMelhorAcc(4, ordemKmAcc4)
RotaDinMelhorAcc(5, ordemKmAcc5)
RotaDinMelhorAcc(6, ordemKmAcc6)
RotaDinMelhorAcc(7, ordemKmAcc7)
RotaDinMelhorAcc(8, ordemKmAcc8)
RotaDinMelhorAcc(9, ordemKmAcc9)
RotaDinMelhorAcc(10, ordemKmAcc10)
RotaDinMelhorAcc(11, ordemKmAcc11)
RotaDinMelhorAcc(12, ordemKmAcc12)
RotaDinMelhorAcc(13, ordemKmAcc13)
RotaDinMelhorAcc(14, ordemKmAcc14)
RotaDinMelhorAcc(15, ordemKmAcc15)
RotaDinMelhorAcc(16, ordemKmAcc16)
RotaDinMelhorAcc(17, ordemKmAcc17)
RotaDinMelhorAcc(18, ordemKmAcc18)
RotaDinMelhorAcc(19, ordemKmAcc19)
RotaDinMelhorAcc(20, ordemKmAcc20)
RotaDinMelhorAcc(21, ordemKmAcc21)*/


//Rota para menu suspendo com o status
app.get('/ragstatus', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.mongodbURI, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err) throw err;
        var dbo = dbpbsc.db("dbpbsc");
        var ordemStat = {ragstatus: 1}
        dbo.collection("ragstatus").find({}, { projection: { _id: 0 } }).sort(ordemStat).toArray(function (err, ragstatus) {
            if (err) throw err;
            res.send(ragstatus)
            dbpbsc.close();
        })
    })
})
app.get('/listIni', (req, res) => {
    var busca = { userID: ObjectID(req.user._id) }
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.mongodbURI, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err) throw err;
        var dbo = dbpbsc.db("dbpbsc");
        var ordem = {iniNome: 1}
        dbo.collection("collinis").find(busca, { projection: {_id: 0, iniNome: 1 } }).sort(ordem).toArray(function (err, info) {
            if (err) throw err;
            res.send(info)
            dbpbsc.close();
        })
    })
})
app.get('/listObj', (req, res) => {
    var busca = { userID: ObjectID(req.user._id) }
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.mongodbURI, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err) throw err;
        var dbo = dbpbsc.db("dbpbsc");
        var ordem = {objNome: 1}
        dbo.collection("collobjs").find(busca, { projection: {_id: 0, objNome: 1 } }).sort(ordem).toArray(function (err, info) {
            if (err) throw err;
            res.send(info)
            dbpbsc.close();
        })
    })
})
app.get('/ativEdit', (req, res) => {
    idParaEditar = req.user.id
    console.log("Chegou no servidor pedido para editar ID: ", idParaEditar)
});

// Definição dos modelos para o Moongoose
var dbModelAtiv = mongoose.model('collativs', {
    ativNome: String,
    ativStat: String,
    ativIni: String,
    ativDesc: String,
    ativMot: String,
    ativRisk: String,
    ativDataCria: Date,
    ativDataFim: Date,
    userID: ObjectID,
})

var dbModelIni = mongoose.model('collinis', {
    iniNome: String,
    iniStat: String,
    iniObj: String,
    iniDesc: String,
    iniMot: String,
    iniRisk: String,
    iniDataCria: Date,
    iniDataFim: Date,
    userID: ObjectID,
})

var dbModelObj = mongoose.model('collobjs', {
    objNome: String,
    objStat: String,
    objTema: String,
    objDesc: String,
    objMot: String,
    objRisk: String,
    objDataCria: Date,
    objDataFim: Date,
    userID: ObjectID,
})

var dbModelRun = mongoose.model('collruns', {
    DistanciaTotal: Number,
    TempoFinalS: Number,
    PaceOrigem: Number,
    DataCorridaOrigem: Date,
    userID: ObjectID,
    PaceTotalLer: String,
    TempoTotalLer: String,
    Km1: Number,
    Km2: Number,
    Km3: Number,
    Km4: Number,
    Km5: Number,
    Km6: Number,
    Km7: Number,
    Km8: Number,
    Km9: Number,
    Km10: Number,
    Km11: Number,
    Km12: Number,
    Km13: Number,
    Km14: Number,
    Km15: Number,
    Km16: Number,
    Km17: Number,
    Km18: Number,
    Km19: Number,
    Km20: Number,
    Km21: Number,
    KmAcc1: Number,
    KmAcc2: Number,
    KmAcc3: Number,
    KmAcc4: Number,
    KmAcc5: Number,
    KmAcc6: Number,
    KmAcc7: Number,
    KmAcc8: Number,
    KmAcc9: Number,
    KmAcc10: Number,
    KmAcc11: Number,
    KmAcc12: Number,
    KmAcc13: Number,
    KmAcc14: Number,
    KmAcc15: Number,
    KmAcc16: Number,
    KmAcc17: Number,
    KmAcc18: Number,
    KmAcc19: Number,
    KmAcc20: Number,
    KmAcc21: Number
})

//Rotas POST
app.post('/run', (req, res) => {
    //Gravar dados base da corrida
    var Corrida = new dbModelRun(req.body)
    console.log("O que chegou no servidor(Original): ", Corrida)
    var RunSave = Corrida.save()
    var IDCorrida = Corrida._id
    console.log('Nova corrida salva no MongoDB: ' + IDCorrida)    
})

app.post('/atividades', (req, res) => {
    var atividades = new dbModelAtiv(req.body)
    var ativSalvo = atividades.save()
    console.log('Nova atividade salva no MongoDB.')
})
app.post('/iniciativas', (req, res) => {
    var iniciativas = new dbModelIni(req.body)
    var ativSalvo = iniciativas.save()
    console.log('Nova iniciativa salva no MongoDB.')
})
app.post('/objetivos', (req, res) => {
    var objetivos = new dbModelObj(req.body)
    var objSalvo = objetivos.save()
    console.log('Novo objetivo salvo no MongoDB.')
})
app.post('/deletaAtiv', (req, res) => {
    var atividade = new dbModelAtiv(req.body)
    console.log("Chegou no servidor o pedidod para apagar ID " + atividade._id)
    function deletar() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividade._id) }
            dbo.collection("collativs").deleteOne(busca, function(err, res) {
                if (err) throw err
                console.log("ID " + atividade._id + " deletado! ", res)
                dbpbsc.close()
            })
        })
    }
    deletar()
})
app.post('/deletaIni', (req, res) => {
    var iniciativa = new dbModelIni(req.body)
    console.log("Chegou no servidor o pedidod para apagar ID " + iniciativa._id)
    function deletar() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativa._id) }
            dbo.collection("collinis").deleteOne(busca, function(err, res) {
                if (err) throw err
                console.log("ID " + iniciativa._id + " deletado! ", res)
                dbpbsc.close()
            })
        })
    }
    deletar()
})
app.post('/deletaObj', (req, res) => {
    var objetivo = new dbModelObj(req.body)
    console.log("Chegou no servidor o pedidod para apagar ID " + objetivo._id)
    function deletar() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivo._id) }
            dbo.collection("collobjs").deleteOne(busca, function(err, res) {
                if (err) throw err
                console.log("ID " + objetivo._id + " deletado! ", res)
                dbpbsc.close()
            })
        })
    }
    deletar()
})
app.post('/deletaRun', (req, res) => {
    var corrida = new dbModelRun(req.body)
    console.log("Chegou no servidor o pedido para apagar ID " + corrida._id)
    function deletar() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(corrida._id) }
            dbo.collection("collruns").deleteOne(busca, function(err, res) {
                if (err) throw err
                console.log("ID " + corrida._id + " deletado! ", res)
                dbpbsc.close()
            })
        })
    }
    deletar()
})
app.post('/concluiAtiv', (req, res) => {
    var atividade = new dbModelAtiv(req.body)
    console.log("Chegou no servidor o pedidod para concluir ID " + atividade._id)
    function concluir() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividade._id) }
            var atualizar = { $set: { ativStat: '3 - Concluído', ativDataFim: dataBR } }
            dbo.collection("collativs").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + atividade._id + " marcado como concluído! ", res)
                dbpbsc.close()
            })
        })
    }
    concluir()
})
app.post('/concluiIni', (req, res) => {
    var iniciativa = new dbModelIni(req.body)
    console.log("Chegou no servidor o pedidod para concluir ID " + iniciativa._id)
    function concluir() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativa._id) }
            var atualizar = { $set: { iniStat: '3 - Concluído', iniDataFim: dataBR } }
            dbo.collection("collinis").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + iniciativa._id + " marcado como concluído! ", res)
                dbpbsc.close()
            })
        })
    }
    concluir()
})
app.post('/concluiObj', (req, res) => {
    var objetivo = new dbModelObj(req.body)
    console.log("Chegou no servidor o pedidod para concluir ID " + objetivo._id)
    function concluir() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivo._id) }
            var atualizar = { $set: { objStat: '3 - Concluído', objDataFim: dataBR } }
            dbo.collection("collobjs").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + objetivo._id + " marcado como concluído! ", res)
                dbpbsc.close()
            })
        })
    }
    concluir()
})
app.post('/andarAtiv', (req, res) => {
    var atividade = new dbModelAtiv(req.body)
    console.log("Chegou no servidor o pedidod para andar ID " + atividade._id)
    function andar() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividade._id) }
            var atualizar = { $set: { ativStat: '2 - Em Andamento' } }
            dbo.collection("collativs").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + atividade._id + " marcado como em andamento! ", res)
                dbpbsc.close()
            })
        })
    }
    andar()
})
app.post('/andarIni', (req, res) => {
    var iniciativa = new dbModelIni(req.body)
    console.log("Chegou no servidor o pedidod para andar ID " + iniciativa._id)
    function andar() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativa._id) }
            var atualizar = { $set: { iniStat: '2 - Em Andamento' } }
            dbo.collection("collinis").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + iniciativa._id + " marcado como em andamento! ", res)
                dbpbsc.close()
            })
        })
    }
    andar()
})
app.post('/andarObj', (req, res) => {
    var objetivo = new dbModelObj(req.body)
    console.log("Chegou no servidor o pedidod para andar ID " + objetivo._id)
    function andar() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivo._id) }
            var atualizar = { $set: { objStat: '2 - Em Andamento' } }
            dbo.collection("collobjs").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + objetivo._id + " marcado como concluído! ", res)
                dbpbsc.close()
            })
        })
    }
    andar()
})
app.post('/web/pbsc/ativ/atividades/buscaID', (req, res) => {
    var dados = new dbModelAtiv(req.body)
    var ativID = dados._id
    console.log("tentando buscar", ativID)
    var busca = { _id: ativID }
    dbModelAtiv.findOne(busca, (err, atividades) => {
        if (err) throw err
        var nomelido = atividades.ativNome
        res.render('/web/pbsc/ativ/edit_ativ', function (err, atividades) {
            if (err) throw err
            res.send(atividades)
        })
        console.log("nomelido: ", nomelido)
    })
})
app.post('/atrasarAtiv', (req, res) => {
    console.log("Acessando rota para marcar atividades como atrasada!", req)
    atraso.atrasar();
    res.send(console.log("atrasado? -> Chegamos no final do get"))
})

app.listen(porta, () => console.log(`App ok na porta ${porta}!`))
console.log("Finalizando leitura de server.js");

function ajustaDataHoraParaBrasil() {
    var dataISO = dataagora.toISOString();
    var dataAno = dataISO.substr(0, 4);
    var dataMes = dataISO.substr(5, 2) - 1;
    var dataDia = dataISO.substr(8, 2);
    var dataHoraBR = dataISO.substr(11, 2) - 6;
    var dataMinBR = dataISO.substr(14, 2);
    var dataBR = new Date(dataAno, dataMes, dataDia, dataHoraBR, dataMinBR, 0, 0);
    return dataBR;
}

