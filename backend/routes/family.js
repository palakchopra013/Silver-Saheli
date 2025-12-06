import express from "express";
const router = express.Router();

router.get("/location", (req, res) => {
  res.json({ lat: 28.61, lon: 77.23 }); // Delhi (example)
});

export default router;
