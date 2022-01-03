import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";

interface PropTypes {
    showModal: boolean,
    closeModal: () => void,
    children: any,
}

export const Modal: (props: PropTypes) => JSX.Element = (props) => {
    const {showModal} = props
    const modalInside = useRef(null);
    const closeModal: React.MouseEventHandler<HTMLDivElement> = (e) => {
        props.closeModal();
    }
    return (
        <>
            {
                showModal ? <ModalContainer>
                        <ModalContent ref={modalInside}>
                            <span onClick={closeModal} className='close-button'>&#10006;</span>
                            <ModalHeader>
                                Share Location
                            </ModalHeader>
                            <ModalBody>
                                {props.children}
                            </ModalBody>
                        </ModalContent>
                    </ModalContainer>
                    : null
            }
        </>
    );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 30;
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  min-width: 300px;
  min-height: 300px;
  max-height: 500px;
  width: 50%;
  height: auto;
  background-color: white;
  border: 1px solid #0abde3;
  z-index: 31;
  border-radius: 15px;
  box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  & .close-button{
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 32;
    cursor: pointer;
    font-size: 1.2rem;
    color: white;
  }
`;

const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #0abde3;
  height: 60px;
  color: white;
  font-weight: bold;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding: 10px;
  border: 1px solid #0abde3;
  font-size: 2rem;
`;

const ModalBody = styled.div`
  padding: 30px;
  margin-top: 60px;
`;


