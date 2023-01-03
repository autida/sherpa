<?php
//we need to start session in order to access it through CI
//session_start();
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';

class Login extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('LoginModel','model');
    }
    private function returns($result)
    {
        if ($result) {
            return $this->response($result, REST_Controller::HTTP_OK);
        } else {
            $result = array(
                'message' => 'No data found.',
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        }
    }
    public function index_get() {
        $this->load->view('login');
    }

    public function index_post(){

        $data = array(
            'username' => $this->input->post('username'),
            'password' => $this->input->post('password')
            );
        $result = $this->model->authentication($data);
        if($result['result']){
            foreach($result['result'] as $data){
                $id = $data->uaId;
                $username = $data->username;
                $password = $data->password;
                $fullname = $data->firstName . " " .$data->middleName . " " .$data->lastName;
                $pic = $data->profileImage;
            }
            $session_data = array(
                'id' => $id,
                'username' => $username,
                'password' => $password,
                'fullname' => $fullname,
                'pic' => $pic
            );
            $this->session->set_userdata('userLoggedIn', $session_data);
            $data = array(
                'message' => 'Successfully Login'
            );
            $this->load->view('template', $data);
        }else{
            if(!$result['username']){
                $data = array(
                    'message' => 'Username is Incorrect'
                );
            }else{
                $data = array(
                    'message' => 'Password is Incorrect'
                );
            }
            $this->load->view('login', $data);
        }
    }

    public function logout_get(){

        $this->session->set_userdata('userLoggedIn');
        if($this->get('session')){
            $data = array(
                'message' => 'Session Expired. Login Again'
            );
        }else{
            $data = array(
                'message' => 'Successfully Logout.'
            );
        }
        return $this->load->view('login', $data);
    }

    public function company_get(){
        $result = $this->model->get_company_info();
        $this->response($result, REST_Controller::HTTP_OK);
    }

    public function user_get(){
        $data = $this->session->userdata('userLoggedIn');
        if ($data){
            $result = array(
                'record'=>
                    [
                    'id' => $data['id'],
                    'user' => $data['fullname'],
                    'pic' => $data['pic'],
                    ],
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }else{  
            $result = array(
                'login' => false
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }
    }
}