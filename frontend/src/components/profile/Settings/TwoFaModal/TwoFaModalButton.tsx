import React from 'react';
import Card from '@components/Card';
import LockOutline from '@assets/novaIcons/outline/LockOutline';
import UnlockOutline from '@assets/novaIcons/outline/UnlockOutline';

type TwoFaModalButtonProps = {
  twofaEnabled: boolean;
  disabled: boolean;
  handleEnable: () => void;
  handleDisable: () => void;
};

const TwoFaModalButton: React.FC<TwoFaModalButtonProps> = ({
  twofaEnabled,
  disabled,
  handleEnable,
  handleDisable,
}) => {
  const Icon = twofaEnabled ? UnlockOutline : LockOutline;
  const label = `${twofaEnabled ? 'Disable' : 'Enable'} 2FA`;

  return (
    <section className="grid grid-rows-section gap-y-4">
      <h1 className="text-white font-bold">Two Factor Authentication</h1>
      <Card className={`w-fit text-transparent`} cut={20} borderRadius={20}>
        <button
          disabled={disabled}
          className="w-full center gap-x-1 bg-primary hover:bg-primary/80 py-4 px-8 disabled:cursor-not-allowed disabled:bg-gray transition-all"
          onClick={twofaEnabled ? handleDisable : handleEnable}
        >
          <Icon size={28} className="text-white" />
          <p className="font-medium text-white text-lg">{label}</p>
        </button>
      </Card>
    </section>
  );
};

export default TwoFaModalButton;
