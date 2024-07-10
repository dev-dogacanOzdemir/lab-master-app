package com.doa.lab_master_backend.Service;

import com.doa.lab_master_backend.Entities.LabReport;
import com.doa.lab_master_backend.Entities.Laborant;
import com.doa.lab_master_backend.Repository.LabReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class LabReportService {
    @Autowired
    private LabReportRepository labReportRepository;

    public LabReport saveLabReport(LabReport labReport, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            labReport.setReportImage(file.getBytes());
        }
        return labReportRepository.save(labReport);
    }
    public Optional<LabReport> getLabReportById(Long id) {
        return labReportRepository.findById(id);
    }

    public List<LabReport> getAllLabReports() {
        return labReportRepository.findAll();
    }

    public LabReport updateLabReport(Long id, LabReport updatedLabReport, MultipartFile file) throws IOException {
        return labReportRepository.findById(id).map(labReport -> {
            labReport.setFileNumber(updatedLabReport.getFileNumber());
            labReport.setPatientName(updatedLabReport.getPatientName());
            labReport.setPatientSurname(updatedLabReport.getPatientSurname());
            labReport.setPatientId(updatedLabReport.getPatientId());
            labReport.setDiagnosisTitle(updatedLabReport.getDiagnosisTitle());
            labReport.setDiagnosisDetails(updatedLabReport.getDiagnosisDetails());
            labReport.setReportDate(updatedLabReport.getReportDate());
            if (file != null && !file.isEmpty()) {
                try {
                    labReport.setReportImage(file.getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return labReportRepository.save(labReport);
        }).orElseGet(() -> {
            updatedLabReport.setId(id);
            return labReportRepository.save(updatedLabReport);
        });
    }

    public void deleteLabReport(Long id) {
        labReportRepository.deleteById(id);
    }
    // Yeni metot: Belirli bir laborantın tüm raporlarını döndür
    public List<LabReport> getLabReportsByLaborantId(Long laborantId) {
        return labReportRepository.findByLaborantId(laborantId);
    }
}
