const showCourseControls = () => {
  document.querySelectorAll<HTMLElement>("[data-course-control]").forEach(control => {
    control.hidden = false
  })
}
showCourseControls()
document.addEventListener("nav", showCourseControls)

document.addEventListener("input", event => {
  if (!(event.target instanceof HTMLInputElement)) return
  const form = event.target.form
  if (!form?.matches("[data-course-exercise]")) return
  const status = form.querySelector("output")
  if (status) {
    status.textContent = ""
    status.removeAttribute("data-result")
  }
})

document.addEventListener("submit", event => {
  const form = event.target
  if (!(form instanceof HTMLFormElement) || !form.matches("[data-course-exercise]")) return
  event.preventDefault()
  const status = form.querySelector("output")
  if (!status || !form.reportValidity()) return

  const values = new FormData(form)
  const value = (name: string) => String(values.get(name) ?? "").trim()
  let result: "success" | "retry" | "collision"

  if (form.dataset.courseExercise === "numbering") {
    const ids = ["white-cat", "black-cat", "white-dog"].map(name =>
      value(name).replace(/^0+(?=\d)/, ""),
    )
    result = new Set(ids).size === ids.length ? "success" : "retry"
  } else {
    const [white, black, cat, dog] = ["white", "black", "cat", "dog"].map(value)
    if (white === black || cat === dog) result = "collision"
    else if (value("answer-colour") === black && value("answer-animal") === dog) result = "success"
    else result = "retry"
  }

  status.textContent = form.dataset[result] ?? ""
  status.dataset.result = result
})

document.addEventListener("change", event => {
  const target = event.target
  if (!(target instanceof HTMLInputElement) || target.name !== "comparison-standard") return
  const activity = target.closest("[data-course-score]")
  const results = activity?.querySelector<HTMLElement>("[data-score-results]")
  if (!results) return

  results.querySelectorAll<HTMLElement>("[data-colour-match][data-type-match]").forEach(row => {
    const colour = target.value !== "type" ? Number(row.dataset.colourMatch) : 0
    const type = target.value !== "colour" ? Number(row.dataset.typeMatch) : 0
    const score = colour + type
    const meter = row.querySelector("meter")
    const value = row.querySelector("[data-score-value]")
    if (meter) meter.value = score
    if (value) value.textContent = String(score)
  })
  results.hidden = false
})
