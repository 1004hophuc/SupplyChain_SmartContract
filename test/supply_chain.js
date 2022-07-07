const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", async (accounts) => {
  it("should create a Participant", async () => {
    let instance = await SupplyChain.deployed();
    let participantId = await instance.addParticipant(
      "A",
      "passA",
      "0xa2b2aA178B5De70C69BD92DAFeEDfED14a62E207",
      "Manufacturer"
    );
    let participant = await instance.participants(0);
    assert.equal(participant[0], "A");
    assert.equal(participant[2], "Manufacturer");
    participantId = await instance.addParticipant(
      "B",
      "passB",
      "0xc3645d0a7Db0163BA9EC74770181939566B52C29",
      "Supplier"
    );
    participant = await instance.participants(1);
    assert.equal(participant[0], "B");
    assert.equal(participant[2], "Supplier");
    participantId = await instance.addParticipant(
      "C",
      "passC",
      "0x9D28792C29E0b35Fb7d2641afB14731845c3C6FB",
      "Consumer"
    );
    participant = await instance.participants(2);
    assert.equal(participant[0], "C");
    assert.equal(participant[2], "Consumer");
  });
  it("should return Participant details", async () => {
    let instance = await SupplyChain.deployed();
    let participantDetails = await instance.getParticipant(0);
    assert.equal(participantDetails[0], "A");
    instance = await SupplyChain.deployed();
    participantDetails = await instance.getParticipant(1);
    assert.equal(participantDetails[0], "B");
    instance = await SupplyChain.deployed();
    participantDetails = await instance.getParticipant(2);
    assert.equal(participantDetails[0], "C");
  });
});

// Move products along supply chain: Manufacturer => Supplier => Supplier => Consumer
// newOwner(from, to, prod_id)

// supplyChain.deployed().then(function(instance) { return instance.newOwner(0, 3, 0, {from: address 0}) })
