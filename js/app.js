let web3;
let account;
let contract;


window.CONTRACT_ADDRESS = "0xbaabc7fdc40bc459749ed5145fd524234c2b5fa0";
window.CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_purpose",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_goalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_durationSeconds",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_receiptDeadlineDays",
				"type": "uint256"
			}
		],
		"name": "createProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			}
		],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Donated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ProjectCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "receiptUrl",
				"type": "string"
			}
		],
		"name": "ReceiptUploaded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Refunded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			}
		],
		"name": "requestRefund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			}
		],
		"name": "uploadReceipt",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "donations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			}
		],
		"name": "getProject",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "goalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountRaised",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "receiptDeadlineDays",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "receiptUploaded",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "receiptUrl",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasRefunded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			}
		],
		"name": "isProjectSuccessful",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			}
		],
		"name": "isReceiptUploaded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "purpose",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "goalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "receiptDeadlineDays",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountRaised",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "receiptUrl",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "receiptUploaded",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.web3 = null;
window.account = null;
window.contract = null;

window.connectWallet = async function(){
  if (window.ethereum) {
     try {
     if (!window.account) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.account = accounts[0];
            window.web3 = new Web3(window.ethereum);
            window.contract = new window.web3.eth.Contract(window.CONTRACT_ABI, window.CONTRACT_ADDRESS);
            }
      return window.account;
    } catch (err) {
      console.error("錢包連接失敗：", err);
      throw err;
    }
  } else {
    alert("請先安裝 MetaMask");
    throw new Error("No MetaMask");
  }
}

// 呼叫此函式以建立一個募資專案（由企業端呼叫）
window.createProject = async function(title, goalAmount, purpose, durationSeconds, receiptTime) {
try {
        await window.connectWallet();
        await window.contract.methods.createProject(
            title,
            purpose,
            window.web3.utils.toWei(goalAmount.toString(), 'ether'),
            durationSeconds,
            receiptTime
        ).send({ from: window.account });
        alert("專案建立成功！");
} catch (err) {
        console.error("建立專案失敗：", err);
        alert("建立專案失敗");
}
};

window.donateToProject = async function(projectId, amountInEth) {
 try {
        await window.connectWallet();
        await window.contract.methods.donate(projectId)
            .send({ from: window.account, value: window.web3.utils.toWei(amountInEth.toString(), 'ether') });
        alert("捐款成功！");
} catch (err) {
        console.error("捐款失敗：", err);
        alert("捐款失敗");
}};

window.uploadToIPFS = async function(file) {
try {
        const url = process.env.IPFS_API_URL;
        if (!url) throw new Error("IPFS Proxy URL 未設定");
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            throw new Error("Proxy 上傳失敗");
        }
        const data = await res.json();
        return data.IpfsHash;
} catch (err) {
        console.error("IPFS 上傳錯誤：", err);
        throw err;
}
};

window.uploadReceipt = async function(projectId, receiptUrl) {
  try {
    await window.contract.methods
      .uploadReceipt(projectId, receiptUrl)
      .send({ from: window.account });

    alert("收據已上傳！");
  } catch (err) {
    console.error("上傳收據錯誤：", err);
  }
};


window.uploadReceiptWithFile = async function(projectId, file) {
  try {
    const ipfsUrl = await window.uploadToIPFS(file);
    await window.uploadReceipt(projectId, ipfsUrl);
  } catch (err) {
    console.error("IPFS 或上傳錯誤：", err);
    alert("收據上傳失敗");
  }
};
