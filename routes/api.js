// const db = require("../models/index.js");
// const encrypt = require("../encryption.js");
// const igdb = require("igdb-api-node").default;
// const client = igdb("1d706ee81a194c98319d627fd48b6673");
// const router = require("express").Router();
// // const User = require("../models/user.js");


// //var user = require("../models/user.js");

// //module.exports = function (app) {
//     router.get("/", (req, res) => {
//         db.Post.findAll({}).then(results => {
//             console.log(results);
//             res.render('index', results);
//         })
//     });

//     router.get("/game/search/:gameName", (req, res) => {
//         client
//             .games({
//                 search: req.params.gameName,
//                 limit: 1,
//                 fields: "*"
//             })
//             .then(response => {
//                 console.log(response);

//                 var d = new Date(response.body[0].release_dates[0].date);
//                 d.toISOString();

//                 var day = d.toISOString();
//                 newDay = day.slice(0, 10);

//                 var list = {
//                     name: response.body[0].name,
//                     release_dates: newDay,
//                     rating: response.body[0].rating,
//                     cover: response.body[0].cover.url,
//                     summary: response.body[0].summary
//                 };
//                 console.log(list);
//                 res.render("game", list);
//             })
//             .catch(error => {
//                 throw error;
//             });
//     });

//     router.get("/user/:screen_name", (req, res) => {
//         db.User.findOne({
//             where: {
//                 screen_name: req.params.screen_name
//             },
//             include: [
//                 db.Post
//             ]
//         }).then(data => {
//             console.log(data);
//             res.render("profile", data);
//         });
//     });

//     router.get("/signin", (req, res) => {
//         res.render("signin");
//     });

//     router.post("/signin", (req, res) => {
//         db.User.findOne({
//             where: {
//                 screen_name: req.body.screen_name
//             }
//         }).then(results => {
//             if (
//                 results.screen_name === req.body.screen_name &&
//                 encrypt.decrypt(results.password) === req.body.password
//             ) {
//                 var token = "t" + Math.random();
//                 results.token = token;
//                 res.cookie("token", token);
//                 req.session.user = results;
//                 results
//                     .update({
//                         token: token,
//                         where: {
//                             screen_name: req.body.screen_name
//                         }
//                     })
//                     .then(response => {
//                         return res.render("", response);
//                     });
//             } else {
//                 return res.send("Sorry, account was not found.");
//             }
//         });
//     });

//     router.get("/register", (req, res) => {
//         res.render("register");
//     });

//     router.post("/register", (req, res) => {
//         db.User.findOne({
//             where: {
//                 screen_name: req.body.screen_name
//             }
//         }).then(result => {
//             if (result) {
//                 return res.send(
//                     "Sorry, this username is already taken! Please choose another."
//                 );
//             } else if (req.body.password.length < 8) {
//                 return res.send("Please choose a password longer than 8 characters.");
//             } else if (req.body.image === "") {
//                 db.User.create({
//                         screen_name: req.body.screen_name,
//                         password: encrypt.encrypt(req.body.password),
//                         routeName: req.body.screen_name.replace(/\s+/g, "").toLowerCase()
//                     })
//                     .then(response => {
//                         res.json(response);
//                     })
//                     .catch(error => {
//                         res.json(error);
//                     });
//             } else {
//                 db.User.create({
//                         screen_name: req.body.screen_name,
//                         password: encrypt.encrypt(req.body.password),
//                         routeName: req.body.screen_name.replace(/\s+/g, "").toLowerCase(),
//                         image: req.body.image
//                     })
//                     .then(response => {
//                         res.json(response);
//                     })
//                     .catch(error => {
//                         res.json(error);
//                     });
//             }
//         });
//     });

//     router.get("/search/:query", (req, res) => {
//         console.log("hello");
//         client
//             .games({
//                 limit: 10,
//                 search: req.params.query
//             }, ["name", "cover", "release_dates.date"])
//             .then(response => {
//                 var body = response.body;
//                 var games = [];
//                 for (var i = 0; i < body.length; i++) {
//                     if (!body[i].cover) {
//                         var placeholder = "../img/placeholder.png";
//                         var gameObj = {
//                             id: body[i].id,
//                             name: body[i].name,
//                             cover: placeholder
//                         };
//                     } else {
//                         var gameObj = {
//                             id: body[i].id,
//                             name: body[i].name,
//                             cover: "https:" + body[i].cover.url
//                         };
//                     }
//                     games.push(gameObj);
//                 }
//                 res.render("search", games);
//             })
//             .catch(error => {
//                 throw error;
//             });
//     });




//     router.post("/game/search/:name/reviews", (req, res) => {
//         if (req.session.user) {
//             db.Post.create({
//                 title: req.body.title,
//                 rating: req.body.rating,
//                 body: req.body.body,
//                 gameName: req.params.name,
//                 UserId: req.session.user.id
//             }).then(results => {
//                 res.json(results);
//             });
//         } else {
//             res.send("Please signin");
//         }
//     });

//     router.get("/game/search/:name/reviews", (req, res) => {
//         db.Post.findAll({
//             where: {
//                 gameName: req.params.name
//             },
//             include: [
//                 db.User
//             ]
//         }).then(results => {
//             res.render("review", results);
//         });
//     });

//     router.get("/logout", function (req, res, next) {
//         if (req.session) {
//             req.session.destroy(function (err) {
//                 if (err) {
//                     return next(err);
//                 } else {
//                     return res.redirect("/");
//                 }
//             });
//         }
//     });

//     router.delete('/review/delete/:name/:id', (req, res) => {
//         db.Post.destroy({
//             where: {
//                 id: req.params.id,
//                 gameName: req.params.name
//             }
//         }).then(response => {
//             res.json(response);
//         })
//     });

//     router.get('/review/edit/:id', (req, res) => {
//         db.Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//             include: [
//                 db.User
//             ]
//         }).then(result => {
//             res.render('edit', result)
//         })
//     })

//     router.put('/submitreview/edit/:id', (req, res) => {
//         db.Post.update({
//             title: req.body.title,
//             body: req.body.body,
//             rating: req.body.rating
//         }, {
//             where: {
//                 id: req.params.id,
//             }
//         }).then(response => {
//             res.json(response);
//         })
//     });


//     router.get("/checklogin", (req, res) => {
//         if (req.session.user) {
//             res.send('user already logged');
//         } else {
//             res.redirect("/signin");
//         }
//     });

//     router.get("/api/getid/", function (req, res) {
//         res.send(req.session);
//     });

   
// // };