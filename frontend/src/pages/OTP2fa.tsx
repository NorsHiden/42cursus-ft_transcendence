import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useLoaderData, useNavigate } from 'react-router-dom';
import OTPInput from 'otp-input-react';

import logo from '/logo.svg';
import illustation from '@assets/images/illustration.svg';
import { UserType } from '@globalTypes/user';
import Card from '@components/Card';

export const TwoFactorAuthLoader = async () => {
  try {
    const res = await axios.get<UserType>('/api/users/@me');
    return res.data;
  } catch (error) {
    throw new Error('Failed to load user');
  }
};

const OTP2fa: React.FC = () => {
  const user = useLoaderData() as UserType;
  const [OTP, setOTP] = React.useState('');
  const navigate = useNavigate();

  const verify = (OTP: string) => {
    try {
      const response = axios.post('/api/auth/2fa/verify', { auth_code: OTP });
      toast.promise(response, {
        loading: 'Verifying...',
        success: () => {
          navigate('/');
          return 'Authenticator enabled';
        },
        error: (error) => {
          return error.response.data.message;
        },
      });
    } catch (error) {
      console.error('Failed to verify token:', error);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute bottom-0 bg-brown right-0 hidden lg:block w-1/2 h-full z-10">
        <img
          src={illustation}
          alt="Illustration"
          className="relative object-none w-full h-full transform object-right-top"
        />
      </div>
      <div className="grid relative lg:grid-cols-2 h-screen w-screen grid-cols-1 overflow-hidden">
        <div id="login_section" className="w-full h-full bg-black">
          <div id="logo" className="flex justify-center mt-5 sm:mt-7 md:mt-10 lg:mt-14 xl:mt-17">
            <img src={logo} alt="logo" className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48" />
          </div>
          <div className="flex flex-col mt-20 sm:mt-24 md:mt-28 lg:mt-32 xl:mt-40 items-center w-full h-full">
            <img
              src={user.profile.avatar}
              className="rounded-full h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
            />
            <div
              id="otp"
              className="flex flex-col items-center justify-center mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 gap-8"
            >
              <div className="flex flex-col center">
                <h1 className="text-3xl xl:text-4xl text-white font-bold">
                  Enter your verification code
                </h1>
                <p className="text-sm text-white ">
                  You will receive a <b>One Time Passcode</b> shortly
                </p>
              </div>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                OTPLength={6}
                otpType="number"
                disabled={false}
                inputClassName="bg-background border border-2 border-[#3E4048] text-[64px] rounded-lg w-[64px] h-[64px] focus:ring-[3px] focus:ring-accent text-white "
                inputStyles={{ width: '32px,', height: '32px,' }}
              />
              <Card
                className="relative flex center w-[184px] h-[68px] text-[#FE5821] mt-[20px] z-10"
                cut={8}
                borderRadius={10}
              >
                <button className="flex center" onClick={() => verify(OTP)}>
                  <p className="font-bold font-serif text-2xl text-white">VERIFY</p>
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP2fa;
