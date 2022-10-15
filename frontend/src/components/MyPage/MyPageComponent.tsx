import { useState } from "react";
import styled from "styled-components";
import { palette } from "../../styles/palette";
import AdminContactHistory from "./AdminContactHistory";
import AttiAsk from "./AttiAsk";
import ContactAdmin from "./ContactAdmin";
import MyPage from "./MyInfo";

function MyPageComponent() {
  const [value, setValue] = useState(0);

  //const tabContArr = [<MyPage />, <ContactAdmin />, <AdminContactHistory />];
  const tabContArr = [<MyPage />, <AttiAsk/>];

  return (
    <>
      <div>
        <ul>
          <Tab
            style={
              value == 0
                ? { background: `${palette.main_grPurple}` }
                : { color: "black" }
            }
            onClick={() => setValue(0)}
          >
            내 정보
          </Tab>
          <Tab
            style={
              value == 1
                ? { background: `${palette.main_grPurple}` }
                : { color: "black" }
            }
            onClick={() => setValue(1)}
          >
           ATTI에게 문의하기
          </Tab>
          {/* <Tab
            style={
              value == 2
                ? { background: `${palette.main_grPurple}` }
                : { color: "black" }
            }
            onClick={() => setValue(2)}
          >
            문의 내역
          </Tab> */}
        </ul>
      </div>
      <div>{tabContArr[value]}</div>
    </>
  );
}

const Tab = styled.li`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  display: inline-block;
  color: white;
  margin-right: 30px;
  border: 0px solid;
  font-size: 1.2rem;
  cursor: pointer;
`;

export default MyPageComponent;
