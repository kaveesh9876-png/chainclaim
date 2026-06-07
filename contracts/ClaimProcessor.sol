// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClaimProcessor {
    struct Claim {
        uint256 id;
        string claimant;
        uint256 amount;
        string status;
        string policyId;
        string claimType;
        string description;
        address submitter;
        uint256 createdAt;
    }

    mapping(uint256 => Claim) public claims;
    uint256 public nextId;

    event ClaimSubmitted(uint256 indexed id, string claimant, uint256 amount);
    event ClaimStatusUpdated(uint256 indexed id, string status);

    function submitClaim(
        string calldata claimant,
        uint256 amount,
        string calldata policyId,
        string calldata claimType,
        string calldata description
    ) external returns (uint256) {
        uint256 id = nextId++;
        claims[id] = Claim({
            id: id,
            claimant: claimant,
            amount: amount,
            status: "pending",
            policyId: policyId,
            claimType: claimType,
            description: description,
            submitter: msg.sender,
            createdAt: block.timestamp
        });

        emit ClaimSubmitted(id, claimant, amount);
        return id;
    }

    function setStatus(uint256 id, string calldata status) external {
        require(id < nextId, "invalid claim id");
        Claim storage c = claims[id];
        c.status = status;
        emit ClaimStatusUpdated(id, status);
    }
}
