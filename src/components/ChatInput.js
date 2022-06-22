import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState('')
  const [user] = useAuthState(auth)
 

  const sendMessage = async (e) => {
    e.preventDefault(); //prevent refresh
    setInput('')

    if (!channelId) {
      return false
    }

    await addDoc(collection(db, "channels", channelId, "Messages"), {
      message: input,
      time: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    })

    setInput('')
  }

  return (
    <ChatInputContainer>
      <form>
        <input onChange={e => setInput(e.target.value)} value={input} placeholder={`Message # ${channelName}`} />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  )
}

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position:relative;
    display:flex;
    justify-content: center;
  }

  > form input {
    position:fixed;
    bottom:30px;
    width: 60%;
    border: 1px solid gray;
    border-radius:3px;
    padding: 20px;
    outline: none;
    text-align: center;
    box-sizing: border-box;
    margin-left: 80%;
  }

  > form > button {
    display: none !important;
  }
`