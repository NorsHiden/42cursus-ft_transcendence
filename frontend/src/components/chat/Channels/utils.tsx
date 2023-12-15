import axios from 'axios';
import { mychannel } from '@globalTypes/channel';
import { Member } from '@globalTypes/types';
import { toast } from 'sonner';
import { User } from '@globalTypes/user';
import { Message as MessageType } from '@globalTypes/types';

export function getUsers(setUsers: React.Dispatch<React.SetStateAction<User[]>>, search: string) {
  axios
    .get(`/api/users/search?s=${search}`)
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => console.error('Error:', error));
}

export const fetchMembers = (
  selectedChannel: mychannel,
  setMembers: (arg: Member[]) => void,
  search: string,
) => {
  if (selectedChannel && JSON.stringify(selectedChannel) !== '{}') {
    axios
      .get(`/api/channels/${selectedChannel.id}/members?search=${search}`)
      .then((response) => {
        setMembers(response.data.data);
      })
      .catch((error) => console.error('Error:', error));
  }
};

export const sendMessage = (
  channelId: number,
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<MessageType[] | undefined>>,
  newMessage: MessageType,
) => {
  const response = axios.post(`/api/channels/${channelId}/messages`, {
    content: message,
  });
  toast.promise(response, {
    error: (error) => {
      return error.response.data.message;
    },
  });

  response.then(() => {
    // console.log(response.data);

    setMessages((prev: MessageType[] | undefined) => {
      return prev?.map((message) => {
        if (message.content === newMessage.content && message.id === newMessage.id) {
          return {
            ...newMessage,
            messageReceivedSuccessfully: true,
          };
        } else {
          return message;
        }
      });
    });
  });
};

export const getMessages = async (channelId: number, abortController: AbortController,setHasMore:React.Dispatch<React.SetStateAction<boolean>>,page:Number) => {
  try {
    const response = await axios.get(`/api/channels/${channelId}/messages?page=${page}`, {
      signal: abortController.signal,
    });
    console.log(`/api/channels/${channelId}/messages?page=${page}`);
    if (response.data.meta.currentPage < response.data.meta.totalPages)
      setHasMore(true);
    else
      setHasMore(false);

    return response.data.data;
  } catch (error) {
    // console.error(`Error fetching messages: ${error}`);
  }
};
