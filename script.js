var app = {
	nyTimesArticles : [],
	nytData : [],

	initialize: function() {
		app.getNYTimesData();
		$('#keyword').keypress(function() {
			app.getKeyword(this);
		});
	},

	makeHTML: function() {
		var theHTML = '';
		for (var i = 0; i < app.nyTimesArticles.length; i++){
			theHTML += "<a href='" + app.nyTimesArticles[i].web_url + "'>";
			theHTML += "<div class='nytArticle'>";
			theHTML += "<h3>" + app.nyTimesArticles[i].headline.main + "</h3>";
			theHTML += "</div>";
			theHTML += "</a>"
		}
		$('.container').html(theHTML);
	},

	getKeyword: function(that) {
		const keyword = $(that).val();
		app.getNYTimesData(keyword);
	},

	getNYTimesData: function(kw) {
		console.log("Get NY Times Data");
		// var currentSearchWord = 'apple';
		var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + kw + '&page=0&sort=newest&api-key=';
		var myNYKey = 'M0Oi5ASy0G1tPpm886HUwJETU4mTLhn9';
		var nyTimesReqURL = nyTimesURL + myNYKey;
		console.log(nyTimesReqURL);
		$.ajax({
			url: nyTimesReqURL,
			type: 'GET',
			dataType: 'json',
			error: function(err){
				console.log("Uh oh...");
				console.log(err);
			},
			success: function(data){
				//console.log(data);
				app.nyTimesArticles = data.response.docs;
				console.log(app.nyTimesArticles);
				app.makeHTML();
			}
		});
	}
};