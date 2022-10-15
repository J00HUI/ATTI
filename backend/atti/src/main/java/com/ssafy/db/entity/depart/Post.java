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
import com.ssafy.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 *  게시글
 */
@Entity
@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="post_id")
	private Long postId;				// 게시글 ID
	
	@Lob
	@Column(name="post_title")
	private String postTitle;			// 제목
	
	@Lob
	@Column(name="post_content")
	private String postContent;			// 내용
	
	@Column(name="post_reg_date")
//	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime postRegDate;			// 등록일
	
	@Column(name="post_upd_date")
//	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime postUpdDate;			// 수정일
	
	@Column(name="post_ano_info")
	private boolean postAnoInfo;		// 게시글 익명 여부
	
	@Column(name="post_com_ban_info")
	private boolean postComBanInfo;		// 댓글 금지 여부
	
	/////////////////////////////////////////////////////
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	@JsonIgnore
	private User user;					// 회원 ID (FK)
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="category_id")
	private Category category;			// 카테고리 ID (FK)
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="depart_id")
	private Depart depart;				// 채널 ID (FK)
	/////////////////////////////////////////////////////
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@JsonIgnore
    private List<Comment> comments = new ArrayList<>();
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserPostLike> userPostLikes = new ArrayList<>();
	
//	
//	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
//    private List<Image> images = new ArrayList<>();
//	
//	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
//    private List<File> files = new ArrayList<>();
//	
//	@OneToMany(mappedBy = "post")
//    private List<UserPostMention> userpostmentions = new ArrayList<>();
//	
//	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
//	@JsonIgnore
//	private List<UserPostLike> userPostLikes = new ArrayList<>();
//	
//	public void setUser(User user) {
//		this.user = user;
//		user.getPosts().add(this);
//	}
//	
//	public void setCategory(Category category) {
//		this.category = category;
//		category.getPosts().add(this);
//	}
}
