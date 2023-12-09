import axios from 'axios';
import { mychannel } from '@globalTypes/channel';
import {Member} from './ChannelSidePannel';

export const fetchMembers = (selectedChannel:mychannel,setMembers:(arg:Member[])=>void,search:string) => {
    if (selectedChannel && JSON.stringify(selectedChannel) !== '{}') {
      axios.get(`/api/channels/${selectedChannel.id}/members?search=${search}`)
        .then(response => {
          setMembers(response.data.data);
        })
        .catch(error => console.error('Error:', error));
    }
  }
  