package com.ssafy.api.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.api.request.KakaoUser;
import com.ssafy.api.request.UserFindIdReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.api.response.UserCategoryRes;
import com.ssafy.api.response.UserDepartRes;
import com.ssafy.common.util.AuthPhoneUtil;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.depart.UserDepart;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.UserDepartRepository;
import com.ssafy.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
public class UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	UserDepartRepository userDepartRepository;
	@Autowired
	PasswordEncoder passwordEncorder;
	@Autowired
	AuthPhoneUtil authPhoneUtil;
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	@Autowired
	private StringRedisTemplate stringRedisTemplate;
	
	// 일반 회원가입
	public void signUp(User user) {
		// 보안을 위해서 유저 패스워드 암호화하여 디비에 저장
		user.setPassword(passwordEncorder.encode(user.getPassword()));
		userRepository.save(user);
	}
	
	// 카카오로 회원가입
	public void signUpKakao(KakaoUser kakaoUser) {
		User user = User.builder()
				.userId(kakaoUser.getSnsId())
				.userName(kakaoUser.getUserName())
				.email(kakaoUser.getEmail())
				.social(kakaoUser.getSnsId())
				.birth(kakaoUser.getBirth()).build();
		
		userRepository.save(user);
	}
	
	// 아이디에 해당하는 유저찾기
	public User findByUserId(String userId) {
		return userRepository.findById(userId).orElse(null);
	}
	
	// 이름에 해당하는 유저찾기
	public User getUserByUserName(String userName) {
		return userRepository.findByUserName(userName).orElse(null);
	}
	
	// 이름, 이메일로 아이디 찾기
	public User findId(UserFindIdReq findIdInfo) {
		Optional<User> user = userRepository.findByUserName(findIdInfo.getName());
		if(user==null) return null;
		
		if(user.get().getEmail().equals(findIdInfo.getEmail())) {	// 이름과 비밀번호가 같다면
			return user.get();
		}
		return null;
	}
	
	// 카카오로 회원가입했는 지 확인
	public Optional<User> findKakaoId(String userId) {
		return userRepository.findBySocial(userId);
	}
	
	// 아이디 중복 체크
	public User IdCheck(String userId) {
		return userRepository.findById(userId).orElse(null);
	}
	
	// 핸드폰 번호 중복 검사
	public boolean phoneCheck(String phoneNumber) {
		Optional<User> user = userRepository.findByPhone(phoneNumber);
		if(user == null) return true;
		return false;
	}
	
	// SMS 전송
	public void sendSMS(String phoneNumber, String fromNumber, String verifyCode) {
		authPhoneUtil.sendSMS(phoneNumber, fromNumber, verifyCode);	// SMS 전송
	}
	
	// 회원 정보 수정
	public void updateUser(UserUpdateReq userUpdateInfo) {
//		String loginId = GetLoginIdFromToken(accessToken);
		// 보안을 위해서 유저 패스워드 암호화하여 디비에 저장
		userUpdateInfo.setPassword(passwordEncorder.encode(userUpdateInfo.getPassword()));
		User user = User.builder()
					.userId(userUpdateInfo.getUserId())
					.password(userUpdateInfo.getPassword())
					.userName(userUpdateInfo.getUserName())
					.email(userUpdateInfo.getEmail())
					.birth(userUpdateInfo.getBirth())
					.phone(userUpdateInfo.getPhone())
					.build();
		
		userRepository.save(user);
	}
	
	// 비밀번호 업데이트
	public void updatePW(User user, String password) {
		user.setPassword(passwordEncorder.encode(password));
		userRepository.save(user);
	}
	
	// Redis
	public String getRedisStringValue(String key) {
		ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
		// * stringRedisTemplate 을 통해 다양한 타입의 자료구조도 사용이 가능. 자료구조의 직렬화 및 역직렬화 가능
		System.out.println("Redis key: " + key);
		System.out.println("Redis Value: " + stringValueOperations.get(key));
		return stringValueOperations.get(key);
	}
	
	public void setRedisStringValue(String key, String value) {
		ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
		stringValueOperations.set(key, value);
		System.out.println("Saved : RedisKey : " + key);
		System.out.println("Saved : RedisValue : " + stringValueOperations.get(key));
	}
	
	// 로그인한 유저의 가입한 채널 리스트를 넘김
	public List<UserDepartRes> getDepartList(String userId){
		User user = userRepository.findById(userId).orElse(null);
		
		List<UserDepart> list = userDepartRepository.findByUser(user);
		if(list.isEmpty()) return null;
		
		List<UserDepartRes> dtoList = new ArrayList<>();
		
		for(UserDepart d : list) {
			dtoList.add(new UserDepartRes(d.getDepart().getDepartId(), d.getDepart().getDepartName()));
		}
		
		return dtoList;
	}
	
	// 로그인한 유저의 가입한 채널 중 첫 번째 채널의 카테고리 리스트를 가져옴
	public List<UserCategoryRes> getCategoryList(String departId){
		
		return null;
	}
	
	// 회원 탈퇴
	public void deleteUser(String userId) {
		User user = userRepository.findById(userId).orElse(null);
		user.setUserDeleteInfo(true);
	}

}
