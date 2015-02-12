'use strict';

var _ = require('lodash');

angular.module('plotsControllerModule', [])
  .controller('PlotsController', [
    '$scope', '$http',
    function PlotsController($scope, $http) {
  
      var plots = [];

      function doStuff(plots) {
        var plots = plots.sort(function(a, b){
          return b.length - a.length;
        });

        // console.log(plots[0], plots[0].length, plots[1], plots[1].length);

        var trimmedString = plots[0].slice(plots[1].length);
        // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

        console.log(trimmedString)

        // plots[0] = trimmedString;
        // plots[1] = plots[1].replace(/\.$/, "");
        // plots = plots.join(' ');

        $scope.plots = plots;

      }

      $scope.searchFilms = function() {
        
        // Empty array
        plots = [];

        // Search terms designed to return very general results
        var words = ['the', 'you', 'me', 'us', 'our', 'love', 'war',
          'hate', 'red', 'blue', 'green', 'yellow', 'black', 'white',
          'sex', 'bird', 'tree', 'cat', 'dog', 'bear', 'day', 'night',
        ];

        var firstTerm = _.shuffle(words)[0];
        var secondTerm = _.shuffle(words)[0];

        // 1. Search first term
        // 2. Pick one from a shuffled array & search by that ID
        // 3. Push the plot of the returned film to the array
        // 4. Repeat above steps for second search term
        // 5. Do stuff with final array
        $http.get("http://www.omdbapi.com/?r=json&s="+firstTerm)
          .then(function(response){
            var shuffled = _.shuffle(response.data.Search)[0];
            $http.get("http://www.omdbapi.com/?r=json&i="+shuffled.imdbID)
              .then(function(response){
                plots.push(response.data.Plot);
              })
              .then(function(){
                $http.get("http://www.omdbapi.com/?r=json&s="+secondTerm)
                  .then(function(response){
                    var shuffled = _.shuffle(response.data.Search)[0];
                    $http.get("http://www.omdbapi.com/?r=json&i="+shuffled.imdbID)
                      .then(function(response){
                        plots.push(response.data.Plot);
                      }).then(function(){
                        doStuff(plots);
                      });
                  });
              })
          });
      }

    }
  ]);