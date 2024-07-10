package com.doa.lab_master_backend.Service;
import com.doa.lab_master_backend.Entities.Laborant;
import com.doa.lab_master_backend.Repository.LaborantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class LaborantService {
    @Autowired
    private LaborantRepository laborantRepository;

    public Laborant saveLaborant(Laborant laborant) {
        return laborantRepository.save(laborant);
    }

    public Optional<Laborant> getLaborantById(Long id) {
        return laborantRepository.findById(id);
    }

    public List<Laborant> getAllLaborants() {
        return laborantRepository.findAll();
    }

    public Laborant updateLaborant(Long id, Laborant updatedLaborant) {
        return laborantRepository.findById(id).map(laborant -> {
            laborant.setLaborantFirstName(updatedLaborant.getLaborantFirstName());
            laborant.setLaborantLastName(updatedLaborant.getLaborantLastName());
            laborant.setHospitalId(updatedLaborant.getHospitalId());
            return laborantRepository.save(laborant);
        }).orElseGet(() -> {
            updatedLaborant.setId(id);
            return laborantRepository.save(updatedLaborant);
        });
    }

    public void deleteLaborant(Long id) {
        laborantRepository.deleteById(id);
    }
}
