import axios from "axios";

export const login = async ({ email, password }) => {
  try {
    if(!email || !password) return undefined;

    const {data, status} = await axios.post("/auth/login", { email, password });
    if(status !== 200) return undefined;

    return data.data;
  } catch (error) {
    console.log({error});
    return undefined;  
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

export const whoami = async () => {
  try {
    const {data} = await axios.get("/auth/whoami");
    return data.data;
  } catch (error) {
    console.error({error});
    return undefined;
  }
}