const footer = (tooltipItems: any) => {
  let subject: string = tooltipItems[0].label.split(" ")[0];
  let num: string = tooltipItems[0].label.split(" ")[1];

  return (
    `GPA: ${tooltipItems[0].parsed.x.toPrecision(3)}\n` +
    `Percent 4.0: ${tooltipItems[0].parsed.y.toPrecision(3)}\n` +
    `Average Class Size: ${Math.round(
      tooltipItems[0].dataset.data[0].class_size
    )}`
  );
};

const ClickHandler = (e: any) => {
  //placeholder
};
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
        label: function (context: any) {
          return context.label;
        },
        footer: footer,
      },
    },
  },
  onClick: ClickHandler,
};
