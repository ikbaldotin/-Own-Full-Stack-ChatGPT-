import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const url = process.env.MONGO_URI
        await mongoose.connect(url, { dbName: "mygpt" })
        console.log("Connect db")
    } catch (error) {
        console.log("disconnected ", error)

    }
}
export default connectDb