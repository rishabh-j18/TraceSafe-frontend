import apiRequest from "./api";
import { BACKEND} from "./helpUrl";

export const createUser= async(user)=>{
    return apiRequest(`${BACKEND}/register`,'POST', user)
}

export const loginUser= async(data)=>{
    return apiRequest(`${BACKEND}/login`,'POST',data)
}

export const forgetUser = async(user)=>{
    return apiRequest(`${BACKEND}/forget`,'POST', user)
}

export const getUser= async(user)=>{
    return apiRequest(`${BACKEND}/register`,'GET', user)
}

export const updateUserProfile = async (formData) => {
    return apiRequest(`${BACKEND}/update-profile`, 'POST', formData, {
      'Content-Type': 'multipart/form-data',
    });
  };
  
  export const submitMissingPersonReport = async (formData) => {
    return apiRequest(`${BACKEND}/report-missing`, 'POST', formData, {
      'Content-Type': 'multipart/form-data',
    });
  };
  
