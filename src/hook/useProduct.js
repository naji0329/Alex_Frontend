import { setAlert } from "../actions/alert";

import api from "../utils/api";

export default function useProduct() {
  const getProducts = async () => {
    try {
      const res = await api.get(`/products`);
      if (res.data.success) {
        return res.data.products.map((item, index) => {
          return { ...item, tid: index };
        });
      }
      return [];
    } catch (error) {
      if (error?.response?.data?.message) {
        setAlert(error?.response?.data?.message, "error");
      } else {
        setAlert("Server Error.", "error");
      }
      return [];
    }
  };

  return {
    getProducts,
  };
}
