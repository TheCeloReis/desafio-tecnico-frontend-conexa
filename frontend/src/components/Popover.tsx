import * as React from "react";
import { useOverlay, DismissButton } from "react-aria";

type PropsType = {
  popoverRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
};

function Popover(props: PropsType) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { popoverRef = ref, isOpen, onClose, children } = props;

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: false,
    },
    popoverRef
  );

  return (
    <div
      {...overlayProps}
      ref={popoverRef}
      className="absolute z-30 top-[calc(100%-20px)] w-full shadow-lg border border-gray-300 bg-white rounded-md mt-2"
    >
      {children}
      <DismissButton onDismiss={onClose} />
    </div>
  );
}

export default Popover;
