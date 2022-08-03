import axios from "axios";

const URL_API = 'http://13.56.193.67:8084'


export const authLogin = async (payload) => {
  try {
    const r = await axios.post(`${URL_API}/users/authenticate`, payload);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

export const authSignUp = async (payload) => {
  try {
    const r = await axios.post(`${URL_API}/users`, payload);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

export const confirmUser = async (payload) => {
  try {
    const r = await axios.post(`${URL_API}/users/validate`, payload);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

export const updateUser = async (payload) => {
  try {
    const r = await axios.post(`${URL_API}/users/city`, payload);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

export const listFeatures = async ()=>{
  try {
    const local = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        Authorization: `Bearer ${local && local.jwt}`,
      },
    };
    const r = await axios.get(`${URL_API}/features`,config);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

export const getPolicies = async () => {
  try {
    const local = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        Authorization: `Bearer ${local && local.jwt}`,
      },
    };
    const r = await axios.get(`${URL_API}/policies`,config);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

export const postProduct = async (payload) =>{
  try {
    const local = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        Authorization: `Bearer ${local && local.jwt}`,
      },
    };
    const r = await axios.post(`${URL_API}/products`, payload, config);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}