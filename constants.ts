import { BigNumber } from "@ethersproject/bignumber";
import DOMODAO from "./contracts/DictatorDAO.json";
import UChildERC20 from "./abi/UChildERC20.json";

export const SQUISHI_GAME_ADDR = "0x3dcd833e696DeD5482E704BF169A0de88Eb47D51";
export const SQUISHI_GAME_ABI = DOMODAO;

export const SUSHI_ERC20_ADDR = "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a";
export const SUSHI_ERC20_ABI = UChildERC20;

export interface IGameData {
    players: any[],
    endDate: BigNumber,
    hoursLeft: number,
    playerAmount: BigNumber,
    pot: BigNumber
}