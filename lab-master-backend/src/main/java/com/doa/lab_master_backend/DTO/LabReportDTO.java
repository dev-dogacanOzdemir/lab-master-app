package com.doa.lab_master_backend.DTO;

import lombok.Data;

import java.time.LocalDate;
@Data
public class LabReportDTO {
    private Long id;
    private String fileNumber;
    private String patientName;
    private String patientSurname;
    private String patientId;
    private String diagnosisTitle;
    private String diagnosisDetails;
    private LocalDate reportDate;
    private byte[] reportImage;
    private Long laborantId;
}
