package com.ssafy.api.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Optional;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.user.AdminRole;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.AdminRoleRepository;
import com.ssafy.db.repository.DepartRepository;

@Service
@Transactional
public class AdminRoleService {
	@Autowired
	DepartRepository departRepository;
	@Autowired
	AdminRoleRepository adminRoleRepository;
	
	public boolean getAdminRole(User user, Long departId) {
		Depart depart = departRepository.findById(departId).orElse(null);
		AdminRole admin = adminRoleRepository.findByUserAndDepart(user, depart).orNull();
		
		if(admin == null) return false; 		// 관리자 아님
		return true;
	}
}
