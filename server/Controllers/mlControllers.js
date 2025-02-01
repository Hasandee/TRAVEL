import axios from "axios";

export const predict = async (req,res,next)=>{
    const data = req.body;
    console.log(data);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict',data,
      );
      
      res.status(200).json({
        status: "success",data:response.data})
    } catch (error) {
        console.log(error);
        
        next(error);
    }
  }