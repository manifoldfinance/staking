import getExplorerLink, { ExplorerDataType } from '@/utils/getExplorerLink';
import { ExternalLink } from 'react-feather';

export function TransactionToast({
  message,
  hash,
  chainId,
}: {
  chainId?: number;
  message: string;
  hash?: string;
}) {
  if (typeof chainId === 'undefined' || typeof hash === 'undefined') {
    return <span>{message}</span>;
  }

  return (
    <div className="flex space-x-2 -mr-2">
      <span>{message}</span>{' '}
      <a
        href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline text-indigo-500 hover:text-indigo-700"
      >
        <ExternalLink size={20} />
      </a>
    </div>
  );
}
