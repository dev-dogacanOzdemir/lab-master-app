package com.doa.lab_master_backend.DTO;

import lombok.Data;

@Data
public class LaborantDTO {
    private Long id;
    private String laborantFirstName;
    private String laborantLastName;
    private String hospitalId;
}
