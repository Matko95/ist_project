let mysql  = require('mysql'),
    jwt    = require('jsonwebtoken'),
    config = require('./config').config;

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'servis'
});

connection.connect();

let auth = (req, res) => {
    console.log(req.body);
    let body = req.body;
    let { username, password } = body;

    const query = `SELECT * FROM korisnik WHERE korisnicko_ime='${username}'`;

    connection.query(query, (error, user, fields) => {
        if(error){
            console.error(error);
            return res.status(400).send({
                message: error,
                ok: false
            });
        }
        console.log(user, query);
        if(user.length === 0) return res.status(404).send({ message: 'Korisnik ne postoji.', ok: false });

        if(user[0].lozinka !== password) return res.status(400).send({ message: 'Pogresna lozinka', ok: false });

        let token = jwt.sign(user[0], config.secret, {
            expiresIn: 1440 * 30
        });

        res.send({
            jwt: token,
            ok: true
        });
    });
};

let getAutomobili = (req, res) => {
    let token = req.header('authorization').split(' ')[1];
    const query = `SELECT * FROM automobil`;

    try {
        const decoded = jwt.verify(token, config.secret);

        connection.query(query, (error, results, fields) => {
            if(error) {
                console.error(error);
                return res.status(400).send({
                    message: 'MYSQL error',
                    ok: false
                })
            }

            res.status(200).send(results);
        })
    } catch(err) {
        console.log(err);
        res.status(401).send({error: 'Session expired or unauthorized access.'});
    }
};

let getPopravke = (req, res) => {
    let token = req.header('authorization').split(' ')[1];
    const query = `SELECT * FROM popravka`;

    try {
        const decoded = jwt.verify(token, config.secret);

        connection.query(query, (error, results, fields) => {
            if(error) {
                console.error(error);
                return res.status(400).send({
                    message: 'MYSQL error',
                    ok: false
                })
            }

            res.status(200).send(results);
        })
    } catch(err) {
        console.log(err);
        res.status(401).send({error: 'Session expired or unauthorized access.'});
    }
};

let getKorisnici = (req, res) => {
    let token = req.header('authorization').split(' ')[1];
    const query = `SELECT id_korisnik, korisnicko_ime FROM korisnik`;

    try {
        const decoded = jwt.verify(token, config.secret);

        connection.query(query, (error, results, fields) => {
            if(error) {
                console.error(error);
                return res.status(400).send({
                    message: 'MYSQL error',
                    ok: false
                })
            }

            res.status(200).send(results);
        })
    } catch(err) {
        console.log(err);
        res.status(401).send({error: 'Session expired or unauthorized access.'});
    }
};

let obrisi = (req, res) => {
    let token = req.header('authorization').split(' ')[1];
    let id = req.params.id;
    let tabela = req.body.tabela;

    const query = `DELETE FROM ${tabela} WHERE id_${tabela}=${id}`;

    try {
        const decoded = jwt.verify(token, config.secret);

        connection.query(query, (error, results, fields) => {
            if(error) {
                console.error(error);
                return res.status(400).send({
                    message: 'MYSQL error',
                    ok: false
                })
            }

            res.status(200).send({
                ok:true,
                data: results
            });
        })
    } catch(err) {
        console.log(err);
        res.status(401).send({error: 'Session expired or unauthorized access.'});
    }
};


let applyRoutes = (app) => {
    app.get('/popravke', getPopravke);
    app.get('/automobili', getAutomobili);
    app.get('/korisnici', getKorisnici);
    app.post('/obrisi/:id', obrisi)
    app.post('/login', auth);
};


exports.applyRoutes = applyRoutes;