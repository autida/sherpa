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
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center"><br>Invoice No.</div>', field: 'InvoiceNo'},
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center">Invoice <br>Amount</div>', field: 'InvoiceAmount'},
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center">Invoice <br>Amount Applied</div>', field: 'InvoiceAmountApplied'},
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center"><br>Invoice Date </div>', field: 'InvoiceDate'},
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center">Invoice <br>Reference No.</div>', field: 'InvoiceReferenceNo'},
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
            { headerCellTemplate: '<div style="vertical-align:center; font-size:0.9rem; text-align: center">Payment<br>Summary</div>', field: 'InvoiceNo'},
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