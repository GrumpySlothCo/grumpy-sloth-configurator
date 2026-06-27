import React from 'react';

export const VIALogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      src="/Grumpy_Sloth_Logo.png"
      alt="Grumpy Sloth"
      {...props}
    />
  );
};
