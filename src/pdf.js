const asciidoctor = require("asciidoctor")();
const DocumentConverter = require("asciidoctor-pdf/lib/document/document-converter");
const {
  decimalOutlineTreeProcessor,
  convertDecimalOutlineNode,
} = require("./decimal-outline");

// Custom tree processor
asciidoctor.Extensions.register(function () {
  this.treeProcessor(function () {
    this.process(decimalOutlineTreeProcessor);
  });
});

// taking from: https://github.com/ggrossetie/asciidoctor-web-pdf/blob/0a27de7423f12fe1f8b5ff7bcb720b786fb63e5b/test/document_convert_test.js#L16-L22
class CustomConverter {
  constructor() {
    this.baseConverter = new DocumentConverter(); // Instantiate the built-in HTML5 converter

    this.baseConverter.titlePage = function (node) {
      if (node.getDocumentTitle()) {
        const doc = node.getDocument();
        if (this.hasTitlePage(doc)) {
          return `<div id="cover" class="title-page front-matter">
    <h1>${node.getDocumentTitle()}</h1>
    <h2>${node
      .getDocument()
      .getAuthors()
      .map((author) => author.getName())
      .join(", ")}</h2>
    <h3>Version ${node.getDocument().getRevisionNumber()}</h3>
    <h3>${node.getDocument().getRevisionDate()}</h3>
  </div>`;
        }
        return `<div class="title-document">
    <h1>${node.getDocumentTitle()}</h1>
  </div>`;
      }
      return "";
    };
  }

  convert(node, transform) {
    if (node.getAttribute("list-type") === "decimal-outline") {
      return convertDecimalOutlineNode(node);
    }
    return this.baseConverter.convert(node, transform); // By default call the built-in HTML5 converter
  }
}

// Register the custom converter
asciidoctor.ConverterFactory.register(new CustomConverter(), [
  "custom-web-pdf",
]);
