import express from "express";
const router = express.Router();

router.post("/send", (req, res) => {
  const { userName, location } = req.body;

  // later: integrate SMS/WhatsApp alert
  res.json({ message: `SOS sent for ${userName} at ${location}` });
});

export default router;
