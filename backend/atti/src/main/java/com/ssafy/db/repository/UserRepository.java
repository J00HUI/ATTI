package com.ssafy.db.repository;

import java.security.cert.PKIXRevocationChecker.Option;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	
	public Optional<User> findByUserName(String userName);
	public Optional<User> findBySocial(String social);
	public Optional<User> findByPhone(String phone);
}
