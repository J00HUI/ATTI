package com.ssafy.api.request;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseUpdateReq {
	private Long courseId;
	private String courseName;
	private String courseTeacherName;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime courseStartTime;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime courseEndTime;
	
//	@JsonFormat(pattern = "yyyy-MM-dd")
//	private Date courseDate;
	@JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate courseDate;

}
