let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("btn-el");
const deleteBtn = document.getElementById("delete-btn");
const saveBtn = document.getElementById("save-btn");
const ulEl = document.getElementById("ul-el");

// Load saved leads
const leadsFromStorage = JSON.parse(localStorage.getItem("lead"));
if (leadsFromStorage) {
  myLeads = leadsFromStorage;
  render(myLeads);
}

// Save Input (manual URL)
inputBtn.addEventListener("click", function () {
  let url = inputEl.value.trim();
  if (!url) return;

  // Prepend https:// if missing
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    const validatedUrl = new URL(url);
    myLeads.push(validatedUrl.href); // Save clean version
    localStorage.setItem("lead", JSON.stringify(myLeads));
    inputEl.value = "";
    render(myLeads);
  } catch (e) {
    alert("Please enter a valid URL (e.g., example.com or https://example.ai)");
  }
});

// Save current tab (Chrome extension only)
if (saveBtn) {
  saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tabUrl = tabs[0].url;
      myLeads.push(tabUrl);
      localStorage.setItem("lead", JSON.stringify(myLeads));
      render(myLeads);
    });
  });
}

// Delete all leads
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// Render lead list
function render(leads) {
  ulEl.innerHTML = "";
  leads.forEach((lead) => {
    ulEl.innerHTML += `
      <li>
        <a href="${lead}" target="_blank">${lead}</a>
      </li>`;
  });
}
