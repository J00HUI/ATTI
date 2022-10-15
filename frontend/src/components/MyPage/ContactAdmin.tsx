import styled from "styled-components";
import { palette } from "../../styles/palette";
import { ButtonBlue } from "../ButtonStyled";
import InputWithLabel from "../InputWithLabel";

function ContactAdmin() {
  return (
    <>
    <Main>
      <Grid>
        <SpanStyle>제목</SpanStyle>
        <InputWithLabel name={""} placeholder={""} />

        <SpanStyle>작성자</SpanStyle>
        <InputWithLabel name={""} placeholder={""} />

        <SpanStyle>내용</SpanStyle>
        <TextAreaa name={""} placeholder={""} />

        <SpanStyle>첨부파일</SpanStyle>
        <InputWithLabel name={""} placeholder={""} />
      </Grid>
    <Button>전송</Button>
    </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 100px 500px;
  grid-template-rows: 1fr 1fr 5fr 1fr;
  row-gap: 20px;
  column-gap: 50px;
  align-items: stretch;
  margin-bottom: 30px;;
`;

const SpanStyle = styled.span`
  padding: 12px 0px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  background: ${palette.blue_1};
  color: black;
  border: 0px solid;
  font-size: 1rem;
  text-align: center;
`;

const TextAreaa= styled.textarea`
    width: 98%;
    height: 98%;
    border: 1.5px solid ${palette.gray_2};
    resize: none;
    border-radius: 0.3rem;
    background: ${palette.gray_1};
    font-size: 1rem;
    &:focus{
      outline-color: ${palette.blue_4};
    }
`;

const Button = styled(ButtonBlue)`
  font-weight: bold;
  font-size: 0.875rem;
  padding: 12px 50px;
  border-radius: 8px;

`;


export default ContactAdmin;
