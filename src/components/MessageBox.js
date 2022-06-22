import React from 'react'
import styled from 'styled-components'

function MessageBox(props) {
    const { Message, Timestamp, User, UserImage } = props
    return (
        <>
            <MessageContainer>
                <img src={UserImage} alt="" />
                <MessageInfo>
                    <h4>
                        {User}{' '}
                        <span>
                            {Timestamp}
                        </span>
                    </h4>
                    <p>{Message}</p>
                </MessageInfo>
            </MessageContainer>
            <br />
        </>
    )
}

export default MessageBox

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  >img {
    height: 50px;
    border-radius: 8px;
  }
`
const MessageInfo = styled.div`
  padding-left: 10px;
  >h4{
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
 }
`