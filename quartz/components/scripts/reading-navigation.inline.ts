// Keep the reading outline available without displacing the article on small screens.
const mobileReadingViewport = window.matchMedia("(max-width: 800px)")
const positionReadingOutline = () => {
  const outline = document.querySelector<HTMLDetailsElement>(".reading-outline")
  if (outline) outline.open = !mobileReadingViewport.matches
}
document.addEventListener("nav", positionReadingOutline)
mobileReadingViewport.addEventListener("change", positionReadingOutline)
