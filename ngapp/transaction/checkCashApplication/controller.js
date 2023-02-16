//main.js
angular
    .module("app")
    .controller("CheckCashApplicationCtrl", CheckCashApplicationCtrl)
CheckCashApplicationCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector","$filter"];
function CheckCashApplicationCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    var filter = $injector.get("$filter");
    vm.date = new Date();
    vm.filtered = [];
    vm.dr = {
        enableRowSelection: true,
        enableCellEdit: false,
        enableColumnMenus: false,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: true,
        columnDefs: [
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center"><br><label>Invoice No.</label></div>', field: 'InvoiceNo'},
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center"><label>Invoice <br>Amount</label></div>', field: 'InvoiceAmount'},
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center"><label>Invoice <br>Amount Applied</label></div>', field: 'InvoiceAmountApplied'},
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center"><br><label>Invoice Date </label></div>', field: 'InvoiceDate'},
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center"><label>Invoice <br>Reference No.</label></div>', field: 'InvoiceReferenceNo'},
        ],
        data: 'vm.filtered',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                modal.clickrow(row.entity);
            });
        },
    }
    vm.payment_summary = {
        enableRowSelection: true,
        enableCellEdit: false,
        enableColumnMenus: false,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: false,
        columnDefs: [
            { headerCellTemplate: '<div style="vertical-align:center; font-size:1.3rem; text-align: center">Payment<br>Summary</div>', field: 'InvoiceNo'},
        ],
        data: 'vm.filtered',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                modal.clickrow(row.entity);
            });
        },
    }

    $ocLazyLoad
        .load([TRANSURL + "checkCashApplication/service.js?v=" + VERSION])
        .then(function(d) {
            CheckCashApplicationSvc = $injector.get("CheckCashApplicationSvc");
        });
}