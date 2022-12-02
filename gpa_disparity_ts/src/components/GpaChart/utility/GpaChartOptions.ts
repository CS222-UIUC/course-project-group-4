import {
  Chart as ChartJS,
} from "chart.js";
import { useNavigate } from "react-router-dom";

const footer = (tooltipItems: any) => {
  // tooltipItems.forEach(function(tooltipItem: any) {
  //   sum += tooltipItem.parsed.y;
  // });
  let subject: string = tooltipItems[0].label.split(" ")[0];
  let num: string = tooltipItems[0].label.split(" ")[1];
  console.log(tooltipItems[0])
  // return `courseinfo/${subject}/${num}`;
  return `GPA: ${tooltipItems[0].parsed.x.toPrecision(3)}\n` + 
          `Percent 4.0: ${tooltipItems[0].parsed.y.toPrecision(3)}`;
  // return "label" + Object.getOwnPropertyNames(tooltipItems[0].parsed);
};

const ClickHandler = (e: any) => {
  //placeholder
}
export const options = {
  maintainAspectRatio: true,
  scales: {
    y: {
      ticks: {
        font: {
          size: 15,
        },
      },
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: "Percentage of 4.0 GPAs",
      },
      //title: 'Percentage of 4.0 GPAs'
      //   beginAtZero: true,
    },
    x: {
      ticks: {
        font: {
          size: 15,
        },
      },
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: "GPA",
      },
      //   beginAtZero: true,
    },
  },
  responsive: true,
  plugins: {
    title: {
      font: {
        size: 30,
      },
      display: true,
      text: "GPA Information",
      size: 30,
    },
    tooltip: {
      callbacks: {
        //specific labels for hover-over here, yet to be implemented
        //context throwing error for some reason
        footer: footer,
      },
    }
  },
  onClick: ClickHandler
};

