<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Kolkata');
require 'vendor/autoload.php';

require APPPATH . 'libraries/REST_Controller.php';

Class Excel_Reader extends REST_Controller {
    function __construct() {
        parent::__construct();
        $this->load->model('ImportExcelModel','model');    }

   
	public function index_post() {
		if($this->post('upload')) {
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
					$file_name = "test_".time().".".$file_ext;
					$path = "assets/uploads/imports/";
					move_uploaded_file($file_tmp, $path . $file_name);
					$inputFileName = $path.$file_name;
				} 
				$inputTileType = \PhpOffice\PhpSpreadsheet\IOFactory::identify($inputFileName);
				$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputTileType);
				$spreadsheet = $reader->load($inputFileName);
				$sheet = $spreadsheet->getSheet(0);
				$count_Rows = 8;
				$result = false;
				$accountReceivableData = array(
					'date' => $spreadsheet->getActiveSheet()->getCell('B3')->getFormattedValue(),
					'totalServedAmount' => $spreadsheet->getActiveSheet()->getCell('F5')->getCalculatedValue(),
					'totalRudGrossAmount' => $spreadsheet->getActiveSheet()->getCell('H5')->getCalculatedValue(),
					'totalBalance' => $spreadsheet->getActiveSheet()->getCell('R5')->getCalculatedValue(),
					'totalStoNetSales' => $spreadsheet->getActiveSheet()->getCell('P5')->getCalculatedValue(),
					'totalPayment' => $spreadsheet->getActiveSheet()->getCell('Q5')->getCalculatedValue(),
				);
				$this->model->saveAccountReceivable($accountReceivableData);
				foreach($sheet->getRowIterator() as $row)
				{
					$cellValue = $spreadsheet->getActiveSheet()->getCell('A'.$count_Rows)->getValue();
					if(!$cellValue == "") {
						$code = $spreadsheet->getActiveSheet()->getCell('A'.$count_Rows);
						$name = $spreadsheet->getActiveSheet()->getCell('B'.$count_Rows);
						$data = array(
							'code'=> $code,
							'name'=> $name,
						);

						$result = $this->model->save($data);
						if($result['id']) {
							$count_Rows++;
						} else {
							break;
						}
					} else {
						break;
					}
					
				} if($result['id']) {
					$result = array(
						'id' => $result['id'],
						'success' => true,
						'message' => 'Data Imported Successfully'
					);
					$this->response($result, REST_Controller::HTTP_OK);
				} else {
					$result = array(
						'success' => false,
						'message' => 'Import data failed.'
					);
					$this->response($result, REST_Controller::HTTP_OK);
				}
			} else {
					$result = array(
								'success' => false,
								'message' => 'Import data failed.File'
							);
							$this->response($result, REST_Controller::HTTP_OK);
			}
		} else {
			$result = array(
						'success' => false,
						'message' => 'Import data failed.Cannot Enter'
					);
					$this->response($result, REST_Controller::HTTP_OK);
		}
		
	}


}
?>