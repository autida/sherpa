angular
    .module("app")
    .controller("ScanDocCtrl", ScanDocCtrl)
    .controller("TagToCtrl",TagToCtrl)

ScanDocCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector","$filter"];
TagToCtrl.$inject = ["$scope", "$filter","data","$uibModalInstance"];

function ScanDocCtrl($scope, $ocLazyLoad, $injector,$filter) {
    var vm = $scope;
    vm.scandoc = {};
    vm.scandocdefault = {};
    vm.scandocar = [];
    vm.buttonclickedm = false;
    vm.scan = false;
    vm.scandoc.TaggedFrom = '';
    vm.tagto = '';
    vm.cashVoucher = [];
    vm.cashVoucherPetty = [];
    vm.checkVoucher = [];
    vm.JournalVoucher = [];
    vm.LiquidationData = [];
    vm.passToModal = [];
    vm.systemUser = {};
   
    // vm.img=true;
    
    $ocLazyLoad
    .load([
        TRANSURL + "scan_document/service.js?v=" + VERSION,
        MASTERURL + "doc_type/service.js?v=" + VERSION
    ])
    .then(function(d) {
        ScanDocSvc = $injector.get("ScanDocSvc");
        DocTypeSvc = $injector.get("DocTypeSvc");
        vm.scandoc.ScannedBy = $filter('uppercase')(vm.userName);
        vm.scandoc.ScannedByID =vm.user_id;
        vm.scandoc.ScanDateTime =  $filter('date')(new Date(),'LLLL d, y h:mm:ss a');
        
        vm.scandocdefault.ScannedBy = vm.scandoc.ScannedBy;
        vm.scandocdefault.ScannedByID =vm.scandoc.ScannedByID;
        vm.scandocdefault.ScanDateTime =  vm.scandoc.ScanDateTime;
        document.getElementById('img').src = 'assets/images/rms-background2.png';
        var f = document.getElementById('frame_modal');
        f.style.display = 'none';
        vm.authorization_check();
        vm.readCV();
        vm.readPCV();
        vm.readCheckV();
        vm.readJV();
        vm.readLF();

        
    });
    vm.readCV = function(){
        var data = {};
        data.cv = true;
        
        ScanDocSvc.get(data).then(function(response){
            if(response.message){
                vm.cashVoucher = [];
            }else{
                response.forEach(function(item){
                    vm.cashVoucher.push(item);
                })
            }
        })
    }
    vm.readPCV = function(){
        var data = {};
        data.pcv = true;
        
        ScanDocSvc.get(data).then(function(response){
            if(response.message){
                vm.cashVoucherPetty = [];
            }else{
                response.forEach(function(item){
                    vm.cashVoucherPetty.push(item);
                })
            }
        })
    }
    vm.readCheckV = function(){
        var data = {};
        data.checkv = true;
        
        ScanDocSvc.get(data).then(function(response){
            if(response.message){
                vm.checkVoucher = [];
            }else{
                response.forEach(function(item){
                    vm.checkVoucher.push(item);
                })
            }
        })
    }
    vm.readJV = function(){
        var data = {};
        data.jv = true;
        
        ScanDocSvc.get(data).then(function(response){
            if(response.message){
                vm.JournalVoucher = [];
            }else{
                response.forEach(function(item){
                    vm.JournalVoucher.push(item);
                })
            }
        })
    }
    vm.readLF = function(){
        var data = {};
        data.lf = true;
        ScanDocSvc.get(data).then(function(response){
            if(response.message){
                vm.LiquidationData = [];
            }else{
                response.forEach(function(item){
                    vm.LiquidationData.push(item);
                })
            }
        })
    }

    function getDTID(doctype){
        for (let index = 0; index < vm.scandocar.length; index++) {
            const element = vm.scandocar[index].DTName;
            if(element === doctype){
                vm.scandoc.DTID = vm.scandocar[index].DTID;
                vm.scandoc.DTAcronym = vm.scandocar[index].DTAcronym;
                return vm.scandoc.DTID;
            }
        }
    }
    vm.authorization_check = function(){
        
        if(vm.user_id){
            vm.read();
            vm.systemUser.position = $filter('lowercase')(vm.user_user_level);
        }
        else
            vm.logout();
    }
    vm.tag = function(){
        vm.showTagBtn = true;
    }
    vm.see = function(){
        alert(vm.scandoc.tagged);
    }
    // open new modal to search reference/tagged document
    vm.tagged = function(doc){
        vm.passToModal = []; //empty ang ipasa nga array para dili mag add app
        vm.scandoc.IsTagged = 1; //set istagged to one for saving sa database
        vm.tagto = doc;
        switch (doc) {
            case 'cv':
                vm.buttonclickedcv = true;
                vm.buttonclickedpcv = false;
                vm.buttonclickedjv = false;
                vm.buttonclickedchv = false;
                vm.buttonclickedlv = false;
                vm.scandoc.TaggedFrom = 'CASH VOUCHER';
                vm.passToModal.push(vm.scandoc.TaggedFrom);
                vm.passToModal.push(vm.cashVoucher);    
                break;
            case 'pcv':
                vm.buttonclickedpcv = true;
                vm.buttonclickedcv = false;
                vm.buttonclickedjv = false;
                vm.buttonclickedchv = false;
                vm.buttonclickedlv = false;
                vm.scandoc.TaggedFrom = 'PETTY CASH VOUCHER';
                vm.passToModal.push(vm.scandoc.TaggedFrom);
                vm.passToModal.push(vm.cashVoucherPetty);    
                break;
            case 'jv':
                vm.buttonclickedjv = true;
                vm.buttonclickedcv = false;
                vm.buttonclickedpcv = false;
                vm.buttonclickedchv = false;
                vm.buttonclickedlv = false;
                vm.scandoc.TaggedFrom = 'JOURNAL VOUCHER';
                vm.passToModal.push(vm.scandoc.TaggedFrom);
                vm.passToModal.push(vm.JournalVoucher);    
                break;

            case 'chv':
                vm.buttonclickedchv = true;
                vm.buttonclickedcv = false;
                vm.buttonclickedpcv = false;
                vm.buttonclickedjv = false;
                vm.buttonclickedlv = false;
                vm.scandoc.TaggedFrom = 'CHECK VOUCHER';
                vm.passToModal.push(vm.scandoc.TaggedFrom);
                vm.passToModal.push(vm.checkVoucher);    
                break;
        
            default:
                vm.buttonclickedlv = true;
                vm.buttonclickedcv = false;
                vm.buttonclickedpcv = false;
                vm.buttonclickedjv = false;
                vm.buttonclickedchv = false;
                vm.scandoc.TaggedFrom = 'LIQUIDATION FORM';
                vm.passToModal.push(vm.scandoc.TaggedFrom);
                vm.passToModal.push(vm.LiquidationData);    
                break;
        }
        vm.taggedDoc(); //call the modal that contains references
    }
    vm.taggedDoc = function(){
        if(vm.passToModal[1].length === 0)
            LOADINGMain.classList.add('open-loading');
        else{
            LOADINGMain.classList.remove('open-loading');
            var options = {
                data: vm.passToModal,
                templateUrl: TRANSURL + 'scan_document/taggedFrom.html?v=' + VERSION,
                controllerName: 'TagToCtrl',
                viewSize: 'lg',
                filesToLoad: [TRANSURL + 'scan_document/controller.js?v=' + VERSION],
            };
            AppSvc.modal(options).then(function (data) {
                if(data){
                   vm.scandoc.PayeeName = data.PayeeName;
                   vm.scandoc.RefNo = data.SeriesNo;
                   vm.scandoc.StoreName = data.StoreName;
                   vm.scandoc.Subject = data.Explanation;
                }
            });
        }
    }
    vm.read = function(){ 
        vm.scandocar = [];
        vm.scandoc = {};
        LOADINGMain.classList.add('open-loading');
        DocTypeSvc.get().then(function(response){
            if(response.message){
                vm.scandocar = [];
            }else{
                response.forEach(function(item){
                    item.DTName = $filter('uppercase')(item.DTName);
                    vm.scandocar.push(item);
                })
            }
            LOADINGMain.classList.remove('open-loading');
        })
    };

// image
    vm.Preview = function () {
        var extension = document.getElementById('file').files[0].name.split('.').pop().toLowerCase();
        var pdfFile = document.getElementById('file').files[0].name;
        var file = document.getElementById('file').files[0];
        console.log( 'file',document.getElementById('file'),pdfFile);
         r = new FileReader();
                r.onload = function (e) {
                    if(extension === 'pdf'){
                        document.getElementById('frame_modal').style.display = "block";
                        document.getElementById('frame_modal').src = 'data:application/pdf;base64,' + btoa(e.target.result);
                        var f = document.getElementById('img');
                        f.style.display = 'none';
                    }else{
                        document.getElementById('img').style.display = "block";
                        document.getElementById('img').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
                        var f = document.getElementById('frame_modal');
                        f.style.display = 'none';
                    } 
                };
                r.readAsBinaryString(file);
    };

    vm.changePic = function () {
        // if(!vm.scandoc.DTID)
        //     return DocTypeSvc.showSwal('Warning','Select a document to continue.','warning');
        var file = document.getElementById('file');
        file.click();
    }
    vm.save = function(){
        vm.scandoc.DTID = getDTID(vm.scandoc.DocumentType);
        if(!vm.scandoc.DocumentType)
            return ScanDocSvc.showSwal('warning','Document Type is REQUIRED.','warning');
        if(!vm.scandoc.RefNo)
            return ScanDocSvc.showSwal('Warning','Reference Number is REQUIRED.','warning');
        if(!vm.scandoc.PayeeName)
            return ScanDocSvc.showSwal('Warning','Payee name is REQUIRED.','warning');
        if(!vm.scandoc.StoreName)
            return ScanDocSvc.showSwal('Warning','Store Name is REQUIRED.','warning');
        if(vm.scandoc.tagged && !vm.scandoc.TaggedFrom)
            return ScanDocSvc.showSwal('Warning','Select a tagged button.','warning');
        if(!vm.image)
            return ScanDocSvc.showSwal('Warning','Image is Required.','warning');
        if(vm.scandoc.tagged === false)
        vm.scandoc.TaggedFrom = '';
            
        vm.scandoc.DTAcronym = $filter('lowercase')(vm.scandoc.DTAcronym);
        vm.scandoc.DTName = $filter('lowercase')(vm.scandoc.DTName);
        vm.scandoc.ScanDateTime = ScanDocSvc.getDT(vm.scandocdefault.ScanDateTime);
        vm.scandoc.ScannedBy = vm.scandocdefault.ScannedBy; 
        vm.scandoc.ScannedByID = vm.scandocdefault.ScannedByID;
        if(!vm.scandoc.ScanDateTime)
            return ScanDocSvc.showSwal('Warning','DateTime is REQUIRED.','warning');
        var newData = new FormData();
        newData.append('TSDID',vm.scandoc.TSDID);
        newData.append('RefNo',vm.scandoc.RefNo);
        newData.append('DocumentType',vm.scandoc.DocumentType);
        newData.append('DTID',vm.scandoc.DTID);
        newData.append('TaggedFrom',vm.scandoc.TaggedFrom);
        newData.append('StoreName',vm.scandoc.StoreName);
        newData.append('PayeeName',vm.scandoc.PayeeName);
        newData.append('Subject',vm.scandoc.Subject);
        newData.append('ScannedBy',vm.scandoc.ScannedBy);
        newData.append('ScannedByID',vm.scandoc.ScannedByID);
        newData.append('IsTagged',vm.scandoc.IsTagged);
        newData.append('ScanDateTime',vm.scandoc.ScanDateTime);
        newData.append('DTAcronym',vm.scandoc.DTAcronym);
        newData.append('image',vm.image);
        newData.append('uploadImage',true);
        console.log( newData.get('TSDID'));
        LOADINGMain.classList.add('open-loading');
        ScanDocSvc.upload(newData).then(function(response){
            if(response.success){
                if(response.id){
                    vm.scandoc.TSDID = response.id;
                    ScanDocSvc.showSwal('Success',response.message,'success');
                }else{
                    ScanDocSvc.showSwal('Success',response.message,'success');
                }
            }else{
                ScanDocSvc.showSwal('Warning',response.message,'warning');
            }
            LOADINGMain.classList.remove('open-loading');
            console.log( response,vm.scandoc.TSDID);
        })
        
        
    };

    vm.scan = function() {
        // if(!vm.scandoc.DTID)
        //     return DocTypeSvc.showSwal('Warning','Select a document to continue.','warning');
        // if(!vm.scandoc.DocumentType)
        // ScanDocSvc.showSwal('Warning',response.message,'warning');
        // ScanDocSvc.scanDocument();
        scanner.scan(DROP,
            { "output_settings" :[ { "type" : "save","format" : "pdf", "save_path": "${TMP}\\${TMS}${EXT}"}
               ]
            }
            );
       
    }
    function DROP(successful, mesg, response) {
        if(!successful) { // On error
            // document.getElementById('response').innerHTML = 'Failed: ' + mesg;
            return;
        }

        if(successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
            // document.getElementById('response').innerHTML = 'User cancelled';
            return;
        }

        // document.getElementById('response').innerHTML = scanner.getSaveResponse(response);
    }
    vm.delete = function(){
        if(!vm.scandoc.TSDID)
            return ScanDocSvc.showSwal('warning','Nothing to DELETE.','warning');
        var data = {};
        data.TSDID = vm.scandoc.TSDID;
        data.delete = true;
        
        ScanDocSvc.delete(data).then(function(response){
            if(response.success){
                    ScanDocSvc.showSwal('Success',response.message,'success');
                    vm.read();
            }else{
                ScanDocSvc.showSwal('Warning',response.message,'warning');
            }
        })
    };
    vm.cancel = function(){
        vm.scandoc = {};
        vm.scandoc.ScannedBy = $filter('uppercase')(vm.userName);
        vm.scandoc.ScannedByID =vm.user_id;
        vm.scandoc.ScanDateTime =  $filter('date')(new Date(),'LLLL d, y h:mm:ss a');
        var extension = document.getElementById('file').files[0].name.split('.').pop().toLowerCase();
        if(extension === 'pdf'){
            var f = document.getElementById('frame_modal'); // get the container with id frame_modal
            f.style.display = 'none'; //hide div with id frame_modal
            document.getElementById('img').style.display = "block"; //to display default image for preview
            document.getElementById('img').src = 'assets/images/rms-background2.png'; //set preview image with rms-background2.png
        }else{
            document.getElementById('img').src = 'assets/images/rms-background2.png'; 
        } 
       
    };
}
function TagToCtrl($scope, $filter, data, $uibModalInstance){
    var modal = $scope;
    modal.docTagged = {};
    modal.filtered = angular.copy(data[1]);
    modal.RefreshData = angular.copy(data[1]); //gamiton para maredo ang content sa array
    modal.docTagged.ModalHeader = $filter('uppercase')(data[0]);
    modal.inquiry = {};
    modal.toTagDocument = {
        enableRowSelection: true,
        enableCellEdit: false,
        enableColumnMenus: false,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: false,
        columnDefs: [
            { name: 'Reference No.', field: 'SeriesNo'},
            { name: 'Payee Name', field: 'PayeeName'},
            { name: 'Store Name', field: 'StoreName'},
            { name: 'Subject', field: 'Explanation'},
        ],
        data: 'filtered',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                modal.clickrow(row.entity);
            });
        },
    }

    modal.clickrow = function(row) {
        $uibModalInstance.close(row);
        console.log( row);
    }

    modal.search = function(key){
        switch (key) {
            case 'Reference':
                if(!modal.inquiry.RefNo)
                    return AppSvc.showSwal('Oops',"Nothing to search.",'warning');
                modal.filtered = $filter('filter')(modal.filtered,{SeriesNo:modal.inquiry.RefNo});
                console.log( modal.filtered);
                if(modal.filtered.length===0){
                    AppSvc.showSwal('Oops',"Reference Number not found.",'warning');
                }
                break;
            case 'payee':
                if(!modal.inquiry.payeeName)
                    return AppSvc.showSwal('Oops',"Nothing to search.",'warning');
                modal.filtered = $filter('filter')(modal.filtered,{PayeeName:modal.inquiry.payeeName});
                console.log( modal.filtered);
                if(modal.filtered.length===0){
                    AppSvc.showSwal('Oops',"Payee Name not found.",'warning');
                }
                break;
            case 'store':
                if(!modal.inquiry.storeName)
                    return AppSvc.showSwal('Oops',"Nothing to search.",'warning');
                modal.filtered = $filter('filter')(modal.filtered,{StoreName:modal.inquiry.storeName});
                console.log( modal.filtered);
                if(modal.filtered.length===0){
                    AppSvc.showSwal('Oops',"Store Name not found.",'warning');
                }
                break;
            default:
                break;
        }
    }
    modal.refresh = function(){
        LOADINGMain.classList.add('open-loading');
        modal.filtered = modal.RefreshData;
        LOADINGMain.classList.remove('open-loading');
    }
    modal.close = function(){
        $uibModalInstance.dismiss();
    }
    
}



