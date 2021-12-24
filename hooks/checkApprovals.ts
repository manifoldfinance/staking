 /** TODO
// MINT 

 async checkApprovals(trades: any, web3: any) {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const approvalsNeeded = await Promise.all(
      trades.map(async (trade: any) => {
        if (tx.sourceToken === ETH.address || trade.error) {
          return null;
        }
        const spender = (N => {
          switch (N) {
            case "FOLD":
              return getContractAddressesForChainOrThrow(1).erc20Proxy;
            case "DictatorDAO":
              return "0x74758acfce059f503a7e6b0fc2c8737600f9f2c4";
            default:
              return approve.to;
          }
        })(tx.mint);

        const isApproved = await checkApproval(
          trade.sourceToken,
          spender,
          signer
        );

        if (!isApproved) {
          return (options = {}) =>
            approveToken(mint.sourceToken, spender, signer, options);
        } else {
          return null;
        }
      })
    );
    return approvalsNeeded;
  }
