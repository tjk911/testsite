// Angular magic
var restaurantdb = angular.module('restaurantdb',[]);

restaurantdb.controller('dbresults', function ($scope, $http, $interval){
  console.log('fired');
  $scope.getData = function(){
    $http.get("data?_=" + Date.now()).success(function(response){
      $scope.restaurantdata = response;
      console.log('fetched');
    });
  }
  $scope.getData();
  $interval($scope.getData, 240000); //240 secs
  $http.get("data").success(function(response){
    $scope.restaurantdata = response;
    console.log($scope.restaurantdata);
  });
});