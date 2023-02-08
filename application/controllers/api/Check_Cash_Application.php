<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Kolkata');
require 'vendor/autoload.php';

require APPPATH . 'libraries/REST_Controller.php';

Class Excel_Reader extends REST_Controller {
    function __construct() {
        parent::__construct();
        $this->load->model('ImportExcelModel','model');   
	}
    public function index_get() {
        
    }

}
?>