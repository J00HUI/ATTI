package com.ssafy.db.entity.chat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.depart.UserPostMention;
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
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
	
//	화상 강의 ID	webclass_id
//	채널 ID	channels_id
//	수업 ID	class_id
//	사용자 ID	user_id
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="chatroom_id")
	private Long chatroomId;				// 채팅방 번호
	
//	@OneToOne(fetch=FetchType.LAZY)
//	private WebClass webclass;
	
//	@OneToMany(mappedBy = "chatroom")
//    private List<Chat> chats = new ArrayList<>();
	
	
// 연관관계 메소드

}
