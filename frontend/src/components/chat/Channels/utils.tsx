import axios from 'axios';
import { mychannel } from '@globalTypes/channel';
import {Member} from './ChannelSidePannel';
import { toast } from 'sonner';
import { User } from '@globalTypes/user';
import {Message as MessageType } from '@globalTypes/types';

export function getUsers(setUsers: React.Dispatch<React.SetStateAction<User[]>>, search: string) {
  axios
    .get(`/api/users/search?s=${search}`)
    .then((response) => {

      console.log(`Users : `);
      console.log(search);
      console.log(response.data);
      setUsers(response.data);
    })
    .catch((error) => console.error('Error:', error));

}

export const fetchMembers = (selectedChannel:mychannel,setMembers:(arg:Member[])=>void,search:string) => {
    if (selectedChannel && JSON.stringify(selectedChannel) !== '{}') {
      console.log(`Fetching members for channel ${search}`);
      axios.get(`/api/channels/${selectedChannel.id}/members?search=${search}`)
        .then(response => {
          console.log(`Members : `);
          console.log(response.data.data);
          setMembers(response.data.data);
        })
        .catch(error => console.error('Error:', error));
    }
  }
  

export const sendMessage =  (channelId, message,setMessages:React.Dispatch<React.SetStateAction<MessageType[]>>,newMessage:MessageType) => {
    console.log('channelID', message);
    const response =  axios.post(`/api/channels/${channelId}/messages`, {
      content: message,
    });
    toast.promise(response, {
      error: (error)=>{
        return error.response.data.message;
      },
    });

    response.then((response) => {
      // console.log(response.data);

      setMessages((prev: MessageType[]) => {
        return prev.map((message) => {
          if (message.content === newMessage.content) {
            return {
              ...newMessage,
              messageReceivedSuccessfully: true,
            };
          } else {
            return message;
          }
        });
      });
    })
};

export const getMessages = async (channelId:number,abortController:AbortController) => {
  try {
    const response = await axios.get(`/api/channels/${channelId}/messages`,{signal:abortController.signal});
    console.log(`Data : `);
    console.log(response.data.meta);
    // if (response.data.meta.currentPage < response.data.meta.totalPages)
    //   setHasMore(true);
    // else
    //   setHasMore(false);

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching messages: ${error}`);
  }
};

