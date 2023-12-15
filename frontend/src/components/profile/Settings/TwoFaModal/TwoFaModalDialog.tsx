import React from 'react';
import OTPInput from 'otp-input-react';

import Card from '@components/Card';
import useOutsideClick from '@hooks/useOutsideClick';

type TwoFaModalDialogProps = {
  qrCode: string;
  OTP: string;
  setOTP: (arg: string) => void;
  verify: () => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TwoFaModalDialog: React.FC<TwoFaModalDialogProps> = ({
  qrCode,
  OTP,
  setOTP,
  verify,
  setModalVisible,
}) => {
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setModalVisible(false);
  });

  return (
    <div className="w-screen h-screen center bg-background/50 absolute top-0 left-0 z-50 backdrop-blur-lg">
      <div ref={ref} className="center-x flex-col gap-y-8 bg-lightBlack rounded-xl py-12 px-8">
        <h1 className="font-bold text-2xl text-white">Scan QR</h1>
        <div className="flex center bg-black rounded-xl">
          {qrCode && <img className="mix-blend-color-dodge invert" src={qrCode} alt="QrCoDE" />}
        </div>
        <p className="text-white w-2/3 text-center">
          Open the Authenticator app and scan this QR Code.
        </p>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          OTPLength={6}
          otpType="number"
          disabled={false}
          className="flex gap-x-3"
          placeholder={Array(6).fill('-')}
          inputClassName="bg-background border-2 border-darkGray text-xl rounded-lg text-white placeholder:text-darkGray"
          inputStyles={{ width: '50px', height: '50px', margin: '0' }}
        />
        <Card cut={24} borderRadius={10}>
          <button className="px-8 py-3 bg-primary" onClick={verify}>
            <p className="font-serif text-xl text-white">VERIFY</p>
          </button>
        </Card>
      </div>
    </div>
  );
};

export default TwoFaModalDialog;
