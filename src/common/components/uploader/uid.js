const now = +(new Date())
let index = 0

export default function uid() {
  return `cms-upload-${now}-${++index}`
}
