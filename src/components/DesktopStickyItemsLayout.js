export default function DesktopStickyItemsLayout(
  headline,
  blurb,
  linkURL,
  linkBtnText,
  itemsToMap,
  ItemComponent
) {
  return (
    <>
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section content">
            {headline && <h3 className="title">{headline}</h3>}
            {blurb && <p className="subtitle">{blurb}</p>}
            <Link to={linkURL}>
              <button className="button is-outlined is-rounded">
                {linkBtnText}
              </button>
            </Link>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            {itemsToMap?.map(({ node }, index) => (
              <ItemComponent
                key={`mixes-page-#${index}`}
                data={node}
                columnLayout={homeMixesLayout}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
