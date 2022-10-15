// 백엔드 통신
export const BACKEND_URL = "http://localhost:8080/api";

// 소셜 로그인 - 카카오톡
const CLIENT_ID = "77d4d4d9513fb3ed1863a05635d58fd8";
// const REDIRECT_URI =  "https://i7b107.p.ssafy.io:3000/oauth/callback/kakao";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

