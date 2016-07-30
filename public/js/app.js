angular.module("ecommerce", ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "../index.html"
            })
            .state('Packages',{
                url:'/turbos',
                parent:'home',
                templateUrl: "../html/packages.html"
            })
            .state('Performance',{
                url:'/turbos',
                parent:'home',
                templateUrl: "../html/turbos.html"
            })
            .state('cosmetics',{
                url:'/cosmetics',
                templateUrl: "../html/cosmetics.html",
                controller: 'cosmeticsCtrl'

            })
            .state('contact',{
                url:'/contact/:id',
                templateUrl: "../html/contact.html",
                controller: 'contacCtrl'

            })
            .state('intakes',{
                url:'/locations',
                templateUrl: "../html/intakes.html",
                controller: 'intakesCtrl'

            });

        $urlRouterProvider
            .otherwise('/');
    });
