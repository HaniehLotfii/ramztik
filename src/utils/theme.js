export const setHtmlTheme = (theme) => {
  const html = document.documentElement;

  if (theme === "dark") {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};
