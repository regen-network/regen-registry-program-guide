const asciidoctor = require("asciidoctor")();
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

class CustomConverter {
  constructor() {
    this.baseConverter = asciidoctor.Html5Converter.$new(); // Instantiate the built-in HTML5 converter
  }

  convert(node, transform) {
    if (node.getAttribute("list-type") === "decimal-outline") {
      return convertDecimalOutlineNode(node);
    }
    return this.baseConverter.convert(node, transform); // By default call the built-in HTML5 converter
  }
}

// Register the custom converter
asciidoctor.ConverterFactory.register(new CustomConverter(), ["html5"]);
