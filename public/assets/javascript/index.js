
$(document).ready(function (){

var articleContainer = $(".article-container");
$(document).on("click", ".btn.save", handleArticleSave);
$(document).on("click", ".scrape-new", handleArticleScrape);




initPage();

function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=false")
        .then(function(data) {
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
}

function renderArticles(articles) {
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
        articlePannels.push(createPannel(articles[i]));
    }

    articleContainer.append(articlePanels);
}

function createPannel(article) {
    var panel = 
    $(["<div class ='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary, 
        "</div>",
        "</div>"
].join(""));

panel.data("_id", article._id);

return panel;
}

function renderEmpty() { 
    $(["<div class='alert alert-warning text-center'>",
        "<h4> there aint no articles!</h4>"
    ].join(""));

    articleContainer.append(emptyAlert);
}


function handleArticleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;

    $.ajax({
        method: "PATCH",
        url: "/api/headlines",
        data: articleToSave
    })
    .then(function(data){
        if(data.ok) {
            initPage();
            }
    });
  }

  function handleArticleScrape() {
      $.get("/api/fetch")
        .then(function(data) {

            initPage();
            bootbox.alert("<h3 class= 'text-center m-top-80'>" + data.message + "</h3>");

        });
  }

})