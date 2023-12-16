import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const UnblockOutline: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      widths={size || 24}
      height={size || 24}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 15"
      fill="currentColor"
      className={className}
    >
      <path d="M12.5685 0.629135C12.6518 0.545822 12.7869 0.545822 12.8702 0.629135C12.9535 0.712448 12.9535 0.847525 12.8702 0.930838L11.7411 2.06L12.8702 3.18917C12.9535 3.27248 12.9535 3.40756 12.8702 3.49087C12.7869 3.57418 12.6518 3.57418 12.5685 3.49087L11.4394 2.3617L10.3102 3.49087C10.2269 3.57418 10.0918 3.57418 10.0085 3.49087C9.92517 3.40756 9.92517 3.27248 10.0085 3.18917L11.1377 2.06L10.0085 0.930838C9.92517 0.847525 9.92517 0.712448 10.0085 0.629135C10.0918 0.545822 10.2269 0.545822 10.3102 0.629135L11.4394 1.7583L12.5685 0.629135Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.67981 1.41972C3.91248 1.41972 2.47978 2.85243 2.47978 4.61976C2.47978 6.38709 3.91248 7.8198 5.67981 7.8198C7.44715 7.8198 8.87985 6.38709 8.87985 4.61976C8.87985 2.85243 7.44715 1.41972 5.67981 1.41972ZM3.75979 4.61976C3.75979 3.55936 4.61942 2.69974 5.67981 2.69974C6.74021 2.69974 7.59984 3.55936 7.59984 4.61976C7.59984 5.68016 6.74021 6.53978 5.67981 6.53978C4.61942 6.53978 3.75979 5.68016 3.75979 4.61976Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.67982 14.2199C3.53788 14.2199 2.03314 13.5617 1.09069 12.4836C0.703982 12.0412 0.516467 11.5341 0.535495 11.0147C0.554129 10.506 0.76811 10.047 1.07249 9.67611C1.67223 8.94527 2.69562 8.45981 3.75979 8.45981H7.59984C8.66401 8.45981 9.6874 8.94527 10.2871 9.67611C10.5915 10.047 10.8055 10.506 10.8241 11.0147C10.8432 11.5341 10.6556 12.0412 10.2689 12.4836C9.32649 13.5617 7.82175 14.2199 5.67982 14.2199ZM2.05441 11.6411C2.69394 12.3728 3.80532 12.9399 5.67982 12.9399C7.55431 12.9399 8.66569 12.3728 9.30522 11.6411C9.50008 11.4182 9.55087 11.2223 9.54498 11.0615C9.53869 10.89 9.46454 10.6915 9.29764 10.4881C8.95481 10.0703 8.303 9.73982 7.59984 9.73982H3.75979C3.05663 9.73982 2.40482 10.0703 2.06199 10.4881C1.89509 10.6915 1.82094 10.89 1.81465 11.0615C1.80876 11.2223 1.85955 11.4182 2.05441 11.6411Z"
      />
    </svg>
  );
};

export default UnblockOutline;
