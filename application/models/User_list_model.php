<?php

class User_List_Model extends CI_Model
{

    public function save_data($data)
    {
        $this->db->select("*");
        $this->db->from("tbllogin");
        $this->db->where("LoginID", $data['LoginID']);
        $query = $this->db->get();
        if($query->result()){
            $this->db->where('LoginID', $data['LoginID']);
            $this->db->update('tbllogin', $data);
            if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
        }else{
            $data['Password'] = 'pghai123';
            $data['RetypePassword'] = 'pghai123';
            $data['UserName'] = $data['FirstName'];
            $this->db->insert('tbllogin', $data);
            if ($this->db->affected_rows()) {
                return array('id' => $this->db->insert_id());
            } else {
                return false;
            }
        }
    }

    public function save_access_rights($data){
        $this->db->where('AccessRghtsUserID', $data['LoginID'])->delete('tbluseraccessrights');
        $query = $this->db->select('FormID, FormName, FormGroup')->from('tblformlist')->where_in('FormID', $data['FormIDs'])->get();
        $data1 = array('AccessRghtsUserID' => $data['LoginID']);
        if($query->result()){
            foreach($query->result() as $record){
                $data1['AccessRghtsFormID'] = $record->FormID;
                $data1['AccessRghtsFormName'] = $record->FormName;
                $data1['AccessRghtsFormType'] = $record->FormGroup;
                $this->db->insert('tbluseraccessrights', $data1);
            }
        }
        return true;
    }
    public function get_data(){
        $this->db->select('*');
        $this->db->from('tbllogin');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_accesslist($id){
        $query = $this->db->select('*')->from('tbluseraccessrights')->where('AccessRghtsUserID', $id)->get();
        return $query->result() ? $query->result() : false;
    }

    public function delete_data($id){
        $this->db->select("*");
        $this->db->from("tbllogin");
        $this->db->where("LoginID", $id);
        $query = $this->db->get();
        if($query->result()){
            $this->db->where("LoginID", $id);
            $this->db->delete("tbllogin");
            return true;
        }else{
            return false;
        }
    }
}
