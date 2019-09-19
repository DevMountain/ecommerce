angular.module('eCommerce')
	.controller('mainCtrl', function ($scope, mainService) {
		
		$scope.getProducts = function () {
			mainService.getProducts()
			.then(function (response) {
				$scope.products = response.data;
				console.log($scope.products);
			})
		}

		$scope.addProduct = function (product){
			mainService.addProduct(product);
		}

		$scope.deleteProduct = function (mongoId) {
			mainService.deleteProduct(mongoId);
		}

		$scope.getProducts();



// end of mainCtrl		
	})