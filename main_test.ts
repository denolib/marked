import marked from "./main.ts";
import { test, runTests } from "https://deno.land/std@v0.3.2/testing/mod.ts";
import { assert } from "https://deno.land/std@v0.3.2/testing/asserts.ts";

test({
  name: "[Marked] Test heading ID functionality - add id attribute by default",
  fn() {
    var renderer = new marked.Renderer();
    var slugger = new marked.Slugger();
    var header = renderer.heading("test", 1, "test", slugger);
    assert(header === '<h1 id="test">test</h1>\n');
  }
});

test({
  name:
    "[Marked] Test heading ID functionality - NOT add id attribute when options set false",
  fn() {
    var renderer = new marked.Renderer({ headerIds: false });
    var header = renderer.heading("test", 1, "test");
    assert(header === "<h1>test</h1>\n");
  }
});

test({
  name: "[Marked] Test slugger functionality - should use lowercase slug",
  fn() {
    var slugger = new marked.Slugger();
    assert(slugger.slug("Test") === "test");
  }
});

test({
  name:
    "[Marked] Test slugger functionality - should be unique to avoid collisions 1280",
  fn() {
    var slugger = new marked.Slugger();
    assert(slugger.slug("test") === "test");
    assert(slugger.slug("test") === "test-1");
    assert(slugger.slug("test") === "test-2");
  }
});

test({
  name:
    "[Marked] Test slugger functionality - should be unique when slug ends with number",
  fn() {
    var slugger = new marked.Slugger();
    assert(slugger.slug("test 1") === "test-1");
    assert(slugger.slug("test") === "test");
    assert(slugger.slug("test") === "test-2");
  }
});

test({
  name:
    "[Marked] Test slugger functionality - should be unique when slug ends with hyphen number",
  fn() {
    var slugger = new marked.Slugger();
    assert(slugger.slug("foo") === "foo");
    assert(slugger.slug("foo") === "foo-1");
    assert(slugger.slug("foo 1") === "foo-1-1");
    assert(slugger.slug("foo-1") === "foo-1-2");
    assert(slugger.slug("foo") === "foo-2");
  }
});

test({
  name: "[Marked] Test slugger functionality - should allow non-latin chars",
  fn() {
    var slugger = new marked.Slugger();
    assert(slugger.slug("привет") === "привет");
  }
});

test({
  name: "[Marked] Test slugger functionality - should remove ampersands 857",
  fn() {
    var slugger = new marked.Slugger();
    assert(slugger.slug("This & That Section") === "this--that-section");
  }
});

test({
  name: "[Marked] Test slugger functionality - should remove periods",
  fn() {
    var slugger = new marked.Slugger();
    assert(slugger.slug("file.txt") === "filetxt");
  }
});

test({
  name:
    '[Marked] Test paragraph token type - should use the "paragraph" type on top level',
  fn() {
    const md = "A Paragraph.\n\n> A blockquote\n\n- list item\n";
    const tokens = marked.lexer(md);
    assert(tokens[0].type === "paragraph");
    assert(tokens[3].type === "paragraph");
    assert(tokens[7].type === "text");
  }
});

runTests();
