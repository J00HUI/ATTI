package com.ssafy.api.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.request.DepartCreateReq;
import com.ssafy.api.response.CategoryListRes;
import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.UserDepart;
import com.ssafy.db.entity.user.AdminRole;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.AdminRoleRepository;
import com.ssafy.db.repository.CategoryRepository;
import com.ssafy.db.repository.DepartRepository;
import com.ssafy.db.repository.UserDepartRepository;
import com.ssafy.db.repository.UserRepository;

@Service
@Transactional
public class DepartServiceImpl implements DepartService {
	
	@Autowired
	private DepartRepository departRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private AdminRoleRepository adminRoleRepository;
	
	@Autowired
	private UserDepartRepository userDepartRepository;
	
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private PostService postService;
	
	@Override // 채널 생성
	public Long createChannel(DepartCreateReq departCreateReq) { //, String userId

		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 10;
		Random random = new Random();
		
		String generatedString = random.ints(leftLimit,rightLimit + 1)
		  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
		  .limit(targetStringLength)
		  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
		  .toString();
		
		User user = userRepository.findById(departCreateReq.getUserId()).orElse(null);
		
		Depart createDepart = Depart.builder()
				.departName(departCreateReq.getDepartName())
				.departCode(generatedString)
				.user(user)
				.build();
		
		Long departId = departRepository.save(createDepart).getDepartId();
		// 관리자 설정
		AdminRole role = AdminRole.builder().depart(createDepart).user(user).build();
		adminRoleRepository.save(role);
		
		// 채널 가입
		UserDepart ud = UserDepart.builder().depart(createDepart).user(user).build();
		userDepartRepository.save(ud);
		
		// 카테고리 생성
		Category category1 = Category.builder()
				.categoryName("공지사항")
				.ctype("NOTICE")
				.user(user)
				.depart(createDepart)
				.build();
		
		Category category2 = Category.builder()
				.categoryName("질문")
				.ctype("QNA")
				.user(user)
				.depart(createDepart)
				.build();
		
		Category category3 = Category.builder()
				.categoryName("자료실")
				.ctype("DATA")
				.user(user)
				.depart(createDepart)
				.build();
		
		Category category4 = Category.builder()
				.categoryName("자유게시판")
				.ctype("FREE")
				.user(user)
				.depart(createDepart)
				.build();
		
		Category category5 = Category.builder()
				.categoryName("수업실")
				.ctype("TIMETABLE")
				.user(user)
				.depart(createDepart)
				.build();
		
		categoryRepository.save(category1);
		categoryRepository.save(category2);
		categoryRepository.save(category3);
		categoryRepository.save(category4);
		categoryRepository.save(category5);
//		Optional<Depart> depart2 = departRepository.findById((long) 1);
//		Depart depart3 = departRepository.findById((long)1).orElse(null);
		
		// 무덤
//		depart.setDepartCode(generatedString);
//		depart.setUser(userRepository.findById(userId));
		return departId;
	}

	@Override // 채널 입장
	public List<CategoryListRes> joinChannel(String departCode, String userId) {
		Depart depart = departRepository.findByDepartCode(departCode).orElse(null);
//				.orElseThrow(() -> new IllegalArgumentException("joinChannel - departCode not found"));
		
		Long departId = depart.getDepartId();
		
		// 채널 가입
		User user = userRepository.findById(userId).orElseThrow(()-> new IllegalArgumentException("joinChannel - no User"));
		
		UserDepart ud = UserDepart.builder()
				.user(user)
				.depart(depart).build();
		
		userDepartRepository.save(ud);
		
		// 채널 카테고리 리스트 넘김
		List<CategoryListRes> categoryList = categoryService.getCategoryList(departId);
		
		return categoryList;
	}
	
	@Override
	// 채널에 가입된 회원인지 여부 리턴
	public boolean isOnChannelUser(Long departId, String userId) {
		User user = userRepository.findById(userId).orElse(null);
		Depart depart = departRepository.findById(departId).orElse(null);
		
		UserDepart ud = userDepartRepository.findByDepartAndUser(depart, user).orElse(null);
		
		if(ud == null) // 가입된 회원이 아님
			return false;
		else return true;
	}
	
	@Override
	public Long getDepartIdByCode(String departCode) {
		Depart depart = departRepository.findByDepartCode(departCode).orElse(null);
		if(depart == null) return null;
		return depart.getDepartId();
	}
	

}
