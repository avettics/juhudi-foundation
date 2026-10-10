import assert from "node:assert/strict";
import test from "node:test";

import { resolveExternalHref, resolveInternalHref } from "../sanity/lib/links";

// Offline image URL fixtures; no production credentials or dataset reads.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test";
process.env.NEXT_PUBLIC_SANITY_DATASET = "production";

test("external links reject executable, relative and control-character URLs", () => {
  for (const value of [
    "javascript:alert(1)",
    "data:text/html,test",
    "/about",
    "//example.com",
    "https://exa\nmple.com",
    "file:///tmp/file",
  ]) {
    assert.equal(resolveExternalHref(value), null);
  }
  for (const value of [
    "https://example.com/path",
    "http://example.com",
    "mailto:hello@example.com",
    "tel:+255123456789",
  ]) {
    assert.equal(resolveExternalHref(value), value);
  }
});

test("internal links only accept own supported document types", () => {
  for (const type of ["constructor", "toString", "__proto__", "unknown"]) {
    assert.equal(resolveInternalHref({ _type: type, slug: "example" }), null);
  }
  assert.equal(
    resolveInternalHref({ _type: "programme", slug: "education" }),
    "/our-work/education",
  );
});

test("image dimensions use the editorial crop and reject invalid dimensions", async () => {
  const { getImageDimensions } = await import("../sanity/lib/image");
  assert.deepEqual(
    getImageDimensions({
      asset: { _ref: "image-abc-1000x800-jpg" },
      crop: { left: 0.1, right: 0.2, top: 0.25, bottom: 0 },
    }),
    { width: 700, height: 600 },
  );
  for (const ref of [
    "image-abc-0x800-jpg",
    "image-abc-9999999999999999999999x800-jpg",
    "invalid",
  ]) {
    assert.equal(getImageDimensions({ asset: { _ref: ref } }), null);
  }
  assert.equal(
    getImageDimensions({
      asset: { _ref: "image-abc-1000x800-jpg" },
      crop: { left: 0.7, right: 0.7 },
    }),
    null,
  );
});

test("page metadata inherits social crops and site-wide noIndex", async () => {
  const { buildMetadata } = await import("../sanity/lib/metadata");
  const defaults = {
    metaTitle: null,
    metaDescription: null,
    noIndex: true,
    socialImage: {
      asset: { _type: "reference" as const, _ref: "image-abc-1600x1200-jpg" },
      crop: {
        _type: "sanity.imageCrop" as const,
        left: 0.25,
        right: 0,
        top: 0,
        bottom: 0,
      },
      hotspot: null,
      alt: "Community workshop",
    },
  };
  const result = buildMetadata({
    defaultSeo: defaults,
    fallbackTitle: "About",
    fallbackDescription: "Our story",
  });
  assert.deepEqual(result.robots, { index: false, follow: false });
  assert.equal(result.title, "About");
  assert.match(JSON.stringify(result.openGraph), /rect=400/);
  assert.match(JSON.stringify(result.openGraph), /Community workshop/);
});
