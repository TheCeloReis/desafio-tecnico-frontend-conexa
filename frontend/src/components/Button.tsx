import { useRef } from "react";
import { AriaButtonProps, useButton } from "@react-aria/button";
import clsx from "clsx";

type PropsType = {
  fullWidth?: boolean;
} & AriaButtonProps;

function Button(props: PropsType): JSX.Element {
  const ref = useRef(null);
  let { buttonProps } = useButton(props, ref);

  return (
    <button
      className={clsx(
        "text-sm bg-primary-medium rounded-lg font-bold text-white h-10 px-4",
        "transition-colors hover:bg-primary-light",
        {
          "w-full": props.fullWidth,
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
