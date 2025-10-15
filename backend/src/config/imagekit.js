import ImageKit from "imagekit";
import dotenv from "dotenv"
dotenv.config()
const imagekit = new ImageKit({
    // publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    // privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    // urlEndpoint: process.env.IMAGEKIT_API_URL_ENDPOINT,
    // SDK initialization


    publicKey: "public_fkzJKatkFA0yWUBT5jlsqQxyhGA=",
    privateKey: "private_O2secNXn+J******************",
    urlEndpoint: "https://ik.imagekit.io/ikbaldotin"


});

export default imagekit;
