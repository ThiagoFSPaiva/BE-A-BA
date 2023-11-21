
// import { useEffect, useState } from "react";
// import { MethodsEnum } from "../../../shared/enums/methods.enum";
// import { useRequests } from "../../../shared/hooks/useRequests";
// import { connectionAPIGet } from "../../../shared/functions/connection/connectionAPI";

// export const useStatisticData = () => {

//     const [chartData, setChartData] = useState<any>();
//     const { request } = useRequests();

//     useEffect(() => {
//         connectionAPIGet("http://localhost:5000/consulta_dados/1")
//         .then((response) => {
//             console.log(response)
//         })

//     }, [])

//     console.log(chartData)


//     const charOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 grid: { display: false },
//                 stacked: true
//             },
//             y: { stacked: true }
//         },
//         plugins: {
//             legend: { display: false },
//             title: { display: false }
//         },
//         elements: {
//             bar: {
//                 borderRadius: 10
//             }
//         }
//     };

//     const chartdata3 = {
//         labels: chartData.labels,
//         datasets: chartData.datasets
//     };

//     console.log(chartdata3)

//     return {
//         chartdata3,
//         charOptions
//     }


// }