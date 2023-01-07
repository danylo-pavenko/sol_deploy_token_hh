import { ethers, run } from "hardhat";
import { DansForgeNFT__factory, DansForgeCoin__factory } from "../typechain-types";

async function main() {
  console.log('Begin upload contracts')
  const [signer] = await ethers.getSigners()

  const dfcNft = await new DansForgeNFT__factory(signer).deploy()

  await dfcNft.deployed()

  console.log('DansForgeNFT deployed to:', dfcNft.address)

  const dfcToken = await new DansForgeCoin__factory(signer).deploy()

  await dfcToken.deployed();

  console.log('DansForgeCoin deployed to:', dfcToken.address)

  await dfcNft.safeMint(
    signer.address, 
    'https://bafkreieamncsttct3xbjju22dlxipfesiqgcdhk3gp3g4ch2aldstkxrwa.ipfs.nftstorage.link/'
  )

  await run('verify:verify', {
    address: dfcToken.address,
    contract: 'contracts/DansForgeCoin.sol:DansForgeCoin'
  })

  await run('verify:verify', {
    address: dfcNft.address,
    contract: 'contracts/DansForgeNFT.sol:DansForgeNFT'
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
