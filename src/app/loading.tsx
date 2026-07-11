export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--ink-0)">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--signal) opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-(--signal)" />
      </span>
    </div>
  );
}
