const decimalOutlineTreeProcessor = function (document) {
  const orderedLists = document.findBy({ context: "olist" });
  orderedLists.forEach((olist) => {
    const parentSection = olist.getParent();
    if (
      parentSection &&
      parentSection.context === "section" &&
      parentSection.isNumbered()
    ) {
      olist.setAttribute("list-type", "decimal-outline");
      olist.getItems().forEach((item, index) => {
        item.setAttribute(
          "custom-number",
          `${parentSection.getSectionNumber()}${index + 1}`
        );
      });
    }
  });
};

const convertDecimalOutlineNode = function (node) {
  return `<ol class="decimal-outline">${node
    .getItems()
    .map(
      (item) =>
        `<li data-custom-number="${item.getAttribute(
          "custom-number"
        )}"><p>${item.getText()}</p>${item.getContent()}</li>`
    )
    .join("")}</ol>`;
};

module.exports = {
  decimalOutlineTreeProcessor,
  convertDecimalOutlineNode,
};
