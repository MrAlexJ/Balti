const router = require("express").Router();
const db = require("../models");
const randToken = require("rand-token");
const encrypt = require("../encrypt/encryption");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


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
                first_name: req.body.first_name,
                last_name: req.body.last_name,
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

router.get("/logout", function (req, res) {
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

router.get("/", (req, res) => {
    db.User.findAll({}).then(results => {
        console.log(results)
    })
});

//gets all users completed list item that is > 4 (pull firstname, profile pic & completed total)
router.get("/api/userstats", (req, res) => {
    db.User.findAll({
        where: {
            total_completed: {
                [Op.gt]: 4
            },
            
        }
        }).then(results => {
            console.log("PLEASE: ", (results));
            console.log(results[0].first_name);
            console.log(results[0].total_completed);
            console.log(results[1].first_name);
            console.log(results[1].total_completed);
            res.json(results);
        });
});

//random display of user bucket list items that are public
router.get("/api/dashboard", (req, res) => {
    db.Bucket.findAll({
            where: {
                public: true
            }
    }).then(function(results) {
        console.log("YOOOOOO")
        console.log(results[0].bucket_items);
        console.log(results[0].list_type);
        res.json(results)
    });
});

//create user
router.post("/save", (req, res) => {
    console.log("HELLOOOOOO....");

    db.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    total_completed: req.body.total_completed,
    },
{
    include: [db.Bucket]

}).then(function (dbUser) {
        res.json(dbUser)
    });
});

router.post("/api/profile", (req, res) => {
    console.log("BUCKET LIST POST")

    db.Bucket.create({
        bucket_items: req.body.bucket_items,
        list_type: req.body.list_type,
        public: req.body.public,
        date_complete: req.body.date_complete,
        image: req.body.image,
    },
     {
        include: [db.User]
})
    .then(function(dbBucket) {
        res.json(dbBucket);
    });
});




module.exports = router;

