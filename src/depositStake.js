// import {render, screen} from '@testing-library/react';
// import DepositStake from "@/components/stake/depositStake"
// import foldAbi from "@/contracts/FOLD.json"
// import Web3 from 'web3'
const foldAbi = require('./depositStake/fold_abi')
const xFoldAbi = require('./depositStake/xfold_abi')
const Web3 = require('web3')

const unlockedAddress = "0x231e6f628aaa2b01b48e0f58ca326068d2047108"
const foldAddress = "0xd084944d3c05cd115c09d072b9f44ba3e0e45921"
const xFoldAddress = "0x454BD9E2B29EB5963048cC1A8BD6fD44e89899Cb"
const web3 = new Web3("http://localhost:8545")
const fold = new web3.eth.Contract(foldAbi, foldAddress)
const xfold = new web3.eth.Contract(xFoldAbi, xFoldAddress)

const foldBalance = fold.methods.balanceOf(unlockedAddress).call().then(data => data).catch(e => e)
const xFoldBalance = xfold.methods.balanceOf(unlockedAddress).call().then(data => data).catch(e => e)
console.log(foldBalance)
console.log(xFoldBalance)

// describe("DepositStake", () => {
//     it("checks if there is a submit button", () => {
//         const {getByText} = render(<DepositStake/>);
//         expect(getByText('Permit FOLD to mint xFOLD')).toBeInTheDocument();
//     })
// })

