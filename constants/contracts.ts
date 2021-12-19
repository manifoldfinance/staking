import { SupportedChainId } from './chains';

export enum ContractNames {
  STAKING = 'Staking',
  DOMODAO = 'DictatorDAO',
  OPERATOR_ADDRESS = 'Operator',
  FOLD = 'FOLD',
  FOLD_ADDRESS = 'FOLD',
}

type AddressMap = Record<SupportedChainId, string>;

type ContractAddresses = Record<ContractNames, AddressMap>;

export const CONTRACT_ADDRESSES: ContractAddresses = {
  [ContractNames.FOLD]: {
    [SupportedChainId.MAINNET]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
     [SupportedChainId.RINKEBY]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
  },
  [ContractNames.FOLD_ADDRESS]: {
    [SupportedChainId.MAINNET]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
        [SupportedChainId.RINKEBY]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
  },
  [ContractNames.STAKING]: {
    [SupportedChainId.MAINNET]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
        [SupportedChainId.RINKEBY]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
  },
  [ContractNames.DOMODAO]: {
    [SupportedChainId.MAINNET]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
     [SupportedChainId.RINKEBY]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
  },
  [ContractNames.OPERATOR_ADDRESS]: {
    [SupportedChainId.MAINNET]: '0xA0766B65A4f7B1da79a1AF79aC695456eFa28644',
     [SupportedChainId.RINKEBY]: '0xA0766B65A4f7B1da79a1AF79aC695456eFa28644',
  },
};

export const OPERATOR: AddressMap = {
  [SupportedChainId.MAINNET]: '0xA0766B65A4f7B1da79a1AF79aC695456eFa28644',
   [SupportedChainId.RINKEBY]: '0xA0766B65A4f7B1da79a1AF79aC695456eFa28644',
};
