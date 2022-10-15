package com.ssafy.api.response;

import java.time.LocalDateTime;

import com.ssafy.db.entity.depart.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PostViewAllRes {
	
	private Long postId;
	
	private String postTitle;
	
	private String postContent;
	
	private LocalDateTime postRegDate;
	
	private String userId = "익명";
	
	private String userName;
	
	// 수정 - 주희
	private long likeCount;
	private long commentCount;
	private boolean myLike; 
}
