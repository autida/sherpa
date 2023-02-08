(function() {
    'use strict';
    angular
        .module('app')

    .factory('FileImportSvc', FileImportSvc)

    FileImportSvc.$inject = ['baseService'];

    function FileImportSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/Excel_Reader';
        return service;
    }
})();