import type { DOMODAO as DictatorDAO } from '@/contracts/types';
import useSWR from 'swr';
//import { DOMODAO } from '../useContract';

function getIsOperatorInitialized(contract: DictatorDAO) {
  return async () => {
    const currentOperator = await contract.pendingOperator();

    const pendingOperatorTime = await contract.pendingOperatorTime();

    return currentOperator.toString() === pendingOperatorTime.toString();
  };
}

export default function useIsOperatorInitialized() {
  const contract = useDOMODAO();

  return useSWR(
    // @ts-ignore
    !!contract ? ['IsOperatorInitialized'] : null,
    // @ts-ignore
    getIsOperatorInitialized(contract),
  );
}
function useDOMODAO() {
  throw new Error('Function not implemented.');
}
