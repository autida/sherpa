<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'MyReturn.php';


class User_List extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('user_list_model');
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

    public function index_post(){
        if($this->post('userlist')){
            $data = array(
                'LoginID' => $this->post('LoginID') ? $this->post('LoginID') : " ",
                'UserLevel' => $this->post('UserLevel') ? $this->post('UserLevel') : "",
                'FullName' => $this->post('FullName') ? $this->post('FullName') : "",
                'Description' => $this->post('Description') ? $this->post('Description') : "",
                'FirstName' => $this->post('FirstName') ? $this->post('FirstName') : "",
                'MiddleName' => $this->post('MiddleName') ? $this->post('MiddleName') : "",
                'LastName' => $this->post('LastName') ? $this->post('LastName') : "",
                'DateOfBirth' => $this->post('DateOfBirth') ? $this->post('DateOfBirth') : "",
            );
            $result = $this->user_list_model->save_data($data);
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
        }elseif($this->post('accesslist')){
            $data = array(
                'LoginID' => $this->post('LoginID') ? $this->post('LoginID') : " ",
                'FormIDs' => $this->post('FormIDs') ? $this->post('FormIDs') : array()
            );
            $result = $this->user_list_model->save_access_rights($data);
            if($result){
                $result = array(
                    'success' => true,
                    'message' => 'Successfully saved'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed saving'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }
        }
    }

    public function index_get(){
        if($this->get('userlist')){
            $result = $this->user_list_model->get_data();
        }elseif($this->get('accesslist')){
            $result = $this->user_list_model->get_accesslist($this->get('UserID'));
        }
        $this->returns($result);
    }

    public function index_delete(){
        $result = $this->user_list_model->delete_data($this->query('id'));
        if ($result){
            $result = array(
                'success' => true,
                'message' => 'Successfully deleted'
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }else{
            $result = array(
                'success' => false,
                'message' => 'Failed deleting'
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }
    }

}