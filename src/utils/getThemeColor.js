const getThemeColor = () => {
  const theme = typeof window !== "undefined" && window.__theme

  if (theme === "light") return "#fff"
  if (theme === "dark") return "#0e0e10"
}

export default getThemeColor
