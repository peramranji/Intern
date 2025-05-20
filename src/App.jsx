import React, { useEffect, useState } from 'react';
import Dropdown from './components/Dropdown';
import CryptoInfo from './components/CryptoInfo';
import PriceList from './components/PriceList';
import PriceChart from './components/PriceChart';
import axios from 'axios';

const CRYPTO_OPTIONS = [
  { label: 'Bitcoin (BTC)', value: 'bitcoin' },
  { label: 'Ethereum (ETH)', value: 'ethereum' },
  { label: 'Ripple (XRP)', value: 'ripple' },
  { label: 'Litecoin (LTC)', value: 'litecoin' },
  { label: 'Cardano (ADA)', value: 'cardano' },
  { label: 'Solana (SOL)', value: 'solana' },
  { label: 'Polkadot (DOT)', value: 'polkadot' },
  { label: 'Dogecoin (DOGE)', value: 'dogecoin' },
  { label: 'Avalanche (AVAX)', value: 'avalanche' },
  { label: 'Binance Coin (BNB)', value: 'binancecoin' },
];

const App = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCryptoData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const [infoRes, chartRes] = await Promise.all([
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
          params: { vs_currency: 'usd', days: 7 },
        })
      ]);
      setCryptoData(infoRes.data);
      setChartData(chartRes.data.prices.map(p => ({ date: new Date(p[0]).toLocaleDateString(), price: p[1] })));
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData(selectedCrypto.value);
  }, [selectedCrypto]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Crypto Asset Dashboard
        </h1>
        <Dropdown options={CRYPTO_OPTIONS} selected={selectedCrypto} setSelected={setSelectedCrypto} />
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : cryptoData ? (
          <>
            <CryptoInfo data={cryptoData} />
            <PriceChart data={chartData} />
            <PriceList data={chartData} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default App;
