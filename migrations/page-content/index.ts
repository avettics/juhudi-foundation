import { at, defineMigration, setIfMissing } from "sanity/migrate";
import { pageContentDefaults } from "../../sanity/content/defaults";

// Run as a dry run first. Does not overwrite existing editorial page objects.
export default defineMigration({
  title: "Initialize fixed page content from the approved implementation",
  documentTypes: ["siteSettings"],
  filter: '_id in ["siteSettings", "drafts.siteSettings"]',
  migrate: {
    document() {
      return [
        at("homePage", setIfMissing(pageContentDefaults.home)),
        at("aboutPage", setIfMissing(pageContentDefaults.about)),
        at("ourWorkPage", setIfMissing(pageContentDefaults.ourWork)),
      ];
    },
  },
});
