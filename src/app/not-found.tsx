import { LinkButton } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--ink-0) px-6 text-center">
      <SectionEyebrow>404</SectionEyebrow>
      <h1 className="mt-4 max-w-md text-3xl font-medium tracking-tighter text-(--fg-0)">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-sm text-sm text-(--fg-1)">
        The link might be broken, or the page may have moved.
      </p>
      <div className="mt-8">
        <LinkButton href="/">Go home</LinkButton>
      </div>
    </div>
  );
}
