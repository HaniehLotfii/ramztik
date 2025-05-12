import { useEffect, useState } from "react";
import CryptoCard from "../components/CryptoCard";
import { getMarketData } from "../services/api";
import { FiArrowUp, FiArrowDown, FiFilter } from "react-icons/fi";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMarketData();
      setCoins(data);
      setFilteredCoins(data);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 50000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let results = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      results.sort((a, b) => {
        const key =
          sortConfig.key === "price"
            ? "current_price"
            : "price_change_percentage_24h";
        const dir = sortConfig.direction === "asc" ? 1 : -1;
        return (a[key] - b[key]) * dir;
      });
    }

    setFilteredCoins(results);
  }, [searchTerm, coins, sortConfig]);

  const handleSortClick = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      } else {
        return {
          key,
          direction: "desc",
        };
      }
    });
  };

  return (
    <div className="p-4 ">
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="جستجوی ارز..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-white"
        />

        <div className="flex gap-2 w-full sm:w-auto">
          <FiFilter className="text-gray-500 dark:text-gray-300 text-xl mt-3"></FiFilter>

          <button
            onClick={() => handleSortClick("price")}
            className="px-4 py-2 rounded-xl bg-blue-500 text-white flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            قیمت
            {sortConfig.key === "price" &&
              (sortConfig.direction === "asc" ? (
                <FiArrowUp />
              ) : (
                <FiArrowDown />
              ))}
          </button>

          <button
            onClick={() => handleSortClick("change")}
            className="px-4 py-2 rounded-xl bg-green-500 text-white flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            تغییرات
            {sortConfig.key === "change" &&
              (sortConfig.direction === "asc" ? (
                <FiArrowUp />
              ) : (
                <FiArrowDown />
              ))}
          </button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCoins.map((coin) => (
          <CryptoCard
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price.toLocaleString()}
            change={coin.price_change_percentage_24h?.toFixed(2)}
            iconUrl={coin.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
