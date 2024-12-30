/* # Motivation
- Many algorithms can be decomposed into higher- and lower- level parts
- Making tea can be decomposed into
    - The process of making a hot beverage (boil water, pour into cup)
    - Tea-specific things (put teabag into water)
- The high-level algorithm can then be reused for making coffee or hot chocolate
    - Supported by beverage-specific strategies
*/

/*
  Strategy: System behavior partially specified at runtime

  Enables the exact behavior of a system to be selected at run-time

  Summary:
  - Define an algorithm at a high level
  - Define the interface you expect each strategy to follow
  - Provide for dynamic composition of strategies in the resulting object
 */

// ==================Code==========================
// Skeleton algorithm similar to the template

// HTML: <ul><li>hello</li><ul>
/* 
Markdown:
 - hello
 */

const OutputFormat = Object.freeze({
  Markdown: 0,
  Html: 1
});

class ListStrategy {
  constructor(parameters) {

  }

  start(buffer) { }
  end(buffer) { }
  addListItem(buffer, item) { }
}

class MarkdownListStrategy extends ListStrategy {
  constructor() {
    super();
  }

  addListItem(buffer, item) {
    buffer.push(` * ${item}`);
  }
}

class HtmlListStrategy extends ListStrategy {
  constructor() {
    super();
  }

  start(buffer) {
    buffer.push('<ul>');
  }

  end(buffer) {
    buffer.push('</ul>');
  }

  addListItem(buffer, item) {
    buffer.push(`   <li>${item}</li>`);
  }
}

class TextProcessor {
  constructor(outputFormat) {
    this.buffer = [];
    this.setOutputFormat(outputFormat);
  }

  setOutputFormat(format) {
    switch (format) {
      case OutputFormat.Markdown:
        this.listStrategy = new MarkdownListStrategy();
        break;
      case OutputFormat.Html:
        this.listStrategy = new HtmlListStrategy();
        break;
      default:
        break;
    }
  }

  appendList(items) {
    this.listStrategy.start(this.buffer);
    for (const item of items) {
      this.listStrategy.addListItem(this.buffer, item);
    }
    this.listStrategy.end(this.buffer);
  }

  clearList() {
    this.buffer = [];
  }

  toString() {
    return this.buffer.join('\n');
  }
}

const textProcessor = new TextProcessor(OutputFormat.Markdown);
textProcessor.appendList(['foo', 'bar', 'baz']);
console.log(textProcessor.toString());

textProcessor.clearList();
textProcessor.setOutputFormat(OutputFormat.Html);
textProcessor.appendList(['foo', 'bar', 'baz']);
console.log(textProcessor.toString());