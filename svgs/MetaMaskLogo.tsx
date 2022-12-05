export default function MetaMaskLogo({
  title = 'MetaMask',
  titleId = 'metamask',
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
        d="M21.004 3l-6.36 2.307H9.356L2.988 3 2 5.886l.667 3.106.862 2.993-1.364 4.127 1.27 4.21 4.447-1.188.863.686 1.75 1.18h3.003l1.757-1.18.863-.686 4.447 1.188 1.278-4.21-1.38-4.127.87-2.993L22 5.886 21.004 3z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
}
