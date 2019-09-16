const express   = require('express')
const app       = express()
const port      = 3000

const jwt       = require('jsonwebtoken');


app.get('/token', (req, res) => {
    var test = {
        'hello': 1,
        'world': 2
    }
    let token = jwt.sign(test, 'test123');

    res.send(token);
});

app.get('/secret', isAuthenticated, (req, res) => {
    res.send('Alpha is One')
});

app.get('/open', (req, res) => {
    res.send('Welcome');
});

function isAuthenticated (req, res, next) {
    if (typeof req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'test123', (err, user) => {
            if (err) {
                res.status(401).json({
                    "error": true,
                    "message": "Invalid Token"
                });
                //throw new Error('Invalid Token');
            }

            console.log(user);
            return next();
        });
    } else {
        res.status(401).json({
            "error": true,
            "message": "Phishing Detected"
        });
        //throw new Error('Phishing Detected');
    }
}

app.listen(
    port,
    () => {
        console.log('Listening: ' + port);
    }
);