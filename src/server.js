const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const generateSignedUrl = require("./helpers/generateSignedUrl");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const url = await generateSignedUrl();
        console.log(url);

        // redirect to the signed url
        return res.redirect(url);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on http://localhost:3000");
});
