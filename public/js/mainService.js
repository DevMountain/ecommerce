angular.module('eCommerce')
	.service('mainService', function($http){
		this.getProducts = function () {
			return $http.get('/api/products');
		}

		this.addProduct = function (product) {
			return $http.post('/api/products', product);
		}

		this.deleteProduct = function (mongoId) {
			console.log(mongoId);
			return $http.delete('/api/products/' + mongoId);
		}


// end of mainService		
	})