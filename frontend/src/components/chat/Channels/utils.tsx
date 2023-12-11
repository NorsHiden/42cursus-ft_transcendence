import axios from 'axios';
import { mychannel } from '@globalTypes/channel';
import {Member} from './ChannelSidePannel';
import { toast } from 'sonner';
import { User } from '@globalTypes/user';

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
  

export const sendMessage =  (channelId, message) => {
    console.log('channelID', message);
    const response =  axios.post(`/api/channels/${channelId}/messages`, {
      content: message,
    });
    toast.promise(response, {
      error: (error)=>{
        return error.response.data.message;
      },
    });
};

export const getMessages = async (channelId) => {
  try {
    const response = await axios.get(`/api/channels/${channelId}/messages`);

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching messages: ${error}`);
  }
};

