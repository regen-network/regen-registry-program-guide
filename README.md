# regen-registry-program-guide (WIP Readme)

This readme should be more fully upated prior to marking this PR as open.

### Overview of AsciiDoc

[AsciiDoc](https://docs.asciidoctor.org/asciidoc/latest/syntax-quick-reference/) is a lightweight and semantic markup language primarily designed for writing technical documentation. The language can be used to produce a variety of presentation-rich output formats, all from content encoded in a concise, human-readable, plain text format.

In the context of the Regen Registry Program Guide, we use a small subset of the features of AsciiDoc, which are documented here:

- `=`, `==` for headings & subheadings
- `:sectnums:` and `:sectnumlevels:` to enable decimal-outline notation for section headings
- `:toc:` to auto-generate a table of contents
- `.`, `..` for ordered lists
- `-`, `*` for un-ordered lists
- indentation of ordered & unordered lists do not affect rendering, and are done only to make the plain-text easier to read
- `footnote:` keyword is used to generate footnotes
- `|===` to create [basic tables](https://docs.asciidoctor.org/asciidoc/latest/tables/build-a-basic-table/)
- `http://foo.bar[My website]` for rendering links
- `Term:: ` for [definitions & term descriptions](https://docs.asciidoctor.org/asciidoc/latest/lists/description/)
- `<<Section Title>>` for links between different sections
