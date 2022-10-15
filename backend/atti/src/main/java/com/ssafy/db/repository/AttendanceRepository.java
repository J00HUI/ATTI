package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.webclass.Attendance;
import com.ssafy.db.entity.webclass.Course;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long>{
	public List<Attendance> findByCourse(Course course);
	public Optional<Attendance> findByUserAndCourse(User user, Course course);
}
