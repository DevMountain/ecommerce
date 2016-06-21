angular.module('eCommerce')
	.service('mainService', function($http){
		this.getProducts = function () {
			return $http.get('/api/products');
		}

		this.addProduct = function (product) {
			return $http.post('/api/products', product);
		}


// end of mainService		
	})