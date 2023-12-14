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
    <div className="w-screen h-screen center bg-background/50 absolute top-0 left-0 z-20 backdrop-blur-lg">
      <div ref={ref} className="bg-lightBlack rounded-xl">
        <div className="center-x flex-col gap-y-6">
          <h1 className="font-semibold text-xl text-white">Scan QR</h1>
          <div className="flex center bg-black rounded-xl">
            {qrCode && <img className="mix-blend-color-dodge invert" src={qrCode} alt="QrCoDE" />}
          </div>
          <p className="text-white font-medium w-2/3 text-center">
            Open the Authenticator app and scan this QR Code.
          </p>
          <p className="text-white font-bold"></p>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            OTPLength={6}
            otpType="number"
            disabled={false}
            inputClassName="bg-background border border-2 border-gray text-2xl rounded-lg text-white"
            inputStyles={{ width: '60px', height: '60px' }}
          />
          <Card cut={20} borderRadius={10}>
            <button className="px-10 py-4 bg-primary" onClick={verify}>
              <p className="font-bold font-serif text-2xl text-white">VERIFY</p>
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TwoFaModalDialog;
