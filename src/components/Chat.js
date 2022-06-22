// import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { selectChannelId, selectchannelName } from '../features/app';
import ChatInput from './ChatInput'
import MessageBox from './MessageBox';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Chat() {
  const chatRef = useRef(null);
  const ChannelId = useSelector(selectChannelId)
  const ChannelName = useSelector(selectchannelName);
  const [allMessages, setAllMessages] = useState([])

  const subColRef = collection(db, "channels", ChannelId ? ChannelId : "R6mIEcxbX7F5Yx8qCMu6", "Messages");


  useEffect(() => {
    getDocs(subColRef)
      .then(snapshot => {
        let messages = []
        snapshot.docs.forEach(doc => {
          messages.push({ ...doc.data(), id: doc.id })
        })
        setAllMessages(messages)
        return messages
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [subColRef])

  return (
    <>
      {/* {ChannelId ? "" : 
      <Header>
        <HeaderLeft>
          <h4><strong>#user_name</strong></h4>
          <StarBorderOutlined />
        </HeaderLeft>
        <HeaderRight>
          <p>
            <InfoOutlined /> Details
          </p>
        </HeaderRight>
      </Header>
      } */}
      {ChannelId &&
        <ChatMessages>
          {allMessages.map((messages, index) => {
            const { message, user, userImage } = messages;
            return <>
              <MessageBox key={index}
                Message={message}
                // Timestamp={time}
                User={user}
                UserImage={userImage}
              />
            </>
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>
      }
      <ChatInput
        chatRef={chatRef}
        channelName={ChannelName}
        channelId={ChannelId}
      />
    </>
  )
}

export default Chat
// const Header = styled.div`
// display: flex;
// padding: 1%;
// position: absolute;
// margin-left: 20%;
// `
const ChatMessages = styled.div``

const ChatBottom = styled.div`
  padding-bottom: 200px;
`

// const HeaderLeft = styled.div`
//   display: flex;

  
//   > svg{
//     margin-top: 17%;
//     margin-left: 10%;
//   }

// `
// // const HeaderRight = styled.div`
//   display: flex;
//     margin-left: 20%;
//   > p{
//     cursor : pointer;
//   }
// `