package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.AttendanceChangeReq;
import com.ssafy.api.request.CourseCreateReq;
import com.ssafy.api.request.CourseEnterReq;
import com.ssafy.api.request.CourseGetReq;
import com.ssafy.api.request.CourseUpdateReq;
import com.ssafy.api.response.CourseAttendenceListRes;
import com.ssafy.api.response.CourseAttendenceRes;
import com.ssafy.api.response.CourseGetRes;
import com.ssafy.api.response.CourseListRes;
import com.ssafy.api.response.CreateCourseRes;
import com.ssafy.api.service.CourseService;
import com.ssafy.common.model.response.BaseResponseBody;

@RestController
@RequestMapping("course")
public class CourseController {
	
	@Autowired
	CourseService courseService;
	
	// 시간표 생성
	@PostMapping("/create")
	public ResponseEntity<CreateCourseRes> createCourse(@RequestBody CourseCreateReq courseReq) {
		Long courseId = courseService.createCourse(courseReq);
		return ResponseEntity.status(200).body(CreateCourseRes.of(200, "Success", courseId));
	}
	
	// 시간표 조회
	@PostMapping()
	public ResponseEntity<CourseListRes> getCourse(@RequestBody CourseGetReq courseGetReq) {
		System.out.println(courseGetReq.getDepartId());
		List<CourseGetRes> courseResList = courseService.getCourse(courseGetReq);
		
		if(courseResList == null)
			return ResponseEntity.status(200).body(CourseListRes.of(200, "조회할 시간표가 없습니다.", null));
		return ResponseEntity.status(200).body(CourseListRes.of(200, "success", courseResList));
	}
	
	// 시간표 삭제
	@DeleteMapping("/delete/{courseId}")
	public ResponseEntity<BaseResponseBody> deleteCourse(@PathVariable("courseId") Long courseId) {
		courseService.deleteCourse(courseId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "삭제되었습니다."));
	}
	
	// 시간표 수정
	@PutMapping("/update")
	public ResponseEntity<BaseResponseBody> updateCourse(@RequestBody CourseUpdateReq courseUpdateReq) {
		boolean res = courseService.updateCourse(courseUpdateReq);
		if(!res)
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "수정 중 문제가 발생했습니다."));
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "수정되었습니다."));
	}
	
	// 채널에 속한 참가자 리스트 조회
	@GetMapping("/attendence/{departId}")
	public ResponseEntity<CourseAttendenceListRes> getAttendence(@PathVariable("departId") Long departId) {
		List<CourseAttendenceRes> attendenceList = courseService.getAttendence(departId);
		return ResponseEntity.status(200).body(CourseAttendenceListRes.of(200, "success", attendenceList));
	}
	
	//유저 출석 클릭
	@PutMapping("/enterCourse")
	public ResponseEntity<BaseResponseBody> clickEnterCourse(@RequestBody CourseEnterReq courseEnterReq) {
		String res = courseService.clickEnterCourse(courseEnterReq);
		if(res==null)
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "잘못된 접근입니다."));
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, res));
	}
	
	// 출석 변경
	@PutMapping("/changeAttendance")
	public ResponseEntity<BaseResponseBody> changeAttendance(@RequestBody AttendanceChangeReq attendanceChangeReq){
		boolean res = courseService.changeAttendance(attendanceChangeReq);
		
		if(!res) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "잘못된 접근입니다."));
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "변경이 완료되었습니다"));
	}
	
	
	
}
