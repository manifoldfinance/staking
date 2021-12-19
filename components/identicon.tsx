import jazzicon from 'jazzicon-ts';
import { useEffect, useRef } from 'react';

export default function Identicon({ address }: { address: string }) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = '';

      ref.current.appendChild(jazzicon(20, parseInt(address.slice(2, 10), 16)));
    }
  }, [address]);

  return <div className="h-5 w-5 rounded-full bg-primary-400" ref={ref} />;
}
