<?php
Class ImportExcelModel extends CI_Model  {

 public function save($data) {
	$this->db->insert('accnt_receivable_dtl',$data);
	if($this->db->affected_rows()) {
		return array('id' => $this->db->insert_id());
	} else {
		return false;
	}
 }

 public function save_batch($data) {
	$this->db->insert_batch('accnt_receivable_dtl',$data);
	if($this->db->affected_rows()) {
		return array('id' => $this->db->insert_id());
	} else {
		return false;
	}
 }

 public function saveAccountReceivable($data) {
	$this->db->insert('accnt_receivable_hdr',$data);
	if($this->db->affected_rows()) {
		return array('id' => $this->db->insert_id());
	} else {
		return false;
	}
 }
}
?>