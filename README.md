# Parity-hack

Recreated the parity hack that involved over 150,000 ETH stolen.

Used hardhat to fork the mainnet + traverse to block 4043801 (hack happened in [block 4043802](https://etherscan.io/tx/0xeef10fc5170f669b86c4cd0444882a96087221325f8bf2f55d6188633aa7be7c)).

Interacted with the [faulty SC's function *initWallet*](https://github.com/openethereum/parity-ethereum/blob/4d08e7b0aec46443bf26547b17d10cb302672835/js/src/contracts/snippets/enhanced-wallet.sol) to add myself as an owner to take control of the wallet.

<p align="left">
    <img width="600" alt="terminal-output" src="https://user-images.githubusercontent.com/56946413/166106632-1bd55633-26b9-470b-8650-91d91a7d07a6.png">
</p>

*resource taken from [here](https://betterprogramming.pub/the-complete-hands-on-hardhat-tutorial-9e23728fc8a4)*
