import { toast } from "sonner";

export const showErrorToast = (title: string, message: string) =>
  toast.custom((t) => (
    <div
      onClick={() => {
        toast.dismiss(t);
      }}
      className="w-full max-w-sm bg-red-100 border border-red-300 text-red-900 p-4 rounded-md shadow flex gap-3 items-start"
    >
      <div className="flex-shrink-0 ">
        <svg
          className="h-5 w-5 text-red-600 mt-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.611-1.168.99-2.05L13.416 4.95a1.25 1.25 0 00-2.132 0L3.092 16.95c-.621.882-.064 2.05.99 2.05z"
          />
        </svg>
      </div>
      <div className="text-sm">
        <p className="font-semibold">{title}</p>
        <p>{message}</p>
      </div>
    </div>
  ));
