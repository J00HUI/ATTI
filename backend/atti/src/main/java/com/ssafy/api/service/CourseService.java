package com.ssafy.api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.AttendanceChangeReq;
import com.ssafy.api.request.CourseCreateReq;
import com.ssafy.api.request.CourseEnterReq;
import com.ssafy.api.request.CourseGetReq;
import com.ssafy.api.request.CourseOneDayReq;
import com.ssafy.api.request.CourseUpdateReq;
import com.ssafy.api.response.CourseAttendenceRes;
import com.ssafy.api.response.CourseGetRes;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.UserDepart;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.webclass.Attendance;
import com.ssafy.db.entity.webclass.Course;
import com.ssafy.db.repository.AttendanceRepository;
import com.ssafy.db.repository.CourseRepository;
import com.ssafy.db.repository.DepartRepository;
import com.ssafy.db.repository.UserDepartRepository;
import com.ssafy.db.repository.UserRepository;


@Service
public class CourseService {
	@Autowired
	CourseRepository courseRepository;
	@Autowired
	DepartRepository departRepository;
	@Autowired
	UserDepartRepository userDepartRepository;
	@Autowired
	AttendanceRepository attendanceRepository;
	@Autowired
	UserRepository userRepository;
	
	// 시간표 생성
	public Long createCourse(CourseCreateReq courseReq) {
		Depart depart = departRepository.findById(courseReq.getDepartId()).orElse(null);
		
		Course course = Course.builder()
				.depart(depart)
				.courseName(courseReq.getCourseName())
				.courseTeacherName(courseReq.getCourseTeacherName())
				.courseStartTime(courseReq.getCourseStartTime())
				.courseEndTime(courseReq.getCourseEndTime())
				.courseDate(courseReq.getCourseDate()).build();
		
		Long courseId = courseRepository.save(course).getCourseId();
		
		// 강의에 포함된 채널에 속한 유저들은 출석 명단에 오름
		List<UserDepart> attendanceList = userDepartRepository.findByDepart(depart);
		
		for(UserDepart a : attendanceList) {
			attendanceRepository.save(Attendance.builder()
					.attendancedContent("결석")
					.user(a.getUser())
					.course(course).build());
		}
		
		return courseId;
	}
	
	// 시간표 수정
	public boolean updateCourse(CourseUpdateReq courseUpdateReq) {
		Course course = Course.builder()
			.courseId(courseUpdateReq.getCourseId())
			.courseName(courseUpdateReq.getCourseName())
			.courseTeacherName(courseUpdateReq.getCourseTeacherName())
			.courseStartTime(courseUpdateReq.getCourseStartTime())
			.courseEndTime(courseUpdateReq.getCourseEndTime())
			.courseDate(courseUpdateReq.getCourseDate()).build();
		
		courseRepository.save(course);
		return true;
	}
	
	// 시간표 삭제
	public void deleteCourse(Long courseId) {
		courseRepository.deleteById(courseId);
	}
	
	// 시간표 조회
	public List<CourseGetRes> getCourse(CourseGetReq courseGetReq) {
		LocalDate startDate = courseGetReq.getWeekStartDate().plusDays(1);	// 2022-08-14 ~ 2022-08-20
		LocalDate endDate = startDate.plusDays(5);
		
//		System.out.println("startDate: " + startDate + ", endDate: " + endDate);
		// course 중에 departId 에 해당하는 course 중 start Date between end Date 에 해당하는 리스트 뽑기
		Depart depart = departRepository.findById(courseGetReq.getDepartId()).orElse(null);
		if(depart == null) return null;
		
		List<Course> courseList = courseRepository.findAllByDepartAndCourseDateBetween(depart, startDate, endDate);
		
		if(courseList.isEmpty()) return null;
		
		List<CourseGetRes> courseResList = new ArrayList<>();
		for(Course c : courseList) {
			courseResList.add(CourseGetRes.builder()
					.courseId(c.getCourseId())
					.courseName(c.getCourseName())
					.courseTeacherName(c.getCourseTeacherName())
					.courseStartTime(c.getCourseStartTime())
					.courseEndTime(c.getCourseEndTime())
					.courseDate(c.getCourseDate()).build());
		}
		
		return courseResList;
	}
	
	// 날짜 클릭 시 하루 시간표 조회
	public List<CourseGetRes> getOneDayCourse(CourseOneDayReq courseOneDayReq){
		Depart depart = departRepository.findById(courseOneDayReq.getDepartId()).orElse(null);
		if(depart == null) return null;
		
		List<Course> coursOneDayList = courseRepository.findAllByDepartAndCourseDate(depart, courseOneDayReq.getAttenDate());
		if(coursOneDayList.isEmpty()) return null;
		
		List<CourseGetRes> courseResList = new ArrayList<CourseGetRes>();
		for(Course c : coursOneDayList) {
			courseResList.add(CourseGetRes.builder()
					.courseId(c.getCourseId())
					.courseName(c.getCourseName())
					.courseTeacherName(c.getCourseTeacherName())
					.courseStartTime(c.getCourseStartTime())
					.courseEndTime(c.getCourseEndTime())
					.courseDate(c.getCourseDate()).build());
		}
		return courseResList;
		
	}
	
	// 수업 참여자 명단 조회
	public List<CourseAttendenceRes> getAttendence(Long departId){
		Depart depart = departRepository.findById(departId).orElse(null);
		List<UserDepart> userDepartList = userDepartRepository.findByDepart(depart);
		
		List<CourseAttendenceRes> attendenceList = new ArrayList<CourseAttendenceRes>();
		
		if(userDepartList.isEmpty()) {
			return null;
		}
		
		for(UserDepart ud : userDepartList) {
			attendenceList.add(CourseAttendenceRes.builder()
					.userId(ud.getUser().getUserId())
					.userName(ud.getUser().getUserName()).build());
		}
		
		return attendenceList;
	}
	
	// 수업 입장 클릭
	public String clickEnterCourse(CourseEnterReq courseEnterReq) {
		Long courseId = courseEnterReq.getCourseId();
		String userId = courseEnterReq.getUserId();
		LocalDateTime clickDate = courseEnterReq.getClickDate();
		
		// 수업의 시작 시간과 끝나는 시간을 가져옴
		Course course = courseRepository.findById(courseId).orElse(null);
		
		LocalDateTime courseStartTime = course.getCourseStartTime();
		LocalDateTime courseEndTime = course.getCourseEndTime();
		
		LocalDateTime tempAccept = courseStartTime.minusMinutes(30);
		
		Date acceptTime = new Date();
		acceptTime = java.sql.Timestamp.valueOf(tempAccept);
		
		Date startTime = java.sql.Timestamp.valueOf(courseStartTime);
		Date endTime = java.sql.Timestamp.valueOf(courseEndTime);
		Date clickTime = java.sql.Timestamp.valueOf(clickDate);
		
		System.out.println("수업 시작 시간 : " + courseStartTime);
		System.out.println("출석 인정 시간 (시작 30분 전) : " + acceptTime);
		System.out.println("수업 끝나는 시간 : " + courseEndTime);
		System.out.println("클릭 누른 시간 : " + clickDate);
		
		// 출석
		if((clickTime.after(acceptTime) && clickTime.before(startTime)) || clickTime.equals(startTime) || clickTime.equals(acceptTime)) {
			User user = userRepository.findById(userId).orElse(null);
			
			if(user == null) return null;
			
			Attendance attendance = attendanceRepository.findByUserAndCourse(user, course).orElse(null);
			
			if(attendance == null) return null;
			
			attendance.updateAttendancedContent("출석");
			attendanceRepository.save(attendance);
			return attendance.getAttendancedContent();
		}
		
		// 지각
		if(clickTime.after(startTime) && clickTime.before(endTime)) {
			User user = userRepository.findById(userId).orElse(null);
			
			if(user == null) return null;
			
			Attendance attendance = attendanceRepository.findByUserAndCourse(user, course).orElse(null);
			
			if(attendance == null) return null;
			
			attendance.updateAttendancedContent("지각");
			attendanceRepository.save(attendance);
			return attendance.getAttendancedContent();
		}
		
		return null;
		
	}
	
	public boolean changeAttendance(AttendanceChangeReq attendanceChangeReq) {
		Course course = courseRepository.findById(attendanceChangeReq.getCourseId()).orElse(null);
		User user = userRepository.findById(attendanceChangeReq.getUserId()).orElse(null);
		
		if(course == null || user == null) return false;
		
		Attendance attendance = attendanceRepository.findByUserAndCourse(user, course).orElse(null);
		if(attendance == null) return false;
		
		attendance.updateAttendancedContent(attendanceChangeReq.getAttendancedContent());
		
		attendanceRepository.save(attendance);
		return true;
	}
	
}
