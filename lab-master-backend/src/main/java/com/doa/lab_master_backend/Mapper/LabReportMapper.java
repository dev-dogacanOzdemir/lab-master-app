package com.doa.lab_master_backend.Mapper;

import com.doa.lab_master_backend.DTO.LabReportDTO;
import com.doa.lab_master_backend.Entities.LabReport;
import com.doa.lab_master_backend.Entities.Laborant;
import org.springframework.stereotype.Component;

@Component
public class LabReportMapper {
    private final LaborantMapper laborantMapper;

    public LabReportMapper(LaborantMapper laborantMapper) {
        this.laborantMapper = laborantMapper;
    }

    public LabReportDTO toDTO(LabReport labReport) {
        LabReportDTO dto = new LabReportDTO();
        dto.setId(labReport.getId());
        dto.setFileNumber(labReport.getFileNumber());
        dto.setPatientName(labReport.getPatientName());
        dto.setPatientSurname(labReport.getPatientSurname());
        dto.setPatientId(labReport.getPatientId());
        dto.setDiagnosisTitle(labReport.getDiagnosisTitle());
        dto.setDiagnosisDetails(labReport.getDiagnosisDetails());
        dto.setReportDate(labReport.getReportDate());
        dto.setReportImage(labReport.getReportImage());
        dto.setLaborantId(labReport.getLaborant().getId());
        return dto;
    }

    public LabReport toEntity(LabReportDTO dto, Laborant laborant) {
        LabReport labReport = new LabReport();
        labReport.setId(dto.getId());
        labReport.setFileNumber(dto.getFileNumber());
        labReport.setPatientName(dto.getPatientName());
        labReport.setPatientSurname(dto.getPatientSurname());
        labReport.setPatientId(dto.getPatientId());
        labReport.setDiagnosisTitle(dto.getDiagnosisTitle());
        labReport.setDiagnosisDetails(dto.getDiagnosisDetails());
        labReport.setReportDate(dto.getReportDate());
        labReport.setReportImage(dto.getReportImage());
        labReport.setLaborant(laborant);
        return labReport;
    }
}
