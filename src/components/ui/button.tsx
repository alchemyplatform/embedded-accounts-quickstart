import classNames from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "default" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantLookup = {
  default: "bg-[#363FF9] text-[#FBFDFF]",
  secondary: "border border-black dark:bg-slate-600",
};

export const Button = ({
  children,
  variant,
  disabled,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const buttonClassNames = classNames(
    "w-full transform rounded-lg p-3 font-semibold transition duration-500 ease-in-out",
    {
      "hover:scale-105": !disabled,
      "opacity-50 cursor-not-allowed": disabled,
    },
    variantLookup[variant || "default"],
  );

  return (
    <button className={buttonClassNames} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
