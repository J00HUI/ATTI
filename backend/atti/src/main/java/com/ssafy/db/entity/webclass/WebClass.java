//package com.ssafy.db.entity.webclass;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToMany;
//import javax.persistence.OneToOne;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//
//import com.ssafy.db.entity.chat.Chat;
//import com.ssafy.db.entity.chat.ChatRoom;
//import com.ssafy.db.entity.depart.Depart;
//import com.ssafy.db.entity.user.User;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//
//@Entity
//@Getter
//@ToString
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//public class WebClass {
//	
//	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name="webclass_id")
//	private Long webclaassId;
//	
//	@Temporal(TemporalType.TIMESTAMP) 
//	@Column(name="webclass_start_time")
//	private Date webclassStartTime;
//	
//	@Temporal(TemporalType.TIMESTAMP)
//	@Column(name="webclass_end_time")
//	private Date webclassEndTime;
//	
//	@OneToMany(mappedBy = "webclass")
//    private List<Attendance> attendances = new ArrayList<>();
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="depart_id")
//	private Depart depart;
//	
//	@OneToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name = "course_id")
//	private Course course;
//	
//	@OneToOne(mappedBy="webclass", fetch=FetchType.LAZY)
//	private ChatRoom chatroom;
//	
//	public void setDepart(Depart depart) {
//		this.depart = depart;
//		depart.getWebclasses().add(this);
//	}
//	
//	public void setCourse(Course course) {
//		this.course = course;
//		course.setWebclass(this);
//	}
//	
//	public void setChatroom(ChatRoom chatroom) {
//		this.chatroom = chatroom;
//		chatroom.setWebclass(this);
//	}
//}
