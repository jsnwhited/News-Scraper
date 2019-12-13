var request = require("request");
var cheerio = require("cheerio")

var scrape = function (cb) {

    request("https://wwww.nytimes.com/section/technology", function(err, res, body){
        var $ = cheerio.load(body);

        var articles = [];
        $("a").each(function(i, element){
            var head = $(this).children("h2").text().trim();
            var sum = $(this).children("p").text().trim();

            if (head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
                
                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};