/* eslint-disable comma-dangle,array-bracket-spacing */
import testRule from "../../../testUtils/blueTapeStylelintAssert"
import rule, { ruleName, messages } from ".."

testRule(rule, {
  ruleName: ruleName,
  config: ["always"],

  accept: [{
    code: "a { color: pink; }",
    description: "no !important",
  }, {
    code: "a { color: pink! important; }",
    description: "space only after",
  }, {
    code: "a { color: pink ! important; }",
    description: "space before and after",
  }, {
    code: "a { color: pink\n! important; }",
    description: "newline before and space after",
  }, {
    code: "a { color: pink\r\n! important; }",
    description: "CRLF before and space after",
  }, {
    code: "a::before { content: \"!!!\" ! important; }",
    description: "ignores string",
  }],

  reject: [{
    code: "a { color: pink!important; }",
    description: "no space after",
    message: messages.expectedAfter(),
    line: 1,
    column: 16,
  }, {
    code: "a { color: pink!  important; }",
    description: "two spaces after",
    message: messages.expectedAfter(),
    line: 1,
    column: 16,
  }, {
    code: "a { color: pink!\nimportant; }",
    description: "newline after",
    message: messages.expectedAfter(),
    line: 1,
    column: 16,
  }, {
    code: "a { color: pink!\r\nimportant; }",
    description: "CRLF after",
    message: messages.expectedAfter(),
    line: 1,
    column: 16,
  }],
})

testRule(rule, {
  ruleName: ruleName,
  config: ["never"],

  accept: [{
    code: "a { color: pink; }",
    description: "no !important",
  }, {
    code: "a { color: pink!important; }",
    description: "no space before or after",
  }, {
    code: "a { color: pink !important; }",
    description: "space before and none after",
  }, {
    code: "a { color: pink\n!important; }",
    description: "newline before and none after",
  }, {
    code: "a { color: pink\r\n!important; }",
    description: "CRLF before and none after",
  }],

  reject: [{
    code: "a { color: pink! important; }",
    description: "space after",
    message: messages.rejectedAfter(),
    line: 1,
    column: 16,
  }, {
    code: "a { color: pink!\nimportant; }",
    description: "newline after",
    message: messages.rejectedAfter(),
    line: 1,
    column: 16,
  }, {
    code: "a { color: pink!\r\nimportant; }",
    description: "CRLF after",
    message: messages.rejectedAfter(),
    line: 1,
    column: 16,
  }],
})