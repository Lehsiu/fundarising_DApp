// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Fundraising {
    struct Project {
        string title;
        string purpose;
        uint goalAmount;
        uint deadline;
        uint receiptDeadlineDays;
        uint amountRaised;
        string receiptUrl;
        address owner;
        bool receiptUploaded;
        bool completed;
    }

    Project[] public projects;

    mapping(uint => mapping(address => uint)) public donations;
    mapping(uint => mapping(address => bool)) public hasRefunded;

    event ProjectCreated(uint indexed projectId, address indexed owner);
    event Donated(uint indexed projectId, address indexed donor, uint amount);
    event ReceiptUploaded(uint indexed projectId, string receiptUrl);
    event Refunded(uint indexed projectId, address indexed donor, uint amount);

    // 建立專案
    function createProject(
        string memory _title,
        string memory _purpose,
        uint _goalAmount,
        uint _durationSeconds,
        uint _receiptDeadlineDays // 企業應幾日內上傳收據
    ) external {
        require(_receiptDeadlineDays >= 1 && _receiptDeadlineDays <= 7, unicode"收據期限需在 1至7 天");
        projects.push(Project({
            title: _title,
            purpose: _purpose,
            goalAmount: _goalAmount,
            deadline: block.timestamp + _durationSeconds,
            receiptDeadlineDays: _receiptDeadlineDays,
            amountRaised: 0,
            receiptUrl: "",
            owner: msg.sender,
            receiptUploaded: false,
            completed: false
        }));
        emit ProjectCreated(projects.length - 1, msg.sender);
        //emit會記錄到EVM日誌中，不佔用 storage
    }

    // 捐款
    function donate(uint projectId) external payable {
        Project storage p = projects[projectId];
        require(block.timestamp < p.deadline, unicode"已截止");
        require(msg.value > 0, unicode"金額需 > 0");

        donations[projectId][msg.sender] += msg.value;
        p.amountRaised += msg.value;

        emit Donated(projectId, msg.sender, msg.value);
    }

    // 上傳收據
    function uploadReceipt(uint projectId, string memory url) external {
        Project storage p = projects[projectId];
        require(msg.sender == p.owner, unicode"非專案建立者");
        require(p.amountRaised >= p.goalAmount, unicode"尚未達標");
        require(!p.receiptUploaded, unicode"已上傳過");

        p.receiptUrl = url;
        p.receiptUploaded = true;
        p.completed = true;

        emit ReceiptUploaded(projectId, url);
    }

    // 請求退款
    function requestRefund(uint projectId) external {
        Project storage p = projects[projectId];
        require(block.timestamp >= p.deadline, unicode"尚未到期");
        require(
            p.amountRaised < p.goalAmount ||
            (p.amountRaised >= p.goalAmount && !p.receiptUploaded && block.timestamp > p.deadline + p.receiptDeadlineDays * 1 days),
            unicode"不符合退款條件"
        );

        require(!hasRefunded[projectId][msg.sender], unicode"已退款");
        uint amount = donations[projectId][msg.sender];
        require(amount > 0, unicode"未捐款");

        hasRefunded[projectId][msg.sender] = true;
        donations[projectId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Refunded(projectId, msg.sender, amount);
    }

    // 查詢收據上傳狀態
    function isReceiptUploaded(uint projectId) external view returns (bool) {
        return projects[projectId].receiptUploaded;
    }

    function isProjectSuccessful(uint projectId) external view returns (bool) {
        Project storage p = projects[projectId];
        return (block.timestamp >= p.deadline && p.amountRaised >= p.goalAmount);
    }

    function getProject(uint projectId) external view returns (
        string memory title,
        uint goalAmount,
        uint amountRaised,
        uint deadline,
        uint receiptDeadlineDays,
        bool receiptUploaded,
        string memory receiptUrl,
        address owner
    ) {
        Project storage p = projects[projectId];
        return (
            p.title,
            p.goalAmount,
            p.amountRaised,
            p.deadline,
            p.receiptDeadlineDays,
            p.receiptUploaded,
            p.receiptUrl,
            p.owner
        );
    }
}
