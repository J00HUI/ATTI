package com.ssafy.db.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.webclass.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>{
	List<Course>findAllByDepartAndCourseDateBetween(Depart depart, LocalDate startDate, LocalDate endDate);
	List<Course>findAllByDepartAndCourseDate(Depart depart, LocalDate attenDate);
}
