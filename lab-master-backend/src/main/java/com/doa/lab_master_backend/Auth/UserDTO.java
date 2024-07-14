package com.doa.lab_master_backend.Auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String password;

}
