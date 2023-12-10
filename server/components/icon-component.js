/**
 * @typedef {{
 *  id: string
 *  width: number
 *  height: number
 * }} TProps
 * */

export function Icon(/** @type {TProps} */ props) {
  const { width, height } = props
  return (
    <svg
      class={`icon icon-${props.id}`}
      viewBox="0 0 24 24"
      style={`width:${width * 2}px;height:${height * 2}px;`}
    >
      <use href={`static/icons/${props.id}.svg#icon-${props.id}`} />
    </svg>
  )
}
