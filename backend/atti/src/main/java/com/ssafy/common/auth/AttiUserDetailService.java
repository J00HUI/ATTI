package com.ssafy.common.auth;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.user.User;

import lombok.RequiredArgsConstructor;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
public class AttiUserDetailService implements UserDetailsService{

	@Autowired
	UserService userService;
	
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    		User user = userService.getUserByUserName(username);	// 이름으로 유저 찾기
    		if(user != null) {		// 있다면
    			AttiUserDetails userDetails = new AttiUserDetails(user);	// 새 객체 생성
    			return userDetails;
    		}
    		return null;
    }
}
