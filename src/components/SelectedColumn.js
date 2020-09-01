import React from "react";
import { database } from "faker";

/**
 * @category Site Elements
 * @subcategory Layout Helper
 * @component
 * @param {Object} props
 * @returns {jsx}
 */
function SelectedColumn({ layoutData, LayoutComponent, isSelected, columnId }) {
  if (isSelected === columnId) {
    return <LayoutComponent data={layoutData} />;
  } else {
    return null;
  }
}

export default SelectedColumn;
