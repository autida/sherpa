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
					$file_name = "excelfile_".time().".".$file_ext;
					$path = "assets/uploads/imports/";
					move_uploaded_file($file_tmp, $path . $file_name);
					$inputFileName = $path.$file_name;
				} 
				$inputTileType = \PhpOffice\PhpSpreadsheet\IOFactory::identify($inputFileName);
				$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputTileType);
				$spreadsheet = $reader->load($inputFileName);
				$sheet = $spreadsheet->getSheet(0);
				$collection = [];
				$result = false;
				$accountRecevableId = 0;
				$accountReceivableData = array(
 					//date_format(date_create_from_format("d/m/Y","29/11/2022"),"m/d/Y");
					'date' => date($this->post('date')), //date imported for file duplication purposes
					'totalServedAmount' => $spreadsheet->getActiveSheet()->getCell('F5')->getCalculatedValue(),
					'totalRudGrossAmount' => $spreadsheet->getActiveSheet()->getCell('H5')->getCalculatedValue(),
					'totalBalance' => $spreadsheet->getActiveSheet()->getCell('R5')->getCalculatedValue(),
					'totalStoNetSales' => $spreadsheet->getActiveSheet()->getCell('P5')->getCalculatedValue(),
					'totalPayment' => $spreadsheet->getActiveSheet()->getCell('Q5')->getCalculatedValue(),
				);
				
				$ar_result = $this->model->saveAccountReceivable($accountReceivableData);
				if($ar_result['id']) {
					$accountReceivableId = $ar_result['id'];
				} else {
					$result = array(
								'success' => false,
								'message' => 'Import data failed.'
							);
					$this->response($result, REST_Controller::HTTP_OK);
					return;
				}
				$count_Rows = 8;
				$i = 0;
				foreach($sheet->getRowIterator() as $row)
				{
					$cellValue = $spreadsheet->getActiveSheet()->getCell('D'.$count_Rows);
					
					if($cellValue != "") {
						$salesmanCode = $spreadsheet->getActiveSheet()->getCell('A'.$count_Rows);
						$salesman = $spreadsheet->getActiveSheet()->getCell('B'.$count_Rows);
						$customer = $spreadsheet->getActiveSheet()->getCell('C'.$count_Rows);
						$invoiceNo = $spreadsheet->getActiveSheet()->getCell('D'.$count_Rows);
						$invoiceDate = date("Y-m-d",strtotime($spreadsheet->getActiveSheet()->getCell('E'.$count_Rows)));  
						$servedAmount = $spreadsheet->getActiveSheet()->getCell('F'.$count_Rows);
						$tradeReturnGrossAmount = $spreadsheet->getActiveSheet()->getCell('G'.$count_Rows);
						$rudGrossAmount = $spreadsheet->getActiveSheet()->getCell('H'.$count_Rows);
						$ewt = $spreadsheet->getActiveSheet()->getCell('I'.$count_Rows);
						$displayAllowance = $spreadsheet->getActiveSheet()->getCell('J'.$count_Rows);
						$listingFee = $spreadsheet->getActiveSheet()->getCell('K'.$count_Rows);
						$rebates = $spreadsheet->getActiveSheet()->getCell('L'.$count_Rows);
						$BO = $spreadsheet->getActiveSheet()->getCell('M'.$count_Rows);
						$discount = $spreadsheet->getActiveSheet()->getCell('N'.$count_Rows);
						$otherDeductions = $spreadsheet->getActiveSheet()->getCell('O'.$count_Rows);
						$payment = $spreadsheet->getActiveSheet()->getCell('Q'.$count_Rows);
						$stoNetSales = $spreadsheet->getActiveSheet()->getCell('P'.$count_Rows)->getCalculatedValue();
						$balance = $spreadsheet->getActiveSheet()->getCell('R'.$count_Rows)->getCalculatedValue();
						$remarks = $spreadsheet->getActiveSheet()->getCell('S'.$count_Rows)->getCalculatedValue();
						$aging = $spreadsheet->getActiveSheet()->getCell('T'.$count_Rows)->getOldCalculatedValue();
						$days30 = $spreadsheet->getActiveSheet()->getCell('U'.$count_Rows)->getOldCalculatedValue();
						$days60 = $spreadsheet->getActiveSheet()->getCell('V'.$count_Rows)->getOldCalculatedValue();
						$days90 = $spreadsheet->getActiveSheet()->getCell('W'.$count_Rows)->getOldCalculatedValue();
						$days120 = $spreadsheet->getActiveSheet()->getCell('X'.$count_Rows)->getOldCalculatedValue();
						$data = array(
							'arHdrId' => $accountReceivableId,
							'salesmanCode'=> $salesmanCode,
							'customerName' => $customer,
							'salesman' => $salesman,
							'invoiceNo' => $invoiceNo,
							'invoiceDate' => $invoiceDate,
							'servedAmount' => $servedAmount,
							'tradeReturnGrossAmount' => $tradeReturnGrossAmount,
							'rudGrossAmount' => $rudGrossAmount,
							'EWT' => $ewt,
							'displayAllowance' => $displayAllowance,
							'BO' => $BO,
							'discount' => $discount,
							'otherDeductions' => $otherDeductions,
							'stoNetSales' => $stoNetSales,
							'payment' => $payment,
							'balance' => $balance,
							'remarks' => $remarks,
							'aging' => $aging,
							'30days' => $days30,
							'60days' => $days60,
							'90days' => $days90,
							'120days' => $days120
						);
						$collection[$i] = $data;
							$count_Rows++; //move 1 row down
							$i++; //collection indexing
					} else {
						break;
					}
				} 
				if(count($collection) > 0) {
					$result = $this->model->save_batch($collection);
					if($result['id']) {
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
				}
			} else {
					$result = array(
								'success' => false,
								'message' => 'Import data failed.'
							);
							$this->response($result, REST_Controller::HTTP_OK);
			}
		} elseif($this->post('uploadSales')) {
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
					$file_name = "salesfile_".time().".".$file_ext;
					$path = "assets/uploads/imports/";
					move_uploaded_file($file_tmp, $path . $file_name);
					$inputFileName = $path.$file_name;
				} 
				$inputTileType = \PhpOffice\PhpSpreadsheet\IOFactory::identify($inputFileName);
				$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputTileType);
				$spreadsheet = $reader->load($inputFileName);
				$sheet = $spreadsheet->getSheet(0);
				$collection = [];
				$result = false;
				$accountRecevableId = 0;
				$lastRow = $spreadsheet->getActiveSheet()->getHighestRow();
				$grandTotalRow = $lastRow  - 2;
				$salesPerformanceData = array(
 					//date_format(date_create_from_format("d/m/Y","29/11/2022"),"m/d/Y");
					'dateImported' => $this->post('salesDate'),
					'totalOrderAmount' => $spreadsheet->getActiveSheet()->getCell('P'.$grandTotalRow)->getValue(),
					'totalServedAmount' => $spreadsheet->getActiveSheet()->getCell('Q'.$grandTotalRow)->getValue(),
					'totalTradeReturnGrossAmount' => $spreadsheet->getActiveSheet()->getCell('R'.$grandTotalRow)->getValue(),
					'totoalRudGrossAmount' => $spreadsheet->getActiveSheet()->getCell('S'.$grandTotalRow)->getValue(),
					'totalStoNetSales' => $spreadsheet->getActiveSheet()->getCell('T'.$grandTotalRow)->getValue(),
					'totalDiscount' => $spreadsheet->getActiveSheet()->getCell('U'.$grandTotalRow)->getValue(),
					'totalAmountNetOfDiscount' => $spreadsheet->getActiveSheet()->getCell('V'.$grandTotalRow)->getValue()
				);
				$sp_result = $this->model->saveSalesPerformance($salesPerformanceData);
				if($sp_result['id']) {
					$sprHdrId = $sp_result['id'];
					$count_Rows = 8;
					$i = 0;
					foreach($sheet->getRowIterator() as $row)
					{
						$cellValue = $spreadsheet->getActiveSheet()->getCell('E'.$count_Rows);
						if($cellValue != "") {
							$customerCode = $spreadsheet->getActiveSheet()->getCell('C'.$count_Rows);
							$customer = $spreadsheet->getActiveSheet()->getCell('D'.$count_Rows);
							$invoiceNo = $spreadsheet->getActiveSheet()->getCell('E'.$count_Rows);
							$invoiceDate = date("Y-m-d",strtotime($spreadsheet->getActiveSheet()->getCell('F'.$count_Rows)));  
							$skuCode = $spreadsheet->getActiveSheet()->getCell('G'.$count_Rows);
							$skuName = $spreadsheet->getActiveSheet()->getCell('H'.$count_Rows);
							$orderQty = $spreadsheet->getActiveSheet()->getCell('I'.$count_Rows);
							$servedQty = $spreadsheet->getActiveSheet()->getCell('J'.$count_Rows);
							$unservedQty = $spreadsheet->getActiveSheet()->getCell('K'.$count_Rows);
							$tradeReturnQty = $spreadsheet->getActiveSheet()->getCell('L'.$count_Rows);
							$rudQty = $spreadsheet->getActiveSheet()->getCell('M'.$count_Rows);
							$totalPcs = $spreadsheet->getActiveSheet()->getCell('N'.$count_Rows);
							$price = $spreadsheet->getActiveSheet()->getCell('O'.$count_Rows);
							$orderAmount = $spreadsheet->getActiveSheet()->getCell('P'.$count_Rows);
							$servedAmount = $spreadsheet->getActiveSheet()->getCell('Q'.$count_Rows);
							$tradeReturnGrossAmount = $spreadsheet->getActiveSheet()->getCell('R'.$count_Rows);
							$rudGrossAmount = $spreadsheet->getActiveSheet()->getCell('S'.$count_Rows);
							$stoNetSales = $spreadsheet->getActiveSheet()->getCell('T'.$count_Rows);
							$discount = $spreadsheet->getActiveSheet()->getCell('U'.$count_Rows);
							$amountNetOfDiscount = $spreadsheet->getActiveSheet()->getCell('V'.$count_Rows);
							$percentOfr = $spreadsheet->getActiveSheet()->getCell('W'.$count_Rows);
							$poReference = $spreadsheet->getActiveSheet()->getCell('X'.$count_Rows);
							$stoReferenceNo = $spreadsheet->getActiveSheet()->getCell('Y'.$count_Rows);
							$businessOperaationGroup = $spreadsheet->getActiveSheet()->getCell('Z'.$count_Rows);
							$accountType = $spreadsheet->getActiveSheet()->getCell('AA'.$count_Rows);
							$data = array(
								'sprHdrId' => $sprHdrId,
								'csCode' => $customerCode,
								'csDescription' => $customer,
								'invoiceNo' => $invoiceNo,
								'invoiceDate' => $invoiceDate,
								'skuCode' => $skuCode,
								'skuName' => $skuName,
								'orderQty' => $orderQty,
								'servedQty' => $servedQty,
								'unservedQty' => $unservedQty,
								'tradeReturnQty' => $tradeReturnQty, 
								'rudQty' => $rudQty,
								'totalPcs' => $totalPcs,
								'price' => $price,
								'orderAmount' => $orderAmount,
								'servedAmount' => $servedAmount,
								'tradeReturnGrossAmount' => $tradeReturnGrossAmount,
								'rudGrossAmount' => $rudGrossAmount,
								'stoNetSales' => $stoNetSales,
								'discount' => $discount,
								'amountNetOfDiscount' => $amountNetOfDiscount,
								'percentOfr' => $percentOfr,
								'poReference' => $poReference,
								'soReferenceNo' => $stoReferenceNo,
								'businessOperationGroup' => $businessOperaationGroup,
								'accountType' => $accountType
							);
							$collection[$i] = $data;							
								$count_Rows++; //move 1 row down
								$i++; //collection indexing
								$spresult = $this->model->save_spr_batch($data);
						} else {
							break;
						}
					} 
					if(count($collection) > 0) {
						// $spresult = $this->model->save_spr_batch($data);
						if($spresult['id']) {
							$result = array(
								'id' => $spresult['id'],
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
					}
				} else {
					$result = array(
								'success' => false,
								'message' => 'Import data failed.'
							);
					$this->response($result, REST_Controller::HTTP_OK);
					return;
				}
				
			} else {
					$result = array(
								'success' => false,
								'message' => 'Import data failed.'
							);
							$this->response($result, REST_Controller::HTTP_OK);
			}
		}else {
			$result = array(
						'success' => false,
						'message' => 'Import data failed. Process did not proceed.'
					);
					$this->response($result, REST_Controller::HTTP_OK);
		}
		
	}


}
?>