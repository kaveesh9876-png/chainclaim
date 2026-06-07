require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },

    networks: {
        // Local testing
        hardhat: {
            chainId: 31337,
        },

        // Polygon zkEVM Testnet
        zkevmTestnet: {
            url: process.env.POLYGON_ZKEVM_RPC || "https://rpc.public.zkevm-test.net",
            accounts: [PRIVATE_KEY],
            chainId: 1442,
            gasPrice: "auto",
        },

        // Polygon zkEVM Mainnet
        zkevmMainnet: {
            url: process.env.POLYGON_MAINNET_RPC || "https://zkevm-rpc.com",
            accounts: [PRIVATE_KEY],
            chainId: 1101,
            gasPrice: "auto",
        },
    },

    etherscan: {
        apiKey: {
            zkevmTestnet: POLYGONSCAN_API_KEY,
            zkevmMainnet: POLYGONSCAN_API_KEY,
        },
        customChains: [
            {
                network: "zkevmTestnet",
                chainId: 1442,
                urls: {
                    apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
                    browserURL: "https://testnet-zkevm.polygonscan.com",
                },
            },
            {
                network: "zkevmMainnet",
                chainId: 1101,
                urls: {
                    apiURL: "https://api-zkevm.polygonscan.com/api",
                    browserURL: "https://zkevm.polygonscan.com",
                },
            },
        ],
    },

    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },

    gasReporter: {
        enabled: true,
        currency: "USD",
    },
};
