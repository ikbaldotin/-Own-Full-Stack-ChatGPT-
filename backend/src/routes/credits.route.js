import express from "express"
import { isAuth } from "../middleware/Auth.js"
import { getPlans, purchasePlans } from "../controllers/credit.controller.js"
const CreditRoute = express.Router()

CreditRoute.get('/plan', getPlans)
CreditRoute.post('/purchase', isAuth, purchasePlans)
export default CreditRoute