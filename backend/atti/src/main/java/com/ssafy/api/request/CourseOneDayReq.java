package com.ssafy.api.request;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseOneDayReq {
	private Long departId;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate attenDate;
}
