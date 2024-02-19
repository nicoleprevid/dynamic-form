import React, { useState } from 'react';
import {
  COLOR_BG,
  BUTTON_SIZE_VARIANTS,
  TEXT_SIZE_VARIANTS,
  Status,
  Sizes,
} from "./utils";

type Props = {
  text: string;
  status: Status;
  onClick?: () => void;
  size?: Sizes;
  disabled?: boolean;
};

export default function TagButton({
  disabled,
  text,
  status = "default",
  size = "lg",
  onClick,
}: Props) {

  return (
    <button
      onClick={onClick}
      data-testid="tag-button"
      className={`group flex content-center justify-center border-[1px] ${
        !disabled && status=="default"
          ? 'transition-all ease-in-out  hover:border-gray-400 hover:bg-gray-200'
          : ''
      } ${BUTTON_SIZE_VARIANTS[size]} ${COLOR_BG[status]}`}
    >
      <p
        data-testid="tag-text"
        className={`select-none font-nunito text-base font-normal transition-all ease-in-out ${TEXT_SIZE_VARIANTS[size]} `}
      >
        {text}
      </p>
    </button>
  );
}
