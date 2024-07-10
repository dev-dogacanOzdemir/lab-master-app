package com.doa.lab_master_backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@JsonIgnoreProperties({"labReports"})
public class Laborant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String laborantFirstName;
    private String laborantLastName;
    private String hospitalId;

    @JsonIgnore
    @OneToMany(mappedBy = "laborant", cascade = CascadeType.ALL)
    private List<LabReport> labReports;
}
