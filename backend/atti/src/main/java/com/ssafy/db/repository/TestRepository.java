package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.google.common.base.Optional;
import com.ssafy.db.entity.user.User;

@Repository
public interface TestRepository extends JpaRepository<User, String>{
	
	Optional<User> findByUserId(String userId);
}
