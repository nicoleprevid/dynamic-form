'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  BUTTON_STATE_VARIANTS,
  LABEL_STATE_VARIANTS,
} from './utils';

type Props = {
  /**
   * Texto que será exibido no botão
   */
  label?: string;
  /**
   * Ícone que será exibido no botão
   *
   * ps: Para utilizar o modo dark é necessário baixar no projeto esse mesmo icone com cores diferentes seguindo o padrão do figma
   *
   * **•seguindo esse padrão**
   *
   * **• nomeIcone ** (cor padrão do figma ou coloque o fill="#D9D9D9")
   *
   * **• nomeIcone-light  ** (coloque o fill = #CBD5E0)
   *
   * **• nomeIcone-lighter ** (coloque o fill = #F7FAFC)
   */
  icon: string;
  /**
   * Uma função de callback, acionada quando o botão é clicado
   */
  onClick?: () => void;
  /**
   * Estado do botão podendo ser  'default' , 'active' , 'hover' , 'click'
   */
  state: 'default' | 'active';
  /**
   * Indica se será darkmode ou não
   */
  darkmode?: boolean;
  /**
   * Indica se o Label está a mostra
   */
  activeLabel?: boolean;
};

export default function IconButton({
  label,
  icon,
  onClick,
  state,
  darkmode = false,
  activeLabel = true,
}: Props) {
  const [mode, setMode] = useState(``);

  useEffect(() => {
    setMode(`${state}${darkmode ? 'Dark' : ''}`);
  }, [state, darkmode]);

  const handleHover = () => {
    setMode(darkmode ? 'hoverDark' : 'hover');
  };
  const handlePress = () => {
    setMode(darkmode ? 'clickDark' : 'click');
  };
  const handleMouseOut = () => {
    setMode(`${state}${darkmode ? 'Dark' : ''}`);
  };
  const handleNoPress = () => {
    setMode(`${state}${darkmode ? 'Dark' : ''}`);
    handleHover();
  };

  return (
    <button
      onMouseOver={handleHover}
      onMouseOut={handleMouseOut}
      onMouseDown={handlePress}
      onMouseUp={handleNoPress}
      onTouchStart={handlePress}
      onTouchEnd={handleNoPress}
      data-testid="button-with-icon"
      className={`
        transition-color group flex items-center justify-center gap-2 rounded-lg transition ease-out
        ${BUTTON_STATE_VARIANTS[mode]}
      `}
      onClick={onClick}
    >
      <div data-testid="button-icon" className="flex flex-shrink-0">
        <Image
          src={`/icons/${icon}.svg`}
          alt="Icon Button"
          width={24}
          height={24}
        />
      </div>
      {label && activeLabel ? (
        <p
          className={`font-Nunito font-normal-5 truncate text-base transition-all ${LABEL_STATE_VARIANTS[mode]}`}
        >
          {label}
        </p>
      ) : null}
    </button>
  );
}
