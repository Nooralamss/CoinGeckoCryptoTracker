import axiosInstance from "../helper/axiosInstance"

export async function FetchCoinDetails(id){
   
    try {
      const response = await axiosInstance.get(`coins/${id}`);
  
      
      return response.data;
    }
     catch (error) {
       console.error(error); 
       return null;
    }
}