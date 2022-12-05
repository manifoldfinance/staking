export default function WalletConnectLogo({
  title = 'Wallet Connect',
  titleId = 'walletconnect',
  size = 24,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
    >
      <title id={titleId}>{title}</title>
      <path
        d="M4.915 7.912c3.913-3.883 10.257-3.883 14.17 0l.47.467a.495.495 0 010 .703l-1.61 1.599a.252.252 0 01-.354 0l-.649-.643c-2.73-2.709-7.155-2.709-9.885 0l-.694.689a.252.252 0 01-.354 0l-1.61-1.599a.494.494 0 010-.703l.516-.513zm17.501 3.306l1.434 1.423a.494.494 0 010 .703l-6.465 6.415a.504.504 0 01-.708 0l-4.588-4.553a.126.126 0 00-.178 0l-4.588 4.553a.504.504 0 01-.708 0L.15 13.344a.494.494 0 010-.703l1.433-1.423a.504.504 0 01.709 0l4.588 4.553a.126.126 0 00.177 0l4.589-4.553a.504.504 0 01.708 0l4.588 4.553a.126.126 0 00.178 0l4.588-4.553a.504.504 0 01.708 0z"
        fill="currentColor"
      />
    </svg>
  );
}
