angular.module("ecommerce", ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "./html/main.html"
            })
            .state('turbos',
            {
                url:'/turbos',
                parent:'home',
                templateUrl: "../html/turbos.html"
            })
            .state('exhaust',{
                url:'/exhaust',
                parent:'home',
                templateUrl: "../html/exhaust.html"
            })
            .state('intercoolers',{
                url:'/intercoolers',
                templateUrl: "../html/intercoolers.html"

            })
            .state('clothing',{
                url:'/clothing',
                templateUrl: "../html/clothing.html"

            })
            .state('keychains',{
                url:'/keychains',
                parent:'home',
                templateUrl: "../html/keychains.html"
            })
            .state('steering-wheels',{
                url:'/steering-wheels',
                parent:'home',
                templateUrl: "../html/steeringwheels.html"
            })
            .state('seats',{
                url:'/seats',
                parent:'home',
                templateUrl: "../html/seats.html"
            })
            .state('shiftknobs',{
                url:'/shiftknobs',
                parent:'home',
                templateUrl: "../html/shiftknobs.html"
            })
            .state('contact',{
                url:'/contact/:id',
                templateUrl: "../html/contact.html",
                controller: 'contacCtrl'

            })

        $urlRouterProvider
            .otherwise('/');
    });
