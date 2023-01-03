
<?php

class Scandoc_model extends CI_Model
{
  
    public function read_data($id){
        $this->db->select('*');
        $this->db->from('tbltransscandocument');
        $this->db->where('EmpIDLinkTS',$id);
        $this->db->where('is_archived',0);
        $this->db->where('is_terminated',0);
        $this->db->order_by('TSDID','ASC');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

   public function store_data($data){
       $this->db->select('*');
       $this->db->from('tbltransscandocument');
       $this->db->where('TSDID',$data['TSDID']);
       $query = $this->db->get();
       if($query->result()){
            $this->db->where('TSDID',$data['TSDID']);
            $this->db->update('tbltransscandocument',$data);
            if($this->db->affected_rows()){
                return true;
            }else 
                return false;
       }else{
            $this->db->insert('tbltransscandocument',$data);
            if($this->db->affected_rows()){
                return array ('id' => $this->db->insert_id());
            }else 
                return false;
       }
   }

    // public function delete_data($data){ 
    //     $this->db->select('*');
    //     $this->db->from('tbltransscandocument');
    //     $this->db->where('TSDID',$data['TSDID']);
    //     $query = $this->db->get();
    //     if($query->result()){
    //          $this->db->where('TSDID',$data['TSDID']);
    //          $this->db->delete('tbltransscandocument');
    //          if($this->db->affected_rows()){
    //              return true;
    //          }else 
    //              return false;
    //     }else{ 
    //              return false;
    //     }
    // }

    public function delete_data($data){ //only update is_archive to one, dili gyud idelete sa database
        $this->db->select('*');
        $this->db->from('tbltransscandocument');
        $this->db->where('TSDID',$data['TSDID']);
        $query = $this->db->get();
        if($query->result()){
             $this->db->where('TSDID',$data['TSDID']);
             $this->db->update('tbltransscandocument',$data);
             if($this->db->affected_rows()){
                 return true;
             }else 
                 return false;
        }else{ 
                 return false;
        }
    }

    public function getCashVoucherHdr(){
        $otherdb = $this->load->database('otherdb', TRUE);
        $otherdb->select('*');
        $otherdb->from('tblcashvoucherhdr');
        $query = $otherdb->get();
        return $query->result() ?  $query->result() : false;
        
    }
    public function getCashVoucherPettyHdr(){
        $otherdb = $this->load->database('otherdb', TRUE);
        $otherdb->select('*');
        $otherdb->from('tblcashvoucherhdr_petty');
        $query = $otherdb->get();
        return $query->result() ?  $query->result() : false;
        
    }
    public function getCheckVoucherHdr(){
        $otherdb = $this->load->database('otherdb', TRUE);
        $otherdb->select('*');
        $otherdb->from('tblcheckvoucherhdr');
        $query = $otherdb->get();
        return $query->result() ?  $query->result() : false;
        
    }
    public function getjournalVoucherHdr(){
        $otherdb = $this->load->database('otherdb', TRUE);
        $otherdb->select('*');
        $otherdb->from('tbljvhdr');
        $query = $otherdb->get();
        return $query->result() ?  $query->result() : false;
        
    }
    public function getLiquidation(){
        $otherdb = $this->load->database('otherdb', TRUE);
        $otherdb->select('*');
        $otherdb->from('tbllfhdr');
        $query = $otherdb->get();
        return $query->result() ?  $query->result() : false;
        
    }
}
