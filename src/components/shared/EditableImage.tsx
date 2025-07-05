
"use client";

import Image, { type ImageProps } from "next/image";

// NOTE: This component is no longer "editable" through the UI.
// The name is kept for now to avoid breaking imports across the app.
// Image management instructions are now on the Admin page.

export function EditableImage({ ...props }: ImageProps) {
  // @ts-ignore - 'priority' is a valid prop but might cause TS issues here.
  return <Image {...props} />;
}
