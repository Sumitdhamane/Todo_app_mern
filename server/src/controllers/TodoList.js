import User from "../models/User.js"
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";

export const GetTodos = async(req, res)=>{
    try {
        const list = await User.findById(req.userId).select("-password").populate('todos').exec();

        return res.json(jsonGenerate(StatusCode.SUCCESS, 'All todo list', list))
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, 'error', error))

        
    }
}
