import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { db, DeleteData } from '../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { enterRoom } from '../features/app';
import { useDispatch } from 'react-redux';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const Channels = [];
console.log(Channels);

function SidebarOption(props) {
  const dispatch = useDispatch();
  const { title, Icon, addNewChannel, id } = props
  const [channel, setChannel] = useState('');
  const colRef = collection(db, 'channels');
  const [allchennels, setAllchennels] = useState([])


  const addChannel = async () => {
    const channelName = prompt("Please enter channel name");
    if (channelName) {

      const docRef = await addDoc(collection(db, "channels"), {
        c_name: channelName
      });

      console.log(`Document written with ID: and  data : ${channelName}`);

      getDocs(colRef)
        .then(snapshot => {
          let chennels = []
          snapshot.docs.forEach(doc => {
            chennels.push({ ...doc.data(), id: doc.id })
          })
          setAllchennels(chennels)
          return chennels
        })
        .catch(err => {
          console.log(err.message)
        })

      console.log(allchennels)
      dispatch(enterRoom({
        ChannelArray: { channels: allchennels }
      }))
    }
  }

  useEffect(() => {
    setChannel(title);
  }, [title])

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({
        channelId: id,
        channelName: channel,
        ChannelArray: { channels: allchennels }
      }))
    }
  }

  const deleteChennel = () => {
    console.log(id)
    DeleteData(id);
  }
  return (
    <div>
      <SideBarOptionContainer
        onClick={addNewChannel ? addChannel : selectChannel}
      >
        {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <SideBarOptionChannel>
            <div>
              <span>#</span>{title}
            </div>
            < DeleteIcon onClick={deleteChennel} fontSize="small" >
            </DeleteIcon>
          </SideBarOptionChannel>)
        }
      </SideBarOptionContainer >
    </div>
  )
}

export default SidebarOption

const SideBarOptionContainer = styled.div`
  display:flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;
const SideBarOptionChannel = styled.h3`
  padding: 10px;
  font-weight: 300;
  display: flex;
  > svg{
    opacity: 0.1;
    margin-left: 20%;
    :hover{
      opacity: 1;
    }
  }
`;