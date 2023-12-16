import axios from 'axios';
import { toast } from 'sonner';

export function createMenuItems(channelID: Number, userId: Number) {
    return [
        {
          label: 'Mute',
          onClick: () => {
            toast.promise(axios.patch(`/api/channels/${channelID}/members/mute/${userId}`), {
              loading: 'Muting...',
              success: 'Muted',
              error: (err) => {
                console.log(err);
                return err.response.data.message;
              },
            });
          },
          className: 'text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray',
        },
        {
          label: 'Kick',
          onClick: () => {
            toast.promise(axios.delete(`/api/channels/${channelID}/members/${userId}`), {
              loading: 'Kicking...',
              success: 'Kicked',
              error: (err) => {
                console.log(err);
                return err.response.data.message;
              },
            });
          },
          className: 'text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray',
        },
        {
          label: 'Ban',
          onClick: () => {
            toast.promise(axios.patch(`/api/channels/${channelID}/members/ban/${userId}`), {
              loading: 'Banning...',
              success: 'Banned',
              error: (err) => {
                console.log(err);
                return err.response.data.message;
              },
            });
          },
          className: 'text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray',
        },
        {
          label: 'Promote',
          onClick: () => {
            toast.promise(axios.patch(`/api/channels/${channelID}/members/elevate/${userId}`), {
              loading: 'Promoting...',
              success: 'Promoted',
              error: (err) => {
                console.log(err);
                return err.response.data.message;
              },
            });
          },
          className: 'text-white cursor-pointer py-1 px-3  hover:bg-CharcoalGray',
        },
      ];
}
  
