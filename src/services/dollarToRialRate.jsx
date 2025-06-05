// import React, { useEffect, useState } from "react";

// function DollarToRialRate() {
//   const [rate, setRate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRate = async () => {
//       try {
//         const res = await fetch(
//           "https://v6.exchangerate-api.com/v6/59e5610600bcc5b4a75e4c09/latest/USD"
//         );
//         const data = await res.json();
//         if (data && data.conversion_rates && data.conversion_rates.IRR) {
//           setRate(data.conversion_rates.IRR);
//           console.log("dataaaaaaaaaaaaa" + data);
//         } else {
//           throw new Error("IRR not found in response");
//           console.log("ERRRRRRRRRRRRRRRRR");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRate();
//   }, []);

//   if (loading) return <p>در حال بارگذاری نرخ...</p>;
//   if (error) return <p>خطا: {error}</p>;

//   return (
//     <div>
//       <h2>نرخ دلار به ریال</h2>
//       <p>۱ دلار = {rate.toLocaleString()} ریال</p>
//     </div>
//   );
// }

// export default DollarToRialRate;
