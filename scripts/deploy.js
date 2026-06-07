const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🚀 ChainClaim - Deploying to Polygon zkEVM...\n");

    // Get deployer wallet
    const [deployer] = await ethers.getSigners();
    console.log("📦 Deployer address:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("💰 Deployer balance:", ethers.formatEther(balance), "ETH\n");

    if (balance === 0n) {
        throw new Error("❌ Deployer wallet has no balance! Add funds first.");
    }

    // Deploy ClaimProcessor contract
    console.log("⏳ Deploying ClaimProcessor...");
    const ClaimProcessor = await ethers.getContractFactory("ClaimProcessor");

    const claimProcessor = await ClaimProcessor.deploy();
    await claimProcessor.waitForDeployment();

    const contractAddress = await claimProcessor.getAddress();
    console.log("✅ ClaimProcessor deployed at:", contractAddress);

    // Save address to .env and a deployments file
    const deploymentInfo = {
        network: hre.network.name,
        contractAddress,
        deployer: deployer.address,
        deployedAt: new Date().toISOString(),
        blockNumber: await ethers.provider.getBlockNumber(),
    };

    // Save to deployments folder
    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const filename = `${hre.network.name}_deployment.json`;
    fs.writeFileSync(
        path.join(deploymentsDir, filename),
        JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("\n📄 Deployment info saved to deployments/" + filename);
    console.log("\n⚠️  Update your .env file:");
    console.log(`CLAIM_PROCESSOR_ADDRESS=${contractAddress}`);

    // Verify on Polygonscan (only on live networks)
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("\n⏳ Waiting 30 seconds before verification...");
        await new Promise((resolve) => setTimeout(resolve, 30000));

        try {
            console.log("🔍 Verifying on Polygonscan...");
            await hre.run("verify:verify", {
                address: contractAddress,
                constructorArguments: [],
            });
            console.log("✅ Contract verified on Polygonscan!");
        } catch (err) {
            console.log("⚠️  Verification failed:", err.message);
        }
    }

    console.log("\n🎉 Deployment complete!\n");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
