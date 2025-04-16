import { toast } from "sonner";

export const showSuccessToast = (message: string) =>
  toast.custom((t) => (
    <div
      onClick={() => {
        toast.dismiss(t);
      }}
      className="w-full max-w-sm bg-green-100 border border-green-300 text-green-900 p-4 rounded-md shadow flex gap-3 items-start"
    >
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div className="text-sm">
        <p className="font-bold">{message}</p>
      </div>
    </div>
  ));
