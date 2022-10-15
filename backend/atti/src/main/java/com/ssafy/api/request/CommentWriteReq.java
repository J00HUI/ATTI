package com.ssafy.api.request;

import java.time.LocalDateTime;

import com.ssafy.db.entity.depart.Comment;
import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentWriteReq {
	
	private  boolean commentAnoInfo;
	
	private String commentContent;
	
	private boolean commentDeleteInfo;
	
	private LocalDateTime commentRegDate;
	
	private int commentGroup;
	
	private int commentLevel;
	
	private boolean seq;
	
	private String userId;
	
	private Long postId;
	
	public Comment toEntity(User user, Post post) {
		
		return Comment.builder()
				.commentAnoInfo(commentAnoInfo)
				.commentContent(commentContent)
				.commentDeleteInfo(commentDeleteInfo)
				.commentRegDate(commentRegDate)
				.commentGroup(commentGroup)
				.commentLevel(commentLevel)
				.seq(seq)
				.user(user)
				.post(post)
				.build();
	}
}
