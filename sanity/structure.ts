import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set(["siteSettings", "contactInformation"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() ?? ""),
      ),

      S.divider(),

      S.listItem()
        .id("siteSettings")
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),

      S.listItem()
        .id("contactInformation")
        .title("Contact Information")
        .child(
          S.document()
            .schemaType("contactInformation")
            .documentId("contactInformation"),
        ),
    ]);
