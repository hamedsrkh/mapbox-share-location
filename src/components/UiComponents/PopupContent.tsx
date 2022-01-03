import React from 'react';
import {Pin} from "../../Types";
import styled from "styled-components";

interface PropsType {
    data: Pin,
    onClose: () => void
}

export const PopupContent: (props: PropsType) => JSX.Element = (props) => {
    return (
        <PopupContainer>
            <div className="popup-header">Location Details</div>
            <div className='popup-body'>
                <p>name: {props.data.name}</p>
                <p>type: {props.data.type}</p>
                <div>
                    <Button type='button' className='btn btn-sm btn-primary'>Edit</Button>
                    <Button className='btn btn-sm btn-warning' onClick={(e) => {
                        e.stopPropagation()
                        setTimeout(() => props.onClose(), 300)
                    }}>Close
                    </Button>
                </div>
            </div>

        </PopupContainer>
    );
};
const PopupContainer = styled.div`
  min-width: 200px;
  min-height: 50px;
  background-color: white;
  border: 3px solid rgba(225, 240, 216, 1);
  border-radius: 7px;
  overflow: hidden;

  & .popup-header {
    background-color: rgba(225, 240, 216, 1);
    color: rgba(94, 185, 97, 1);
    padding: 10px;
    min-height: 30px;
    position: relative;
    top: -1px;
  }

  & .popup-body {
    padding: 10px;
  }
`

const Button = styled.button`
  position: relative;
  z-index: 100;
`