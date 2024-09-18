// const admin = require("firebase-admin");
// const path = require("path");
// const dotenv = require("dotenv");

// dotenv.config();
// // Correct path to your Firebase service account key JSON file
// const serviceAccount = require(path.resolve(__dirname, "./serviceAccountKey.json"));


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket:process.env.FIREBASE_STORAGE_BUCKET // Replace with your actual bucket name
// });

// const bucket = admin.storage().bucket();

// module.exports = { admin, bucket };

// const admin = require("firebase-admin");
// const dotenv = require("dotenv");

// dotenv.config();

// // Initialize Firebase with credentials from environment variables
// admin.initializeApp({
//   credential: admin.credential.cert({
//     type: process.env.FIREBASE_TYPE,
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     // private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClU+FjNZxpNzIN\nsK6Jp3BWZLNABa0NF91W/rdefFp0wBVPgxdTFksONK6ewUXEtSstKHDibA+lbJE6\noqwd6st/7swCRwt21/CNdh/ZxXInmpNKYBIH5q+O72wEECbEueonmvwYGnSWcDNh\nQe7u0bopXII0mTsijrzPzSu8ghvUL/VDkw18byNSBwbDrCvaJXoARFD4Q2F4FGMJ\nnNVejHAVAEc1glQx0ge1U48COUKy9pyQId20RDSio1rkp0pAq2PtUggO6zEC2+A3\nzlej7Hm4qLfh2Y+IhypYu4QEX2c2ONb0DitBYjP5q/Aabyb/s+Jes7oxeSCcVKKS\nJxgP6d/9AgMBAAECggEASF0iKqgFGcKYjIh4pPTehVoXYV76o1/+OD1OarN4bmDD\nEyX4eBwqZwHlKsTC8nov91ibrGeLI6eVG7qnJoMmZo1Ry29oU7Dp8CkzgMDdGfud\nG7FYQxAUaLZgK5kcNwB/Pq2mSTCPNmfO/XN8DxlKaB8/OKGXUiVy/Gu8CItUffd5\nw1Wxfw9znc5AWIbx1x8buy/rqWa/9t4qvrfnd7sbY+6k3j5iuacdzQSmRWGh8AxA\nZp9LgDmyU2qRWO9DHTwQsQaaZFq3+E8vgFi0PhyXddoKcIit+zHOZSluHUOuDH+p\n9yXjT7aQnYFRn8h9op3Eu7Nc4yCL8QsQa4BUTNh76wKBgQDPYx5zvLkMParEBLMJ\nKiBEioUKnvNpo/JOvsvKVz2ai7VdYYrw0cHdicvbe8YeUHiY/PtprrxCTO9vy+mP\n3NCqh7jfj1MLdD7yzpBmvjjosb7aj8P//99kYKHQV1ExVkPKbPwSSPa4Dg5S+0kD\n+UQ+aUz4DVF2Lm7bCdYXbwDrMwKBgQDMFNr0p5pCB7zxCC+lkBgIGWV88f7ow2Tw\ni/Vr7r9WjjkZANKLUOASW86RLfKaAZ3UbbFgtYbaWXqQQ68omyXvW3UivhmApv9Y\n1oFxsyst35Dj82ZqUyRsdBsncPFa7Dnw4Iw4Dro4iUrCPd6+Glsse995GrIZlgIT\nEDSf7nOIDwKBgB/kICSwGsy1FvN5vYZlQf0ISBkwBEJ0gah2UqRU8hY38bXgcBtE\nRkmpDP49dGPpAAKWtJq10iFn71IDy3DiBfyTTmyif6S9RYjVFwOVsO6nlq/Jd9yA\nHnwzF+8P3l5144rXY5P0QGxhTPaZycqgpEvsqXdjpOlFjqqEQrXrzfpdAoGAWRT1\nanvKcu4rxE6ddbiLNOXZDgwYCARaiEGflEh3ztFwDQD15ogb9weKCIc08ZKpETP8\njElQnvkV7ekNiT0H9w5F+C9gtG6w4Vdo03ew7mo7NbVmTB0Uth6MR9AeGmEo/YMW\n0dVj5g/PyS/2jaa1i5patuM3QMHhD+8v+Wu9lHMCgYBwubnm981MEEi8Yvzpc/p7\n5g41qPw1B2oVfLcQ8MLBJhgQZchZjD7sVhK0kRfmCQ9+F628E0MSZO3p/QBM7Eks\n9l4ohPHx4McRnmhrwFBGqAble60xSLSQi/6xn7i1jfqfnkxXIs70MggX8gUsPcsn\nVt9Z4Nu0HAPTuxm7CgfZ8w==",
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI,
//     token_uri: process.env.FIREBASE_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
//   }),
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET // Replace with your actual bucket name
// });

// const bucket = admin.storage().bucket();

// module.exports = { admin, bucket };

//====================

const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Parse the service account key JSON from the environment variable
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET // Replace with your actual bucket name
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
