angular.module("ecommerce", ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "../html/index.html"
            })
            .state('turbos',{
                url:'/turbos',
                parent:'home',
                templateUrl: "../html/turbos.html"
            })
            .state('contact',{
                url:'/contact',
                parent:'home',
                templateUrl: "../html/contact.html"
            })
            .state('packages',{
                url:'/packages',
                templateUrl: "../html/packages.html",
                controller: 'packagesCtrl'

            })
            .state('downpipes',{
                url:'/booked/:id',
                templateUrl: "../html/downpipes.html",
                controller: 'downpipesCtrl'

            })
            .state('intakes',{
                url:'/locations',
                templateUrl: "../html/intakes.html",
                controller: 'intakesCtrl'

            });

        $urlRouterProvider
            .otherwise('/');
    });
