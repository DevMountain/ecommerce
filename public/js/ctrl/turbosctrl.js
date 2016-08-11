angular.module('ecommerce').controller('turbosctrl', function($scope, service) {

$scope.getTurbos = function(){
  service.getTurbos().then(function(response) {
    console.log(response);
    $scope.turbos = response
  })
};

$scope.getTurbos();

});
