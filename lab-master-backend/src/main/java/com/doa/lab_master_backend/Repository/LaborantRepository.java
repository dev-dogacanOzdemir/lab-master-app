package com.doa.lab_master_backend.Repository;

import com.doa.lab_master_backend.Entities.Laborant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaborantRepository extends JpaRepository<Laborant,Long> {
}
