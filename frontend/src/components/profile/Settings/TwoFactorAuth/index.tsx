import React, { useState } from 'react';

import Card from '@components/Card';
import UnlockOutline from '@assets/novaIcons/outline/UnlockOutline';
import LockOutline from '@assets/novaIcons/outline/LockOutline';
import TwoFactorAuthModal from './TwoFactorAuthModal';
import { generate2faQrCode, verify2faCode, disable2fa } from './utils';
import { useRouteLoaderData } from 'react-router-dom';
import { User } from '@globalTypes/types';

const TwoFactorAuthSection: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [OTP, setOTP] = useState('');
  const user = useRouteLoaderData('layout') as User;
  const [isEnabled, setIsEnabled] = useState(user.is_2fa_enabled);
  const [isDisabled, setIsDisabled] = useState(false);

  const Icon = isEnabled ? UnlockOutline : LockOutline;

  const handleClick = () => {
    if (isEnabled) disable2fa(isEnabled, setIsEnabled, setIsDisabled);
    else {
      setIsModalVisible(true);
      if (qrCode.length === 0) generate2faQrCode(setQrCode);
    }
  };

  return (
    <>
      {isModalVisible && (
        <TwoFactorAuthModal
          qrCode={qrCode}
          OTP={OTP}
          setOTP={setOTP}
          verifyCode={() => verify2faCode(OTP, setIsEnabled, setIsModalVisible)}
          setModalVisible={setIsModalVisible}
        />
      )}

      <section className="grid grid-rows-section gap-y-4">
        <h1 className="text-white font-bold">Two Factor Authentication</h1>
        <Card className="w-fit text-transparent" cut={24} borderRadius={20}>
          <button
            disabled={isDisabled}
            onClick={handleClick}
            className="w-full center gap-x-1 bg-primary hover:bg-primary/80 py-2 px-4 disabled:cursor-not-allowed disabled:bg-gray transition-all"
          >
            <Icon size={20} className="text-white" />
            <p className="font-medium text-white">{`${isEnabled ? 'Disable' : 'Enable'} 2FA`}</p>
          </button>
        </Card>
      </section>
    </>
  );
};

export default TwoFactorAuthSection;
