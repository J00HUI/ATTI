package com.ssafy.db.entity.message;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.ssafy.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 쪽지
 */
@Entity
@Getter 
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="message_id")
	private Long MessageId;					// 쪽지 ID
	
	@Column(name="message_content")
	@Lob
	private String messageCotent;			// 내용
	
	@Column(name="send_date")
	private Date sendDate;					// 보낸 날짜
	
	@Column(name="read_info")
	private boolean readInfo;				// 읽음 여부
	
	////////////////////////////////////////////////////////
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="to_user_id")
	private User tuser;						// 받는 사람 ID (FK)
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="from_user_id")
	private User fuser;						// 보낸 사람 ID (FK)
	
	//////////////////////////////////////////////////////

}
