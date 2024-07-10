package com.doa.lab_master_backend.Repository;

import com.doa.lab_master_backend.Entities.LabReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LabReportRepository extends JpaRepository<LabReport, Long> {
    // Yeni metot: Belirli bir laborantın tüm raporlarını döndür
    List<LabReport> findByLaborantId(Long laborantId);
}
