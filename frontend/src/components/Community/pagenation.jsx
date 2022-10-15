import styled from "styled-components";
import { palette } from "../../styles/palette";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <ArrowButton onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </ArrowButton>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <ArrowButton onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </ArrowButton>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  position: fixed;
  left: 900px;
  bottom: 40px;
`;

const ArrowButton = styled.button`
border: none;
border-radius: 50%;
margin: 0;
background: ${palette.main_grBlue};
color: white;
font-weight: bold;
font-size: 1.1rem;
width: 50px;
height: 50px;
&:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`
const Button = styled.button`
border: none;
border-radius: 50%;
margin: 0;
background: ${palette.gray_1};
color: black;
font-weight: bold;
font-size: 1.1rem;
width: 50px;
height: 50px;

  &:hover {
    background: ${palette.purlue_2};
    cursor: pointer;
    transform: translateY(-5px);
    color: white;
  }

  &[disabled] {
    background: ${palette.gray_1};
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: ${palette.main_grPurple};
    font-weight: bold;
    cursor: revert;
    color: white;
    transform: revert;
  }
`;

export default Pagination;