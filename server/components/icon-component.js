/**
 * @typedef {{
 *  id: string
 *  width: number
 *  height: number
 * }} TProps
 * */

export function Icon(/** @type {TProps} */ props) {
  const { width, height } = props
  const viewBox = `0 0 ${width} ${height}`
  return (
    <svg
      class={`icon icon-${props.id}`}
      viewBox={viewBox}
      style={`width:${width}px;height:${height}px;`}
    >
      <use href={`static/icons/${props.id}.svg#logo-${props.id}`} />
    </svg>
  )
}
