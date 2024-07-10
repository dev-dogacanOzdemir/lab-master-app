package com.doa.lab_master_backend.Controller;
import com.doa.lab_master_backend.Entities.Laborant;
import com.doa.lab_master_backend.Service.LaborantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin("https://localhost:5173")
@RestController
@RequestMapping("/api/laborants")
public class LaborantController {
    @Autowired
    private LaborantService laborantService;

    @PostMapping
    public ResponseEntity<Laborant> createLaborant(@RequestBody Laborant laborant) {
        Laborant savedLaborant = laborantService.saveLaborant(laborant);
        return ResponseEntity.ok(savedLaborant);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Laborant> getLaborantById(@PathVariable Long id) {
        Optional<Laborant> laborant = laborantService.getLaborantById(id);
        return laborant.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Laborant> getAllLaborants() {
        return laborantService.getAllLaborants();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Laborant> updateLaborant(@PathVariable Long id, @RequestBody Laborant laborant) {
        Laborant updatedLaborant = laborantService.updateLaborant(id, laborant);
        return ResponseEntity.ok(updatedLaborant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaborant(@PathVariable Long id) {
        laborantService.deleteLaborant(id);
        return ResponseEntity.noContent().build();
    }
}
