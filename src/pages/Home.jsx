import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoins } from "../redux/slices/coinsSlice";
import CryptoCard from "../components/CryptoCard";
import { GoSortDesc, GoSearch } from "react-icons/go";
import { CgSortAz, CgSortZa } from "react-icons/cg";

const Home = () => {
  const dispatch = useDispatch();
  const { list: coins, loading, error } = useSelector((state) => state.coins);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });
  const [showInRial, setShowInRial] = useState(false);
  const exchangeRate = 80000;

  useEffect(() => {
    dispatch(fetchCoins());

    const intervalId = setInterval(() => {
      dispatch(fetchCoins());
    }, 50000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const filteredCoins = useMemo(() => {
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

    return results;
  }, [coins, searchTerm, sortConfig]);

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
    <div className="p-4">
      {/* 🔄 لودینگ شناور وقتی دیتا هست */}
      {loading && coins.length > 0 && (
        <div className="fixed top-4 right-4 z-50 text-blue-500 animate-spin text-xl">
          🔄
        </div>
      )}

      {/* 🎛️ سرچ، سوییچ و سورت */}
      <div className="flex flex-wrap gap-2 mb-4">
        <GoSearch className="text-gray-500 dark:text-gray-300 text-xl mt-3" />
        <input
          type="text"
          placeholder="جستجوی ارز..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-white"
        />

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showInRial}
            onChange={() => setShowInRial((prev) => !prev)}
          />
          <div className="w-20 h-8 bg-gray-400 rounded-full relative peer-checked:bg-blue-600 transition-colors">
            <div className="absolute top-1 left-1 w-7 h-6 bg-white rounded-full text-[12px] flex items-center justify-center text-gray-800 transition-all duration-300 peer-checked:translate-x-10">
              {showInRial ? "﷼" : "$"}
            </div>
          </div>
        </label>

        <div className="flex gap-2 w-full sm:w-auto">
          <GoSortDesc className="text-gray-500 dark:text-gray-300 text-xl mt-3" />

          <button
            onClick={() => handleSortClick("price")}
            className="px-4 py-2 rounded-xl bg-blue-500 text-white flex items-center justify-center gap-2"
          >
            قیمت
            {sortConfig.key === "price" &&
              (sortConfig.direction === "asc" ? <CgSortZa /> : <CgSortAz />)}
          </button>

          <button
            onClick={() => handleSortClick("change")}
            className="px-4 py-2 rounded-xl bg-green-500 text-white flex items-center justify-center gap-2"
          >
            تغییرات
            {sortConfig.key === "change" &&
              (sortConfig.direction === "asc" ? <CgSortZa /> : <CgSortAz />)}
          </button>
        </div>
      </div>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* 🧩 گرید کارت‌ها */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && coins.length === 0 ? (
          <p className="text-center col-span-full">در حال بارگذاری...</p>
        ) : (
          filteredCoins.map((coin) => (
            <CryptoCard
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              price={
                showInRial
                  ? (coin.current_price * exchangeRate).toLocaleString() + " ﷼"
                  : coin.current_price.toLocaleString()
              }
              change={coin.price_change_percentage_24h?.toFixed(2)}
              iconUrl={coin.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
