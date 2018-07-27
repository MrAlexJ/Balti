const db = require("../models");
const router = require("express").Router();


module.exports = function(app) {
    router.get("/", (req, res) => {
        db.User.findAll({}).then(results => {
            console.log(results)
        })
    })
}


router.post("/api/")