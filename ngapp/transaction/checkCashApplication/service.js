(function() {
    'use strict';
    angular
        .module('app')

    .factory('CheckCashApplicationSvc', CheckCashApplicationSvc)

    CheckCashApplicationSvc.$inject = ['baseService'];

    function CheckCashApplicationSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/Check_Cash_Application';
        return service;
    }
})();