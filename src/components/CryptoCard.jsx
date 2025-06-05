import React from "react";

const CryptoCard = React.memo(({ name, symbol, price, change, iconUrl }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow hover:shadow-lg transition-all h-full flex flex-col justify-start">
      {/* Top Row: Logo + Name */}
      <div className="flex items-center gap-3 mb-2">
        <img src={iconUrl} alt={name} className="w-8 h-8 shrink-0" />
        <div className="min-w-0">
          <p className="font-bold">{name}</p>
          <p className="text-sm text-gray-500 uppercase ">{symbol}</p>
        </div>
      </div>

      {/* Price */}
      <p className="text-lg font-semibold mt-2">{price}</p>

      {/* 24h Change */}
      <p
        className={`text-sm mt-1 ${
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
