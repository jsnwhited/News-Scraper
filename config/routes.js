
var scrape = require("../scripts/scrape");

var headlinesController = require("../controllers/headline");
var notesController = require("../controllers/notes");

module.exports = function(router)  {
    router.get("/", function(req, res){
        res.render("home");
    });

    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res){
        headlinesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount ===0) {
                res.json({
                    message: "Nothing here!"
                });
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " articles" 
                });
            }
        });
    });
}

 