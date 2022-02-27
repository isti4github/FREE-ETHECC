if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
} else {
  console.log("Please install MetaMask!");
}

var web3 = new Web3(window.ethereum);
var accounts;

const _contract_address = "0x77812C4C2E278bc8Da38273Fdc429c97b9C794B6";
const _contract_abi = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "donate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "request",
    outputs: [
      {
        internalType: "uint256",
        name: "remainingBal",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const free_eth_contract = new web3.eth.Contract(
  _contract_abi,
  _contract_address
);


//To connect with Metamask
$("#connectMetamask").click(async function () {

  if(window.ethereum){

    accounts = await ethereum.request({ method: "eth_requestAccounts" });

  /*Get Accont */
  $("#Account").val(accounts[0]);

  //getBalance(accounts[0]);

  var result = await free_eth_contract.methods.getBalance(accounts[0]).call();

  $("#currentAmount").text(result);

  }
  else{
    console.log("Please install MetaMAsk");
  }
  


});

async function getBalance(account) {
  var balance = await ethereum.request({
    method: "eth_getBalance",
    params: [account],
  });

  $("#Balance").val(await web3.utils.fromWei(balance, "ether"));
}

/* Transfer */
$("#Transfer").click(async function () {
  $("#Tx").text("");
  var _from = $("#From").val();
  var _to = $("#To").val();
  var _Amount = $("#Amount").val();
  var txnObject = {
    from: _from,
    to: _to,
    value: web3.utils.numberToHex(web3.utils.toWei(_Amount, "ether")),
    // "gas": 21000,         (optional)
    // "gasPrice": 4500000,  (optional)
    // "data": 'For testing' (optional)
    // "nonce": 10           (optional)
  };
  console.log(txnObject);
  var txn_hash = await ethereum.request({
    method: "eth_sendTransaction",
    params: [txnObject],
  });

  $("#Tx").text(txn_hash);
});

$("#RequestFreETH").click(async function () {
  // suppose you want to call a function named myFunction of myContract
  jQuery("#rloader_div").show();
  var result;
  result = await free_eth_contract.methods
    .request()
    .send({
      from: accounts[0],
    })
    .then(function (receipt) {
      $("#Request-Hash").text(receipt.transactionHash);
    });
  jQuery("#rloader_div").hide();
});

$("#DonateFreETH").click(async function () {
  // suppose you want to call a function named myFunction of myContract
  jQuery("#dloader_div").show();
  var result;
  var _Amount = $("#dAmount").val();
  result = await free_eth_contract.methods
    .donate()
    .send({
      from: accounts[0],
      value: web3.utils.numberToHex(web3.utils.toWei(_Amount, "ether")),
    })
    .then(function (receipt) {
      $("Donate-Hash").text(receipt.transactionHash);
    });
  jQuery("#dloader_div").hide();
});
