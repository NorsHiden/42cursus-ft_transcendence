// 2FA Modal Button
import React from 'react';
import Card from '@components/Card';
import Lock from '@assets/novaIcons/outline/LockOutline';
import Unlock from '@assets/novaIcons/outline/UnlockOutline';

interface TwoFaModalButtonProps {
  twofaEnabled: boolean;
  enabling: boolean;
  handleEnable: () => void;
  handleDisable: () => void;
}
const TwoFaModalButton: React.FC<TwoFaModalButtonProps> = ({
  twofaEnabled,
  enabling,
  handleEnable,
  handleDisable,
}) => {
  return (
    <div className="mt-[20px]">
      <h1 className="text-white font-bold ">Two Factor Authentication</h1>
      <Card
        className={`flex center w-[127px] h-[40px]  text-[#FE5821] ${
          enabling ? 'filter opacity-75' : ''
        } mt-[20px] z-10`}
        cut={30}
        borderWidth={2}
        borderColor="#FF8C66"
        borderRadius={10}
      >
        <button
          className="flex center"
          onClick={() => {
            twofaEnabled ? handleDisable() : handleEnable();
          }}
          disabled={enabling}
        >
          {twofaEnabled ? (
            <Unlock className="mr-2 text-[32px] text-white" />
          ) : (
            <Lock className="mr-2 text-[32px] text-white" />
          )}
          <p className="font-sans font-bold text-sm text-white">
            {' '}
            {twofaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </p>
        </button>
      </Card>
    </div>
  );
};

export default TwoFaModalButton;
