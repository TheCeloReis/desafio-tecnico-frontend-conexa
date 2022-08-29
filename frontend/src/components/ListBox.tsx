/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import type { ListState } from "react-stately";
import type { Node } from "@react-types/shared";
import {
  useListBox,
  useListBoxSection,
  useOption,
  AriaListBoxOptions,
} from "react-aria";
import { MdCheck } from "react-icons/md";
import clsx from "clsx";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

function ListBox(props: ListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="max-h-72 overflow-auto outline-none"
    >
      {Array.from(state.collection).map((item) =>
        item.type === "section" ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
}

function ListBoxSection({ section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && (
          <span
            {...headingProps}
            className="text-xs font-bold uppercase text-gray-500 mx-3"
          >
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {Array.from(section.childNodes).map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

function Option({ item, state }: OptionProps) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={clsx(
        `m-1 rounded-md py-2 px-2 text-sm outline-none cursor-pointer flex items-center justify-between`,
        isFocused || isSelected
          ? "text-primary-medium"
          : isDisabled
          ? "text-gray-light"
          : "text-gray-dark",
        {
          "bg-blue-50": isDisabled || isFocused,
          "font-bold": isSelected,
        }
      )}
    >
      {item.rendered}
      {isSelected && (
        <MdCheck aria-hidden="true" className="w-5 h-5 text-primary-medium" />
      )}
    </li>
  );
}

export default ListBox;
