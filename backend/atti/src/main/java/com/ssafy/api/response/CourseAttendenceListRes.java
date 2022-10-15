package com.ssafy.api.response;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.common.model.response.BaseResponseBody;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseAttendenceListRes extends BaseResponseBody{
	List<CourseAttendenceRes> attendenceList = new ArrayList();
	
	public static CourseAttendenceListRes of(Integer statusCode, String message, List<CourseAttendenceRes> list) {
		CourseAttendenceListRes res = new CourseAttendenceListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAttendenceList(list);
		return res;
	}
}
