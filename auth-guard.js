const isUnlocked = sessionStorage.getItem("blue-cranes-unlocked") === "true";

if (!isUnlocked) {
  const requestedPath = window.location.pathname + window.location.search + window.location.hash;
  const next = encodeURIComponent(requestedPath);
  window.location.replace("index.html?next=" + next);
}
