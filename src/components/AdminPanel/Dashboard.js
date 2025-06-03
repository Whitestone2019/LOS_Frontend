import React from "react";
// import { useNavigate } from "react-router-dom";
// import "tailwindcss/tailwind.css";

// import { IoBarChartOutline, IoBagCheck } from "react-icons/io5";
// import { LuClock } from "react-icons/lu";


import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";



// const DashboardSummary = () => (
//   <div className="grid lg:grid-cols-3 md:grid-flow-row w-full gap-6 mt-6">
//     {[
//       { icon: IoBarChartOutline, label: "Daily Call Accomplished", value: "$53,00989", bgColor: "#D398E7" },
//       { icon: IoBagCheck, label: "Customer Transactions Completed", value: "95 / 100", bgColor: "#E89271" },
//       { icon: LuClock, label: "Customer Service FAQs", value: "1022 / 1300 Hrs", bgColor: "#70A1E5" }
//     ].map(({ icon: Icon, label, value, bgColor }, index) => (
//       <div key={index} className="bg-white p-6 rounded-lg shadow">
//         <div className={`mb-3 w-fit rounded-full p-3`} style={{ background: bgColor }}>
//           <Icon className="text-slate-50 text-2xl" />
//         </div>
//         <h3 className="text-sm text-gray-600">{label}</h3>
//         <p className="text-3xl font-bold my-1">{value}</p>
//       </div>
//     ))}
//   </div>
// );

// const CalendarSection = () => {
//   const [date, setDate] = useState([new Date(), new Date()]);
//   return (
//     <div className="flex justify-center items-center">
//       <div className="flex-1 w-full bg-white p-4 rounded-lg shadow">
//         <h2 className="text-lg font-bold mb-4">Calls Overview</h2>
//         <div className="flex items-center justify-center lg:p-0">
//         <Calendar
//           onChange={setDate}
//           value={date}
//           selectRange={true}
//           className="custom-calendar items-center"
//         />
//         </div>
//         <div className="mt-6 text-center">
//           <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#8204FF60]">
//             Show call list (
//             {date[0].toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} -
//             {date[1].toLocaleDateString("en-IN", { day: "2-digit", month: "short" })})
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CallSummary = ({ data }) => {
//   const navigate = useNavigate();
//   const callData = data?.excelData || [];

//   console.log(data);

//   const handleClick = (call) => {
//     console.log("Call Data:", call);
//     if (!call) return;
//     navigate('/viewIDdetails', { state: call });
//   };

//   if (!Array.isArray(callData) || callData.length === 0) {
//     return <p className="text-gray-500">Loading call summary...</p>;
//   }

//   return (
//     <div className="lg:flex-1 bg-white py-4 rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4 px-5 ">Call Summary</h2>
//       <div className="overflow-auto scrollbar-thin max-h-[350px] md:max-h-[420px] lg:overflow-x-hidden">
//         <table className="min-w-full lg:text-base text-lg text-left">
//           <thead className="sticky top-0 bg-white">
//             <tr className="border-b">
//               <th className="py-2 px-4">Call ID</th>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Number</th>
//               <th className="py-2 px-4">Date</th>
//               <th className="py-2 px-4">Time</th>
//               <th className="py-2 px-4">Overall Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {callData.map((call, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-100 cursor-pointer lg:text-sm text-lg "
//                 onClick={() => handleClick(call)}
//               >
//                 <td className="py-2 px-4  whitespace-nowrap rounded-l-2xl">{call.Call_ID ? call.Call_ID : <span className="text-red-800">No Call ID</span>}</td>
//                 <td className="py-2 px-4 whitespace-nowrap">{call.Name ? call.Name : <span className="text-red-800">No Name</span>}</td>
//                 <td className="py-2 px-4 whitespace-nowrap">+91 455625464</td>
//                 <td className="py-2 px-4 whitespace-nowrap">
//                   {call.Date ? new Intl.DateTimeFormat("en-US", {
//                       month: "long",
//                       day: "numeric",
//                       year: "numeric",
//                     }).format(new Date(call.Date))
//                   : <span className="text-red-800">Invalid Date</span>}
//                 </td>
//                 <td className="py-2 px-4 whitespace-nowrap">{call.Time ? call.Time : <span className="text-red-800">No Time</span>}</td>
//                 <td className="py-2 px-4 whitespace-nowrap rounded-r-2xl">
//                   <div className="flex justify-center items-center">
//                     <div className="w-16 h-16">
//                       <DashboardOverAllGraph data={call} />
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const ProductRecommendations = () => {
//   const products = [
//     {
//       name: "Apple Watch",
//       image: ProductImg,
//       location: "6096 Marjolaine Landing",
//       date: "12.02.2025",
//       time: "12:53 PM",
//       status: "Delivered",
//     },
//     {
//       name: "Apple Watch",
//       image: ProductImg,
//       location: "6096 Marjolaine Landing",
//       date: "12.09.2019",
//       time: "12:53 PM",
//       status: "Pending",
//     },
//     {
//       name: "Apple Watch",
//       image: ProductImg,
//       location: "6096 Marjolaine Landing",
//       date: "12.09.2019",
//       time: "12:53 PM",
//       status: "Rejected",
//     },
//   ];

//   return (
//     <div className="lg:flex-1 bg-white p-4 rounded-xl shadow mt-6">
//       <h2 className="lg:text-xl font-bold mb-4 md:text-4xl md:py-6 md:px-3 lg:p-2">Product Recommendations</h2>
//       <div className="overflow-x-auto w-full">
//         <table className="lg:min-w-full md:min-w-[1500px] lg:text-sm md:text-3xl text-left">
//           <thead>
//             <tr className="border-b">
//               <th className="py-2 px-4">Product Name</th>
//               <th className="py-2 px-4">Location</th>
//               <th className="py-2 px-4">Date - Time</th>
//               <th className="py-2 px-4">Piece</th>
//               <th className="py-2 px-4">Amount</th>
//               <th className="py-2 px-4">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((product, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-100 z-10 rounded-3xl border-b cursor-pointer lg:text-sm md:text-3xl"
//               >
//                 <td className="lg:py-4 md:py-16 px-4 flex items-center">
//                   <div className="w-9 h-8">
//                     <img src={product.image} alt="Product" />
//                   </div>
//                   <span className="ml-2">{product.name}</span>
//                 </td>
//                 <td className="lg:py-6 px-4 md:py-12">{product.location}</td>
//                 <td className="py-2 px-4">
//                   {product.date} - {product.time}
//                 </td>
//                 <td className="py-2 px-4">{product.piece}</td>
//                 <td className="py-2 px-4">{product.amount}</td>
//                 <td className="py-2 px-4">
//                   <span
//                     className={`px-3 py-1 rounded-full text-white ${
//                       product.status === "Delivered"
//                         ? "bg-green-500"
//                         : product.status === "Pending"
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     }`}
//                   >
//                     {product.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };


const Dashboard = () => (
  <div className="lg:flex md:block font-inter">
  <div className="h-screen hidden lg:block fixed z-20">
    <DashboardSidebar />
  </div>
    <main className="flex-1 lg:ml-72 bg-transparent">
      <DashboardHead />


      <div className="flex-1 p-4 mt-4 ">
        {/* <h1 className="text-3xl font-bold">Welcome, <span className="text-[#8204FF]">Shariq Shaikh</span></h1>
        <p className="text-base text-gray-700 font-semibold">View progress and insights</p>
        <DashboardSummary />
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <CallSummary data={excelData} />
          <CalendarSection />
        </div>
        <ProductRecommendations /> */}
      </div>
    </main>
  </div>
);

export default Dashboard;