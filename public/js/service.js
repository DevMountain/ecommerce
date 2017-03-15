angular.module('ecommerce').service('service', function($http) {

  this.getTurbos = function() {
    return $http({
      method: 'GET',
      url: "/turbos"
    }).then(function(response){
      return response.data
    })
  },
  this.getExhaust = function() {
    return $http({
      method: 'GET',
      url: "/Exhaust"
    }).then(function(response){
      return response.data
    })
  }


});
