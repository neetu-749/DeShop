const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("DeShop", () => {
  let deshop
  let deployer, buyer

  beforeEach(async () => {
    //setup accounts
    [deployer, buyer] = await ethers.getSigners()
    console.log((deployer.address, buyer.address))

    // deploy contract
    const DeShop = await ethers.getContractFactory("DeShop")
    deshop = await DeShop.deploy()
  })
  
  // mocha testing framework
  describe("Deployment", () => {
    it('sets the owner', async () => {
      expect(await deshop.owner()).to.equal(deployer.address)
    })

    // it('has a name', async () =>{
    //   const name = await deshop.name()
    //   expect(name).to.equal("DeShop")
    // })
  })
  describe("Listing", () =>{
    let transaction
    const ID =1
    beforeEach(async() =>{
      transaction = await deshop.connect(deployer).list(
        ID,
        "Shirt",
        "Clothing",
        "IMAGE",
        1,
        4,
        5
      )
      await transaction.wait()
    })
    it('Returns item attributes', async () =>{
      const item = await deshop.items(1)
      expect(item.id).to.equal(ID)
    })
  })

})
