package com.ssafy.api.request;

import java.time.LocalDateTime;

import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.user.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostWriteReq {
	
	private String postTitle;
	
	private String postContent;
	
	private boolean postAnoInfo;
	
	private boolean postComBanInfo;
	
	private LocalDateTime postRegDate;
	
	private Long departId;
	
	private Long categoryId;
	
	private String userId;
	
	public Post toEntity(Depart depart, Category category, User user) {
		
		return Post.builder()
				.postTitle(postTitle)
				.postContent(postContent)
				.postAnoInfo(postAnoInfo)
				.postComBanInfo(postComBanInfo)
				.postRegDate(postRegDate)
				.depart(depart)
				.category(category)
				.user(user)
				.build();
	}
}
