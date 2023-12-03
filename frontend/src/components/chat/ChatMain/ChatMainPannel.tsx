import React,{useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Card from '@components/Card';
import {useSelectedChannel} from '@context/Channel';
import { Channel } from '@globalTypes/channel';
import axios from 'axios';

// const data = [];

// for (let i = 1; i <= 90; i++) {
//   data.push({
//     name: `Channel ${i}`,
//     type: 'public',
//   });
// }

// async function createChannel(channel) {
//   const response = await axios.post('/api/channels', channel);
//   return response.data;
// }


const ChatMainPannel: React.FC = () => {
  const {setChannels,channels,selectedChannel,setSelectedChannel} = useSelectedChannel();
  const param = useParams();

  console.log("param",param)
  console.log("selected chanel ",selectedChannel)
  console.log("channels ",channels)
  
  useEffect(() => {
    const channel = channels.find(channel => channel.id === Number(param.id));
    if (channel) {
      console.log("channel found",channel)
      setSelectedChannel(channel);
    }
  }, [channels, param.id]);


  // useEffect(() => {
  //   console.log("useEffect")
  //   Promise.all(
  //     data.map((i) => {
  //       const channel = {
  //         name: i.name,
  //         type: i.type,
  //       };
    
  //       return createChannel(channel);
  //     })
  //   )
  //     .then((channels) => {
  //       // All channels have been created
  //       console.log(channels);
  //     })
  //     .catch((error) => {
  //       // An error occurred
  //       console.error(error);
  //     });
  // }, []);

  return (
    <>
      <div
        id="chat-main-pannel-header"
        className="flex justify-between bg-gradyDarkShade rounded-xl h-16 px-8"
      >
        <div id="chat-main-pannel-header-avatar" className="center gap-4">
          <img
            src={selectedChannel.avatar}
            alt="avatar"
            className="rounded-xl h-12 w-12"
          />
          <h1 className="text-white font-poppoins">{selectedChannel.name}</h1>
        </div>
        <div id="chat-main-pannel-header-status" className=""></div>
      </div>
      <div id="chat-main-pannel-body" className="bg-lightBlack rounded-xl h-16"></div>
      <div id="chat-main-pannel-footer" className="bg-lightBlack rounded-xl h-16"></div>
    </>
  );
};

export default ChatMainPannel;
