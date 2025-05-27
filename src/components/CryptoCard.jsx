import React from "react";

const CryptoCard = React.memo(({ name, symbol, price, change, iconUrl }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow hover:shadow-lg transition-all ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={iconUrl} alt={name} className="w-8 h-8" />
          <div>
            <p className="font-bold">{name}</p>
            <p className="text-sm text-gray-500 uppercase">{symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{price}</p>
          <p
            className={`text-sm ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}%
          </p>
        </div>
      </div>
    </div>
  );
});
console.log("Rendered:", name);

export default CryptoCard;
