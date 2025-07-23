// import axios from "axios";

// export const fetchCoinsAPI = async () => {
//   const response = await axios.get(
//     "https://api.coingecko.com/api/v3/coins/markets",
//     {
//       params: {
//         vs_currency: "usd",
//         order: "market_cap_desc",
//         per_page: 50,
//         page: 1,
//         sparkline: false,
//         price_change_percentage: "24h",
//       },
//     }
//   );
//   return response.data;
// };
import axios from "axios";

const CACHE_KEY = "coins_data_cache";
const CACHE_EXPIRY = 49 * 1000; // 49 seconds

export const fetchCoinsAPI = async () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    const now = Date.now();

    if (now - parsed.timestamp < CACHE_EXPIRY) {
      console.log("Using cached data");
      return parsed.data;
    }
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 96,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      }
    );

    const result = response.data;

    // Save to localStorage
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: result })
    );

    return result;
  } catch (error) {
    if (error.response?.status === 429) {
      console.warn("rate limit (429). Using cache if available.");

      if (cached) {
        return JSON.parse(cached).data;
      }
    }

    throw error;
  }
};

// export const getCoinDetails = async (coinId) => {
//   const response = await axios.get(
//     `https://api.coingecko.com/api/v3/coins/${coinId}`
//   );
//   return response.data;
// };

export const getCoinDetails = async (coinId) => {
  const CACHE_KEY = `coin_details_${coinId}`;
  const CACHE_EXPIRY = 600 * 1000; // 1 hour

  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < CACHE_EXPIRY) {
      console.log(`⏳ Using cached details for ${coinId}`);
      return parsed.data;
    }
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}`
    );
    const result = response.data;

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: result })
    );

    return result;
  } catch (error) {
    if (error.response?.status === 429 && cached) {
      console.warn(`Using cached coin details for ${coinId}`);
      return JSON.parse(cached).data;
    }
    throw error;
  }
};

// export const getCoinMarketChart = async (coinId, days) => {
//   const response = await axios.get(
//     `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
//     {
//       params: {
//         vs_currency: "usd",
//         days,
//         interval: "daily",
//       },
//     }
//   );
//   return response.data;
// };
export const getCoinMarketChart = async (coinId, days) => {
  const CACHE_KEY = `coin_chart_${coinId}_${days}`;
  const CACHE_EXPIRY = 600 * 1000; // 1 hour

  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < CACHE_EXPIRY) {
      console.log(`⏳ Using cached chart for ${coinId} (${days}d)`);
      return parsed.data;
    }
  }

  try {
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
    const result = response.data;

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: result })
    );

    return result;
  } catch (error) {
    if (error.response?.status === 429 && cached) {
      console.warn(`⚠️ 429: Using cached chart data for ${coinId} (${days}d)`);
      return JSON.parse(cached).data;
    }
    throw error;
  }
};
