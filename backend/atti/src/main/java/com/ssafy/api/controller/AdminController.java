package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.CourseOneDayReq;
import com.ssafy.api.response.AttendanceListRes;
import com.ssafy.api.response.AttendanceRes;
import com.ssafy.api.response.CourseGetRes;
import com.ssafy.api.response.CourseListRes;
import com.ssafy.api.response.DepartCodeRes;
import com.ssafy.api.service.AdminService;
import com.ssafy.api.service.CategoryService;
import com.ssafy.api.service.CourseService;
import com.ssafy.db.repository.DepartRepository;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	CourseService courseService;
	@Autowired
	AdminService adminService; 
	
	// 날짜 클릭 시 수업 리스트 조회
	@PostMapping("/getOneDayCourseList")
	public ResponseEntity<CourseListRes> getoneDayCourseList(@RequestBody CourseOneDayReq courseOneDayReq) {
		List<CourseGetRes> courseResList = courseService.getOneDayCourse(courseOneDayReq);
		
		if(courseResList == null)
			return ResponseEntity.status(200).body(CourseListRes.of(200, "조회할 시간표가 없습니다.", null));
		return ResponseEntity.status(200).body(CourseListRes.of(200, "success", courseResList));
	}
	
	// 수업 클릭 시 학생 출결 조회
	@GetMapping("/getAttendanceList/{courseId}")
	public ResponseEntity<AttendanceListRes> getAttendanceList(@PathVariable("courseId") Long courseId) {
		List<AttendanceRes> courseResList = adminService.getAttendanceList(courseId);
		
		if(courseResList == null)
			return ResponseEntity.status(200).body(AttendanceListRes.of(200, "참석한 학생이 없습니다.", null));
		return ResponseEntity.status(200).body(AttendanceListRes.of(200, "success", courseResList));
	}
	
	// 확인 버튼 클릭 시 수정
	
	
	// 채널 코드 확인 - 갓범
	@GetMapping("/depart/check/{departId}")
	public ResponseEntity<DepartCodeRes> getDepartCode(@PathVariable Long departId) {
		
		return new ResponseEntity<DepartCodeRes>(adminService.getDepartCode(departId), HttpStatus.OK);
	}
	
	// 카테고리 삭제 - 무범
	@DeleteMapping("/category/delete/{categoryId}")
	public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
		adminService.deleteCategory(categoryId);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
}
