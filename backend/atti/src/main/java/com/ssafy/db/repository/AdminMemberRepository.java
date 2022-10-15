package com.ssafy.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.UserDepart;

@Repository
public interface AdminMemberRepository extends JpaRepository<UserDepart, Long>{
	// 내가 원하는 채널 id로 회원목록 조회하려고 함
	List<UserDepart> findAllByDepart(Depart depart);
}
