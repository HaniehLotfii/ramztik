import { useState, useEffect } from "react";

const useBookmarks = () => {
  const [bookmarkedCoins, setBookmarkedCoins] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarkedCoins")) || [];
    setBookmarkedCoins(stored);
  }, []);

  const toggleBookmark = (coinId) => {
    const updated = bookmarkedCoins.includes(coinId)
      ? bookmarkedCoins.filter((id) => id !== coinId)
      : [...bookmarkedCoins, coinId];

    setBookmarkedCoins(updated);
    localStorage.setItem("bookmarkedCoins", JSON.stringify(updated));
  };

  const isBookmarked = (coinId) => bookmarkedCoins.includes(coinId);

  return { bookmarkedCoins, toggleBookmark, isBookmarked };
};

export default useBookmarks;
