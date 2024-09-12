"use strict";

const options = document.querySelectorAll(".option");
const mainContainer = document.querySelector(".main-container");
const cardsContainer = document.querySelector(".cards-container");

const apiUrl = "./data.json";

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const titles = [];

    const dailyCurrent = [];
    const dailyPrevious = [];

    const weeklyCurrent = [];
    const weeklyPrevious = [];

    const monthlyCurrent = [];
    const monthlyPrevious = [];

    data.forEach((d) => {
      titles.push(d.title);

      dailyCurrent.push(d.timeframes.daily.current);
      dailyPrevious.push(d.timeframes.daily.previous);

      weeklyCurrent.push(d.timeframes.weekly.current);
      weeklyPrevious.push(d.timeframes.weekly.previous);

      monthlyCurrent.push(d.timeframes.monthly.current);
      monthlyPrevious.push(d.timeframes.monthly.previous);
    });

    const renderView = (activeText) => {
      // Clear previous content
      cardsContainer.innerHTML = "";

      let timeframe;
      let curTime;
      let prevTime;
      let index = 0;

      if (activeText === "Daily") {
        timeframe = "Yesterday";
        curTime = dailyCurrent;
        prevTime = dailyPrevious;
      }
      if (activeText === "Weekly") {
        timeframe = "Last Week";
        curTime = weeklyCurrent;
        prevTime = weeklyPrevious;
      }

      if (activeText === "Monthly") {
        timeframe = "Last Month";
        curTime = monthlyCurrent;
        prevTime = monthlyPrevious;
      }

      titles.forEach((titleEl) => {
        const activitiesEl = document.createElement("section");
        const title = titleEl.replace(/ /g, "-");
        activitiesEl.classList.add("activities");
        activitiesEl.classList.add(title.toLowerCase());
        const formattedTitle = title.toLowerCase().replace(/ /g, "-");

        const currentHours = curTime[index];
        const previousHours = prevTime[index];

        const html = `
        <div class="color-container">
          <img src="./images/icon-${formattedTitle}.svg" alt="" class="icon" />
          <div class="activities-container">
              <div class="container">
              <p class="activitiy-name">${title}</p>
              <img
                  class="show-more"
                  src="./images/icon-ellipsis.svg"
                  alt="tree dots"
              />
              </div>
              <div class="container">
              <span class="activitiy-current">${currentHours}hrs</span>
              <div class="activitiy-previous">
                  <p class="previous-type">${timeframe}</p>
                  <span class="hyphen">&nbsp;-&nbsp;</span>
                  <p class="previous-time">${previousHours}hrs</p>
              </div>
              </div>
          </div>
          </div>
        `;
        activitiesEl.innerHTML = html;
        index++;
        cardsContainer.appendChild(activitiesEl);
      });
    };

    renderView("Weekly");

    options.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        // Remove the active class from all options
        options.forEach((option) => option.classList.remove("active"));

        // Add the active class for the clicked option
        e.target.classList.add("active");

        // Render selected view
        renderView(e.target.textContent);
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchData();
