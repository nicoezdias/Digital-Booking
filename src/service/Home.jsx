import axios from "axios";

const URL_API = 'http://13.56.193.67:8084'

export const listCategories = async () => {
  try {
    const r = await axios.get(`${URL_API}/categories`);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

export const filterByCategory = async (category) => {
  try {
    const r = await axios.get(`${URL_API}/products/categories/${category}`);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

export const filterByCity = async ({ id, arrival, departure }) => {
  try {
    const r = await axios.get(
      `${URL_API}/products/date/${id}/${arrival}/${departure}`
    );
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

export const listAllLikes = async (id) => {
  try {
    const r = await axios.get(`${URL_API}/favourites/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).jwt,
        'Content-Type': 'application/json'
      }
    });
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

export const listAllBookings = async (id) => {
  try {
    const r = await axios.get(`${URL_API}/bookings/user/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).jwt,
        'Content-Type': 'application/json'
      }
    });
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

export const listCity = async () => {
  try {
    const r = await axios.get(`${URL_API}/cities`);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

export const oneHotelById = async (id) => {
  try {
    const r = await axios.get(`${URL_API}/products/${id}`);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

export const getInfoReserve = async ({ productId, userId }) => {
  try {
    const r = await axios.get(
      `${URL_API}/products/booking/${productId}/${userId}`
    );
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

export const likeHotels = async (payload) => {
  try {
    const local = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        Authorization: `Bearer ${local && local.jwt}`,
      },
    };
    const r = await axios.post(`${URL_API}/favourites`, payload, config);
    console.log(r);
    const { data, status } = r;
    return [null, data, status];
  } catch (error) {
    return [error, null, null];
  }
};

export const listAllHotels = async () => {
  try {
    const local = JSON.parse(localStorage.getItem("user"));
    const r = await axios.get(
      `${URL_API}/products/all${local ? "/" + local.id : "/"}`
    );
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

export const createBookings = async (payload)=>{
  try {
    const local = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        Authorization: `Bearer ${local && local.jwt}`,
      },
    };
    console.log(payload);
    const r = await axios.post(`${URL_API}/bookings`, payload, config);
    const { data } = r;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

// axios.post(URLAPI, data, {headers: {"Authorization": `Bearer ${payload}`}})
