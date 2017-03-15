angular.module("ecommerce", ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "./html/main.html"
            })
            .state('turbos',
            {
                url:'/turbos',
                templateUrl: "./html/turbos.html",
                controller: "turbosctrl"
            })
            .state('exhaust',{
                url:'/exhaust',
                templateUrl: "./html/exhaust.html"
            })
            .state('intercoolers',{
                url:'/intercoolers',
                templateUrl: "./html/intercoolers.html"

            })
            .state('clothing',{
                url:'/clothing',
                templateUrl: "./html/clothing.html"

            })
            .state('keychains',{
                url:'/keychains',
                templateUrl: "./html/keychains.html"
            })
            .state('suspension',{
                url:'/suspension',
                templateUrl: "./html/suspension.html"
            })
            .state('seats',{
                url:'/seats',
                templateUrl: "./html/seats.html"
            })
            .state('shiftknobs',{
                url:'/shiftknobs',
                templateUrl: "./html/shiftknobs.html"
            })
            .state('contact',{
                url:'/contact/:id',
                templateUrl: "./html/contact.html",
                // controller: 'contacCtrl'

            })

        $urlRouterProvider
            .otherwise('/');
    });
