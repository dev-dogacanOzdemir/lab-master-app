package com.doa.lab_master_backend.Service;
import com.doa.lab_master_backend.DTO.LaborantDTO;
import com.doa.lab_master_backend.Entities.Laborant;
import com.doa.lab_master_backend.Mapper.LaborantMapper;
import com.doa.lab_master_backend.Repository.LaborantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LaborantService {
    @Autowired
    private LaborantRepository laborantRepository;

    @Autowired
    private LaborantMapper laborantMapper;

    public LaborantDTO saveLaborant(LaborantDTO laborantDTO) {
        Laborant laborant = laborantMapper.toEntity(laborantDTO);
        return laborantMapper.toDTO(laborantRepository.save(laborant));
    }

    public Optional<LaborantDTO> getLaborantById(Long id) {
        return laborantRepository.findById(id).map(laborantMapper::toDTO);
    }

    public List<LaborantDTO> getAllLaborants() {
        return laborantRepository.findAll().stream().map(laborantMapper::toDTO).collect(Collectors.toList());
    }

    public LaborantDTO updateLaborant(Long id, LaborantDTO updatedLaborantDTO) {
        return laborantRepository.findById(id).map(laborant -> {
            laborant.setLaborantFirstName(updatedLaborantDTO.getLaborantFirstName());
            laborant.setLaborantLastName(updatedLaborantDTO.getLaborantLastName());
            laborant.setHospitalId(updatedLaborantDTO.getHospitalId());
            return laborantMapper.toDTO(laborantRepository.save(laborant));
        }).orElseGet(() -> {
            Laborant laborant = laborantMapper.toEntity(updatedLaborantDTO);
            laborant.setId(id);
            return laborantMapper.toDTO(laborantRepository.save(laborant));
        });
    }

    public void deleteLaborant(Long id) {
        laborantRepository.deleteById(id);
    }
}
