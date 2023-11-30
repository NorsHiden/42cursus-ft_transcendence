import axios from 'axios';
import { toast } from 'sonner';




export function hideModalDialog(
  event: React.MouseEvent,
  modalRef: any,
  setIsModalVisible: (visible: boolean) => void,
) {
  console.log(modalRef.current);
  if (modalRef.current && !modalRef.current.contains(event.target)) {
    setIsModalVisible(false);
  }
}

export async function generateQrCode(setQrCode: (qrCode: string) => void, generated: boolean, setGenerated: (generated: boolean) => void) {
  try {
    if (generated) return;
    setGenerated(true);
    const response = await axios.post('/api/auth/2fa/generate');
    console.log(response.data.qrcode);
    setQrCode(response.data.qrcode);
  } catch (error) {
    console.error('Failed to generate QR code:', error);
  }
}

export  function verify(
  OTP: string,
  setTwoFaEnabled: (user: any) => void,
  setIsModalVisible: (visible: boolean) => void,
) {
  try {
    const response =  axios.post('/api/auth/2fa/verify', { auth_code: OTP });
    toast.promise(response, {
        loading: 'Verifying...',
        success: ()=>{
            setIsModalVisible(false);
            setTwoFaEnabled(true);
            return 'Authenticator enabled';
        },
        error: (error)=>{
            return error.response.data.message;
        },
    });
  } catch (error) {
    console.error('Failed to verify token:', error);
  }
}

export async function turnOff2fa(
  TwoFaEnabled: boolean,
  setTwoFaEnabled: (Enabled: boolean) => void,
  setEnabling: (enabling: boolean) => void, 
  ) {
  try {
    if (!TwoFaEnabled) return;
    setEnabling(true);
    const response = await axios.post('/api/auth/2fa/turn-off');
    console.log(response.data);
    setTwoFaEnabled(false);
    setEnabling(false);
  } catch (error) {
    console.error('Failed to turn off 2FA:', error);
  }
}
