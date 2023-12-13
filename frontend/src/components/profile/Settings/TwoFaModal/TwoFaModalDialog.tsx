
import React, { useRef } from 'react';
import OTPInput from 'otp-input-react';

import { hideModalDialog } from './utils';
import Card from '@components/Card';

interface TwoFaModalDialogProps {
  qrCode: string;
  OTP: string;
  setOTP: (arg: string) => void;
  verify: () => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TwoFaModalDialog: React.FC<TwoFaModalDialogProps> = ({
  qrCode,
  OTP,
  setOTP,
  verify,
  setModalVisible,
}) => {
  const modalRef = useRef(null);

  return (
    <div
      id="2fA-modal"
      className="absolute w-screen center h-screen bg-background top-0 left-0 z-20 filter bg-opacity-70 backdrop-blur"
      onClick={(event) => hideModalDialog(event, modalRef, setModalVisible)}
    >
      <div ref={modalRef} className="w-[580px] h-[650px] bg-[#1E1F23] ">
        <div className="mt-[56px] flex flex-col items-center gap-[26px]">
          <h1 className="font-bold font-serif text-white text-center">Scan Qr</h1>
          <div className="flex center h-[224px] w-[224px] bg-background rounded-3xl">
            {qrCode && <img className="h-[95%] w-[95%] mix-blend-color-dodge invert" src={qrCode} alt="QrCoDE" />}
          </div>
          <p className="text-white font-bold">Open the Authenticator app and scan this QR Code</p>
          <p className="text-white font-bold"></p>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            OTPLength={6}
            otpType="number"
            disabled={false}
            inputClassName="bg-background border border-2 border-[#3E4048] text-[64px] rounded-lg w-[64px] h-[64px] focus:ring-[3px] focus:ring-accent text-white font-popins"
            inputStyles={{ width: '32px,', height: '32px,' }}
          />
          <Card
            className="relative flex center w-[184px] h-[68px] text-[#FE5821] mt-[20px] z-10"
            cut={8}
            borderRadius={10}
          >
            <button className="flex center" onClick={verify}>
              <p className="font-bold font-serif text-2xl text-white">VERIFY</p>
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TwoFaModalDialog;
