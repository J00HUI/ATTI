package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Depart;

@Repository
public interface DepartRepository extends JpaRepository<Depart, Long>{
	Optional<Depart> findByDepartName(String departName);
	
	Optional<Depart> findByDepartCode(String departCode);
}
