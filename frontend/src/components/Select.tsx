import * as React from "react";
import type { AriaSelectProps } from "@react-types/select";
import { useSelectState } from "react-stately";
import {
  useSelect,
  HiddenSelect,
  useButton,
  mergeProps,
  useFocusRing,
} from "react-aria";
import { MdKeyboardArrowDown } from "react-icons/md";

import ListBox from "./ListBox";
import Popover from "./Popover";
import clsx from "clsx";

type PropsType<T> = {
  placeholder?: string;
} & AriaSelectProps<T>;

function Select<T extends object>({
  placeholder = "Selecione uma opção",
  ...props
}: PropsType<T>) {
  const state = useSelectState(props);

  const ref = React.useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps, errorMessageProps } =
    useSelect(props, state, ref);

  const { buttonProps } = useButton(triggerProps, ref);

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      className={clsx(
        "inline-flex flex-col relative w-52",
        !props.errorMessage && "pb-5"
      )}
    >
      <div
        {...labelProps}
        className="block text-sm font-medium text-gray-dark text-left"
      >
        {props.label}
      </div>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={`p-0.5 pl-2 py-1 relative inline-flex flex-row items-center justify-between overflow-hidden shadow-sm border-b-2 border-gray-light outline-none ${
          isFocusVisible ? "border-primary-medium" : "text-gray-light"
        } ${state.isOpen ? "bg-gray-100" : "bg-white"}`}
      >
        <span
          {...valueProps}
          className={`text-md ${
            state.selectedItem ? "text-gray-dark" : "text-gray-medium"
          }`}
        >
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </span>
        <MdKeyboardArrowDown />
      </button>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} className="text-red-500 text-sm">
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export default Select;
