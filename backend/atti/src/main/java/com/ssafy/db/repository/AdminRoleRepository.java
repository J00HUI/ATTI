package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.google.common.base.Optional;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.user.AdminRole;
import com.ssafy.db.entity.user.User;

@Repository
public interface AdminRoleRepository extends JpaRepository<AdminRole, Long>{
	public Optional<AdminRole> findByUserAndDepart(User user, Depart depart);
}
