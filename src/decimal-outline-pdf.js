const asciidoctor = require("asciidoctor")();
const DocumentConverter = require("asciidoctor-pdf/lib/document/document-converter");

// Custom tree processor
asciidoctor.Extensions.register(function () {
  this.treeProcessor(function () {
    this.process(function (document) {
      const orderedLists = document.findBy({ context: "olist" });
      orderedLists.forEach((olist) => {
        const parentSection = olist.getParent();
        if (
          parentSection &&
          parentSection.context === "section" &&
          parentSection.isNumbered()
        ) {
          olist.getItems().forEach((item, index) => {
            item.setAttribute(
              "custom-number",
              `${parentSection.getSectionNumber()}${index + 1}`
            );
          });
        }
      });
    });
  });
});

class CustomConverter {
  constructor() {
    this.baseConverter = new DocumentConverter(); // Instantiate the built-in HTML5 converter
  }

  convert(node, transform) {
    if (node.getNodeName() === "olist") {
      return `<ol>${node
        .getItems()
        .map(
          (item) =>
            `<li data-custom-number="${item.getAttribute(
              "custom-number"
            )}">${item.getText()}</li>`
        )
        .join("")}</ol>`;
    }
    return this.baseConverter.convert(node, transform); // By default call the built-in HTML5 converter
  }
}

// Register the custom converter
asciidoctor.ConverterFactory.register(new CustomConverter(), [
  "custom-web-pdf",
]);
