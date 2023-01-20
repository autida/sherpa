<?php
defined('BASEPATH') OR exit('No direct script access allowed');

Class LoginModel extends CI_Model {

    public function authentication($data) {
        $query = $this->db->select('*')->from('useraccount')->where("username = '". $data['username'] ."'")->get();
        if($query->num_rows() == 0) {
            return array('username' => false, 'password'=>false, 'result' => []);
        } else {
            $query = $this->db->select('*')->from('useraccount')->where("username = '". $data['username'] ."' AND password = '". $data['password'] ."'")->get();
            if($query->num_rows() == 0) {
                return array('username' => true, 'password' => false, 'result' => []);
            } else {
                return array('username' => true, 'password' => true, 'result' => $query->result());
            }
        }
    }
    
    public function companyInfo() {
        return $this->db->select('*')->from('company')->get()->result;
    }
}
   
?>