const router = require("express").Router();
const db = require("../models");
const randToken = require("rand-token");
const encrypt = require("../encrypt/encryption");

router.post("/signup", function (req, res) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(result) {
        let token = randToken.generate(16);

        if (!result || result.email !== req.body.email) {
            let encryptPw = encrypt.encrypt(req.body.password);

            db.User.create({
                full_name: req.body.fullName,
                email: req.body.email,
                password: encryptPw,
                token: token
            }).then(function (dbUser) {
                res.cookie("TOKEN", token);
                req.session.user = dbUser.id;
                res.json(dbUser);
            });
        } else {
            res.send({
                "code": 304
            });
        };
    });
});

router.post("/login", function (req, res) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(result) {
        if (!result) {
            res.send({
                "code": 505
            });
        } else {
            let token = randToken.generate(16);
            let dbPassword = result.password;
            let decryptPw = encrypt.decrypt(dbPassword);

            if (result.email === req.body.email && decryptPw === req.body.password) {
                db.User.update({ token: token }, {
                    where: {
                        email: req.body.email
                    }
                }).then(function (data) {
                    if (!data) {
                        res.send("Log-in failure!");
                    } else {
                        res.cookie("TOKEN", token);
                        req.session.user = result.id;
                        res.send("Log-in success!");
                    };
                }).catch(function (error) {
                    res.send(error);
                });
            } else {
                res.send({
                    "code": 504
                });
            };
        };
    });
});

router.get('/signup', function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else if (req.cookie) {
        db.User.findOne({
            where: {
                token: req.session.user.token
            }
        }).then(function (result) {
            req.session.user = result.id;
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    };
});

router.get('/login', function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else if (req.cookie) {
        db.User.findOne({
            where: {
                token: req.session.user.token
            }
        }).then(function (result) {
            req.session.user = result.id;
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    };
});

router.get("/logout", function(req, res) {
    if (req.body) {
        res.clearCookie("TOKEN");
        req.session.destroy();
        res.end();
    } else {
        res.send({
            "code": 707
        });
    };
});



module.exports = router;

