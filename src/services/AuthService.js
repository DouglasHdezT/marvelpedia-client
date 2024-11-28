import axios from "axios";

export const login = async ({ email, password }) => {
  try {
    if(!email || !password) return;

    const {data, status} = await axios.post("/auth/login", { email, password });
    if(status !== 200) return;

    return data.data;
  } catch (error) {
    console.log({error});
    return null;  
  }  
}

export const register = async ({ email, password }) => {
  try {
    const {status} = await axios.post("/auth/register", { email, password }, { validateStatus: () => true });
    return status;
  } catch {
    return 500; 
  }
}