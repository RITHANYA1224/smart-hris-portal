package com.examly.springapp.service;

import com.examly.springapp.dto.LeaveApplicationDTO;
import java.util.List;

public interface LeaveService {
    LeaveApplicationDTO applyLeave(LeaveApplicationDTO dto);
    List<LeaveApplicationDTO> getPendingLeaves();
    LeaveApplicationDTO approveLeave(Long id, Long approverId);
    List<LeaveApplicationDTO> getAllLeaves();
    void deleteLeave(Long id);
}

