import Davatar from '@davatar/react';

export default function Identicon({ address }: { address: string }) {
  return <Davatar size={20} address={address} generatedAvatarType="jazzicon" />;
}
