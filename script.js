document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  const minutesInput = document.getElementById("minutes");
  const addEntryButton = document.getElementById("add-entry");
  const totalMinutesDisplay = document.getElementById("total-minutes");
  const totalHoursDisplay = document.getElementById("total-hours");
  const totalSalaryDisplay = document.getElementById("total-salary");
  const entriesTable = document
    .getElementById("entries-table")
    .getElementsByTagName("tbody")[0];
  let entries = [];

  // Retrieve the saved date from localStorage or set it to today's date
  const storedDate = localStorage.getItem("workedMinutesDate");
  if (storedDate) {
    dateInput.value = storedDate;
  } else {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    dateInput.value = `${year}-${month}-${day}`;
  }

  // Retrieve the saved entries from localStorage
  const storedEntries = localStorage.getItem("workedMinutesEntries");
  if (storedEntries) {
    entries = JSON.parse(storedEntries);
    updateEntriesTable();
    updateTotalMinutesAndHours();
    updateTotalSalary();
  }

  addEntryButton.addEventListener("click", addEntry);

  // Allow pressing "Enter" key to submit the entry
  minutesInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addEntry();
    }
  });

  function addEntry() {
    const date = dateInput.value;
    const minutes = parseInt(minutesInput.value);

    if (!date || isNaN(minutes)) {
      alert("Please enter a valid date and minutes worked.");
      return;
    }

    entries.push({ date, minutes });
    updateEntriesTable();
    updateTotalMinutesAndHours();
    updateTotalSalary();

    // Store the date and entries in localStorage
    localStorage.setItem("workedMinutesDate", date);
    localStorage.setItem("workedMinutesEntries", JSON.stringify(entries));
  }

  function updateEntriesTable() {
    const rows = entries.map((entry) => {
      return `
                <tr>
                    <td>${entry.date}</td>
                    <td>${entry.minutes} minutes</td>
                </tr>
            `;
    });
    entriesTable.innerHTML = rows.join("");
  }

  function updateTotalMinutesAndHours() {
    const totalMinutes = entries.reduce(
      (total, entry) => total + entry.minutes,
      0
    );
    totalMinutesDisplay.textContent = `Total Minutes: ${totalMinutes}`;

    const totalHours = (totalMinutes / 60).toFixed(5);
    totalHoursDisplay.textContent = `Total Hours: ${totalHours}`;
  }

  function updateTotalSalary() {
    const totalMinutes = entries.reduce(
      (total, entry) => total + entry.minutes,
      0
    );
    const totalHours = (totalMinutes / 60).toFixed(5);
    const ratePerHour = 9.95;
    const totalSalary = (totalHours * ratePerHour).toFixed(2);
    totalSalaryDisplay.textContent = `Total Salary (RON): ${totalSalary}`;
  }

  const saveButton = document.getElementById("save-data");
  saveButton.addEventListener("click", saveData);

  function saveData() {
    // Here, you can implement code to save the entered data, such as sending it to a server.
    // In this example, we're only alerting the saved data.
    alert(
      "Data saved:\nTotal Minutes: " +
        totalMinutesDisplay.textContent +
        "\nTotal Hours: " +
        totalHoursDisplay.textContent +
        "\nTotal Salary (RON): " +
        totalSalaryDisplay.textContent
    );
  }

  const resetButton = document.getElementById("reset-data");
  resetButton.addEventListener("click", resetData);

  function resetData() {
    // Clear the entries and remove the date and entries from localStorage
    entries = [];
    updateEntriesTable();
    updateTotalMinutesAndHours();
    updateTotalSalary();
    localStorage.removeItem("workedMinutesDate");
    localStorage.removeItem("workedMinutesEntries");

    // Set the default value of the date input to today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    dateInput.value = `${year}-${month}-${day}`;
  }
});
