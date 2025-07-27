import { useSelector } from "react-redux";
import useBookmarks from "../hooks/useBookmarks";
import CryptoCard from "../components/CryptoCard";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa6";

const Bookmarks = () => {
  const { bookmarkedCoins } = useBookmarks();
  const coins = useSelector((state) => state.coins.list);

  const bookmarkedList = coins.filter((coin) =>
    bookmarkedCoins.includes(coin.id)
  );

  return (
    <div>
      <h2 className="flex items-center text-2xl font-bold mb-4 gap-2 text-cyan-800">
        <FaBookmark />
        ارزهای من
      </h2>

      {bookmarkedList.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          فعلاً ارزی بوکمارک نشده است.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bookmarkedList.map((coin) => (
            <Link to={`/coin/${coin.id}`} key={coin.id}>
              <CryptoCard
                name={coin.name}
                symbol={coin.symbol}
                price={"$" + coin.current_price.toLocaleString()}
                change={coin.price_change_percentage_24h?.toFixed(2)}
                iconUrl={coin.image}
                coinId={coin.id}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
