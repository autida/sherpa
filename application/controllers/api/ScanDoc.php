<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class ScanDoc extends REST_Controller{

    function __construct(){
        parent::__construct();
        $this->load->model('ScanDoc_model','model');
    }

    private function returns($result){
        if($result){
            return $this->response($result, REST_Controller::HTTP_OK);
        }else{
            $result = array(
                'message' => 'No data found'
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        }
    }

    public function index_get(){
        echo "hi";
        if($this->get('cv')){
            $result = $this->model->getCashVoucherHdr();
        }else if($this->get('pcv')){
            $result = $this->model->getCashVoucherPettyHdr();
        }else if($this->get('checkv')){
            $result = $this->model->getCheckVoucherHdr();
        }else if($this->get('jv')){
            $result = $this->model->getjournalVoucherHdr();
        }else if($this->get('lf')){
            $result = $this->model->getLiquidation();
        }else{
            $result = $this->model->read_data();
        }
           
            $this->returns($result);
    }
    
    public function index_post(){
        // comment things are just temporary
        if($this->post('unlink')){
            $result = unlink($this->post('path').$this->post('unlinkImage'));
         }else if($this->post('uploadImage')){
            $data = array(
                'TSDID' => $this->post('TSDID') ? $this->post('TSDID') : "",
                'DTID' => $this->post('DTID') ? $this->post('DTID') : "",
                'DocumentType' => $this->post('DocumentType') ? $this->post('DocumentType') : "",
                'IsTagged' => $this->post('IsTagged') ? $this->post('IsTagged') : "",
                'TaggedFrom' => $this->post('TaggedFrom') ? $this->post('TaggedFrom') : "",
                'RefNo' => $this->post('RefNo') ? $this->post('RefNo') : "",
                'PayeeName' => $this->post('PayeeName') ? $this->post('PayeeName') : "",
                'StoreName' => $this->post('StoreName') ? $this->post('StoreName') : "",
                'Subject' => $this->post('Subject') ? $this->post('Subject') : "",
                'ScannedBy' => $this->post('ScannedBy') ? $this->post('ScannedBy') : "",
                'ScannedByID' => $this->post('ScannedByID') ? $this->post('ScannedByID') : "",
                'ScanDateTime' => $this->post('ScanDateTime') ? $this->post('ScanDateTime') : "",
            );
                if($_FILES){
                        $file_names = array();
                        $logged_data = $this->session->userdata('logged_in');
                        foreach ($_FILES as $key => $file) {
                            $check = getimagesize($file['tmp_name']);
                            $file_size = $file['size'];
                            $file_tmp = $file['tmp_name'];
                            $randomnum = rand(0,100);
                            $extns = explode('.', $file['name']);
                            $file_ext = strtolower(end($extns));
                            $file_name =  $this->post('DTAcronym')."_".time().".".$file_ext;
                            $path = "assets/images/gen_document/";
                            move_uploaded_file($file_tmp, $path . $file_name);
                            $data['FileName'] = $file_name;
                        } 
                    }
                    $result = $this->model->store_data($data);
                    if ($result['id']){
                        $result = array(
                            'success' => true,
                            'id' => $result['id'],
                            'message' => 'Successfully saved'
                        );
                        $this->response($result, REST_Controller::HTTP_OK);
                    }elseif($result){
                        $result = array(
                            'success' => true,
                            'message' => 'Successfully updated'
                        );
                        $this->response($result, REST_Controller::HTTP_OK);
                    }else{
                        $result = array(
                            'success' => false,
                            'message' => 'Failed saving'
                        );
                        $this->response($result, REST_Controller::HTTP_OK);
                    }
         }else{
            $data = array(
                'DTID' => $this->post('DTID') ? $this->post('DTID') : "",
                'DTName' => $this->post('DTName') ? $this->post('DTName') : "",
                'DTLifeSpan' => $this->post('DTLifeSpan') ? $this->post('DTLifeSpan') : "",
                'DTAcronym' => $this->post('DTAcronym') ? $this->post('DTAcronym') : ""
            );
            $result = $this->model->store_data($data);
            if ($result['id']){
                $result = array(
                    'success' => true,
                    'id' => $result['id'],
                    'message' => 'Successfully saved.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }elseif($result){
                $result = array(
                    'success' => true,
                    'message' => 'Successfully updated.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed saving.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }
        }
    }
    
    public function index_delete(){
            $data = array(
                'TSDID' => $this->query('id') ? $this->query('id') : "",
                'is_archived' => 1
            );
            $result = $this->model->delete_data($data);
            if ($result){
                $result = array(
                    'success' => true,
                    'message' => 'Successfully deleted.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed deletion.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }
    }
}
?>   