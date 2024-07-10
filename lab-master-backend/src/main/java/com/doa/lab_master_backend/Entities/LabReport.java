package com.doa.lab_master_backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class LabReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileNumber;
    private String patientName;
    private String patientSurname;
    private String patientId;
    private String diagnosisTitle;
    private String diagnosisDetails;
    private LocalDate reportDate;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] reportImage;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "laborant_id", nullable = false)
    @JsonIgnoreProperties({"labReports"})
    private Laborant laborant;
}
