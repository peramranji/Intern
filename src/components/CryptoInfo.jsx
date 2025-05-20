import React from 'react';

const formatCurrency = val => `$${val.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
const formatPercent = val => `${val.toFixed(2)}%`;

const CryptoInfo = ({ data }) => {
  const change = data.market_data.price_change_percentage_24h;
  const isPositive = change >= 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow space-y-4">
      <div className="flex items-center gap-4">
        <img src={data.image.small} alt={data.name} className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-gray-400">{data.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Current Price</p>
          <p className="text-xl font-semibold">{formatCurrency(data.market_data.current_price.usd)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">24h Volume</p>
          <p className="text-xl font-semibold">{formatCurrency(data.market_data.total_volume.usd)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Market Cap</p>
          <p className="text-xl font-semibold">{formatCurrency(data.market_data.market_cap.usd)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">24h Change</p>
          <p className={`text-xl font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{formatPercent(change)}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoInfo;

