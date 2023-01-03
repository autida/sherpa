<?php
Class ImportExcelModel extends CI_Model  {

 public function save($data) {
	$this->db->insert('salesman',$data);
	if($this->db->affected_rows()) {
		return array('id' => $this->db->insert_id());
	} else {
		return false;
	}
 }

 public function saveAccountReceivable($data) {
	$this->db->insert('account_receivable',$data);
	if($this->db->affected_rows()) {
		return array('id' => $this->db->insert_id());
	} else {
		return false;
	}
 }
}
?>