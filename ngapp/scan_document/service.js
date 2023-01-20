(function() {
    'use strict';
    angular
        .module('app')
        .factory('ScanDocSvc', ScanDocSvc)

    ScanDocSvc.$inject = ['baseService'];

    function ScanDocSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/scandoc';
        return service;
    }
})();