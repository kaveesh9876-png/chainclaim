const express = require("express");
const router = express.Router();
const {
    getClaims,
    getClaimById,
    createClaim,
    updateClaim,
    deleteClaim
} = require("../controllers/claimController");

// GET    /api/claims        → all claims
// POST   /api/claims        → create claim
// GET    /api/claims/:id    → single claim
// PUT    /api/claims/:id    → update claim
// DELETE /api/claims/:id    → delete claim

router.get("/", getClaims);
router.post("/", createClaim);
router.get("/:id", getClaimById);
router.put("/:id", updateClaim);
router.delete("/:id", deleteClaim);

module.exports = router;