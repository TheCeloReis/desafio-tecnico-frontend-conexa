import React from "react";
import clsx from "clsx";
import { useRef } from "react";
import {
  useDialog,
  AriaDialogProps,
  useModal,
  useOverlay,
  usePreventScroll,
  OverlayContainer,
  AriaOverlayProps,
} from "react-aria";
import Button from "./Button";

type PropsType = {
  title: string;
  confirmText?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "error" | "success";
  disabledPreventScroll?: boolean;
} & AriaOverlayProps &
  AriaDialogProps;

function AlertDialog({
  disabledPreventScroll,
  confirmText,
  description,
  variant,
  ...props
}: PropsType) {
  const { title } = props;

  const ref = useRef(null);
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  usePreventScroll({ isDisabled: disabledPreventScroll });
  const { modalProps } = useModal();

  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <OverlayContainer>
      <div
        className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 p-4"
        {...underlayProps}
      >
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md"
        >
          <h3
            {...titleProps}
            className={clsx("text-2xl font-bold mb-2", {
              "text-green-700": variant === "success",
              "text-red-700": variant === "error",
            })}
          >
            {title}
          </h3>

          <p className="mb-4">{description}</p>

          {confirmText && (
            <footer className="flex justify-end">
              <Button variant="outlined" onPress={props.onClose}>
                {confirmText}
              </Button>
            </footer>
          )}
        </div>
      </div>
    </OverlayContainer>
  );
}

export default AlertDialog;
