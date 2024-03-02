import * as React from 'react';

const IntergrationIcons = props => {
    return (
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M20.8669 15.2562C20.7631 14.8949 20.5925 14.5681 20.3842 14.2699C20.5231 13.604 20.5994 12.9204 20.5994 12.2331C20.5994 7.96683 17.9343 4.25147 13.9578 2.9429C13.8054 2.60502 13.6073 2.28707 13.3457 2.01208C12.7392 1.37428 11.9252 1.01502 11.0533 1.00063C9.7121 0.974203 8.55121 1.78077 8.02952 2.94709C4.05955 4.25863 1.39888 7.97244 1.39888 12.233C1.39888 12.9215 1.47533 13.6071 1.61491 14.2748C1.17298 14.9073 0.933915 15.6907 1.01599 16.5216C1.10345 17.4042 1.52353 18.1994 2.19876 18.7607C2.78716 19.2503 3.5081 19.5108 4.25816 19.5108C4.36683 19.5108 4.47633 19.5051 4.58599 19.4937C6.35094 21.1081 8.62108 22 10.999 22C13.382 22 15.6566 21.1053 17.4226 19.4847C17.5267 19.495 17.6298 19.5106 17.7353 19.5106C18.038 19.5106 18.3459 19.4673 18.6507 19.3765C19.4876 19.1272 20.1791 18.5614 20.5979 17.7831C21.0164 17.005 21.112 16.1074 20.867 15.256L20.8669 15.2562ZM20.0329 12.2332C20.0329 12.732 19.9799 13.2263 19.902 13.7152C19.7187 13.5494 19.5215 13.3981 19.3013 13.2754C18.8408 13.0188 18.3372 12.8971 17.8277 12.8827C17.8472 12.6666 17.8709 12.4503 17.8709 12.2332C17.8709 9.47833 16.3009 7.03272 13.8598 5.89328C14.1062 5.43031 14.255 4.91797 14.2636 4.37651C14.2677 4.12444 14.2373 3.87822 14.1878 3.63736C17.704 4.98083 20.0331 8.3651 20.0331 12.233L20.0329 12.2332ZM14.8698 14.5945C14.4509 15.373 14.3554 16.2705 14.6004 17.1219C14.6296 17.2234 14.6727 17.3161 14.7105 17.4126C13.6279 18.2183 12.3506 18.6477 10.9992 18.6477C9.6487 18.6477 8.36878 18.2183 7.28534 17.4118C7.4772 16.9225 7.56648 16.3955 7.51304 15.8564C7.36047 14.3136 6.18363 13.1343 4.74079 12.9152C4.71728 12.6892 4.69459 12.4622 4.69459 12.2332C4.69459 9.67526 6.16769 7.40444 8.45462 6.3759C9.04189 7.12726 9.93067 7.62573 10.9453 7.6426C10.964 7.64293 10.9826 7.64293 11.001 7.64293C11.8525 7.64293 12.6561 7.31242 13.2694 6.70878C13.3733 6.60641 13.4579 6.49033 13.5466 6.37709C15.8322 7.40609 17.3043 9.67606 17.3043 12.2331C17.3043 12.4616 17.2824 12.6894 17.2586 12.9162C17.1109 12.9388 16.963 12.9581 16.8171 13.0015C15.9801 13.2504 15.2887 13.8165 14.8699 14.5946L14.8698 14.5945ZM10.9984 1.57686C11.0137 1.57686 11.0288 1.57686 11.0441 1.57719C11.7643 1.58924 12.4373 1.88613 12.9382 2.41304C13.1873 2.67481 13.3785 2.97805 13.5069 3.30656C13.5082 3.30907 13.5091 3.31158 13.5104 3.31409C13.6385 3.6446 13.7027 4.0007 13.697 4.36668V4.36702C13.6851 5.0998 13.3933 5.78444 12.8754 6.29409C12.3575 6.80407 11.6874 7.07118 10.9548 7.06583C9.46754 7.04074 8.27739 5.78958 8.30172 4.2762C8.32589 2.77849 9.53117 1.57688 10.9983 1.57688L10.9984 1.57686ZM1.96571 12.2334C1.96571 8.36844 4.29343 4.98404 7.8072 3.63906C7.76528 3.84263 7.73815 4.05171 7.73469 4.26715C7.72516 4.85759 7.88135 5.4074 8.14029 5.8928C5.6983 7.0319 4.12789 9.47798 4.12789 12.2331C4.12789 12.4519 4.15239 12.668 4.17212 12.8847C4.09337 12.8868 4.01708 12.8763 3.93751 12.8843C3.22448 12.9572 2.59412 13.2663 2.0971 13.7191C2.01884 13.2287 1.96557 12.7329 1.96557 12.2332L1.96571 12.2334ZM2.55773 18.3152C1.99938 17.8513 1.65232 17.1938 1.58014 16.4645C1.43135 14.9585 2.51447 13.6101 3.99447 13.4584C4.08605 13.4489 4.1768 13.4444 4.26673 13.4444C5.63394 13.4444 6.80948 14.5017 6.94921 15.9144C7.02156 16.644 6.81012 17.3586 6.35421 17.9263C5.89796 18.494 5.25199 18.8474 4.53484 18.9205C3.81752 18.9948 3.11565 18.7787 2.55764 18.3151L2.55773 18.3152ZM10.999 21.4243C8.90134 21.4243 6.8959 20.6826 5.28424 19.3396C5.87036 19.1446 6.39302 18.7887 6.79269 18.291C6.88328 18.1781 6.95316 18.054 7.02763 17.9323C8.19248 18.7751 9.55872 19.2244 10.9991 19.2244C12.4401 19.2244 13.8036 18.7761 14.9676 17.9343C15.3758 18.6032 15.9943 19.1003 16.7111 19.3421C15.1004 20.6838 13.0959 21.4243 10.9993 21.4243L10.999 21.4243ZM18.4917 18.8239C17.0618 19.2481 15.5622 18.4128 15.1443 16.9603C14.9419 16.2568 15.0212 15.5148 15.3671 14.8718C15.713 14.2286 16.2845 13.761 16.9761 13.5551C17.2273 13.4805 17.4833 13.4436 17.7379 13.4436C18.1845 13.4436 18.6263 13.5573 19.029 13.7814C19.6613 14.1334 20.1208 14.7148 20.3232 15.4184C20.7411 16.871 19.9196 18.3988 18.4917 18.8239V18.8239Z" fill="#181818" stroke="#181818" />
        </svg>
    )
}

export default IntergrationIcons;