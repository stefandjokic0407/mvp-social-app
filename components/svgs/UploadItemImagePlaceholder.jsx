import React from 'react';

function UploadItemImagePlaceholder(props) {
  const { fill = '#C7C7C7', height = 187, width = 343 } = props;
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 0a5 5 0 0 0-5 5v169a5 5 0 0 0 5 5h325a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5H9Z"
          fill="url(#b)"
        />
      </g>
      <path
        d="M143.5 68.333v-7.75h5v7.75h7.5V73.5h-7.5v7.75h-5V73.5H136v-5.167h7.5Zm7.5 15.5v-7.75h7.5v-7.75H176l4.575 5.167h7.925c2.75 0 5 2.325 5 5.167v31c0 2.841-2.25 5.166-5 5.166h-40c-2.75 0-5-2.325-5-5.166V83.833h7.5Zm17.5 23.25c6.9 0 12.5-5.786 12.5-12.916 0-7.13-5.6-12.917-12.5-12.917S156 87.037 156 94.167s5.6 12.916 12.5 12.916Zm-8-12.916c0 4.572 3.575 8.266 8 8.266s8-3.694 8-8.266c0-4.573-3.575-8.267-8-8.267s-8 3.694-8 8.267Z"
        fill="#fff"
      />
      <defs>
        <radialGradient
          id="b"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-6.26719 -314.36453 750.9128 -14.97023 177.767 255.108)"
        >
          <stop stopColor="#FDC912" />
          <stop offset={0.12} stopColor="#FDC912" />
          <stop offset={0.234} stopColor="#F99D39" />
          <stop offset={0.234} stopColor="#FDC70C" />
          <stop offset={0.818} stopColor="#ED683C" />
          <stop offset={0.953} stopColor="#F90101" />
        </radialGradient>
        <filter
          id="a"
          x={0}
          y={0}
          width={343}
          height={187}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1062_483"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1062_483"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default UploadItemImagePlaceholder;
