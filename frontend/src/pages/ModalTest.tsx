import { useState, useCallback } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
// modal 쓰려면 여기에 작성한 코드처럼 사용하면 됩니다!!!

function ModalTest(){
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

return (
  <Main>
    <Title> Modal을 사용해봅시다!!</Title>
    {isOpenModal && (
      <Modal onClickToggleModal={onClickToggleModal}>
        children 부분이 들어감!!
      </Modal>
    )}
    <DialogButton onClick={onClickToggleModal}>모달 열기</DialogButton>
  </Main>
  );
}

const Main = styled.main`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
`;

const Title = styled.h2`
text-align: center;
`;

const DialogButton = styled.button`
width: 160px;
height: 48px;
background-color: blueviolet;
color: white;
font-size: 1.2rem;
font-weight: 400;
border-radius: 4px;
border: none;
cursor: pointer;

%:hover {
  transform: translateV(-2px);
}
`;

  export default ModalTest;