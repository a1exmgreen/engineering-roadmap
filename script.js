// =========================================================================
// 1. CONFIG & STORAGE KEYS
// =========================================================================
const FCC_MODULE_KEY = "fcc_tracker_current_module"; // Stores your active fCC module/section

// Grab references to the HTML elements in your Design B header
const statusTextEl = document.getElementById("fcc-status-text");
const syncBtnEl = document.getElementById("fcc-sync-btn");

// =========================================================================
// 2. HELPER: FORMAT & SAVE THE CURRENT MODULE LABEL
// =========================================================================
function setCurrentModule(rawLabel) {
  const cleaned = String(rawLabel || "").trim();
  if (!cleaned) return;

  // Prefix with "fCC: " if the user didn't type it already
  const formatted = cleaned.toLowerCase().startsWith("fcc:")
    ? cleaned
    : `fCC: ${cleaned}`;

  // Update the visible pill text in the header
  statusTextEl.textContent = formatted;

  // Persist in localStorage so it survives page reloads
  localStorage.setItem(FCC_MODULE_KEY, formatted);
}

// =========================================================================
// 3. EVENT LISTENER: UPDATE MODULE ON BUTTON CLICK
// =========================================================================
syncBtnEl.addEventListener("click", () => {
  // Read what's currently displayed (without the leading "fCC: " prefix)
  const currentDisplay = statusTextEl.textContent.replace(/^fCC:\s*/i, "");

  // Ask the user what module/section they are currently working on
  const nextModule = prompt(
    "What freeCodeCamp module or section are you on right now?\n(Example: Responsive Web Design: CSS3)",
    currentDisplay
  );

  // If the user clicks Cancel (null) or leaves it blank, keep the current label
  if (nextModule === null || !nextModule.trim()) return;

  setCurrentModule(nextModule);
});

// =========================================================================
// 4. INITIAL PAGE LOAD
// =========================================================================
// Restore your saved module from localStorage when the page opens
const savedModule = localStorage.getItem(FCC_MODULE_KEY);
if (savedModule) {
  statusTextEl.textContent = savedModule;
} else {
  // Default starting label for your current study stage
  statusTextEl.textContent = "fCC: Responsive Web Design (HTML5 → CSS3)";
}