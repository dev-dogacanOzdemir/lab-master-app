package com.doa.lab_master_backend.Mapper;

import com.doa.lab_master_backend.DTO.LaborantDTO;
import com.doa.lab_master_backend.Entities.Laborant;
import org.springframework.stereotype.Component;

@Component
public class LaborantMapper {
    public LaborantDTO toDTO(Laborant laborant){
        LaborantDTO dto = new LaborantDTO();
        dto.setId(laborant.getId());
        dto.setLaborantFirstName(laborant.getLaborantFirstName());
        dto.setLaborantLastName(laborant.getLaborantLastName());
        dto.setHospitalId(laborant.getHospitalId());
        return dto;
    }
    public Laborant toEntity(LaborantDTO dto) {
        Laborant laborant = new Laborant();
        laborant.setId(dto.getId());
        laborant.setLaborantFirstName(dto.getLaborantFirstName());
        laborant.setLaborantLastName(dto.getLaborantLastName());
        laborant.setHospitalId(dto.getHospitalId());
        return laborant;
    }

}
