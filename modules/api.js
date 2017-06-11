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

let getToken = (request) => {
    let header = request.header('Authorization');
    if(header && header.split(' ').length > 1)
        return header.split(' ')[1];
    return false;
}

let auth = (req, res) => {
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

let checkToken = (req, res) => {
    let token = getToken(req);

    try {
        jwt.verify(token, config.secret);
        res.status(200).send({
            ok: true,
            message: "Token valid."
        })
    } catch (e) {
        res.status(400).send({
            ok: false,
            message: "Token expired or invalid."
        })
    }
};

let getAutomobili = (req, res) => {
    let token = getToken(req);
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
    let token = getToken(req);
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
    let token = getToken(req);
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
        res.status(401).send({
            ok: false,
            error: 'Session expired or unauthorized access.'
        });
    }
};

let obrisi = (req, res) => {
    let token = getToken(req);
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

let editKorisnik = (req, res) => {
    let token = getToken(req);
    let id_korisnik = req.body.id_korisnik || "";
    let korisnicko_ime = req.body.korisnicko_ime || "";
    let lozinka = req.body.lozinka || "";

    const query = `UPDATE korisnik SET korisnicko_ime='${korisnicko_ime}', lozinka='${lozinka}' WHERE id_korisnik=${id_korisnik}`;

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
        res.status(401).send({
            ok: false,
            error: 'Session expired or unauthorized access.'
        });
    }
};

let editAutomobil = (req, res) => {
    let token = getToken(req);
    let id_automobil = req.body.id_automobil || "";
    let podaci = req.body.podaci || "";
    let status = req.body.status || "";
    let cena_popravke = req.body.cena_popravke || "";

    const query = `UPDATE automobil SET podaci='${podaci}', status='${status}', cena_popravke=${cena_popravke}
      WHERE id_automobil=${id_automobil}`;

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
        res.status(401).send({
            ok: false,
            error: 'Session expired or unauthorized access.'
        });
    }
};

let editPopravka = (req, res) => {
    let token = getToken(req);
    let id_popravka = req.body.id_popravka || "";
    let deo = req.body.deo || "";
    let cena_dela = req.body.cena_dela || "";

    const query = `UPDATE popravka SET deo='${deo}', cena_dela='${cena_dela}' WHERE id_popravka=${id_popravka}`;

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
        res.status(401).send({
            ok: false,
            error: 'Session expired or unauthorized access.'
        });
    }
};

let addAutomobil = (req, res) => {
    let token = getToken(req);
    let podaci = req.body.podaci || "";
    let status = req.body.status || "";
    let cena_popravke = req.body.cena_popravke || "";
    let popravka_id = req.body.popravka_id || "";
    let korisnik_id = req.body.korisnik_id || "";

    const query = `INSERT INTO automobil VALUES('','${podaci}', '${status}', '${cena_popravke}', ${popravka_id}, ${korisnik_id})`;
    console.log(query);

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
        res.status(401).send({
            ok: false,
            error: 'Session expired or unauthorized access.'
        });
    }
};

let addKorisnik = (req, res) => {
    let token = getToken(req);
    let korisnicko_ime = req.body.korisnicko_ime || "";
    let lozinka = req.body.lozinka || "";

    const query = `INSERT INTO korisnik VALUES ('', '${korisnicko_ime}', '${lozinka}')`;
    console.log(query);

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
        res.status(401).send({
            ok: false,
            error: 'Session expired or unauthorized access.'
        });
    }
};

let addPopravka = (req, res) => {
    let token = getToken(req);
    let deo = req.body.deo || "";
    let cena_dela = req.body.cena_dela || "";

    const query = `INSERT INTO popravka VALUES ('', '${deo}', '${cena_dela}')`;

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
        res.status(401).send({
            ok: false,
            error: 'Session expired or unauthorized access.'
        });
    }
};

let getAutomobiliByUser = (req, res) => {
    let token = getToken(req);
    let korisnik_id = req.params.id;

    const query = `SELECT * FROM automobil WHERE korisnik_id=${korisnik_id}`;

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
}





let applyRoutes = (app) => {
    app.get('/checkToken', checkToken);
    app.get('/popravke', getPopravke);
    app.get('/automobili', getAutomobili);
    app.get('/automobili/:id', getAutomobiliByUser);
    app.get('/korisnici', getKorisnici);
    app.post('/obrisi/:id', obrisi);
    app.post('/login', auth);
    app.post('/editkorisnici', editKorisnik);
    app.post('/editautomobili', editAutomobil);
    app.post('/editpopravke', editPopravka);
    app.post('/addautomobili', addAutomobil);
    app.post('/addkorisnici', addKorisnik);
    app.post('/addpopravke', addPopravka);
};


exports.applyRoutes = applyRoutes;