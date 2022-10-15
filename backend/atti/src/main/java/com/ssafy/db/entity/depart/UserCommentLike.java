package com.ssafy.db.entity.depart;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 댓글 좋아요 
 */

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCommentLike {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_comment_like_id")
	private Long userCommentLikeId;					// 댓글 좋아요 ID
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;								// 좋아요 누른 회원 ID (FK)

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="comment_id")
	private Comment comment;						// 댓글 ID (FK)
	
	/////////////////////////////////////////////////////////
	
}