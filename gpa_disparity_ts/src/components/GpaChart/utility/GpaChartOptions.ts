const footer = (tooltipItems: any) => {
  // tooltipItems.forEach(function(tooltipItem: any) {
  //   sum += tooltipItem.parsed.y;
  // });
  let subject: string = tooltipItems[0].label.split(" ")[0];
  let num: string = tooltipItems[0].label.split(" ")[1];
  return `courseinfo/${subject}/${num}`;
  // return "label" + Object.getOwnPropertyNames(tooltipItems[0].parsed);
};

export const options = {
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
    },
  },
};
