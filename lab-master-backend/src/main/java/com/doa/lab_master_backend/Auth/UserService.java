package com.doa.lab_master_backend.Auth;

public interface UserService {
    String addUser(UserDTO userDTO);
    LoginMessage loginUser(LoginDTO loginDTO);
}
