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
mongoose.connect(
    process.env.mongodbURI, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    function(err, dbpbsc) {
        console.log('MongoDB ok.')
    }
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
app.use('/profile', profileRoutes);

// Carrega arquivos estáticos
app.use("/img", express.static('img')); 
app.use("/styles", express.static('styles')); 
app.use("/src", express.static('src'));

app.get('/commits/', (req, res) => {
    res.render('commits', { user: req.user })
});

// Define rotas de renderização de tela
app.get('/plan/', (req, res) => {
    res.render('planHome', { user: req.user })
});

app.get('/ativ/', (req, res) => {
    res.render('atividades', { user: req.user })
});
app.get('/ativ/nova', (req, res) => {
    res.render('novaAtividade', { user: req.user })
});

/*
app.post('/ativ/edit', (req, res) => {
    var atividade = new dbModelAtiv(req.body)
    var auth = req.user
    console.log("post - ativID: " + atividade._id )
    console.log("post - user ID : " + atividade.userID)
    //var ativID = '5edb0725562d64597c355c5f'
    var busca = { $and: [ { userID : atividade.userID } , { _id : atividade._id } ] }
    dbModelAtiv.find(busca, (err, resp) => {
        if (err) throw err
        console.log("Resposta do post: " + resp)
        res.send(resp)    
    }).sort(ordemAtiv)
    res.render('novaAtividade', {user: req.user})
});

app.get('/ativ/edit', (req, res) => {
    console.log("Resposta do GET: " + req.body)
})

*/

app.get('/ini/', (req, res) => {
    res.render('iniciativas', { user: req.user })
});

app.get('/ini/nova', (req, res) => {
    res.render('novaIniciativa', { user: req.user })
});

app.get('/obj/', (req, res) => {
    res.render('objetivos', { user: req.user })
});

app.get('/obj/nova', (req, res) => {
    res.render('novoObjetivo', { user: req.user })
});

app.get('/alim/', (req, res) => {
    res.render('alimHome', { user: req.user })
});

app.get('/run/', (req, res) => {
    res.render('runHome', { user: req.user })
});

app.get('/gym/', (req, res) => {
    res.render('gymHome', { user: req.user })
});


//Começo das rotas

//Backup -> PBSC OLD
//Define os modelos de objetos para o mongoose -> PBSC OLD
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

//Rotas CRUD -> PBSC NEW
var ordemAtiv = { ativStat: 1, ativDataFim: 1, ativIni: 1, ativDataCria: 1, ativNome: 1 }
var ordemIni = { iniStat: 1,  iniDataFim: 1, iniObj: -1, iniDataCria: 1, iniNome: 1 }
var ordemObj = { objStat: 1, objDataFim: 1, objDataCria: 1, objNome: 1 }

var dataagora = new Date()

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

//Rotas de gravação - PSBC NEW
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


//Rota para menu suspendo com o status - PBSC New
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


//Rotas CRUD -> PBSC OLD

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

app.post('/concluiAtiv', (req, res) => {
    var atividade = new dbModelAtiv(req.body)
    console.log("Chegou no servidor o pedidod para concluir ID " + atividade._id)
    function concluir() {
        MongoClient.connect(process.env.mongodbURI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividade._id) }
            var atualizar = {
                $set: { ativStat: '3 - Concluído', ativDataFim: dataagora }/*,
                $currentDate: { ativDataFim: true }*/
            }
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
            var atualizar = { $set: { iniStat: '3 - Concluído' }, $currentDate: { iniDataFim: true } }
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
            var atualizar = { $set: { objStat: '3 - Concluído' }, $currentDate: { objDataFim: true } }
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
