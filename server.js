console.log("Iniciando arquivo server.js");

//Iniciar o servidor express  
const express = require('express'); 
const app = express();  
//para remover: app.use(express.static('./'));
console.log("Express: OK");

//Definição da porta do servidor
//const http = require('http').Server(app);
const porta = process.env.PORT || 8926;
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

//Disponibiliza chave do GMAPS
app.get('/yeKsPaMG', (req, res) => {
    function gmaps() {
        var gk = process.env.MapsKey
        res.send(gk)
    };
    gmaps()
});

// Carrega o FileSystem
let fs = require('fs');

//Variáveis para operações CRUD 
var ordemAtiv = { ativDataFim: 1, ativStat: -1, ativIni: 1, ativDataCria: 1, ativNome: 1 }
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

var ordemPaceSegAcc1 = { PaceSegAcc1: 1 }
var ordemPaceSegAcc2 = { PaceSegAcc2: 1 }
var ordemPaceSegAcc3 = { PaceSegAcc3: 1 }
var ordemPaceSegAcc4 = { PaceSegAcc4: 1 }
var ordemPaceSegAcc5 = { PaceSegAcc5: 1 }
var ordemPaceSegAcc6 = { PaceSegAcc6: 1 }
var ordemPaceSegAcc7 = { PaceSegAcc7: 1 }
var ordemPaceSegAcc8 = { PaceSegAcc8: 1 }
var ordemPaceSegAcc9 = { PaceSegAcc9: 1 }
var ordemPaceSegAcc10 = { PaceSegAcc10: 1 }
var ordemPaceSegAcc11 = { PaceSegAcc11: 1 }
var ordemPaceSegAcc12 = { PaceSegAcc12: 1 }
var ordemPaceSegAcc13 = { PaceSegAcc13: 1 }
var ordemPaceSegAcc14 = { PaceSegAcc14: 1 }
var ordemPaceSegAcc15 = { PaceSegAcc15: 1 }
var ordemPaceSegAcc16 = { PaceSegAcc16: 1 }
var ordemPaceSegAcc17 = { PaceSegAcc17: 1 }
var ordemPaceSegAcc18 = { PaceSegAcc18: 1 }
var ordemPaceSegAcc19 = { PaceSegAcc19: 1 }
var ordemPaceSegAcc20 = { PaceSegAcc20: 1 }
var ordemPaceSegAcc21 = { PaceSegAcc21: 1 }

//Ajustes de data
var dataagora = new Date()
var dataBR = ajustaDataHoraParaBrasil();
console.log("Data Agora(Brasil): ", dataBR)

// Definação das rotas GET
app.get('/googlefe8873c300c5b983.html', (req, res) => { 
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./googlefe8873c300c5b983.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
 } );
app.get('/commits/', (req, res) => {res.render('commits', { user: req.user } ) } );
app.get('/plan/', (req, res) => { res.render('planHome', { user: req.user } ) } );
app.get('/ativ/', (req, res) => { res.render('atividades', { user: req.user } ) } );
app.get('/ativ/nova', (req, res) => { res.render('novaAtividade', { user: req.user } ) } );
app.get('/ini/', (req, res) => { res.render('iniciativas', { user: req.user } ) } );
app.get('/ini/nova', (req, res) => { res.render('novaIniciativa', { user: req.user } ) } );
app.get('/obj/', (req, res) => { res.render('objetivos', { user: req.user } ) } );
app.get('/obj/nova', (req, res) => { res.render('novoObjetivo', { user: req.user } ) } );
app.get('/map', (req, res) => { res.render('strategymap', { user: req.user } ) } );
app.get('/alim/', (req, res) => { res.render('alimHome', { user: req.user } ) } );
app.get('/gym/', (req, res) => { res.render('gymHome', { user: req.user } ) } );
app.get('/run/', (req, res) => { res.render('runHome', { user: req.user } ) } );
app.get('/run/nova', (req, res) => { res.render('novaCorrida', { user: req.user } ) } );
app.get('/run/best', (req, res) => { res.render('recordesCorridas', { user: req.user } ) } );
app.get('/run/lista', (req, res) => { res.render('corridas', { user: req.user } ) } );
app.get('/run/mapa', (req, res) => { res.render('maps', { user: req.user } ) } );
app.get('/run/gps', (req, res) => { res.render('gpsConverter', { user: req.user } ) } );
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
app.get('/map/ativ', (req, res) => {
    var buscaMapa = { $and: [ {userID: ObjectID(req.user._id)} , { $nor: [ { ativStat: { $regex: "^3 - Concluíd*" } }, { ativStat: { $regex: "^4 - Canc*" } } ] } ] }
    dbModelAtiv.find(buscaMapa, (err, atividades) => {
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
function RotaDinMelhor(km, ordem, ende, acumula) {
    var endURI = '/corridas/best/' + acumula + (km)
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


    idxRun = 1
    ordRun = ordemKm1
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 2
    ordRun = ordemKm2
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 3
    ordRun = ordemKm3
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 4
    ordRun = ordemKm4
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 5
    ordRun = ordemKm5
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 6
    ordRun = ordemKm6
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 7
    ordRun = ordemKm7
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 8
    ordRun = ordemKm8
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 9
    ordRun = ordemKm9
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 10
    ordRun = ordemKm10
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 11
    ordRun = ordemKm11
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 12
    ordRun = ordemKm12
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 13
    ordRun = ordemKm13
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 14
    ordRun = ordemKm14
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 15
    ordRun = ordemKm15
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 16
    ordRun = ordemKm16
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 17
    ordRun = ordemKm17
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 18
    ordRun = ordemKm18
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 19
    ordRun = ordemKm19
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 20
    ordRun = ordemKm20
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")

    idxRun = 21
    ordRun = ordemKm21
    endeCorrida = {}
    endeCorrida[("Km" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "disc")






    idxRun = 1
    ordRun = ordemKmAcc1
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 2
    ordRun = ordemKmAcc2
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 3
    ordRun = ordemKmAcc3
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 4
    ordRun = ordemKmAcc4
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 5
    ordRun = ordemKmAcc5
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 6
    ordRun = ordemKmAcc6
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 7
    ordRun = ordemKmAcc7
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 8
    ordRun = ordemKmAcc8
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 9
    ordRun = ordemKmAcc9
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 10
    ordRun = ordemKmAcc10
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 11
    ordRun = ordemKmAcc11
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 12
    ordRun = ordemKmAcc12
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 13
    ordRun = ordemKmAcc13
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 14
    ordRun = ordemKmAcc14
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 15
    ordRun = ordemKmAcc15
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 16
    ordRun = ordemKmAcc16
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 17
    ordRun = ordemKmAcc17
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 18
    ordRun = ordemKmAcc18
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 19
    ordRun = ordemKmAcc19
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 20
    ordRun = ordemKmAcc20
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")

    idxRun = 21
    ordRun = ordemKmAcc21
    endeCorrida = {}
    endeCorrida[("KmAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "acc")








    idxRun = 1
    ordRun = ordemPaceSegAcc1
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 2
    ordRun = ordemPaceSegAcc2
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 3
    ordRun = ordemPaceSegAcc3
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 4
    ordRun = ordemPaceSegAcc4
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 5
    ordRun = ordemPaceSegAcc5
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 6
    ordRun = ordemPaceSegAcc6
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 7
    ordRun = ordemPaceSegAcc7
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 8
    ordRun = ordemPaceSegAcc8
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 9
    ordRun = ordemPaceSegAcc9
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 10
    ordRun = ordemPaceSegAcc10
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 11
    ordRun = ordemPaceSegAcc11
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 12
    ordRun = ordemPaceSegAcc12
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 13
    ordRun = ordemPaceSegAcc13
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 14
    ordRun = ordemPaceSegAcc14
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 15
    ordRun = ordemPaceSegAcc15
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 16
    ordRun = ordemPaceSegAcc16
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 17
    ordRun = ordemPaceSegAcc17
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 18
    ordRun = ordemPaceSegAcc18
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 19
    ordRun = ordemPaceSegAcc19
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 20
    ordRun = ordemPaceSegAcc20
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")

    idxRun = 21
    ordRun = ordemPaceSegAcc21
    endeCorrida = {}
    endeCorrida[("PaceSegAcc" + idxRun)] = { '$exists' : true}
    RotaDinMelhor(idxRun, ordRun, endeCorrida, "pace")


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
    var busca = { $and: [ {userID: ObjectID(req.user._id)} , { $and: [ { iniStat: { $not: { $regex: "^3 - Concluído.*" } } }, { iniStat: { $not: { $regex: "^4 - Cancelado.*" } } } ] } ] }
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
    var busca = { $and: [ {userID: ObjectID(req.user._id)} , { $and: [ { objStat: { $not: { $regex: "^3 - Concluído.*" } } }, { objStat: { $not: { $regex: "^4 - Cancelado.*" } } } ] } ] }
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
    ativIniID: ObjectID,
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
    iniObjID: ObjectID
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
    userID: ObjectID
})
var ObjetoCorrida = {
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
    KmAcc21: Number,
    PaceSegAcc1: Number,
    PaceSegAcc2: Number,
    PaceSegAcc3: Number,
    PaceSegAcc4: Number,
    PaceSegAcc5: Number,
    PaceSegAcc6: Number,
    PaceSegAcc7: Number,
    PaceSegAcc8: Number,
    PaceSegAcc9: Number,
    PaceSegAcc10: Number,
    PaceSegAcc11: Number,
    PaceSegAcc12: Number,
    PaceSegAcc13: Number,
    PaceSegAcc14: Number,
    PaceSegAcc15: Number,
    PaceSegAcc16: Number,
    PaceSegAcc17: Number,
    PaceSegAcc18: Number,
    PaceSegAcc19: Number,
    PaceSegAcc20: Number,
    PaceSegAcc21: Number
}
var dbSchemaRun = mongoose.Schema(ObjetoCorrida)
var dbModelRun = mongoose.model('collruns', dbSchemaRun )

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
app.post('/atividades/alterarPrazo', (req, res) => {
    var atividades = new dbModelAtiv(req.body)
    console.log('Recebido no servidor:')
    console.log('ID da atividade: ' + atividades._id)
    console.log('Novo Prazo: ' + atividades.ativDataFim)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividades._id) }
            var novoPrazo = { $set: {ativDataFim: atividades.ativDataFim } };
            dbo.collection("collativs").updateOne(busca, novoPrazo, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + atividades._id + " atualizada! ", res)
                }
                dbpbsc.close()
            })
        }
    })
})
app.post('/iniciativas/alterarPrazo', (req, res) => {
    var iniciativas = new dbModelIni(req.body)
    console.log('Recebido no servidor:')
    console.log('ID da iniciativa: ' + iniciativas._id)
    console.log('Novo Prazo: ' + iniciativas.iniDataFim)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativas._id) }
            var novoPrazo = { $set: {iniDataFim: iniciativas.iniDataFim } };
            dbo.collection("collinis").updateOne(busca, novoPrazo, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + iniciativas._id + " atualizada! ", res)
                }
                dbpbsc.close()
            })
        }
    })
})
app.post('/objetivos/alterarPrazo', (req, res) => {
    var objetivos = new dbModelObj(req.body)
    console.log('Recebido no servidor:')
    console.log('ID do Objetivo: ' + objetivos._id)
    console.log('Novo Prazo: ' + objetivos.objDataFim)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivos._id) }
            var novoPrazo = { $set: {objDataFim: objetivos.objDataFim } };
            dbo.collection("collobjs").updateOne(busca, novoPrazo, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + objetivos._id + " atualizado! ", res)
                }
                dbpbsc.close()
            })
        }
    })
})
app.post('/atividades/alterarStatus', (req, res) => {
    var atividades = new dbModelAtiv(req.body)
    console.log('Recebido no servidor:')
    console.log('ID da atividade: ' + atividades._id)
    console.log('Novo Status: ' + atividades.ativStat)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividades._id) }
            var novoStatus = { $set: {ativStat: atividades.ativStat } };
            dbo.collection("collativs").updateOne(busca, novoStatus, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + atividades._id + " atualizada! ", res)
                }
                dbpbsc.close()
            })
        }
    })
})
app.post('/iniciativas/alterarStatus', (req, res) => {
    var iniciativas = new dbModelIni(req.body)
    console.log('Recebido no servidor:')
    console.log('ID da iniciativa: ' + iniciativas._id)
    console.log('Novo Status: ' + iniciativas.iniStat)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativas._id) }
            var novoStatus = { $set: {iniStat: iniciativas.iniStat } };
            dbo.collection("collinis").updateOne(busca, novoStatus, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + iniciativas._id + " atualizada! ", res)
                }
                dbpbsc.close()
            })
        }
    })
})
app.post('/objetivos/alterarStatus', (req, res) => {
    var objetivos = new dbModelObj(req.body)
    console.log('Recebido no servidor:')
    console.log('ID do objetivo: ' + objetivos._id)
    console.log('Novo Status: ' + objetivos.objStat)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivos._id) }
            var novoStatus = { $set: {objStat: objetivos.objStat } };
            dbo.collection("collobjs").updateOne(busca, novoStatus, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + objetivos._id + " atualizado! ", res)
                }
                dbpbsc.close()
            })
        }
    })
})
app.post('/atividades/alterarDetalhes', (req, res) => {
    var atividades = new dbModelAtiv(req.body)
    console.log('Recebido no servidor:')
    console.log('ID da atividade: ' + atividades._id)
    console.log('Nova Descrição: ' + atividades.ativDesc)
    console.log('Novo Motivo: ' + atividades.ativMot)
    console.log('Novo Risco: ' + atividades.ativRisk)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividades._id) }
            var novoStatus = { $set: {ativDesc: atividades.ativDesc, ativMot: atividades.ativMot, ativRisk: atividades.ativRisk } };
            dbo.collection("collativs").updateOne(busca, novoStatus, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + atividades._id + " atualizada! ", res)
                }
                dbpbsc.close()
            })
        }
    })
})
app.post('/iniciativas/alterarDetalhes', (req, res) => {
    var iniciativas = new dbModelIni(req.body)
    console.log('Recebido no servidor:')
    console.log('ID da iniciativa: ' + iniciativas._id)
    console.log('Nova Descrição: ' + iniciativas.iniDesc)
    console.log('Novo Motivo: ' + iniciativas.iniMot)
    console.log('Novo Risco: ' + iniciativas.iniRisk)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativas._id) }
            var novoStatus = { $set: {iniDesc: iniciativas.iniDesc, iniMot: iniciativas.iniMot, iniRisk: iniciativas.iniRisk } };
            dbo.collection("collinis").updateOne(busca, novoStatus, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + iniciativas._id + " atualizada! ", res)
                }
                dbpbsc.close()
            })
        }
    })
})
app.post('/objetivos/alterarDetalhes', (req, res) => {
    var objetivos = new dbModelObj(req.body)
    console.log('Recebido no servidor:')
    console.log('ID do objetivo: ' + objetivos._id)
    console.log('Nova Descrição: ' + objetivos.objDesc)
    console.log('Novo Motivo: ' + objetivos.objMot)
    console.log('Novo Risco: ' + objetivos.objRisk)
    MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        else {
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivos._id) }
            var novoStatus = { $set: {objDesc: objetivos.objDesc, objMot: objetivos.objMot, objRisk: objetivos.objRisk } };
            dbo.collection("collobjs").updateOne(busca, novoStatus, function(err, res) {
                if (err) throw err
                else {
                    console.log("ID " + objetivos._id + " atualizado! ", res)
                }
                dbpbsc.close()
            })
        }
    })
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

