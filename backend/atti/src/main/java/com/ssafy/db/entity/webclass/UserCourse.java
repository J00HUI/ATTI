package com.ssafy.db.entity.webclass;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

//import com.ssafy.db.entity.chat.Chat;
import com.ssafy.db.entity.chat.ChatRoom;
import com.ssafy.db.entity.depart.Comment;
import com.ssafy.db.entity.message.Message;
import com.ssafy.db.entity.user.Profile;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCourse {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_course_id")
	private Long userCourseId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="course_id")
	private Course course;
	
//	public void setUser(User user) {
//		this.user = user;
//		user.getUsercourses().add(this);
//	}
//	
//	public void setCourse(Course course) {
//		this.course = course;
//		course.getUsercourses().add(this);
//	}
}
