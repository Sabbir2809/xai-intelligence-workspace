"use client";

import { Button, LinkButton } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--ink-0) px-6 text-center">
      <SectionEyebrow>Error</SectionEyebrow>
      <h1 className="mt-4 max-w-md text-3xl font-medium tracking-tighter text-(--fg-0)">
        Something broke on our end.
      </h1>
      <p className="mt-4 max-w-sm text-sm text-(--fg-1)">
        The page hit an unexpected error. Try again, or head back to the
        homepage.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <LinkButton href="/">Go home</LinkButton>
      </div>
    </div>
  );
}
