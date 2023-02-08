//main.js
angular
    .module("app")
    .controller("FileImportCtrl", FileImportCtrl)
FileImportCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector","$filter"];
function FileImportCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    var filter = $injector.get("$filter");
    vm.date = new Date();
    vm.salesDate = new Date();

    $ocLazyLoad
        .load([TRANSURL + "fileImport/service.js?v=" + VERSION])
        .then(function(d) {
            FileImportSvc = $injector.get("FileImportSvc");
        });
    vm.submitFile = function() {
        var exdate = filter('date')(vm.date, 'yyyy-MM-dd');
        var newData = new FormData();
        newData.append('file',vm.exFile);
        newData.append('date',exdate);
        newData.append('upload', true);
        LOADING.classList.add('open');
        FileImportSvc.upload(newData).then(function(response){
            if(response.success){
                if(response.id){
                    FileImportSvc.showSwal('Success',response.message,'success');
                }else{
                    FileImportSvc.showSwal('Success',response.message,'success');
                }
            }else{
                FileImportSvc.showSwal('Warning',response.message,'warning');
            }
            LOADING.classList.remove('open');
        });
       
    }
    vm.submitSalesFile = function() {
        var salesDate = filter('date')(vm.salesDate, 'yyyy-MM-dd');
        var newData = new FormData();
        newData.append('file',vm.salesFile);
        newData.append('salesDate',salesDate);
        newData.append('uploadSales', true);
        LOADING.classList.add('open');
        FileImportSvc.upload(newData).then(function(response){
            if(response.success){
                if(response.id){
                    FileImportSvc.showSwal('Success',response.message,'success');
                }else{
                    FileImportSvc.showSwal('Success',response.message,'success');
                }
            }else{
                FileImportSvc.showSwal('Warning',response.message,'warning');
            }
            LOADING.classList.remove('open');
        });
       
    }
}