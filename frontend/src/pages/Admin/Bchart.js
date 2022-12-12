import React from 'react';
import Chart from "react-apexcharts";
const Bchart = () => {
  return (
    <React.Fragment>
        <div className="container-fluid mb-5">

        <Chart
          type="bar"
          width={380}
          height={300}
          series={[
            {
              name: "Social Media Subscriber",
              data: [6578, 6787, 3245, 9876, 2324, 5123, 2435],
            },
          ]}
          options={{

            xaxis: {
             // tickPlacement: "on",
              categories: [
                "Facebook",
                "Twitter",
                "Linkedin",
                "Instagram",
                "GitHub",
                "Stackoverflow",
                "Youtube",
              ]
            },

            yaxis: {
            //   labels: {
            //     formatter: (val) => {
            //       return `${val}`;
            //     },
            //     style: { fontSize: "15", colors: ["#f90000"] },
            //   },
              title: {
                text: "User In (K)",
                style: { color: "#f90000", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 8,
              },
            },
          }}
        ></Chart>
      </div>
    </React.Fragment>
  )
}

export default Bchart