package com.ssafy.api.response;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.common.model.response.BaseResponseBody;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceListRes extends BaseResponseBody{
	public List<AttendanceRes> courseResList = new ArrayList<>();
	
	public static AttendanceListRes of(Integer statusCode, String message, List<AttendanceRes> courseResList) {
		AttendanceListRes res = new AttendanceListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setCourseResList(courseResList);
		return res;
	}
}
