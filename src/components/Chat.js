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
  const [allMessages, setAllMessages] = useState([]);
  const [reloadme, setReloadme] = useState(true)
  const subColRef = collection(db, "channels", ChannelId ? ChannelId : "R6mIEcxbX7F5Yx8qCMu6", "Messages");

  const reload = () => {
    console.log('reloading')
    setReloadme(!reloadme)
  }

  useEffect(() => {

    getDocs(subColRef)
      .then(snapshot => {
        let messages = []
        snapshot.docs.forEach(doc => {
          messages.push({ ...doc.data(), id: doc.id })
        })
        console.log(reloadme)
        setAllMessages(messages)
        return messages
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [reloadme, ChannelName])

  return (
    <>
      {ChannelId &&
        <ChatMessages>
          {allMessages.map((messages, index) => {
            const { message, user, userImage } = messages;
            return <>
              <MessageBox key={message}
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
        reload={reload}
        chatRef={chatRef}
        channelName={ChannelName}
        channelId={ChannelId}
      />
    </>
  )
}

export default Chat
const ChatMessages = styled.div``

const ChatBottom = styled.div`
  padding-bottom: 200px;
`
