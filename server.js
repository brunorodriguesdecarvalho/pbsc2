console.log("Iniciando arquivo server.js");

//Iniciar o servidor express  
const express = require('express'); 
const app = express();  
//para remover: app.use(express.static('./'));
console.log("Express: OK");

//Definição da porta do servidor
//const http = require('http').Server(app);
const porta = process.env.PORT || 5500;

//Cria um arquivo com atalhos
const chaves = require('./config/chaves');

//Importa o mongoose para criar os modelos de dados (Schemas) e conectar ao banco
const mongoose = require('mongoose')
mongoose.connect(
    chaves.mongodb.URI, 
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

//Ativar o CORS
const cors = require('cors')
app.use(cors())

//Prepara a sessão de cookies
const sessaoCookie = require('cookie-session');
app.use(sessaoCookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [chaves.sessao.chaveCookie]
}));

//Importar o PassportJS para auxiliar no processo de login
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
//Importar as configurações do PassportJS
const passportSetup = require('./config/passport-setup');


// Define a View Engine como EJS
app.set('view engine', 'ejs');

//Criar a rota principal
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

//Prepara as rotas de autenticação do login via FB, G+ ou LinkedIn
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

//Define a rota de retorno após o login
const profileRoutes = require('./routes/profile-routes');
app.use('/profile', profileRoutes);




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
})

//Rotas CRUD -> PBSC OLD
var ordemAtiv = { ativDataFim: 1, ativStat: 1, ativIni: 1, ativDataCria: 1, ativNome: 1 }
var ordemIni = { iniDataFim: 1, iniStat: 1,  iniObj: -1, iniDataCria: 1, iniNome: 1 }
var ordemObj = { objDataFim: 1, objStat: 1, objTema: 1, objDataCria: 1, objNome: 1 }

app.get('/atividades', (req, res) => {
    var busca = { ativStat: {'$regex' : '^((?!3 - Concluído).)*$', '$options' : 'i'} }
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv)
})

app.get('/atividades/ok', (req, res) => {
    var busca = { ativStat: '3 - Concluído' }
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv)
})

app.get('/atividades/pbsc', (req, res) => {
    var busca = { $and: [
        {ativIni: "PBSCv3"},
        {ativStat: {'$regex' : '^((?!3 - Concluído).)*$', '$options' : 'i'} }
    ]}
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv)
})

app.get('/atividades/nonpbsc', (req, res) => {
    var busca = { $and: [
        {ativIni: {'$regex' : '^((?!PBSCv3).)*$', '$options' : 'i'} },
        {ativStat: {'$regex' : '^((?!3 - Concluído).)*$', '$options' : 'i'} }
    ]}
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv)
})

app.get('/iniciativas', (req, res) => {
    dbModelIni.find({}, (err, iniciativas) => {
        if (err) throw err
        res.send(iniciativas)    
    }).sort(ordemIni)
})

app.get('/objetivos', (req, res) => {
    dbModelObj.find({}, (err, objetivos) => {
        if (err) throw err
        res.send(objetivos)    
    }).sort(ordemObj)
})

app.get('/ragstatus', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(chaves.mongodb.URI, { useUnifiedTopology: true }, function (err, dbpbsc) {
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

app.post('/atividades', (req, res) => {
    var atividades = new dbModelAtiv(req.body)
    var ativSalvo = atividades.save()
    console.log('Nova atividade salva no MongoDB.')
})

app.post('/iniciativas', (req, res) => {
    var iniciativas = new dbModelIni(req.body)
    var iniSalvo = iniciativas.save()
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividade._id) }
            var atualizar = {
                $set: { ativStat: '3 - Concluído' },
                $currentDate: { ativDataFim: true }
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
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
        MongoClient.connect(chaves.mongodb.URI, {useUnifiedTopology: true}, function(err, dbpbsc) {
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