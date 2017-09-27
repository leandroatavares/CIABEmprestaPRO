var app = require('./app_config.js');
var db = require('./db_config.js');
var validator = require('validator');

app.get('/', function (req, res) {
    res.end('Servidor ON!');
});

/*============================== USER ==============================*/
app.get('/listAllUsers', function (req, res) {

    db.User.find({}, function (error, users) {

        if (error) {
            res.json({ error: "Não foi possivél retornar os usuários" }); 
        } else {
            res.json(users);
        }
    });
});
app.post('/user', function (req, res) {
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));
    db.User.findOne({ 'email': email, 'password': password }, function (error, users) {

        if (error) {
            res.json({ error: "Não foi possivél retornar os usuários" });
        } else {
            res.json(users);
        }
    });
}); /*User validation email & password*/
app.post('/userById', function (req, res) {
    var id = validator.trim(validator.escape(req.param('_id')));
    db.User.findById(id, function (error, user) {
        if (error) {
            res.json({ error: "Não foi possivél retornar os usuário." })
        } else {
            res.json(user);
        }
    });
});
app.post('/createuser', function (req, res) {
    var fullname = validator.trim(validator.escape(req.param('fullname')));
    var cpf = validator.trim(validator.escape(req.param('cpf')));
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));
    var typedoc = validator.trim(validator.escape(req.param('typedoc')));
    var numdoc = validator.trim(validator.escape(req.param('numdoc')));
    var nomemae = validator.trim(validator.escape(req.param('nomemae')));
    var nomepai = validator.trim(validator.escape(req.param('nomepai')));
    var nacionalidade = validator.trim(validator.escape(req.param('nacionalidade')));
    var uf = validator.trim(validator.escape(req.param('uf')));
    var cidade = validator.trim(validator.escape(req.param('cidade')));
    var estadocivil = validator.trim(validator.escape(req.param('estadocivil')));
    var nomeconjuge = validator.trim(validator.escape(req.param('nomeconjuge')));
    var escolaridade = validator.trim(validator.escape(req.param('escolaridade')));
    var sexo = validator.trim(validator.escape(req.param('sexo')));
    var telresidencial = validator.trim(validator.escape(req.param('telresidencial')));
    var telcelular = validator.trim(validator.escape(req.param('telcelular')));

    new db.User({
        'fullname': fullname,
        'cpf': cpf,
        'email': email,
        'password': password,
        'typedoc': typedoc,
        'numdoc': numdoc,
        'nomemae': nomemae,
        'nomepai': nomepai,
        'nacionalidade': nacionalidade,
        'uf': uf,
        'cidade': cidade,
        'estadocivil': estadocivil,
        'nomeconjuge': nomeconjuge,
        'escolaridade': escolaridade,
        'sexo': sexo,
        'telresidencial': telresidencial,
        'telcelular': telcelular,
        created_at: new Date()
    }).save(function (error, user) {
        if (error) {
            res.json({ error: 'Não foi possivel salvar o usuário' });
        } else {
            res.json(user);
        }
    });

});
app.put('/updateuser', function (req, res) {
    var _id = validator.trim(validator.escape(req.param('_id')));
    var fullname = validator.trim(validator.escape(req.param('fullname')));
    var cpf = validator.trim(validator.escape(req.param('cpf')));
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));
    var typedoc = validator.trim(validator.escape(req.param('typedoc')));
    var numdoc = validator.trim(validator.escape(req.param('numdoc')));
    var nomemae = validator.trim(validator.escape(req.param('nomemae')));
    var nomepai = validator.trim(validator.escape(req.param('nomepai')));
    var nacionalidade = validator.trim(validator.escape(req.param('nacionalidade')));
    var uf = validator.trim(validator.escape(req.param('uf')));
    var cidade = validator.trim(validator.escape(req.param('cidade')));
    var estadocivil = validator.trim(validator.escape(req.param('estadocivil')));
    var nomeconjuge = validator.trim(validator.escape(req.param('nomeconjuge')));
    var escolaridade = validator.trim(validator.escape(req.param('escolaridade')));
    var sexo = validator.trim(validator.escape(req.param('sexo')));
    var telresidencial = validator.trim(validator.escape(req.param('telresidencial')));
    var telcelular = validator.trim(validator.escape(req.param('telcelular')));

    
    db.User.findById({ _id: _id }, function (error, user) {
        if (fullname) {
            user.fullname = fullname;
        }
        if (cpf) {
            user.cpf = cpf;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        if (typedoc) {
            user.typedoc = typedoc;
        }
        if (numdoc) {
            user.numdoc = numdoc;
        }
        if (nomemae) {
            user.nomemae = nomemae;
        }
        if (nomepai) {
            user.nomepai = nomepai;
        }
        if (nacionalidade) {
            user.nacionalidade = nacionalidade;
        }
        if (uf) {
            user.uf = uf;
        }
        if (cidade) {
            user.cidade = cidade;
        }
        if (estadocivil) {
            user.estadocivil = estadocivil;
        }
        if (typedoc) {
            user.nomeconjuge = nomeconjuge;
        }
        if (escolaridade) {
            user.escolaridade = escolaridade;
        }
        if (sexo) {
            user.sexo = sexo;
        }
        if (telresidencial) {
            user.telresidencial = telresidencial;
        }
        if (telcelular) {
            user.telcelular = telcelular;
        }

        user.save(function (error, user) {
            if (error) {
                res.json({ error: 'Não foi possivél salvar o usuário' });
            } else {
                res.json(user);
            }
        });

    });

});
app.delete('/deleteUser/:id', function (req, res) {

    var id = validator.trim(validator.escape(req.param('id')));
    db.User.findById(id, function (error, user) {
        if (error) {
            res.json({ error: "Não foi possivél retornar os usuário" })
        } else {
            user.remove(function (error) {
                if (!error) {
                    res.json({ response: 'Usuário excluido com sucesso' });
                }
            });
        }
    });
});
/*============================== USER ==============================*/

/*============================== EMPRESTIMO ==============================*/
app.get('/listAllEmprestimos', function (req, res) {

    db.Emprestimo.find({}, function (error, emprestimo) {

        if (error) {
            res.json({ error: "Não foi possivél retornar os usuários" });
        } else {
            res.json(emprestimo);
        }
    });
});
app.post('/createEmprestimo', function (req, res) {
    var renda = validator.trim(validator.escape(req.param('renda')));
    var valemprestimo = validator.trim(validator.escape(req.param('valemprestimo')));
    var numparcelas = validator.trim(validator.escape(req.param('numparcelas')));
    var valtotal = validator.trim(validator.escape(req.param('valtotal')));
    var valparcelas = validator.trim(validator.escape(req.param('valparcelas')));
    var status = validator.trim(validator.escape(req.param('status')));
    var iduser = validator.trim(validator.escape(req.param('iduser')));

    new db.Emprestimo({
        iduser: iduser,
        renda: renda,
        valemprestimo: valemprestimo,
        numparcelas: numparcelas,
        valtotal: valtotal,
        valparcelas: valparcelas,
        status: status,
        created_at: new Date()
    }).save(function (error, emprestimo) {
        if (error) {
            res.json({ error: 'Não foi possivel salvar os dados do empréstimo.' });
        } else {
            res.json(emprestimo);
        }
    });
});
app.get('/emprestimo/:id', function (req, res) {
    var id = validator.trim(validator.escape(req.param('id')));
    db.Emprestimo.findById(id, function (error, emprestimo) {
        if (error) {
            res.json({error:"Não foi possivel retornar o emprestimo."})
        } else {
            res.json(emprestimo);
        }
    });
});
app.delete('/deleteEmprestimo/:id', function (req, res) {

    var id = validator.trim(validator.escape(req.param('id')));
    db.Emprestimo.findById(id, function (error, emprestimo) {
        if (error) {
            res.json({ error: "Não foi possivél retornar os usuário" })
        } else {
            emprestimo.remove(function (error) {
                if (!error) {
                    res.json({ response: 'Empréstimo excluido com sucesso' });
                }
            });
        }
    });
});
app.put('/updateEmprestimo/:id', function (req, res) {
    var renda = validator.trim(validator.escape(req.param('renda')));
    var valemprestimo = validator.trim(validator.escape(req.param('valemprestimo')));
    var numparcelas = validator.trim(validator.escape(req.param('numparcelas')));
    var valtotal = validator.trim(validator.escape(req.param('valtotal')));
    var valparcelas = validator.trim(validator.escape(req.param('valparcelas')));

    db.Emprestimo.findById(id, function (error, emprestimo) {

        if (renda) {
            emprestimo.renda = renda;
        }
        if (valemprestimo) {
            emprestimo.valemprestimo = valemprestimo;
        }
        if (numparcelas) {
            emprestimo.numparcelas = numparcelas;
        }
        if (valtotal) {
            emprestimo.valtotal = valtotal;
        }
        if (valparcelas) {
            emprestimo.valparcelas = valparcelas;
        }

        emprestimo.save(function (error, emprestimo) {
            if (error) {
                res.json({ error: 'Não foi possivél salvar o usuário' });
            } else {
                res.json(emprestimo);
            }
        });

    });

});
app.put('/alteraStatus', function (req, res) {
    var _id = validator.trim(validator.escape(req.param('_id')));
    var status = validator.trim(validator.escape(req.param('status')));

    db.Emprestimo.findById({ _id: _id }, function (error, emprestimo) {

        if (status) {
            emprestimo.status = status;
        }

        emprestimo.save(function (error, emprestimo) {
            if (error) {
                res.json({ error: 'Não foi possivel alterar o status.' });
            } else {
                res.json(emprestimo);
            }

        });      
    });
});
/*============================== EMPRESTIMO ==============================*/


/*============================== LISTA EMPRESTIMO ==============================*/
app.post('/emprestimosByUser', function (req, res) {
    var iduser = validator.trim(validator.escape(req.param('iduser'))); 

    db.Emprestimo.find({ iduser: iduser, status : {$ne: "Cancelado" } }, function (error, emprestimo) {

        if (error) {
            res.json({ error: 'Não foi possivél salvar o usuário' });
        } else {
            res.json(emprestimo);
        }
    });
});
/*============================== LISTA CIDADES ==============================*/
app.post('/listAllCidades', function (req, res) {

    var estado = validator.trim(validator.escape(req.param('estado')));
    db.Uf_cidades.find({ "_id": "5911c9646bb677446da47404"},{ estados: { $elemMatch: { "sigla": estado } } }, function (error, cidades) {

        if (error) {
            res.json({ error: "Não foi possivél retornar os usuários" });
        } else {
            res.json(cidades);
        }
    });
});
/*============================== LISTA CIDADES ==============================*/
