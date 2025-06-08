import React from "react";

const CryptoCard = React.memo(({ name, symbol, price, change, iconUrl }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-2xl shadow hover:shadow-lg transition-all h-full flex flex-col justify-start items-center text-center">
      {/* Logo */}
      <img
        src={iconUrl}
        alt={name}
        className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 mb-2"
      />

      {/* Symbol → always show → smaller text in mobile */}
      <p className="text-xs sm:text-sm text-gray-500 uppercase mb-1">
        {symbol}
      </p>

      {/* Name → hidden in mobile */}
      <p className="font-bold text-xs sm:text-base hidden sm:block">{name}</p>

      {/* Price → hidden in mobile */}
      <p className="text-sm font-semibold mt-1 hidden sm:block">{price}</p>

      {/* 24h Change → always show */}
      <p
        className={`mt-1 text-xs sm:text-sm font-bold ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}%
      </p>
    </div>
  );
});

console.log("Crypto card Rendered:", name);

export default CryptoCard;
