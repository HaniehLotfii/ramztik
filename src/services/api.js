import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getMarketData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page: 1,
        sparkline: false,
      },
    });

    return response.data;
  } catch (error) {
    console.error("خطا در دریافت داده:", error);
    return [];
  }
};
