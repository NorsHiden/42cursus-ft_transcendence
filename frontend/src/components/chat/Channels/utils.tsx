import axios from 'axios';
import { ChannelType } from '@globalTypes/channel';
import { Member } from '@globalTypes/types';
import { toast } from 'sonner';
import { UserType } from '@globalTypes/user';
import { Message as MessageType } from '@globalTypes/types';

export function getUsers(
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>,
  search: string,
) {
  axios
    .get(`/api/users/search?s=${search}`)
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => console.error('Error:', error));
}

export const fetchMembers = (
  selectedChannel: ChannelType,
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
  try {
    const response = axios.post(`/api/channels/${channelId}/messages`, {
      content: message,
    });

    response
      .then(() => {
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
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {}
};

export const getMessages = async (
  channelId: number,
  abortController: AbortController,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  page: Number,
) => {
  try {
    const response = await axios.get(`/api/channels/${channelId}/messages?page=${page}`, {
      signal: abortController.signal,
    });
    if (response.data.meta.currentPage < response.data.meta.totalPages) setHasMore(true);
    else setHasMore(false);

    return response.data.data;
  } catch (error) {}
};
