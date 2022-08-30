import React from "react";
import { useRef, useState } from "react";
import { AriaTextFieldProps, useTextField } from "@react-aria/textfield";
import { clsx } from "clsx";
import { HiEyeOff, HiEye } from "react-icons/hi";

type PropsType = {
  label: React.ReactNode;
  className?: string;
} & AriaTextFieldProps;

function TextField(props: PropsType) {
  const ref = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField({ ...props, type: showPassword ? "text" : props.type }, ref);

  return (
    <div className={clsx(!props.errorMessage && "pb-5", props.className)}>
      <div className="flex flex-col border-b-2 border-gray-light pb-2 relative">
        <label className="text-sm text-gray-dark" {...labelProps}>
          {props.label}
        </label>
        <input
          className={clsx("text-sm", { italic: !inputProps.value })}
          {...inputProps}
          ref={ref}
        />
        {props.description && (
          <div {...descriptionProps} style={{ fontSize: 12 }}>
            {props.description}
          </div>
        )}
        {props.type === "password" && (
          <button
            title="Mostrar senha"
            className="absolute right-0 top-5 h-5 w-5 grid place-items-center text-gray-medium"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        )}
      </div>
      {props.errorMessage && (
        <div {...errorMessageProps} className="text-red-500 text-sm">
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export default TextField;
