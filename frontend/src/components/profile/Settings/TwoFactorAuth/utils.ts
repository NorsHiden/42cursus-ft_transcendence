import axios from 'axios';
import { toast } from 'sonner';

export const generate2faQrCode = async (setQrCode: (qrCode: string) => void) => {
  try {
    const res = await axios.post('/api/auth/2fa/generate');
    setQrCode(res.data.qrcode);
  } catch (error) {
    console.error('Failed to generate QR code: ', error);
  }
};

export const verify2faCode = (
  auth_code: string,
  setIsTwoFaEnabled: (user: any) => void,
  setIsModalVisible: (visible: boolean) => void,
) => {
  try {
    const response = axios.post('/api/auth/2fa/verify', { auth_code });
    toast.promise(response, {
      loading: 'Verifying the one time password...',
      success: () => {
        setIsModalVisible(false);
        setIsTwoFaEnabled(true);
        return 'You have successfully enabled 2FA!';
      },
      error: (error) => {
        return error.response.data.message;
      },
    });
  } catch (error) {
    console.error('Failed to verify token: ', error);
  }
};

export const disable2fa = async (
  isIsTwoFaEnabled: boolean,
  setEnabling: (enabling: boolean) => void,
  setIsTwoFaEnabled: (Enabled: boolean) => void,
) => {
  try {
    if (!isIsTwoFaEnabled) return;
    setEnabling(true);
    await axios.post('/api/auth/2fa/turn-off');
    setIsTwoFaEnabled(false);
    setEnabling(false);
  } catch (error) {
    console.error('Failed to turn off 2FA: ', error);
  }
};
