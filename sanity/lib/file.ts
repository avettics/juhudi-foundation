type SanityFileAsset = {
  url?: string | null;
  originalFilename?: string | null;
  mimeType?: string | null;
  size?: number | null;
};

type SanityFile = {
  asset?: SanityFileAsset | null;
};

export type ResolvedFile = {
  url: string;
  filename: string | null;
  mimeType: string | null;
  size: number | null;
};

export function resolveFile(
  file: SanityFile | null | undefined,
): ResolvedFile | null {
  const asset = file?.asset;

  if (!asset?.url) {
    return null;
  }

  return {
    url: asset.url,
    filename: asset.originalFilename ?? null,
    mimeType: asset.mimeType ?? null,
    size: asset.size ?? null,
  };
}
