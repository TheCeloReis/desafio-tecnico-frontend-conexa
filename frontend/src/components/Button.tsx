import { useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import clsx from "clsx";

type PropsType = {
  fullWidth?: boolean;
  variant?: "filled" | "outlined";
} & AriaButtonProps;

function Button({ variant = "filled", ...props }: PropsType) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      className={clsx(
        "text-sm rounded-lg font-bold h-10 px-4",
        "transition-colors",
        {
          "w-full": props.fullWidth,
          "opacity-60": props.isDisabled,

          "bg-primary-medium text-white hover:bg-primary-light":
            variant === "filled",
          "bg-white border-2 border-primary-medium text-primary-medium hover:bg-gray-100 hover:border-primary-dark hover:text-primary-dark":
            variant === "outlined",
        }
      )}
      {...buttonProps}
      ref={ref}
    >
      {props.children}
    </button>
  );
}

export default Button;
