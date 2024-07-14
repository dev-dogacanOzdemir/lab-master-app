package com.doa.lab_master_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class LabMasterBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LabMasterBackendApplication.class, args);
	}

}
