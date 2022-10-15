package com.ssafy.api.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.validation.Valid;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserFindIdReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.api.response.FindIdRes;
import com.ssafy.api.response.UserInfoRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.AttiUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.user.User;

//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiResponse;
//import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

//@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired
	JwtTokenUtil jwtTokenUtil;
	
	// 일반 회원가입
//	@ApiResponses({
//		@ApiResponse(code =  200, message = "성공"),
//		@ApiResponse(code = 401, message = "인증 실패"),
//		@ApiResponse(code = 404, message = "사용자 없음"),
//		@ApiResponse(code = 500, message = "서버 오류")
//	})
	@PostMapping("/signup/normal")
	public ResponseEntity<?> signUpNormal(@RequestBody @Valid User user) throws Exception {
		userService.signUp(user);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	// 소셜 회원가입
	@PostMapping("/signup/social")
	public void signUpSocial(User user) {
		
	}
	
	// 아이디 중복 체크
	@GetMapping("/idcheck")
	public Boolean idCheck(@RequestParam("ckid") String checkId) throws Exception {
		User user = userService.IdCheck(checkId);
		if(user==null) return true;
		return false;
	}
	
	// 아이디 찾기
	@PostMapping("/findId")
	public ResponseEntity<FindIdRes> findId(@RequestBody UserFindIdReq findIdInfo) {
		User user = userService.findId(findIdInfo);
		
		if(user==null)
			return ResponseEntity.status(404).body(FindIdRes.of(404, "일치하는 회원이 없습니다.", null));
		
		return ResponseEntity.ok(FindIdRes.of(200, "Success", user.getUserId()));
	}
	
	// 회원정보 수정
	@PutMapping("/updateUser")
	public ResponseEntity<?> updateUser(@RequestBody UserUpdateReq userUpdateInfo) {
		userService.updateUser(userUpdateInfo);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원 정보가 정상적으로 수정되었습니다. "));
	}
	
	// 비밀번호 찾기 요청
	@PostMapping("/findPassword")
	public ResponseEntity<?> findPassword(@RequestBody Map<String, String> findPasswordInfo) {
		// 가입한 아이디인지 검사
		User findUser = userService.findByUserId(findPasswordInfo.get("userId"));
		
		if(findUser == null)
			return ResponseEntity.status(404).body(BaseResponseBody.of(404, "가입된 아이디가 없습니다."));
		
		if(!findUser.getUserName().equals(findPasswordInfo.get("userName")))
			return ResponseEntity.status(404).body(BaseResponseBody.of(404, "일치하는 회원이 없습니다."));
		
		if(!findUser.getPhone().equals(findPasswordInfo.get("phoneNumber")))
			return ResponseEntity.status(404).body(BaseResponseBody.of(404, "일치하는 회원이 없습니다."));
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "비밀번호 변경 모달로 넘어갑니다."));
	}
	
	// 비밀번호 찾기 후 변경 요청
	@PutMapping("/updatePassword")
	public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> updatePWInfo){
		// 아이디 입력했는지 검사
		if(updatePWInfo.get("userId") == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "아이디를 입력해 주세요."));
		// 비밀번호 입력했는지 검사
		if(updatePWInfo.get("password") == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "비밀번호를 입력해 주세요."));
		
		// 가입한 아이디인지 검사
		User findUser = userService.findByUserId(updatePWInfo.get("userId"));
		
		if(findUser == null)
			return ResponseEntity.status(404).body(BaseResponseBody.of(404, "가입된 아이디가 없습니다."));
		
		// 비밀번호 업데이트
		userService.updatePW(findUser, updatePWInfo.get("password"));
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "비밀번호가 변경되었습니다."));
	}
	
	// 회원 탈퇴
	@PutMapping("/delete/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable("userId") String userId){
		userService.deleteUser(userId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "탈퇴되었습니다."));
	}
	
	// 프로필 이미지 변경
	
	// 회원 정보 조회
	@GetMapping("/{userId}")
	public ResponseEntity<? extends BaseResponseBody> getUserInfo(@PathVariable("userId") String userId){
		User user = userService.findByUserId(userId);
		
		if(user == null) return ResponseEntity.status(400).body(BaseResponseBody.of(400, "회원 정보를 불러오지 못했습니다."));
		
		return ResponseEntity.status(200).body(UserInfoRes.of(200, "success", user.getUserName(), user.getEmail(), user.getBirth(), user.getPhone()));
	}
	
	
	
	// 회원 정보 조회 + spring security + access token
//	@GetMapping()
//	public ResponseEntity<? extends BaseResponseBody> getUserInfo(Authentication authentication){
//		
//		System.out.println("GET USER INFO");
//		AttiUserDetails attiDetails = (AttiUserDetails) authentication.getDetails();
//		String userId = attiDetails.getUser().getUserId();
//		
//		System.out.println("==============================");
//		System.out.println("userId :" + userId);
//		System.out.println("==============================");
		
//		User user = userService.findByUserId(userId);
		
//		if(user == null) return ResponseEntity.status(400).body(BaseResponseBody.of(400, "회원 정보를 불러오지 못했습니다."));
//		return ResponseEntity.status(200).body(UserInfoRes.of(200, "success", user.getUserName(), user.getEmail(), user.getBirth(), user.getPhone()));
//	}
}




















