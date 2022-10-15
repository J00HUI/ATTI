package com.ssafy.db.entity.webclass;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.ssafy.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="attendance_id")
	private Long attendanceId;
	
	@Lob
	@Column(name="attendance_content")
	private String attendancedContent;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="course_id")
	private Course course;
	
	// entity 는 setter 있는 게 안좋다고 함..
	public void updateAttendancedContent(String change) {
		this.attendancedContent = change;
	}
	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="webclass_id")
//	private WebClass webclass;
//	
//	public void setUser(User user) {
//		this.user = user;
//		user.getAttendances().add(this);
//	}
	
//	public void setWebclass(WebClass webclass) {
//		this.webclass = webclass;
//		webclass.getAttendances().add(this);
//	}
	
}
