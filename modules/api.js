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
            expiresIn: 1440
        });

        res.send({
            jwt: token,
            ok: true
        });
    });
};

let getAutomobili = (req, res) => {
    const query = `SELECT * FROM korisnik`;

    connection.query(query, (error, results, fields) => {
        if(error) {
            console.error(error);
            return res.status(400).send({
                message: 'MYSQL error',
                ok: false
            })
        }

        res.send(results);
    })
};


let applyRoutes = (app) => {
    app.get('/automobili', getAutomobili);
    app.post('/login', auth);
};


exports.applyRoutes = applyRoutes;