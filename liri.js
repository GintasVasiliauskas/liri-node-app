const keys = require("./keys.js");
const fs = require('fs')
const request = require('request')
const Spotify = require('node-spotify-api');
const twitter = require('twitter');
var spotify = new Spotify({
  id: 'fe15893ab0a34d2ebbc5a14d8a338309',
  secret: 'b3d7f128149f4a89a9ee24b93e7d03c0'
})


var argument1 = process.argv[2]
var argument2 = process.argv[3]
var argument3 = process.argv[4]




if (argument1=='spotify-this-song' && argument2) {
  spotifyGet(argument2)
} else if (argument1=='spotify-this-song' && !argument2) {
  spotifyGet("The Sign")
} else if (argument1=='my-tweets'){
  myTweets()
} else if (argument1=='movie-this' && argument2) {
  movieAPI(argument2)
} else if (argument1=='movie-this' && !argument2) {
  movieAPI('Mr. Nobody.')
} else if (argument1=='do-what-it-says') {
  random()
}

// //input should be
// * `my-tweets`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`




// 1. `node liri.js my-tweets`
//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.


function myTweets () {
  console.log ("Function is under construction, \nI was not able to create twitter account, \nACCESS DENIED error")
}








// 2. `node liri.js spotify-this-song '<song name here>'`
//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" by Ace of Base.


function spotifyGet (arr) {
  spotify.search({ type: 'track', query: arr, limit: 20 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var result = "Artist Name: " + data.tracks.items[0].artists[0].name +
              "\nSong Name: " + data.tracks.items[0].name +
              "\nPreview song here: " + data.tracks.items[0].preview_url +
              "\nAlbum: " + data.tracks.items[0].album.name


             console.log(result)
             logData(result)
  });
}







// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the request package to retrieve data from the OMDB API.
// Like all of the in-class activities, the OMDB API requires an API key.
// You may use `40e9cece`.


function movieAPI(arr) {
  var url = 'http://www.omdbapi.com/?apikey=40e9cece&t=' + arr +'&y=&plot=short&r=json&tomatoes=true';

  request(url,function(error,response,body){

     var movieResp = JSON.parse(body)

     var movieResults =
       "\nTitle: " + movieResp['Title'] +
        "\nYear: " + movieResp['Year'] +
        "\nIMDB Rating: " + movieResp['imdbRating'] +
        "\nRotten Tomatoes Rating: " + movieResp['tomatoRating'] +
        "\nCountry: " + movieResp['Country'] +
        "\nLanguage: " + movieResp['Language']+
        "\nPlot: " + movieResp['Plot']+
        "\nActors: " + movieResp['Actors']

     console.log(movieResults);
     logData(movieResults)
  })

};



// 4. `node liri.js do-what-it-says`
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Feel free to change the text in that document to test out the feature for other commands.

function random() {
  fs.readFile("./random.txt", "utf8", function(error, data) {
    if(error) {
      console.log('Error occurred: ' + error);
      return;
    }
    data = data.split(',');
    spotifyGet(data[1]);
  })
};




function logData(logEntry) {
  fs.appendFile("./log.txt", logEntry, function(error) {
    if(error) {
      throw error;
    }
  });
}
