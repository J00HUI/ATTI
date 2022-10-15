package com.ssafy.api.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Service
public class AuthService {
	// 카카오에게 인가코드로 토큰 받고 자체 서버 토큰 발행
	public String getReturnAccessToken(String code) {
		String access_token = "";
        String refresh_token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

       try {
    	   URL url = new URL(reqURL);
           HttpURLConnection conn = (HttpURLConnection) url.openConnection();
           
           //HttpURLConnection 설정 값 셋팅
           conn.setRequestMethod("POST");
           conn.setDoOutput(true);


           // buffer 스트림 객체 값 셋팅 후 요청
           BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
           StringBuilder sb = new StringBuilder();
           sb.append("grant_type=authorization_code");
           sb.append("&client_id=77d4d4d9513fb3ed1863a05635d58fd8");  //앱 KEY VALUE
           sb.append("&redirect_uri=http://localhost:3000/oauth/callback/kakao"); // 앱 CALLBACK 경로
           sb.append("&code=" + code);
           bw.write(sb.toString());
           bw.flush();

           //  RETURN 값 result 변수에 저장
           BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
           String br_line = "";
           String result = "";

           while ((br_line = br.readLine()) != null) {
               result += br_line;
           }

           JsonParser parser = new JsonParser();
           JsonElement element = parser.parse(result);


           // 토큰 값 저장 및 리턴
           access_token = element.getAsJsonObject().get("access_token").getAsString();
           refresh_token = element.getAsJsonObject().get("refresh_token").getAsString();

           br.close();
           bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_token;
	}
	
	// 카카오에서 토큰을 사용해 사용자 정보 담아서 반환
	public Map<String,Object> getUserInfo(String access_token) {
        Map<String,Object> resultMap = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
         try {
             URL url = new URL(reqURL);
             HttpURLConnection conn = (HttpURLConnection) url.openConnection();
             conn.setRequestMethod("GET");

            //요청에 필요한 Header에 포함될 내용
             conn.setRequestProperty("Authorization", "Bearer " + access_token);

             int responseCode = conn.getResponseCode();
             System.out.println("responseCode : " + responseCode);

             BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

             String br_line = "";
             String result = "";

             while ((br_line = br.readLine()) != null) {
                 result += br_line;
             }
            System.out.println("response:" + result);
            
            // 카카오 에게서 가져올 수 있는 것
            // profile_nickname, account_email, birthday

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
//            log.warn("element:: " + element);
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
//            log.warn("id:: "+element.getAsJsonObject().get("id").getAsString());
            String id = element.getAsJsonObject().get("id").getAsString();
            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();
            String birthday = kakao_account.getAsJsonObject().get("birthday").getAsString();
            
//            log.warn("email:: " + email);
            resultMap.put("id", email);
            resultMap.put("nickname", nickname);
            resultMap.put("email", email); 
            resultMap.put("birthday", birthday);
            
// 			    우리 서비스에서 필요한 정보
//            v nickname: String (닉네임) - 프로필 정보(닉네임/프로필 사진)또는 닉네임
//            x profile_image_url : String (프로필 사진 URL) 640px * 640px / 480px*480px
//            name:  String (카카오계정 이름) - 이름
//            v email: String (카카오 계정 대표 이메일) - 카카오 계정(이메일)
//            birthyear: String (출생연도) YYYY 형식 - 출생 연도
//            birthday: String (생일) MMDD 형식 - 생일
//            phone_number (카카오 계정의 전화번호) +82-00-0000-0000 형식 - 카카오계정(전화번호)

         } catch (IOException e) {
             // TODO Auto-generated catch block
             e.printStackTrace();
         }
         return resultMap;
     }
}
