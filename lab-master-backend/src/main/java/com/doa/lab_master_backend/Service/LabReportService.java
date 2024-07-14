package com.doa.lab_master_backend.Service;

import com.doa.lab_master_backend.DTO.LabReportDTO;
import com.doa.lab_master_backend.Entities.LabReport;
import com.doa.lab_master_backend.Entities.Laborant;
import com.doa.lab_master_backend.Mapper.LabReportMapper;
import com.doa.lab_master_backend.Repository.LabReportRepository;
import com.doa.lab_master_backend.Repository.LaborantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LabReportService {
    @Autowired
    private LabReportRepository labReportRepository;

    @Autowired
    private LaborantRepository laborantRepository;

    @Autowired
    private LabReportMapper labReportMapper;

    public LabReportDTO saveLabReport(LabReportDTO labReportDTO, MultipartFile file) throws IOException {
        Optional<Laborant> laborant = laborantRepository.findById(labReportDTO.getLaborantId());
        if (!laborant.isPresent()) {
            throw new IllegalArgumentException("Laborant not found");
        }

        LabReport labReport = labReportMapper.toEntity(labReportDTO, laborant.get());
        if (file != null && !file.isEmpty()) {
            labReport.setReportImage(file.getBytes());
        }
        return labReportMapper.toDTO(labReportRepository.save(labReport));
    }

    public Optional<LabReportDTO> getLabReportById(Long id) {
        return labReportRepository.findById(id).map(labReportMapper::toDTO);
    }

    public List<LabReportDTO> getAllLabReports() {
        return labReportRepository.findAll().stream().map(labReportMapper::toDTO).collect(Collectors.toList());
    }

    public LabReportDTO updateLabReport(Long id, LabReportDTO updatedLabReportDTO, MultipartFile file) throws IOException {
        Optional<Laborant> laborant = laborantRepository.findById(updatedLabReportDTO.getLaborantId());
        if (!laborant.isPresent()) {
            throw new IllegalArgumentException("Laborant not found");
        }

        return labReportRepository.findById(id).map(labReport -> {
            labReport.setFileNumber(updatedLabReportDTO.getFileNumber());
            labReport.setPatientName(updatedLabReportDTO.getPatientName());
            labReport.setPatientSurname(updatedLabReportDTO.getPatientSurname());
            labReport.setPatientId(updatedLabReportDTO.getPatientId());
            labReport.setDiagnosisTitle(updatedLabReportDTO.getDiagnosisTitle());
            labReport.setDiagnosisDetails(updatedLabReportDTO.getDiagnosisDetails());
            labReport.setReportDate(updatedLabReportDTO.getReportDate());
            labReport.setLaborant(laborant.get());
            if (file != null && !file.isEmpty()) {
                try {
                    labReport.setReportImage(file.getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return labReportMapper.toDTO(labReportRepository.save(labReport));
        }).orElseGet(() -> {
            LabReport labReport = labReportMapper.toEntity(updatedLabReportDTO, laborant.get());
            labReport.setId(id);
            return labReportMapper.toDTO(labReportRepository.save(labReport));
        });
    }

    public void deleteLabReport(Long id) {
        labReportRepository.deleteById(id);
    }

    public List<LabReportDTO> getLabReportsByLaborantId(Long laborantId) {
        return labReportRepository.findByLaborantId(laborantId).stream().map(labReportMapper::toDTO).collect(Collectors.toList());
    }
}
