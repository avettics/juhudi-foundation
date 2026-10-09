import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source);
}

/** Match the image builder's pixel-rounded editorial crop, preserving its ratio. */
export function getImageDimensions(image: {
  asset?: { _ref?: string } | null;
  crop?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  } | null;
}): { width: number; height: number } | null {
  const match = image.asset?._ref?.match(
    /^image-[a-zA-Z0-9]+-(\d+)x(\d+)-[a-zA-Z0-9]+$/,
  );
  if (!match) return null;

  const width = Number(match[1]);
  const height = Number(match[2]);
  const { left = 0, right = 0, top = 0, bottom = 0 } = image.crop ?? {};
  if (
    ![left, right, top, bottom].every(
      (value) => Number.isFinite(value) && value >= 0 && value <= 1,
    )
  )
    return null;
  const croppedWidth = Math.round(
    width - right * width - Math.round(left * width),
  );
  const croppedHeight = Math.round(
    height - bottom * height - Math.round(top * height),
  );
  if (croppedWidth <= 0 || croppedHeight <= 0) return null;
  return { width: croppedWidth, height: croppedHeight };
}
