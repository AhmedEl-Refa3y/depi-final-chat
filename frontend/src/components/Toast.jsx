import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export const Toast = ({ message, type, onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    const intervalDuration = duration / 60;
    const decrementAmount = 100 / 60;

    const interval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - decrementAmount));
    }, intervalDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white flex flex-col z-[999]`}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <CheckCircle className="mr-2" />
        ) : (
          <XCircle className="mr-2" />
        )}
        <span>{message}</span>
      </div>
      <div className="w-full bg-white/30 h-1 mt-2 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            type === "success" ? "bg-green-300" : "bg-red-300"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
