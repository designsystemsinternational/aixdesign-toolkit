import React from "react";
import cn from "classnames";

import * as css from "./BlobElementControl.module.css";

// Icons from http://svgicons.sparkk.fr/

export const BlobElementControl = ({
  blob,
  index,
  selected,
  onMoveUp,
  onMoveDown,
  onRemove,
  onClick,
  disableMoveUp,
  disableMoveDown
}) => {
  const {
    path,
    fill,
    svgData: { viewBox }
  } = blob;

  return (
    <div
      className={cn(css.blobElement, { [css.selected]: selected })}
      key={index}
      onClick={onClick}
    >
      <div className={css.blobControlContainer}>
        <button className={css.blobControl} onClick={onClick}>
          <svg viewBox="0 0 20 20" width={20}>
            <circle
              fill="transparent"
              stroke="black"
              cx={10}
              cy={10}
              r={8}
              strokeWidth={1}
            />
            {selected && (
              <circle
                fill="black"
                stroke="black"
                cx={10}
                cy={10}
                r={4}
                strokeWidth={1}
              />
            )}
          </svg>
        </button>
        <button
          className={css.blobControl}
          onClick={e => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={disableMoveUp}
        >
          <svg viewBox="0 0 20 20" width={20}>
            <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
          </svg>
        </button>
        <button
          className={css.blobControl}
          onClick={e => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={disableMoveDown}
        >
          <svg viewBox="0 0 20 20" width={20}>
            <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
          </svg>
        </button>
        <button
          className={css.blobControl}
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <svg viewBox="0 0 20 20" width={20}>
            <path
              transform="rotate(45 10 10)"
              d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"
            ></path>
            <path
              transform="rotate(135 10 10)"
              d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"
            ></path>
          </svg>
        </button>
      </div>
      <svg className={css.blobSvg} viewBox={viewBox}>
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
};
