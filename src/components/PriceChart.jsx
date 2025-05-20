import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PriceChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Price (USD)',
        data: data.map(item => item.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: '#374151' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: '#374151' }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-4">Price Movement Chart</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default PriceChart;
