const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");

const generateSignedUrl = async () => {
    // get private key filename and read it
    const privateKey = await fs.promises.readFile(
        process.env.AWS_CLOUDFRONT_PRIVATE_KEY_PATH || "private_access_key.pem",
        "utf8"
    );

    const getObjParams = {
        Bucket: process.env.AWS_BUCKET_NAME || "beneath-a-tree-assignment",
        Key: "test.jpg",
    };
    const s3Client = new S3Client({
        region: process.env.AWS_REGION || "ap-south-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY || "AKIAUTVKUBCOFJLACSG7",
            secretAccessKey:
                process.env.AWS_SECRET_ACCESS_KEY ||
                "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",
        },
    });
    const command = new GetObjectCommand(getObjParams);

    // Create the signed URL.
    const url = await getSignedUrl(s3Client, command, {
        expiresIn: 5 * 60, // 5 minutes
        keypairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID || "K6YQ8YTKGXETL",
        privateKeyString: privateKey,
    });
    return url;
};

module.exports = generateSignedUrl;
