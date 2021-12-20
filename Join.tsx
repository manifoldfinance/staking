import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract, providers } from "ethers";
import { SQUISHI_GAME_ADDR, SUSHI_ERC20_ABI, SUSHI_ERC20_ADDR } from "../constant";
import DOMODAO from "./contracts/DictatorDAO"

export function Join({squishiGameContract, fetchContract, setLoading}: {squishiGameContract: Contract, fetchContract: Function, setLoading: Function}): JSX.Element {
    const context = useWeb3React<Web3Provider>();
    const {connector, library, chainId, account, activate, deactivate, active, error} = context;
    
    return (
      <div className={"border-2 inline-block p-8 mt-4"}>
        <h1 className={"text-xl font-squid"}>WANNA JOIN THE GAME ANON ?</h1>
        <p>You need to approve the contract and 3 SUSHI to play.</p>
        <button
          className={"mt-2 mx-2 p-4 border-2 inline-block"}
          onClick={(e) => {
            async function approve() {
              if (connector === undefined) return;
              const token = new Contract(SUSHI_ERC20_ADDR, SUSHI_ERC20_ABI);
              const web3Provider = new providers.Web3Provider(
                await connector.getProvider()
              );
              const tokenWithSigner = token.connect(web3Provider.getSigner());
              const tx = await tokenWithSigner.approve(SQUISHI_GAME_ADDR, 3 * (10 * 18));
              setLoading('Approving...')
              await web3Provider.waitForTransaction(tx.hash, 1);
              setLoading('')
            }
            approve();
          }}
        >
          Approve
        </button>
        <button
          className={"mt-2 mx-2 p-4 border-2 inline-block"}
          onClick={(e) => {
            async function join() {
              const tx = await squishiGameContract.join();
              if (tx) {
                setLoading('Joining the game...');
                await squishiGameContract.provider.waitForTransaction(tx.hash, 1);
                setLoading('');
                await fetchContract();
              }
            }
            join();
          }}
        >
          Join
        </button>