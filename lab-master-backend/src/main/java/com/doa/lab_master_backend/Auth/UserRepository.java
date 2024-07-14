package com.doa.lab_master_backend.Auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
