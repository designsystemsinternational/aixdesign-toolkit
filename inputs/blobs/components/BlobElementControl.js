import React from "react";
import cn from "classnames";

import * as css from "./BlobElementControl.module.css";
import { ArrowDown, ArrowUp, Remove } from "./Icons";
import { ColorSelector } from "./ColorSelector";

// Icons from http://svgicons.sparkk.fr/

export const BlobElementControl = ({
  blob,
  index,
  selected,
  onMoveUp,
  onMoveDown,
  onRemove,
  onModify,
  onClick,
  disableMoveUp,
  disableMoveDown
}) => {
  const {
    path,
    fill,
    stroke,
    strokeWidth,
    svgData: { viewBox }
  } = blob;

  return (
    <div
      className={cn(css.blobElement, { [css.selected]: selected })}
      key={index}
      onClick={onClick}
    >
      <div className={css.main}>
        <div className={css.move}>
          <button
            className={css.blobControl}
            onClick={e => {
              e.stopPropagation();
              onMoveUp();
            }}
            disabled={disableMoveUp}
          >
            <ArrowUp />
          </button>

          <button
            className={css.blobControl}
            onClick={e => {
              e.stopPropagation();
              onMoveDown();
            }}
            disabled={disableMoveDown}
          >
            <ArrowDown />
          </button>
        </div>
        <div style={{ flex: "1" }}></div>
        <svg className={css.blobSvg} viewBox={viewBox}>
          <path d={path} fill={fill} />
        </svg>
        <button
          className={css.blobControl}
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Remove />
        </button>
      </div>
      {selected && (
        <div className={css.extras}>
          <ColorSelector value={fill} onChange={c => onModify({ fill: c })} />
        </div>
      )}
    </div>
  );
};
