package com.ssafy.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.request.PostUpdateReq;
import com.ssafy.api.request.PostWriteReq;
import com.ssafy.api.response.PostViewAllRes;
import com.ssafy.api.response.PostViewOneRes;
import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.depart.UserPostLike;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.webclass.Course;
import com.ssafy.db.repository.CategoryRepository;
import com.ssafy.db.repository.CommentRepository;
import com.ssafy.db.repository.DepartRepository;
import com.ssafy.db.repository.PostRepository;
import com.ssafy.db.repository.UserPostLikeRepository;
import com.ssafy.db.repository.UserRepository;

@Service
@Transactional(readOnly = true) // readOnly true를 사용하면 읽기 최적화
public class PostServiceImpl implements PostService {
	
	@Autowired
	private DepartRepository departRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	// 좋아요 추가 - 주희
	@Autowired
	private UserPostLikeRepository userPostLikeRepository;
	
	// 댓글 갯수 추가 - 주희
	@Autowired
	private CommentRepository commentRepository;

	@Override // 글쓰기
	@Transactional // 쓰기가 필요할땐 그냥 Transactional
	public Long createWriting(PostWriteReq postWriteReq) {
//		Post post = Post.builder()
//				.postTitle(postWriteReq.getPostTitle())
//				.postContent(postWriteReq.getPostContent())
//				.postRegDate(postWriteReq.getPostRegDate())
//				.user(userRepository.getOne(postWriteReq.getUserId()))
//				.category(categoryRepository.getById(postWriteReq.getCategoryId()))
//				.depart(departRepository.findById(id)(postWriteReq.getDepartId()))
//				.build();
		postWriteReq.setPostRegDate(LocalDateTime.now());

		Depart depart = departRepository.getById(postWriteReq.getDepartId());
		Category category = categoryRepository.getById(postWriteReq.getCategoryId());
		User user = userRepository.getById(postWriteReq.getUserId());
		
		Post post = Post.builder()
				.postTitle(postWriteReq.getPostTitle())
				.postContent(postWriteReq.getPostContent())
				.postAnoInfo(postWriteReq.isPostAnoInfo())
				.postComBanInfo(postWriteReq.isPostComBanInfo())
				.postRegDate(LocalDateTime.now())
				.depart(depart)
				.category(category)
				.user(user)
				.build();
		Long postId = postRepository.save(post).getPostId();
		
		
//		post.setUser(user); 무덤
		return postId;
	}
	
	@Override	// 카테고리 ID 에 해당하는 게시글 조회
	public List<Post> findByCategory(Category category){
		List<Post> post = postRepository.findByCategory(category);
		return post;
	}
	
	@Override // 게시글 전체 조회
	public List<PostViewAllRes> viewAllPosts(Long departId, Long categoryId, String userId) {

//		System.out.println("=======================" + departId + "=======================");
//		System.out.println("=======================" + categoryId + "=======================");
//		List<Post> entityList = postRepository.findAllPosts(departRepository.findById(departId), categoryRepository.findById(categoryId));
//		List<Post> entityList = postRepository.findAllById(departRepository.findById(departId), categoryRepository.findById(categoryId));
//		List<PostViewAllRes> list = new ArrayList<>();
//		for (Post post : entityList) {
//			list.add(new PostViewAllRes(post));
//		}
		Depart depart = departRepository.findById(departId)
				.orElseThrow(() -> new IllegalArgumentException("post not found"));
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new IllegalArgumentException("category not found"));
		User user = userRepository.findById(userId).orElse(null);
		List<Post> postList = postRepository.findByDepartAndCategoryOrderByPostIdDesc(depart, category);
		
		List<PostViewAllRes> postViewAllResList;
		if(postList.isEmpty()) return null;
		else postViewAllResList = new ArrayList<PostViewAllRes>(); 
		
		
		for(Post p : postList) {
			if(p.isPostAnoInfo() == true) {
				p.getUser().setUserId("익명");
			}
			
			// 내가 이 게시글에 좋아요를 눌렀는지 체크
			UserPostLike userPostLike = userPostLikeRepository.findByPostAndUser(p, user).orElse(null);
			boolean myLike = false;
			
			if(userPostLike != null)
				myLike = true;
			
			Long likeCount = userPostLikeRepository.countByPost(p);
			Long commentCount = commentRepository.countByPost(p);
			
			postViewAllResList.add(PostViewAllRes.builder()
					.postId(p.getPostId())
					.postTitle(p.getPostTitle())
					.postContent(p.getPostContent())
					.postRegDate(p.getPostRegDate())
					.userId(p.getUser().getUserId())
					.likeCount(likeCount)
					.commentCount(commentCount)
					.myLike(myLike)
					.userName(p.getUser().getUserName())
					.build());
		}
		
		return postViewAllResList;
	}

	@Override // 게시글 상세 조회
	public PostViewOneRes viewFindOne(Long postId, String userId) {
		Post post = postRepository.findById(postId).orElse(null);
//		List<Post> postList = postRepository.findByPost(post);
//		if(postList.isEmpty()) return null;
//		else postViewReplyRes = new ArrayList<PostViewOneRes>();
		if(post.isPostAnoInfo() == true) {
			post.setUser(null);
		}
		
		User user = userRepository.findById(userId).orElse(null);
		UserPostLike like = userPostLikeRepository.findByPostAndUser(post, user).orElse(null);
		boolean myPostLike = false;
		if(like != null)
			myPostLike = true;
		
		Long postLikeCount = userPostLikeRepository.countByPost(post);

		
		return new PostViewOneRes(post, myPostLike, postLikeCount, post.getUser().getUserName());
	}

	@Override // 이름으로 게시글 검색
	public List<Post> viewByName(String name) {
//		return postRepository.findByName(name);
		return null;
	}

	@Override // 단일 게시글 삭제
	@Transactional
	public void deleteFindOne(Long postId) {
		postRepository.deleteById(postId);
	}

	@Override // 카테고리 게시글 일괄 삭제
	@Transactional
	public void deleteAllPosts(Long categoryId) {
		System.out.println("=====================");
		System.out.println(categoryId);
		System.out.println("=====================");
		postRepository.deleteByCategory(categoryRepository.findById(categoryId)
				.orElseThrow(() -> new IllegalArgumentException("category not found")));
	}

	@Override // 단일 게시글 수정
	@Transactional
	public LocalDateTime editPost(PostUpdateReq editPost) {
		Post post = postRepository.findById(editPost.getPostId()).orElse(null);
		if(post == null) {
			return null;
		}
		
		post.setPostTitle(editPost.getPostTitle());
		post.setPostContent(editPost.getPostContent());
		post.setPostUpdDate(LocalDateTime.now());
				
		postRepository.save(post);
		LocalDateTime ldt = post.getPostUpdDate();
		
		return ldt;
	}
	
	// 좋아요 기능 - 주희 추가
	// 좋아요 버튼 누름
	@Override
	@Transactional
	public long postLike(Long postId, String userId) {
		Post post = postRepository.findById(postId).orElse(null);
		User user = userRepository.findById(userId).orElse(null);
		
		System.out.println("========================");
		System.out.println("1");
		System.out.println("=========================");
		
		// UserPostLike 에서 Post 에 해당하는 user 가 있는지 찾기
		UserPostLike userPostLike = userPostLikeRepository.findByPostAndUser(post, user).orElse(null);
		
		System.out.println("========================");
		System.out.println("2");
		System.out.println("=========================");
		
		// 없다면, 추가
		if(userPostLike == null)
			userPostLikeRepository.save(UserPostLike.builder().post(post).user(user).build());
		// 있다면, 삭제
		else userPostLikeRepository.deleteById(userPostLike.getUserPostLikeId());
		
		// 변화된 갯수 리턴
		long count = userPostLikeRepository.countByPost(post);
		return count;
	}
}
