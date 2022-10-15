package com.ssafy.db.entity.depart;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.message.Message;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 댓글
 */
@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="comment_id")
	private Long commentId;					// 댓글 ID
	
	@Column(name="comment_reg_date")
//	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime commentRegDate;			// 댓글 등록일
	
	@Column(name="comment_delete_info")
	private boolean commentDeleteInfo;		// 삭제 여부
	
	@Column(name="comment_ano_info")
	private boolean commentAnoInfo;			// 댓글 익명 여부
	
	@Column(name="comment_content")
	@Lob
	private String commentContent;			// 댓글 내용
	
	@Column(name="comment_group")
	private int commentGroup;				// 댓글 그룹
	
	@Column(name="comment_level")
	private int commentLevel;				// 그룹 내 순서
	
	private boolean seq;					// 루트 여부
	
	//////////////////////////////////////////////////////////
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;						// 사용자 ID (FK)
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="post_id")
	private Post post;						// 게시글 ID (FK)
	
	//////////////////////////////////////////////////////////
	
	@OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<UserCommentLike> usercommentlikes = new ArrayList<>();
}
