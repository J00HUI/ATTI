package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.UserDepart;
import com.ssafy.db.entity.user.User;

@Repository
public interface UserDepartRepository extends JpaRepository<UserDepart, Long>{
	List<UserDepart> findByUser(User user);
	List<UserDepart> findByDepart(Depart depart);
	Optional<UserDepart> findByDepartAndUser(Depart depart, User user);
}
