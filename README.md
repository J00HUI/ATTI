<div align="center">
  <br />
  <img src="https://user-images.githubusercontent.com/83942393/187016711-a48c760e-8ffb-4a38-94c2-d5623cb1706f.png" width="20%" height="20%" alt="ATTI" />
  <br />
  <h1>아띠, ATTI</h1>
  자체 커뮤니티와 함께 화상회의가 가능한 교육 플랫폼, ATTI
  <br />
</div>
</br>

## 🔦 목차
1. 개발 멤버 소개
2. 프로젝트 소개
3. 기술 스택
4. 시스템 아키텍처
5. 주요 기능
6. UCC
7. 협업
8. 프로젝트 기간
9. 문서
</br>

## 💡 서비스 소개
비대면 수업 만족도가 높아지는 것에 비하여 학습 생산성 향상과 저하는 큰 차이가 없다는 통계 결과가 있습니다. </br>
생산성 제고를 위해 가장 필요한 것은 교수자와 학습자 사이의 소통 채널이라는 응답 결과가 있습니다. </br>
이러한 설문 조사 결과와 여러 서비스를 함께 이용하면서 겪은 불편함을 해소하기 위해 "ATTI"를 만들게 되었습니다. </br>
</br>

## 📅 개발 기간
> 2022.07.11 ~ 2022.08.19 </br>

- 기획 및 설계 : 07.11 ~ 07.24 </br> 
- 개발 : 07.25 ~ 08.19 </br>
- 버그 수정 및 산출물 정리 : 08.15 ~ 08.19 </br>
</br>

## 👩🏻‍🚀 개발 멤버 소개
<table>
  <tr>
    <td height="140px" align="center"><a href="https://github.com/TypingOK">
      <img src="https://avatars.githubusercontent.com/TypingOK" width="140px"/> <br><br> 정진 <br>(Front-End) </a> <br></td>
    <td height="140px" align="center"><a href="https://github.com/LeeHyeonT">
      <img src="https://avatars.githubusercontent.com/LeeHyeonT" width="140px"/> <br><br> 이현태 <br>(Front-End) </a> <br></td>
    <td height="140px" align="center"><a href="https://github.com/yeonsu-k">
      <img src="https://avatars.githubusercontent.com/yeonsu-k" width="140px"/> <br><br> 김연수 <br>(Front-End) </a> <br></td>
    <td height="140px" align="center"><a href="https://github.com/lhynjn9">
      <img src="https://avatars.githubusercontent.com/lhynjn9" width="140px"/> <br><br> 이현정 <br>(Back-End) </a> <br></td>
    <td height="140px" align="center"><a href="https://github.com/ssafypark">
      <img src="https://avatars.githubusercontent.com/ssafypark" width="140px"/> <br><br> 박범수 <br>(Back-End) </a> <br></td>
    <td height="140px" align="center"><a href="https://github.com/J00HUI">
      <img src="https://avatars.githubusercontent.com/J00HUI" width="140px"/> <br><br> 이주희 <br>(Back-End) </a> <br></td>
  </tr>
  <tr>
      <td align="center">팀장<br/>React<br/>WebRTC</td>
      <td align="center">UI/UX<br/>React</td>
      <td align="center">UI/UX<br/>React</td>
      <td align="center">Database<br/>CI/CD<br/>WebRTC</td>
      <td align="center">REST API</td>
      <td align="center">REST API</td>
  </tr>
</table>
</br>

## 💻 주요 기능
### 홈화면
- 해당 서비스의 주요 기능을 확인할 수 있습니다.

| |
|:-------:|
|![홈화면](https://user-images.githubusercontent.com/83942393/187027550-0c0e18da-5714-40d5-912d-827a928fa87e.gif) |
</br>

### 문자 인증

### 채널 생성
- 회원 누구나 채널 생성이 가능하며 채널 생성 시 해당 채널의 관리자가 됩니다.
- 관리자는 관리자 페이지에 생성된 초대 코드를 통해 회원을 초대할 수 있습니다.

| |
|:-------:|
|![채널 생성](https://user-images.githubusercontent.com/83942393/187027645-f96db426-6886-43cd-b0be-d64413e39f6b.gif) |
</br>

### 채널 가입 
- 관리자에게 받은 초대코드를 입력하여 해당 채널에 가입할 수 있습니다.

| |
|:-------:|
|![채널 가입](https://user-images.githubusercontent.com/83942393/187027655-b810f800-aa77-4dd5-8b0e-cdf3fbc4967d.gif) |
</br>

### 공지사항
- 공지사항은 관리자만 글 작성 및 삭제, 수정이 가능합니다.
- 댓글과 좋아요

| |
|:-------:|
|![공지사항 글쓰기, 댓글, 좋아요](https://user-images.githubusercontent.com/83942393/187030962-d0216003-2de3-414b-a39d-280291f46ef3.gif) |
</br>

### 카테고리 생성
- 관리자는 카테고리를 생성 및 삭제할 수 있습니다.
- 카테고리 생성 시 해당 카테고리에 작성되는 게시글, 댓글 익명 여부, 댓글 금지 여부를 선택하여 생성할 수 있습니다.

| |
|:-------:|
|![카테고리 생성](https://user-images.githubusercontent.com/83942393/187027729-8276d838-4edf-46ed-86d6-359e9a0a55ae.gif) |
</br>

### 시간표 생성
- 관리자는 시간표의 빈 공간을 클릭하여 수업 시간표를 생성, 삭제 및 수정할 수 있습니다.
- 생성된 수업의 접속하기 버튼을 통해 화상 미팅실로 이동됩니다.

| |
|:-------:|
|![시간표 생성](https://user-images.githubusercontent.com/83942393/187027752-a87fe82e-93ce-466f-88e0-50adac5020ae.gif) |
</br>

### 수업실 입장
- 학생은 접속하기 버튼을 통해 화상 미팅실로 이동하며, 자동으로 출석체크가 됩니다.
- 수업 시작 시간 30분 전부터 수업 시작 시간까지는 출석으로 인정되며, 이후에는 지각, 수업 시작 종료 후에는 접속하기 버튼은 비활성화되며 결석으로 처리됩니다.

| |
|:-------:|
|![수업실 입장](https://user-images.githubusercontent.com/83942393/187027833-2e866880-2f7c-4eb5-b5ff-493ac35c3856.gif) |
</br>

| |
|:-------:|
|![수업실 찐입장](https://user-images.githubusercontent.com/83942393/187027979-049137f1-3581-4b8b-b64a-4ab189b58923.gif) |
</br>

### 접속자 미접속자 구분 
- 입장과 동시에 접속자와 미접속자가 구분되어 한 눈에 결석자를 파악할 수 있습니다.

| |
|:-------|
|<img src="https://user-images.githubusercontent.com/83942393/187028113-c5953978-f967-48db-b1d5-2a89eb36fdee.png" width="80%" height="80%"> |
</br>

### QnA 작성
- 수업 중 궁금한 내용이 있다면 QnA 카테고리로 변경하여 질문을 남길 수 있습니다.
- 일반 채팅과 색이 구분되며 채팅 상단에 고정됩니다.

| QnA 작성 |
|:-------:|
|![QnA 작성](https://user-images.githubusercontent.com/83942393/187029697-c9e686a1-8771-4ec5-bd6b-d7e80c198cd5.gif) |
</br>

### 답변 작성
- 수업 중 올라온 질문에 대해 수업 호스트만이 답변을 달 수 있습니다.

|  |
|:-------:|
|![답변 남김](https://user-images.githubusercontent.com/83942393/187029916-02cf82ac-6314-46ef-96dd-5c110f0633d2.gif) |
</br>

### 질문 게시판 자동 업로드
- 수업 중 올라온 질문과 답변은 질문 게시판과 연동되어 자동으로 업로드 됩니다.
- 수업이 종료되어도 다시 확인할 수 있습니다.

|  |
|:-------:|
|![질문 게시판 답변](https://user-images.githubusercontent.com/83942393/187029968-65f95b45-589e-4f44-b488-18f0707ffa76.gif) |
</br>

### 1:1 채팅 구분
- 1:1 채팅 시 전체 채팅과 헷갈리지 않도록 다른 색으로 구분하였습니다.

|  |
|:-------:|
|![1대1](https://user-images.githubusercontent.com/83942393/187030019-5f72d68f-e804-4194-8d66-30ea8d66b652.gif) |
</br>

### 마이크 On/Off , 카메라 On/Off
- 마이크와 카메라 On/Off 기능입니다.

|  |
|:-------:|
|![카메라 onoff](https://user-images.githubusercontent.com/83942393/187030088-dee2282d-cbe7-4a5c-8745-49961664b555.gif) |
</br>

### 화면 공유, 레이아웃 변경
- 화면 공유 기능과 화면 공유 시 전체 화면 보기와 참가자 목록과 함께 보기의 레이아웃을 변경할 수 있습니다.

|  |
|:-------:|
|![화면공유 및 레이아웃 변경](https://user-images.githubusercontent.com/83942393/187030129-f32f8461-4ab8-467a-8a14-907a7c0e964c.gif) |
</br>

### 익명 모드
- 호스트의 수업 참여 유도와 발표가 쑥쓰러운 친구를 위한 익명 모드 발표 기능입니다.
- 익명 모드 활설화 시 "익명모드가 활성화 되었습니다" 라는 음성과 함께 모든 참여자의 이름과 카메라가 가려지며, 채팅을 치면 해당 내용을 TTS 가 대신 읽어주는 기능입니다.

|  |
|:-------:|
|![익명모드](https://user-images.githubusercontent.com/83942393/187030136-6181e9b5-15cd-444c-a576-7247c17cde5b.gif) |
</br>


- 참가자는 호스트에게 익명모드를 요청할 수 있으며, 호스트가 수락 시 활성화가 됩니다.

|  |
|:-------:|
|![익명모드 수락](https://user-images.githubusercontent.com/83942393/187030190-3f75214b-c9e5-4494-b698-7c0047af37cb.gif) |
</br>

### 채팅창 및 참가자 목록 레이아웃 변경
- 참가자는 자유롭게 채팅창 및 참가자 목록을 열고 닫을 수 있습니다.

|  |
|:-------:|
|![참가자목록, 채팅창 열고 닫기](https://user-images.githubusercontent.com/83942393/187030203-7f04f016-4fe7-46bc-bddb-245621d3cfe7.gif) |
</br>

### 출결 변경
- 관리자는 학생의 출결을 변경할 수 있습니다.
- 날짜를 클릭하면 해당 날짜에 개설되었던 수업 목록이 나오고, 수업 목록을 클릭 시 학생들의 목록이 나오고 출결을 변경할 수 있습니다.

|  |
|:-------:|
|![출석 변경](https://user-images.githubusercontent.com/83942393/187027995-87b99162-a4ef-415d-8d39-9b26a8bfec78.gif) |
</br>

### 💎 기술 스택
<img src="https://user-images.githubusercontent.com/83942393/187019618-99c2dd8d-895a-4c46-b572-d009962eb73d.png" width="60%" height="60%">
</br>
버전 정보

### 🛠 시스템 아키텍처
| 시스템 구성도 |
|:-------:|
|<img src="https://user-images.githubusercontent.com/83942393/187021364-6c86d1f0-e95c-4c0f-9155-2fe578c270c1.png" width="60%" height="60%"> |
</br>

| 배포 흐름도 |
|:-------:|
|<img src="https://user-images.githubusercontent.com/83942393/187021368-ac3dc959-1d0d-447c-8b3d-42ff179b7cd2.png" width="70%" height="70%"> |
</br>

### 📹 UCC
</br>

### 협업
| JIRA |
|:-------:|
|<img src="https://user-images.githubusercontent.com/83942393/187021368-ac3dc959-1d0d-447c-8b3d-42ff179b7cd2.png" width="70%" height="70%"> |
</br>

| Notion |
|:-------:|
|<img src="https://user-images.githubusercontent.com/83942393/187021368-ac3dc959-1d0d-447c-8b3d-42ff179b7cd2.png" width="70%" height="70%"> |
</br>

### 🗂 문서
<table>
  <tr>
    <td>Figma (화면 설계)</td><td>1</td>
  </tr>
  <tr>
    <td>API DOCS</td><td>1</td>
  </tr>
  <tr>
    <td>컬러 팔레트</td><td>1</td>
  </tr>
  <tr>
    <td>Git 컨벤션</td><td>1</td>
  </tr>
  <tr>
    <td>ERD</td><td>1</td>
  </tr>
  <tr>
    <td>기능 명세서</td><td><1/td>
  </tr>
  <tr>  
    <td>제약 사항</td><td>1</td>
  </tr>
  <tr>  
    <td>버그 목록</td><td>1</td>
  </tr>
  <tr>
    <td>외부 서비스</td><td>1</td>
  </tr>
  <tr>  
    <td>Daily Scrum</td><td>1</td>
  </tr>
  <tr>
    <td>건강 지킴이</td><td>1</td>
  </tr>
</table>





