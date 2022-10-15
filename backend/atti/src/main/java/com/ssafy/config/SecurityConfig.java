package com.ssafy.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.AttiUserDetailService;
import com.ssafy.common.auth.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

/**
 * 인증(authentication) 와 인가(authorization) 처리를 위한 스프링 시큐리티 설정 정의.
 */

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private AttiUserDetailService attiUserDetailService;
	
	@Autowired
    private UserService userService;
	
	// Password 인코딩 방식에 BCrypt 암호화 방식 사용
	@Bean
	public PasswordEncoder passwordEncorder() {
		return new BCryptPasswordEncoder();
	}
	
	// DAO 기반으로 Authentication(인증) Provider 를 생성
	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setPasswordEncoder(passwordEncorder());
		daoAuthenticationProvider.setUserDetailsService(this.attiUserDetailService);
		return daoAuthenticationProvider;
	}
	
	// Dao 기반의 Authentication Provider 가 적용되도록 설정
	@Override
	protected void configure(AuthenticationManagerBuilder auth) {
		auth.authenticationProvider(authenticationProvider());
	}
	
//		http
//        .authorizeRequests()
//        .anyRequest().authenticated()
//		  .and()
//        .formLogin()//Form 로그인 인증 기능이 작동함
//        .loginPage("/login.html")//사용자 정의 로그인 페이지
//        .defaultSuccessUrl("/home")//로그인 성공 후 이동 페이지
//        .failureUrl("/login.html?error=true")// 로그인 실패 후 이동 페이지
//        .usernameParameter("username")//아이디 파라미터명 설정
//        .passwordParameter("password")//패스워드 파라미터명 설정
//        .loginProcessingUrl("/login")//로그인 Form Action Url
//        .successHandler(loginSuccessHandler())//로그인 성공 후 핸들러 (해당 핸들러를 생성하여 핸들링 해준다.)
//        .failureHandler(loginFailureHandler());//로그인 실패 후 핸들러 (해당 핸들러를 생성하여 핸들링 해준다.)
//						.permitAll(); //사용자 정의 로그인 페이지 접근 권한 승인
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic().disable()
		.csrf().disable()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	// 토큰 기반 인증이므로 세션 사용하지 않음
		.and()
		.addFilter(new JwtAuthenticationFilter(authenticationManager(), userService)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
		 .authorizeRequests()
		 // 아래의 경로는 인증을 해야 접근이 허용된다.
		 .antMatchers("/api/user").authenticated()
//		 .antMatchers("/api/user/signup/normal").authenticated()
//         .antMatchers("/api/v1/users/me").authenticated()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
//	        	    .anyRequest().permitAll()
		 // "/api/auth" 에 대한 요청은 인증 없이 접근을 허용하겠다.
//		 .antMatchers("/api/auth/**/").permitAll()
		 // 나머지 요청들은 모두 인증되어야 한다.
//		 .anyRequest().authenticated()
		 .anyRequest().permitAll()	// 모든 요청은 인증 없이 접근을 허용한다.
         .and().cors();
	}
	
}














