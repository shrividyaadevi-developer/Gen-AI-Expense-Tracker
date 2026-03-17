import API from "./api";

// LOGIN
export const loginUser = async (email, password) => {

  const response = await API.post("/auth/login", {
    email: email,
    password: password
  });

  return response.data;
};


// REGISTER
export const registerUser = async (data) => {

  const response = await API.post("/auth/register", data);

  return response.data;
};