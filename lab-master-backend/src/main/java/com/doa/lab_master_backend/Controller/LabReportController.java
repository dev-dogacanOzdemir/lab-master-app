package com.doa.lab_master_backend.Controller;

import com.doa.lab_master_backend.Entities.LabReport;
import com.doa.lab_master_backend.Entities.Laborant;
import com.doa.lab_master_backend.Service.LabReportService;
import com.doa.lab_master_backend.Service.LaborantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/labreports")
public class LabReportController {
    @Autowired
    private LabReportService labReportService;

    @Autowired
    private LaborantService laborantService;

    @PostMapping
    public ResponseEntity<LabReport> createLabReport(@RequestParam(value = "file", required = false) MultipartFile file,
                                                     @ModelAttribute LabReport labReport,
                                                     @RequestParam("laborantId") Long laborantId,
                                                     @RequestParam("reportDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate reportDate) {
        Optional<Laborant> laborant = laborantService.getLaborantById(laborantId);
        if (!laborant.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        labReport.setLaborant(laborant.get());
        labReport.setReportDate(reportDate);

        try {
            LabReport savedLabReport = labReportService.saveLabReport(labReport, file);
            return ResponseEntity.ok(savedLabReport);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabReport> getLabReportById(@PathVariable Long id) {
        Optional<LabReport> labReport = labReportService.getLabReportById(id);
        return labReport.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<LabReport> getAllLabReports() {
        return labReportService.getAllLabReports();
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabReport> updateLabReport(@PathVariable Long id,
                                                     @RequestParam(value = "file", required = false) MultipartFile file,
                                                     @ModelAttribute LabReport labReport) {
        try {
            LabReport updatedLabReport = labReportService.updateLabReport(id, labReport, file);
            return ResponseEntity.ok(updatedLabReport);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabReport(@PathVariable Long id) {
        labReportService.deleteLabReport(id);
        return ResponseEntity.noContent().build();
    }
    // Yeni endpoint: Belirli bir laborantın tüm raporlarını döndür
    @GetMapping("/laborant/{laborantId}")
    public ResponseEntity<List<LabReport>> getLabReportsByLaborantId(@PathVariable Long laborantId) {
        List<LabReport> labReports = labReportService.getLabReportsByLaborantId(laborantId);
        return ResponseEntity.ok(labReports);
    }
}
