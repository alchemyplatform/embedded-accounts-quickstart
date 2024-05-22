import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="flex-1 rounded-lg border border-[#CBD5E1] p-3 dark:border-[#475569] dark:bg-slate-700 dark:text-white dark:placeholder:text-[#E2E8F0]"
    {...props}
  />
);
