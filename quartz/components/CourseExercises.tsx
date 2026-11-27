import { QuartzComponent } from "./types"
// @ts-ignore
import exercises from "./scripts/course-exercises.inline"

export const CourseExercises: QuartzComponent = () => null
CourseExercises.afterDOMLoaded = exercises
CourseExercises.css = `
.course-exercise,
.course-flow {
  --course-border: color-mix(in srgb, var(--secondary) 32%, var(--lightgray));
  --course-surface: color-mix(in srgb, var(--tertiary) 10%, var(--light));
  color: var(--dark);
  background: var(--course-surface);
  border: 1px solid var(--course-border);
  border-radius: 1rem;
  padding: clamp(.7rem, 3vw, 1.25rem);
  margin: 1.25rem 0;
}

.course-exercise[hidden],
.course-exercise [hidden] {
  display: none !important;
}

.course-photo-gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(.35rem, 2vw, .9rem);
}

.course-photo-gallery figure {
  margin: 0;
  overflow: hidden;
  background: var(--light);
  border: 1px solid var(--course-border);
  border-radius: .75rem;
}

.course-photo-gallery img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  margin: 0;
  border-radius: 0;
  background: #fff;
  content-visibility: visible;
}

.course-photo-gallery figcaption {
  padding: .35rem .4rem;
  text-align: center;
  line-height: 1.45;
  font-weight: 650;
}

.course-photo-gallery label {
  display: grid;
  gap: .2rem;
  margin: .4rem auto .2rem;
  max-width: 4.5rem;
  font-size: .82rem;
  font-weight: 400;
}

.course-exercise input {
  box-sizing: border-box;
  width: 100%;
  min-height: 2.75rem;
  border: 1px solid var(--secondary);
  border-radius: .5rem;
  background: var(--light);
  color: var(--dark);
  font: inherit;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.course-exercise button {
  min-height: 2.75rem;
  padding: .35rem .85rem;
  background: var(--secondary);
  color: var(--light);
  font: inherit;
  font-weight: 650;
  border: 0;
  border-radius: .55rem;
  cursor: pointer;
}

.course-exercise :is(button, input):focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 3px;
}

.course-exercise .course-check {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: .5rem .9rem;
  margin-top: 1rem;
}

.course-exercise output {
  font-size: .95rem;
  font-weight: 600;
}

.course-exercise output[data-result="success"] {
  color: var(--secondary);
}

.course-code-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
  gap: .6rem;
}

.course-code-fields fieldset {
  border: 1px solid var(--course-border);
  border-radius: .6rem;
  min-width: 0;
  margin: 0;
  padding: .55rem;
}

.course-code-fields label {
  display: flex;
  gap: .4rem;
  align-items: center;
  justify-content: space-between;
  margin: .25rem 0;
}

.course-code-fields input {
  flex: 0 0 2.55rem;
}

.course-flow {
  list-style-position: inside;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 7rem), 1fr));
  gap: .55rem;
}

.course-flow li {
  padding: .6rem;
  background: var(--light);
  border: 1px solid var(--course-border);
  border-radius: .6rem;
}

.course-flow strong {
  color: var(--secondary);
}

.course-flow span {
  display: block;
  margin-top: .25rem;
  font-size: .86rem;
  line-height: 1.5;
}
`
