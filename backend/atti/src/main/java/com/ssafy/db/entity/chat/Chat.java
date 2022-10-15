//package com.ssafy.db.entity.chat;
//
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
//import javax.persistence.Lob;
//import javax.persistence.ManyToOne;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//
//import com.ssafy.db.entity.depart.Comment;
//import com.ssafy.db.entity.depart.Post;
//import com.ssafy.db.entity.depart.UserPostMention;
//import com.ssafy.db.entity.message.UserMessage;
//import com.ssafy.db.entity.user.Auth;
//import com.ssafy.db.entity.user.Profile;
//import com.ssafy.db.entity.user.User;
//import com.ssafy.db.entity.user.UserRole;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@Getter
//@ToString
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//public class Chat{
////	채팅방 번호	chatroom_id
////	화상 강의 ID	webclass_id
////	채널 ID	channels_id
////	수업 ID	class_id
////	
//	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name="chat_id")
//	private Long chatId;	
//	
//	@Column(name="write_date")
//	@Temporal(TemporalType.TIMESTAMP)
//	private Date writeDate;					// 작성일
//	
//	@Column(name="answer_info")
//	private boolean answerInfo;				// 답변 여부
//	
//	@Column(name="chat_content")
//	@Lob
//	private String chatContent;				// 채팅 내용
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="user_id")
//	private User user;						// 사용자 Id
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="chat_category_id")
//	private ChatCategory chatcategory;		// 채팅 카테고리
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="chat_room_id")
//	private ChatRoom chatroom;
//	
////	연관 관계 메소드
//	public void setUser(User user) {
//		this.user = user;
//		user.getChats().add(this);
//	}
//	
//	public void setChatCategory(ChatCategory chatcategory) {
//		this.chatcategory = chatcategory;
//		chatcategory.getChats().add(this);
//	}
//	
//	public void setChatRoom(ChatRoom chatroom) {
//		this.chatroom = chatroom;
//		chatroom.getChats().add(this);
//	}
//	
//	
//}
