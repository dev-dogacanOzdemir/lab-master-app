package com.doa.lab_master_backend.Controller;
import com.doa.lab_master_backend.DTO.LaborantDTO;
import com.doa.lab_master_backend.Service.LaborantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("https://localhost:5173")
@RestController
@RequestMapping("/api/laborants")
public class LaborantController {
    @Autowired
    private LaborantService laborantService;

    @PostMapping
    public ResponseEntity<LaborantDTO> createLaborant(@RequestBody LaborantDTO laborantDTO) {
        LaborantDTO savedLaborant = laborantService.saveLaborant(laborantDTO);
        return ResponseEntity.ok(savedLaborant);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LaborantDTO> getLaborantById(@PathVariable Long id) {
        return laborantService.getLaborantById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<LaborantDTO> getAllLaborants() {
        return laborantService.getAllLaborants();
    }

    @PutMapping("/{id}")
    public ResponseEntity<LaborantDTO> updateLaborant(@PathVariable Long id, @RequestBody LaborantDTO laborantDTO) {
        LaborantDTO updatedLaborant = laborantService.updateLaborant(id, laborantDTO);
        return ResponseEntity.ok(updatedLaborant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaborant(@PathVariable Long id) {
        laborantService.deleteLaborant(id);
        return ResponseEntity.noContent().build();
    }
}
