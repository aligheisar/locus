import { LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const PageLoading = () => {
  return (
    <div className="grid place-items-center">
      <div className="flex flex-col place-items-center gap-2">
        <HugeiconsIcon className="animate-spin" icon={LoaderCircle} size={34} />
        <p className="animate-pulse font-semibold text-lg">Loading</p>
      </div>
    </div>
  );
};

export { PageLoading };
