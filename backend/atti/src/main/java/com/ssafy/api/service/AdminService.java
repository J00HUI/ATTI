package com.ssafy.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.response.AttendanceRes;
import com.ssafy.api.response.DepartCodeRes;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.webclass.Attendance;
import com.ssafy.db.entity.webclass.Course;
import com.ssafy.db.repository.AttendanceRepository;
import com.ssafy.db.repository.CategoryRepository;
import com.ssafy.db.repository.CourseRepository;
import com.ssafy.db.repository.DepartRepository;
import com.ssafy.db.repository.UserRepository;

@Service
@Transactional
public class AdminService {
	@Autowired
	CourseRepository courseRepository;
	@Autowired
	AttendanceRepository attendanceRepository;
	@Autowired
	DepartRepository departRepository;
	@Autowired
	CategoryRepository categoryRepository;
	
	public List<AttendanceRes> getAttendanceList(Long courseId) {
		Course course = courseRepository.findById(courseId).orElse(null);
		List<Attendance> attendanceList = attendanceRepository.findByCourse(course);
		if(attendanceList.isEmpty()) return null;
		
		List<AttendanceRes> dtoList = new ArrayList<AttendanceRes>();
		for(Attendance a : attendanceList) {
			String userId = a.getUser().getUserId();
			String userName = a.getUser().getUserName();
			String attendancedContent = a.getAttendancedContent();
			
			dtoList.add(AttendanceRes.builder()
					.userId(userId)
					.userName(userName)
					.attendancedContent(attendancedContent).build());
		}
		
		return dtoList;
		
	}
	
	// 채널 코드 보내주기 - 갓범
	public DepartCodeRes getDepartCode(Long departId) {
		Depart depart = departRepository.findById(departId)
				.orElseThrow(() -> new IllegalArgumentException("departCode not found"));
		
		return new DepartCodeRes(depart);
	}
	
	// 카테고리 삭제하기 - 무범
	public void deleteCategory(Long categoryId) {
		categoryRepository.deleteById(categoryId);
	}
}
