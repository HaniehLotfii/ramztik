// src/pages/CoinDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoinDetails } from "../services/api";

const CoinDetails = () => {
  const { id } = useParams(); // گرفتن آیدی از URL
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (error) {
        console.error("خطا در گرفتن اطلاعات ارز:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  if (loading) return <p className="p-4">در حال بارگذاری...</p>;
  if (!coin) return <p className="p-4 text-red-500">ارز پیدا نشد</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>
      <img src={coin.image.large} alt={coin.name} className="w-20 mb-4" />
      <p>قیمت فعلی: ${coin.market_data.current_price.usd.toLocaleString()}</p>
      <p>
        تغییرات 24ساعته:{" "}
        {coin.market_data.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p className="mt-4 text-sm text-gray-600">
        {coin.description.en?.split(". ")[0]}
      </p>
    </div>
  );
};

export default CoinDetails;
