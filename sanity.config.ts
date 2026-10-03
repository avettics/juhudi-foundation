import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  studioApiVersion,
  studioDataset,
  studioProjectId,
} from "./sanity/studioEnv";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const singletonTypes = new Set(["siteSettings", "contactInformation"]);

export default defineConfig({
  name: "default",
  title: "Juhudi Foundation",

  projectId: studioProjectId,
  dataset: studioDataset,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool({
      defaultApiVersion: studioApiVersion,
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (templateItem) => !singletonTypes.has(templateItem.templateId),
      ),

    actions: (prev, context) => {
      if (!singletonTypes.has(context.schemaType)) {
        return prev;
      }

      return prev.filter(
        (action) => action.action !== "duplicate" && action.action !== "delete",
      );
    },
  },
});
