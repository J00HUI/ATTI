package com.ssafy.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.ssafy.api.request.PostUpdateReq;
import com.ssafy.api.request.PostWriteReq;
import com.ssafy.api.request.ViewAllPostsReq;
import com.ssafy.api.response.PostViewAllRes;
import com.ssafy.api.response.PostViewOneRes;
import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Post;

public interface PostService {
	Long createWriting(PostWriteReq postWriteReq); // 글쓰기
	
	List<PostViewAllRes> viewAllPosts(Long departId, Long categoryId, String userId); // 게시글 전체 조회
	
	PostViewOneRes viewFindOne(Long postId, String userId); // 게시글 상세 조회
	
	List<Post> viewByName(String name); // 이름으로 게시글 검색 / 조회 (아직 쓸지말지 몰라서 컨트롤러에서 구현안했음)
	
	void deleteFindOne(Long postId); // 단일 게시글 삭제
	
	void deleteAllPosts(Long categoryId); // 카테고리 게시글 일괄 삭제
	
	LocalDateTime editPost(PostUpdateReq editPost); // 단일 게시글 수정
	
	long postLike(Long postId, String userId);	// 좋아요 기능 - 주희
	
	public List<Post> findByCategory(Category category); // 카테고리 ID에 해당하는 게시글 조회 
}
