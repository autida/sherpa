angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ocLazyLoadProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $ocLazyLoadProvider.config({
            debug: false,
        });
        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: COMURL + 'full.html?v=' + VERSION,
            })
            .state('app.main', {
                url: '/',
                templateUrl: APPURL + 'dashboard/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [APPURL + 'dashboard/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Dashboard',
                },
            })
            .state('app.menu', {
                url: '/add-menu',
                templateUrl: APPURL + 'dashboard/menu.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [APPURL + 'dashboard/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Developer Settings',
                },
            })
            .state('app.profile', {
                url: '/view-profile',
                templateUrl: COMURL + 'profile/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [COMURL + 'profile/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'View Profile',
                },
            })

        //TRANSACTION
        .state('app.transaction', {
                abstract: true,
            })
            .state('app.transaction.file-import', {
                url: '/file-import',
                templateUrl: TRANSURL + 'fileImport/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'fileImport/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > File Import',
                    urlGroup: 'Transaction',
                    formName: 'File Import',
                },
            })
            .state('app.transaction.cc-application', {
                url: '/cc-application',
                templateUrl: TRANSURL + 'checkCashApplication/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'checkCashApplication/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Check & Cash Application',
                    urlGroup: 'Transaction',
                    formName: 'Check & Cash Application',
                },
            })
            //REPORTS
            .state('app.reports', {
                abstract: true,
            })
        $locationProvider.hashPrefix('');
    },
]);