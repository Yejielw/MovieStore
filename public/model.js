app.factory('myModel', function($http) {
	var searchedMovies = [];
	var learnMore = [];
	var movies =[{name: 'movi1', price: 2}, {name:' movie 2', price: 3}];
	var myMovies = [];
	var totalO = [0];
	
	var urlKey = 'https://api.themoviedb.org/3/search/movie?api_key=bacd6ece685813c8f8b734ded38b8fa2&query=';
	var learnUrl = 'https://api.themoviedb.org/3/movie/';
	var learnKey = '?api_key=bacd6ece685813c8f8b734ded38b8fa2';
	var imgUrl= 'https://image.tmdb.org/t/p/w500'

	var addMovieUrl = function (text) {
	   var input = text
	   input = input.replace(/ /g,'+');
	   var urlFinal = urlKey.concat(input);

	   searchedMoviesData(urlFinal);
	}; 

    var searchedMoviesData = function(text) {
      $http.get(text).then(function(response) {
          searchedMovies.unshift(response.data);
 
       });

    };

    var searchMovieInfo = function(text) {
      $http.get(text).then(function(response) {
          learnMore.push(response.data);
       });

    };


    var learnMoreMovie = function(text) {
        var inputt = text.id;
        var urlFinal1 = learnUrl.concat(inputt);
        var urlFinal2 = urlFinal1.concat(learnKey)
        var img = text.poster_path
        imgUrlFinal = imgUrl.concat(img)
        searchMovieInfo(urlFinal2);
       // getImg(imgUrlFinal);

    };

    /*var getImg = function () {
    	$http.get(text).then(function(response) {

        //learnMore.push(response.data);
       });
    }*/

	var AddToCart = function (x) {
		var tempVar = x ;
		var temp;
		
		for (var i = 0; i < myMovies.length; i++) {

				if (myMovies[i].id === tempVar.id){
					temp = myMovies[i].id
					alert('you have that already')
					return;
				};
		};
		if (temp){
			alert('you have that already');
		}else {
			myMovies.push(tempVar);
			totalO[0] = totalO[0] + tempVar.price;
		}
		

	};

		
	var removeFromCart = function (item) {
		var index = item;
		console.log(index)
		totalO[0] = totalO[0] - index.price;
		myMovies.splice(index, 1);
		 console.log(searchedMovies)


	};

	var moviesObj = {
		collection: myMovies,
		list: movies,
		add: AddToCart,
		remove: removeFromCart,
		total: totalO,
		search: addMovieUrl,
		searched: searchedMovies,
		learn: learnMoreMovie,
		list2: learnMore
		
	} ;

	return moviesObj;
});