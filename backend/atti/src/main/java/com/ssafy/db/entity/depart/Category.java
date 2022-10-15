package com.ssafy.db.entity.depart;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.message.Message;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 *  카테고리
 */

@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category{
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="category_id")
	private Long categoryId;			// 카테고리 ID
	
	@Column(name="category_name")
	private String categoryName;		// 카테고리 이름
	
//	@Enumerated(EnumType.STRING)
	private String ctype;				// 카테고리 분류
	
	@Column(name="category_ano_info")
	private boolean categoryAnoInfo;	// 카테고리 게시글 익명 여부
	
	@Column(name="category_com_info")
	private boolean categoryComInfo;	// 카테고리 댓글 가능 여부
	
	@Column(name="category_com_ano_info")
	private boolean categoryComAnoInfo;	// 카테고리 댓글 익명 가능 여부
	
	//////////////////////////////////////////////////////
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;					// 사용자 ID (FK)
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="depart_id")
	private Depart depart;				// 채널 ID (FK)
	
	///////////////////////////////////////////////////////
	
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	@JsonIgnore
    private List<Post> posts = new ArrayList<>();
	
}
