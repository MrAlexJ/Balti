const router = require("express").Router();
const db = require("../models");
const randToken = require("rand-token");
const encrypt = require("../encrypt/encryption");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');


router.post("/signup", function (req, res) {
    console.log(req.session);
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(result) {
        let token = randToken.generate(16);

        if (!result || result.email !== req.body.email) {
            let encryptPw = encrypt.encrypt(req.body.password);

            db.User.create({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
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

router.get("/api/getid/", function (req,res){
    res.send(req.session);
});

router.get("/api/users/:id", function (req, res) {
    db.User.findOne({
            where: {
                id: req.params.id
            },
        attributes: ["first_name", "last_name", "profile_img", "total_completed", "email"]
    }).then(function (dbUser) {
        res.json(dbUser);
    });
});

router.get("/", (req, res) => {
    db.User.findAll({}).then(results => {
        console.log(results)
    })
});

//gets all users completed list item that is > 3 (pull firstname, profile pic & completed total)
router.get("/api/userstats", (req, res) => {
    db.User.findAll({
        where: {
            total_completed: {
                [Op.gt]: 3
            },
            
        }
        }).then(results => {
            console.log("PLEASE: ", (results));
            // console.log(results[0].first_name);
            // console.log(results[0].total_completed);
            // console.log(results[1].first_name);
            // console.log(results[1].total_completed);
            res.json(results);
        });
});

//random display of user bucket list items that are public
router.get("/api/dashboard", (req, res) => {
    db.Bucket.findAll({
            where: {
                public: true,
                // list_type: "bucket"
            }
    }).then(function(results) {
        console.log("YOOOOOO")
        // console.log(results[0].bucket_items);
        // console.log(results[0].list_type);
        res.json(results)
    });
});

//display user wish list on their profile page
router.get("/api/wishlist", (req, res) => {
    db.Bucket.findAll({
        where: {
            list_type: "wish",
            UserId: req.session.user
        }
    }).then(function(wish) {
        res.json(wish)
    });
});

//post user wish items to database
router.post("/api/wishitems", (req, res) => {
    db.Bucket.create({
        bucket_items: req.body.bucket_items,
        list_type: req.body.list_type,
        public: req.body.public
    }, {
        include: [db.User]
    }).then(function(dbBucket) {
        res.json(dbBucket);
    })
});

//create user
router.post("/save", (req, res) => {
    console.log(req.session);

    db.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    total_completed: req.body.total_completed,
    UserId: req.session.user
    },
{
    include: [db.Bucket]

}).then(function (dbUser) {
        res.json(dbUser)
    });
});

//post user bucket list items to database
router.post("/api/profile", (req, res) => {
    console.log("BUCKET LIST POST")

    db.Bucket.create({
        bucket_items: req.body.bucket_items,
        list_type: req.body.list_type,
        public: req.body.public,
        completed: req.body.completed,
        date_complete: req.body.date_complete,
        image: req.body.image,
        UserId: req.session.user
    },
     {
        include: [db.User]
})
    .then(function(dbBucket) {
        res.json(dbBucket);
    });
});


router.get("/api/items/", (req, res) => {
    db.Bucket.findAll({
        where: {
            UserId: req.session.user,
            list_type: "bucket"
        }
    }).then(function(results) {
        console.log("Yayy")
        // console.log(results[0].bucket_items);
        // console.log(results[0].list_type);
        res.json(results)
    });
});

router.put("/api/completed/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    console.log(req.body)
    db.Bucket.update({
    //   completed: req.body.completed
    completed: req.body.completed
    },
    {
    where: {
        id: req.params.id
        }
    })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
    });
  });

  router.get("/api/done", (req, res) => {
    db.Bucket.findAll({
            where: {
                completed: true
            }
    }).then(function(results) {
        console.log("YOOOOOO")
        console.log(results[0].bucket_items);
        console.log(results[0].list_type);
        res.json(results)
    });
});
// Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
    cb(null, './client/public/assets/uploads');
  },
  filename: (req, file, cb) => {
    /*
      uuidv4() will generate a random ID that we'll use for the
      new filename. We use path.extname() to get
      the extension from the original file name and add that to the new
      generated ID. These combined will create the file name used
      to save the file on the server and will be available as
      req.file.pathname in the router handler.
    */
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });
//add bucket item from random list on dashboard to user wish list
router.post("/api/addlist", (req, res) => {
console.log("ADDEDDDDD ");
    db.Bucket.create({
        bucket_items: req.body.bucket_items,
        list_type: "wish",
        public: false,
        completed: false,
        UserId: req.session.user
    }, {
       include: [db.User]

    }).then(function(dbBucket) {
        res.json(dbBucket)
    });

});

router.get("/upload/profile/:id", (req, res) => {
    var condition = "id = " + req.params.id;

    console.log("upload");
    console.log("condition", condition);

    db.User.findAll({
        where: {
            id: req.params.id
        }
        }).then(results => {
        console.log(results);
    
        res.send(results);
    });
  });

  router.put("/upload/profile/:id", upload.single('selectedFile'), (req, res) => {

    var condition = "id = " + req.params.id;
    console.log("condition", condition);
  
      console.log("weee");
      console.log("id: " + req.params.id);
      console.log(req.file)
      /*
        We now have a new req.file object here. At this point the file has been saved
        and the req.file.filename value will be the name returned by the
        filename() function defined in the diskStorage configuration. Other form fields
        are available here in req.body.
      */

      db.User.update({
            profile_img: req.file.filename
        },
        {
            where: {
                id: req.params.id
            }
      })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => {
        res.json(err);
      });

    });

    //Search location and things to do routes

    router.put("/api/movelist/:id", function(req, res) {
        var condition = "id = " + req.params.id;
        console.log("condition", condition);
        console.log(req.body)
        db.Bucket.update({
        list_type: req.body.list_type
        },
        {
        where: {
            id: req.params.id,
            UserId: req.session.user
            }
        })
        .then((docs) => {
          res.json(docs);
        })
        .catch((err) => {
          res.json(err);
        });
      });

    


module.exports = router;

