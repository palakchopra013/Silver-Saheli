import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
    try {
        const { name, phone, message } = req.body;

        const newContact = new Contact({
            name,
            phone,
            message
        });

        await newContact.save();

        res.json({ success: true, message: "Contact saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};
