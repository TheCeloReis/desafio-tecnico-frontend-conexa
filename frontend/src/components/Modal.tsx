import React from "react";
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

type ModalProps = {
  title: string;
  children: React.ReactNode;
} & AriaOverlayProps &
  AriaDialogProps;

function ModalDialog(props: ModalProps) {
  const { title, children } = props;

  const ref = useRef(null);
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  usePreventScroll();
  const { modalProps } = useModal();

  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <OverlayContainer>
      <div
        data-testid="modal"
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
            className="text-2xl text-primary-dark font-bold mb-8"
          >
            {title}
          </h3>
          {children}
        </div>
      </div>
    </OverlayContainer>
  );
}

export default ModalDialog;
