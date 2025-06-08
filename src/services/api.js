import axios from "axios";

export const fetchCoinsAPI = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    }
  );
  return response.data;
};
export const getCoinDetails = async (coinId) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );
  return response.data;
};

export const getCoinMarketChart = async (coinId, days) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days,
        interval: "daily",
      },
    }
  );
  return response.data;
};
