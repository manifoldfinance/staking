export default function QuestionMark({
  title = "Question Mark",
  titleId = "questionmark",
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
      <g
        transform="translate(0.000000,24.000000) scale(0.003000,-0.003000)"
        fill="currentcolor"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      >
        <path
          d="M3570 7524 c-802 -73 -1429 -376 -1843 -889 -265 -328 -436 -739
-512 -1232 -6 -39 -5 -43 17 -47 24 -5 1298 -57 1379 -56 l47 0 11 68 c45 259
156 478 336 657 157 158 332 256 563 318 115 30 122 31 352 31 211 1 246 -1
339 -22 220 -50 369 -123 498 -245 125 -119 203 -253 245 -424 32 -127 32
-361 0 -486 -84 -337 -324 -606 -905 -1019 -298 -212 -474 -365 -635 -553
-209 -244 -339 -487 -412 -769 -28 -108 -60 -305 -60 -366 l0 -30 680 0 680 0
0 34 c0 57 30 195 60 279 60 164 145 291 300 451 125 129 212 200 505 411 407
294 523 386 699 555 103 99 230 250 291 345 224 351 308 804 240 1293 -118
844 -738 1428 -1730 1632 -241 50 -382 62 -750 65 -192 1 -370 1 -395 -1z"
        />
        <path d="M2950 990 l0 -680 735 0 735 0 0 680 0 680 -735 0 -735 0 0 -680z" />
      </g>
    </svg>
  );
}
