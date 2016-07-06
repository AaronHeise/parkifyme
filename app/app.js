var app = angular.module('parkifyme', [])

  .controller('parkingSpotController', function($scope, spotFactory) {

    $scope.spot = {};

    $scope.addSpot = function() {
      console.log('Captured Inputs: ', $scope.spot);
      spotFactory.addSpot($scope.spot)
        .then(function() {
         console.log('Check spots.json, looks like this worked?')
        })
        .catch(function(error) {
          console.log('addSpot gave error: ', error);
        });
    };

  });

app.factory('spotFactory', function spotFactory($http) {

  var exports = {};

  exports.addSpot = function(spot) {
    // var data = JSON.stringify(spot);
    return $http.post('api/spot', spot)
      .error(function(data) {
        console.log('There was an error adding to spots.json', data);
      })
  }

  return exports;

});
