import type { ComponentProps } from "react";
import type { RichText } from "@/components/common/rich-text";
import type {
  CAMPAIGN_BY_SLUG_QUERY_RESULT,
  EVENT_BY_SLUG_QUERY_RESULT,
  OPPORTUNITY_BY_SLUG_QUERY_RESULT,
  PROGRAMME_BY_SLUG_QUERY_RESULT,
  PROJECT_BY_SLUG_QUERY_RESULT,
  STORY_BY_SLUG_QUERY_RESULT,
} from "@/sanity.types";

type AcceptsRichText<T extends ComponentProps<typeof RichText>["value"]> = T;

// Compile-time regression check: every projected content shape must be accepted
// without assertions, including images and dereferenced internal-link annotations.
export type DetailContentContracts = AcceptsRichText<
  | NonNullable<CAMPAIGN_BY_SLUG_QUERY_RESULT>["content"]
  | NonNullable<EVENT_BY_SLUG_QUERY_RESULT>["content"]
  | NonNullable<OPPORTUNITY_BY_SLUG_QUERY_RESULT>["content"]
  | NonNullable<PROGRAMME_BY_SLUG_QUERY_RESULT>["content"]
  | NonNullable<PROJECT_BY_SLUG_QUERY_RESULT>["content"]
  | NonNullable<STORY_BY_SLUG_QUERY_RESULT>["content"]
>;
