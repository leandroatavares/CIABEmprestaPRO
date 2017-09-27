// JavaScript source code
var db_string = 'mongodb://127.0.0.1/ciab_app';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;

var User;
var Emprestimo;
var Uf_cidades;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

db.once('open', function () {
    var userSchema = mongoose.Schema({
        fullname: String,
        email: String,
        cpf: String,
        password: String,
        typedoc: String,
        numdoc: String,
        nomemae: String,
        nomepai: String,
        nacionalidade: String,
        uf: String,
        cidade: String,
        estadocivil: String,
        nomeconjuge: String,
        escolaridade: String,
        sexo: String,
        telresidencial: String,
        telcelular: String,
        created_at: Date
    });
    exports.User = mongoose.model('User', userSchema);

    var emprestimoSchema = mongoose.Schema({
        iduser: String, 
        renda: String,
        valemprestimo: String,
        numparcelas: String,
        valtotal: String,
        valparcelas: String,
        status: String,
        created_at: Date
    });
    exports.Emprestimo = mongoose.model('Emprestimo', emprestimoSchema);

    var Uf_cidadesSchema = mongoose.Schema({
        sigla: String,
        nome: String,
        cidades:String
        
    });
    exports.Uf_cidades = mongoose.model('Uf_cidades', emprestimoSchema);

});