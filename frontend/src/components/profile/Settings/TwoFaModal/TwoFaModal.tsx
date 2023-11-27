import React,{useState} from 'react';


import {generateQrCode,verify,turnOff2fa} from './utils'
import TwoFaModalDialog from './TwoFaModalDialog';
import TwoFaModalButton from './TwoFaModalButton';



const TwoFaModal:React.FC = () => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [OTP, setOTP] = useState('');
    const [TwoFaEnabled, setTwoFaEnabled] = useState(false);
    const [disabling, setdisabling] = useState(false);

    return (
    <>
    {
      isModalVisible && (
        <TwoFaModalDialog
        qrCode={qrCode}
        OTP={OTP}
        setOTP={setOTP}
        verify={() => verify(OTP, setTwoFaEnabled, setIsModalVisible)}
        setModalVisible={setIsModalVisible}
        />
      )
    }
      
      <TwoFaModalButton
       twofaEnabled={TwoFaEnabled}
        enabling={disabling}
        handleEnable={() => {
          generateQrCode(setQrCode);
          setIsModalVisible(true);
        }}
        handleDisable={() => turnOff2fa(TwoFaEnabled, setTwoFaEnabled, setdisabling)}
      />


    </>
  );
};

export default TwoFaModal;