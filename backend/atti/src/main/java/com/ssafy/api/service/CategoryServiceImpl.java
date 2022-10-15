package com.ssafy.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.request.CategoryCreateReq;
import com.ssafy.api.response.CategoryListRes;
import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Ctype;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.CategoryRepository;
import com.ssafy.db.repository.DepartRepository;
import com.ssafy.db.repository.UserRepository;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private DepartRepository departRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override // 카테고리 생성
	public Long createCategory(CategoryCreateReq categoryCreateReq) {
		Depart depart = departRepository.findById(categoryCreateReq.getDepartId()).orElse(null);
		User user = userRepository.findById(categoryCreateReq.getUserId()).orElse(null);
		
 		System.out.println("=====================");
 		System.out.println(categoryCreateReq.getType());
		System.out.println("=====================");
		
		Category category = Category.builder()
				.categoryName(categoryCreateReq.getCategoryName())
				.categoryAnoInfo(categoryCreateReq.isCategoryAnoInfo())
				.categoryComInfo(categoryCreateReq.isCategoryComAnoInfo())
				.categoryComAnoInfo(categoryCreateReq.isCategoryComAnoInfo())
				.ctype(categoryCreateReq.getType())
				.depart(depart)
				.user(user)
				.build();
		
//		categoryRepository.save(category).getCategoryId();
		
		return categoryRepository.save(category).getCategoryId();
	}
	
	// 채널 ID 에 해당하는 카테고리 리스트를 가져옴
	@Override
	public List<CategoryListRes> getCategoryList(Long departId) {
		Depart depart = departRepository.findById(departId).orElse(null);
		if(depart == null) return null;
		
		List<Category> categoryList = categoryRepository.findByDepart(depart);
		if(categoryList.isEmpty()) return null;
		
		List<CategoryListRes> dtoList = new ArrayList<>();
		for(Category c : categoryList) {
			dtoList.add(CategoryListRes.builder()
					.userId(c.getUser().getUserId())
					.departId(departId)
					.departName(depart.getDepartName())
					.categoryId(c.getCategoryId())
					.categoryName(c.getCategoryName())
					.cType(c.getCtype())
					.categoryAnoInfo(c.isCategoryAnoInfo())
					.categoryComInfo(c.isCategoryComInfo())
					.categoryComAnoInfo(c.isCategoryComAnoInfo()).build());
		}
		
		return dtoList;
	}
	
	@Override
	public Category getByCategoryId(Long categoryId) {
		return categoryRepository.findById(categoryId).orElse(null);
	}
}
