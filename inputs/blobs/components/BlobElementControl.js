import React from "react";
import cn from "classnames";

import * as css from "./BlobElementControl.module.css";
import { ArrowDown, ArrowUp, Remove } from "./Icons";
import { ColorSelector } from "./ColorSelector";
import { NumberInput } from "@mechanic-design/ui-components";
import { Logo } from "../../../functions/igpost/Logo";

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
          <path
            d={path}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
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
        <div className={css.extras} onClick={e => e.stopPropagation()}>
          <label className={css.groupTitle}>Fill</label>
          <ColorSelector value={fill} onChange={c => onModify({ fill: c })} />
          <label className={css.groupTitle}>Stroke</label>
          <NumberInput
            className={css.strokeWidthInput}
            value={strokeWidth}
            min={1}
            max={10}
            step={1}
            slider
            onChange={e => {
              onModify({ strokeWidth: parseInt(e.target.value) });
            }}
          />
          <ColorSelector
            value={stroke}
            onChange={c => onModify({ stroke: c })}
          />
        </div>
      )}
    </div>
  );
};
