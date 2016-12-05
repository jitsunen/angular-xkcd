'use strict';

/**
 * @ngdoc function
 * @name movieManiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the movieManiaApp
 */
var app = angular.module('movieManiaApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.comics = [];
    $scope.busy = false;
    $scope.urlTemplate = "http://xkcd.com/%u/info.0.json";

    $scope.comicSuccess = function(data){
      var comic = data.data;
      $scope.comics.push(comic);
      $scope.currentComicNumber = comic.num;
      $scope.busy = false;
    };

    $scope.comicError = function(data){
      // error handling
    };

    $scope.nextComic = function(){
      if(this.busy) return;
      this.busy = true;

      var url = "http://xkcd.com/" + ($scope.currentComicNumber - 1) + "/info.0.json";
      $http.get(url).then(this.comicSuccess, this.comicError);
    };

    $http.get("http://xkcd.com/info.0.json").then($scope.comicSuccess, $scope.comicError);

  });
