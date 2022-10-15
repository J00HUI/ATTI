package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.request.DepartCreateReq;
import com.ssafy.api.request.DepartJoinReq;
import com.ssafy.api.response.CategoryListRes;
import com.ssafy.db.entity.depart.Depart;

public interface DepartService {
	Long createChannel(DepartCreateReq departCreateReq); // 채널 생성
	List<CategoryListRes> joinChannel(String departCode, String userId); // 채널 입장
	public boolean isOnChannelUser(Long departId, String userId);	// 채널에 가입된 회원인지 여부 리턴
	Long getDepartIdByCode(String departCode);
}
