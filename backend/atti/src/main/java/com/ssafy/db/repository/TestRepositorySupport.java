//package com.ssafy.db.repository;
//
//import java.security.cert.PKIXRevocationChecker.Option;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import com.google.common.base.Optional;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.db.entity.user.User;
//
//@Repository
//public class TestRepositorySupport {
//	@Autowired
//	private JPAQueryFactory jpaQueryFactory;
//	
//    QUser qUser = QUser.user;
//    
//    public Optional<User> findUserByUserId(String userId){
//    	User user = jpaQueryFactory.select(qUser).from(qUser)
//    			.where(qUser.userId.eq).fetchOne();
//    	
//    }
//	
//	
//
//}
