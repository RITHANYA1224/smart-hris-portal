package com.examly.springapp.service;

import com.examly.springapp.dto.AppraisalDTO;
import java.util.List;
import java.util.Map;

public interface ComplianceService {
    Map<String, Object> getPfChallan();
    Map<String, Object> getEsiReturn();
    List<AppraisalDTO> startAppraisals(Integer cycleYear);
    Map<String, Object> getAttritionAnalytics();
}
