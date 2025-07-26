import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getCoinDetails, getCoinMarketChart } from "../services/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import descriptionsFa from "../data/coin_descriptions_fa.json";
import { FaFacebookF, FaRedditAlien, FaGithub, FaGlobe } from "react-icons/fa";
import { FaXTwitter, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import useBookmarks from "../hooks/useBookmarks";
import PersianNumber from "../components/PersianNumber.jsx";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [selectedDays, setSelectedDays] = useState(30);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const exchangeRate = 800000;

  const timeFrames = [
    { label: "۱ هفته", value: 7 },
    { label: "۱ ماه", value: 30 },
    { label: "۶ ماه", value: 180 },
    { label: "۱ سال", value: 365 },
  ];

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (error) {
        console.error("خطا در گرفتن اطلاعات ارز:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await getCoinMarketChart(id, selectedDays);
        setChartData(data.prices);
      } catch (error) {
        console.error("خطا در گرفتن دیتای نمودار:", error);
      }
    };

    fetchChartData();
  }, [id, selectedDays]);

  // جلوگیری از رندر بی‌نهایت
  const chartConfig = useMemo(() => {
    if (!chartData) return null;

    return {
      labels: chartData.map((item) => {
        const date = new Date(item[0]);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          label: "(USDT)",
          data: chartData.map((item) => item[1]),
          borderColor: "#10B981",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };
  }, [chartData]);

  if (loading)
    return (
      <p className="p-4 flex items-center justify-center text-blue-500 animate-spin text-2xl">
        ⏳
      </p>
    );
  if (!coin) return <p className="p-4 text-red-500">ارز پیدا نشد</p>;

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row items-center justify-center mb-1 gap-4 text-center sm:text-left opacity-0 animate-fade-in">
        <img src={coin.image.large} alt={coin.name} className="w-16 sm:w-20" />
        <div>
          <h1 className="text-2xl font-bold">{coin.name}</h1>
          <p className="text-lg text-gray-500">({coin.symbol.toUpperCase()})</p>
        </div>
      </div>

      <button
        onClick={() => toggleBookmark(coin.id)}
        className="ml-4 mb-2 px-3 py-2 bg-gray-200 border rounded-lg text-cyan-700  hover:bg-cyan-50 dark:text-cyan-700 transition-colors flex items-center gap-2"
      >
        {isBookmarked(coin.id) ? (
          <>
            <FaBookmark className="text-lg" />
          </>
        ) : (
          <>
            <FaRegBookmark className="text-lg" />
          </>
        )}
      </button>

      <div>
        <div className="flex border-b-2 mb-4 justify-center">
          <button
            onClick={() => setActiveTab("info")}
            className={`rounded-t-lg px-4 py-2 text-xs font-medium m-1 mb-0 ${
              activeTab === "info"
                ? "border-b-2 text-cyan-700 dark:text-cyan-600"
                : "text-gray-500"
            }`}
          >
            اطلاعات بازار
          </button>
          <button
            onClick={() => setActiveTab("chart")}
            className={`rounded-t-lg px-4 py-2 text-sm font-medium m-1 mb-0 ${
              activeTab === "chart"
                ? "border-b-2  text-cyan-700 dark:text-cyan-600"
                : "text-gray-500"
            }`}
          >
            چارت
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`rounded-t-lg px-4 py-2 text-sm font-medium m-1 mb-0 ${
              activeTab === "about"
                ? "border-b-2 text-cyan-700 dark:text-cyan-600"
                : "text-gray-500"
            }`}
          >
            توضیحات
          </button>
        </div>

        <div>
          <div
            className={`transition-opacity duration-500 ${
              activeTab === "info" ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeTab === "info" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* قیمت فعلی */}
                <div className="p-2 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02] h-full">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">
                    قیمت فعلی (USDT)
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    $
                    <PersianNumber>
                      {coin.market_data.current_price.usd.toLocaleString()}
                    </PersianNumber>
                  </div>
                </div>

                {/* قیمت به ریال */}
                <div className="p-2 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02] h-full">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">
                    قیمت ریالی
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    <PersianNumber>
                      {(
                        coin.market_data.current_price.usd * exchangeRate
                      ).toLocaleString()}
                    </PersianNumber>
                    ﷼
                  </div>
                </div>

                {/* تغییرات ۲۴ ساعت اخیر */}
                <div className="p-2 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02] h-full">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">
                    تغییر ارزش ۲۴ ساعت اخیر
                  </div>
                  <div
                    className={`text-lg sm:text-xl font-bold ${
                      coin.market_data.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <div className="flex justify-center">
                      <div>
                        <PersianNumber>
                          {Math.abs(
                            coin.market_data.price_change_percentage_24h
                          ).toFixed(2)}
                        </PersianNumber>
                      </div>
                      <div>%</div>
                    </div>
                  </div>
                </div>

                {/* مارکت کپ */}
                <div className="p-2 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02] h-full">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">
                    ارزش بازار جهانی
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    $
                    <PersianNumber>
                      {coin.market_data.market_cap.usd.toLocaleString()}
                    </PersianNumber>
                  </div>
                </div>

                {/* مارکت کپ رنک */}
                <div className="p-2 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02] h-full">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">
                    رتبه بازار
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    #<PersianNumber>{coin.market_cap_rank}</PersianNumber>
                  </div>
                </div>

                {/* حجم معاملات */}
                <div className="p-2 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02] h-full">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">
                    حجم معاملات ۲۴ ساعت اخیر
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    $
                    <PersianNumber>
                      {coin.market_data.total_volume.usd.toLocaleString()}
                    </PersianNumber>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`transition-opacity duration-500 ${
              activeTab === "chart" ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeTab === "chart" && (
              <div>
                {/* نمودار قیمت */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-2">
                    نمودار قیمت {coin.name}
                  </h2>
                  {/* انتخاب تایم فریم */}
                  <div className="flex gap-2 mb-4 ">
                    {timeFrames.map((frame) => (
                      <button
                        key={frame.value}
                        onClick={() => setSelectedDays(frame.value)}
                        className={`px-4 py-2 rounded-lg bg-gray-200 ${
                          selectedDays === frame.value
                            ? " text-cyan-600 border-cyan-600 dark:text-cyan-600"
                            : "text-gray-500 dark:bg-gray-700 dark:text-gray-500"
                        }`}
                      >
                        {frame.label}
                      </button>
                    ))}
                  </div>{" "}
                  {/* نمودار */}
                  {chartConfig ? (
                    <div className="h-[400px]">
                      <Line
                        data={chartConfig}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: {
                              grid: {
                                color: "#38BDF8",
                              },
                              ticks: {
                                color: "#38BDF8",
                              },
                            },
                            y: {
                              grid: {
                                color: "#38BDF8",
                              },
                              ticks: {
                                color: "#38BDF8",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <p className="p-4 flex items-center justify-center text-blue-500 animate-spin text-2xl">
                      ⏳
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className={`transition-opacity duration-500 ${
              activeTab === "about" ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeTab === "about" && (
              <div>
                {/* اطلاعات بیشتر */}
                <div className="mt-8 ">
                  <h2 className="text-xl font-bold mb-2 text-right">
                    {coin.name} چیست؟
                  </h2>

                  {/* توضیحات */}

                  <div className="relative bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    <div
                      className={`transition-all duration-300 ${
                        showFullDescription
                          ? "max-h-full"
                          : "max-h-[80px] overflow-hidden"
                      }`}
                    >
                      {descriptionsFa[coin.id]
                        ? descriptionsFa[coin.id]
                        : coin.description.en
                        ? coin.description.en
                        : "توضیحی موجود نیست."}
                    </div>

                    {/* Fade gradient */}
                    {((descriptionsFa[coin.id] &&
                      descriptionsFa[coin.id].length > 400) ||
                      (coin.description.en &&
                        coin.description.en.length > 400)) &&
                      !showFullDescription && (
                        <div className="absolute bottom-10 left-0 w-full h-16 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-transparent pointer-events-none"></div>
                      )}

                    {/* More / Less button */}
                    {((descriptionsFa[coin.id] &&
                      descriptionsFa[coin.id].length > 400) ||
                      (coin.description.en &&
                        coin.description.en.length > 400)) && (
                      <div className="mt-4 text-center">
                        <span
                          onClick={() =>
                            setShowFullDescription((prev) => !prev)
                          }
                          className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer font-medium transition-colors duration-200"
                          role="button"
                        >
                          {showFullDescription ? "نمایش کمتر" : "نمایش بیشتر"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center mt-6">
                    {/* وبسایت رسمی */}
                    {coin.links.homepage[0] && (
                      <a
                        href={coin.links.homepage[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center w-16 text-center text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <FaGlobe className="text-2xl mb-1" />
                        <span className="text-xs font-medium">وبسایت</span>
                      </a>
                    )}

                    {/* Twitter */}
                    {coin.links.twitter_screen_name && (
                      <a
                        href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center w-16 text-center text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <FaXTwitter className="text-2xl mb-1" />
                        <span className="text-xs font-medium">X</span>
                      </a>
                    )}

                    {/* Facebook */}
                    {coin.links.facebook_username && (
                      <a
                        href={`https://facebook.com/${coin.links.facebook_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center w-16 text-center text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <FaFacebookF className="text-2xl mb-1" />
                        <span className="text-xs font-medium">Facebook</span>
                      </a>
                    )}

                    {/* Reddit */}
                    {coin.links.subreddit_url && (
                      <a
                        href={coin.links.subreddit_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center w-16 text-center text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <FaRedditAlien className="text-2xl mb-1" />
                        <span className="text-xs font-medium">Reddit</span>
                      </a>
                    )}

                    {/* Github */}
                    {coin.links.repos_url.github[0] && (
                      <a
                        href={coin.links.repos_url.github[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center w-16 text-center text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <FaGithub className="text-2xl mb-1" />
                        <span className="text-xs font-medium">Github</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
