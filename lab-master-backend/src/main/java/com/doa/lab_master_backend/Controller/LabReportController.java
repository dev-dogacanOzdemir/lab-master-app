package com.doa.lab_master_backend.Controller;

import com.doa.lab_master_backend.DTO.LabReportDTO;
import com.doa.lab_master_backend.Service.LabReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/labreports")
public class LabReportController {
    @Autowired
    private LabReportService labReportService;

    @PostMapping
    public ResponseEntity<LabReportDTO> createLabReport(@RequestParam(value = "file", required = false) MultipartFile file,
                                                        @ModelAttribute LabReportDTO labReportDTO) {
        try {
            LabReportDTO savedLabReport = labReportService.saveLabReport(labReportDTO, file);
            return ResponseEntity.ok(savedLabReport);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabReportDTO> getLabReportById(@PathVariable Long id) {
        return labReportService.getLabReportById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<LabReportDTO> getAllLabReports() {
        return labReportService.getAllLabReports();
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabReportDTO> updateLabReport(@PathVariable Long id,
                                                        @RequestParam(value = "file", required = false) MultipartFile file,
                                                        @ModelAttribute LabReportDTO labReportDTO) {
        try {
            labReportDTO.setId(id);
            LabReportDTO updatedLabReport = labReportService.updateLabReport(id, labReportDTO, file);
            return ResponseEntity.ok(updatedLabReport);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabReport(@PathVariable Long id) {
        labReportService.deleteLabReport(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/laborant/{laborantId}")
    public ResponseEntity<List<LabReportDTO>> getLabReportsByLaborantId(@PathVariable Long laborantId) {
        List<LabReportDTO> labReports = labReportService.getLabReportsByLaborantId(laborantId);
        return ResponseEntity.ok(labReports);
    }
}
