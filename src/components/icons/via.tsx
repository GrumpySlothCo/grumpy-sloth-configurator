import {SVGProps} from 'react';

// Placeholder — replace SVG paths with the Grumpy Sloth logo asset when available
export const VIALogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 60"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="36"
        fontWeight="bold"
        fontFamily="GothamRoundedBold, Helvetica, Arial, sans-serif"
        fill="currentColor"
        letterSpacing="-1"
      >
        GS
      </text>
    </svg>
  );
};
