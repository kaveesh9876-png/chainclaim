const Claim = require("../models/Claim");

// GET all claims
exports.getClaims = async (req, res) => {
    try {
        const claims = await Claim.find().sort({ createdAt: -1 });
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single claim by ID
exports.getClaimById = async (req, res) => {
    try {
        const claim = await Claim.findById(req.params.id);
        if (!claim) return res.status(404).json({ message: "Claim not found" });
        res.json(claim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create new claim
exports.createClaim = async (req, res) => {
    try {
        const claim = new Claim(req.body);
        await claim.save();
        res.status(201).json(claim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT update claim
exports.updateClaim = async (req, res) => {
    try {
        const claim = await Claim.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!claim) return res.status(404).json({ message: "Claim not found" });
        res.json(claim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE claim
exports.deleteClaim = async (req, res) => {
    try {
        const claim = await Claim.findByIdAndDelete(req.params.id);
        if (!claim) return res.status(404).json({ message: "Claim not found" });
        res.json({ message: "Claim deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};