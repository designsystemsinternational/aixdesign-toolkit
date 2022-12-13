import React from "react";
import cn from "classnames";

import * as css from "./Handles.module.css";

export const updateBlobTransform = blob => {
  const { x, y, scaleX, scaleY, rotate, pathExtent } = blob;
  blob.transform = `translate(${x} ${y}) rotate(${rotate} ${
    pathExtent.x0 + (blob.scaleX * pathExtent.width) / 2
  } ${pathExtent.y0 + (blob.scaleY * pathExtent.height) / 2}) translate(${
    pathExtent.x0
  } ${
    pathExtent.y0
  }) scale(${scaleX} ${scaleY}) translate(${-pathExtent.x0} ${-pathExtent.y0})`;
};

const handleSize = 7;
const rotationHandleSize = 20;
const halfHandleSize = Math.floor(handleSize / 2);

const debug = false;

export const Handles = ({ blob }) => {
  if (blob == null) return null;

  const rotate = blob.rotate;
  const x0 = blob.pathExtent.x0 + blob.x;
  const y0 = blob.pathExtent.y0 + blob.y;
  const width = blob.scaleX * blob.pathExtent.width;
  const height = blob.scaleY * blob.pathExtent.height;

  return (
    <>
      <div
        id="handle-body"
        className={css.handle}
        style={{
          border: "1px dashed black",
          left: x0,
          top: y0,
          height: height,
          width: width,
          cursor: "move",
          transform: `rotate(${rotate}deg)`
        }}
      />
      <div
        id="handle-n"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0,
          top: y0 - halfHandleSize,
          height: handleSize,
          width: width,
          cursor: "ns-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${width / 2}px ${halfHandleSize + height / 2}px`
        }}
      />
      <div
        id="handle-e"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 + width - (halfHandleSize + 1),
          top: y0,
          height: height,
          width: handleSize,
          cursor: "ew-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${-width / 2 + (halfHandleSize + 1)}px ${
            height / 2
          }px`
        }}
      />
      <div
        id="handle-ne-rot"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 + width - (halfHandleSize + 1),
          top: y0 - rotationHandleSize + halfHandleSize + 1,
          height: rotationHandleSize,
          width: rotationHandleSize,
          cursor: "nwse-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${-width / 2 + (halfHandleSize + 1)}px ${
            height / 2 + rotationHandleSize - (halfHandleSize + 1)
          }px`
        }}
      />
      <div
        id="handle-ne"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 + width - (halfHandleSize + 1),
          top: y0 - halfHandleSize,
          height: handleSize,
          width: handleSize,
          cursor: "nesw-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${-width / 2 + (halfHandleSize + 1)}px ${
            height / 2 + halfHandleSize
          }px`
        }}
      />
      <div
        id="handle-s"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0,
          top: y0 + height - (halfHandleSize + 1),
          height: handleSize,
          width: width,
          cursor: "ns-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${width / 2}px ${
            -height / 2 + (halfHandleSize + 1)
          }px`
        }}
      />
      <div
        id="handle-serot"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 + width - (halfHandleSize + 1),
          top: y0 + height - (halfHandleSize + 1),
          height: rotationHandleSize,
          width: rotationHandleSize,
          cursor: "nesw-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${-width / 2 + (halfHandleSize + 1)}px ${
            -height / 2 + (halfHandleSize + 1)
          }px`
        }}
      />
      <div
        id="handle-se"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 + width - (halfHandleSize + 1),
          top: y0 + height - (halfHandleSize + 1),
          height: handleSize,
          width: handleSize,
          cursor: "nwse-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${-width / 2 + (halfHandleSize + 1)}px ${
            -height / 2 + (halfHandleSize + 1)
          }px`
        }}
      />
      <div
        id="handle-w"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 - halfHandleSize,
          top: y0,
          height: height,
          width: handleSize,
          cursor: "ew-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${width / 2 + halfHandleSize}px ${height / 2}px`
        }}
      />
      <div
        id="handle-swrot"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 - rotationHandleSize + halfHandleSize + 1,
          top: y0 + height - (halfHandleSize + 1),
          height: rotationHandleSize,
          width: rotationHandleSize,
          cursor: "nwse-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${
            width / 2 + rotationHandleSize - (halfHandleSize + 1)
          }px ${-height / 2 + (halfHandleSize + 1)}px`
        }}
      />
      <div
        id="handle-sw"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 - halfHandleSize,
          top: y0 + height - (halfHandleSize + 1),
          height: handleSize,
          width: handleSize,
          cursor: "nesw-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${width / 2 + halfHandleSize}px ${
            -height / 2 + (halfHandleSize + 1)
          }px`
        }}
      />
      <div
        id="handle-nwrot"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 - rotationHandleSize + halfHandleSize + 1,
          top: y0 - rotationHandleSize + halfHandleSize + 1,
          height: rotationHandleSize,
          width: rotationHandleSize,
          cursor: "nesw-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${
            width / 2 + rotationHandleSize - (halfHandleSize + 1)
          }px ${height / 2 + rotationHandleSize - (halfHandleSize + 1)}px`
        }}
      />
      <div
        id="handle-nw"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 - halfHandleSize,
          top: y0 - halfHandleSize,
          height: handleSize,
          width: handleSize,
          cursor: "nwse-resize",
          transform: `rotate(${rotate}deg)`,
          transformOrigin: `${width / 2 + halfHandleSize}px ${
            height / 2 + halfHandleSize
          }px`
        }}
      />
    </>
  );
};

const getBlobRect = blob => {
  const width = blob.pathExtent.width * blob.scaleX;
  const height = blob.pathExtent.height * blob.scaleY;
  const ratio = height / width;

  const cy = blob.y + blob.pathExtent.y0 + height / 2;
  const cx = blob.x + blob.pathExtent.x0 + width / 2;

  const x0 = blob.x + blob.pathExtent.x0;
  const y0 = blob.y + blob.pathExtent.y0;
  const x1 = x0 + width;
  const y1 = y0 + height;

  return { width, height, ratio, x0, y0, cx, cy, x1, y1 };
};

const scaleBlob = (blob, [x, y], vertical = null, horizontal = null) => {
  const { rotate: rotation, pathExtent } = blob;
  const { width, height, ratio, x0, y0, cx, cy, x1, y1 } = getBlobRect(blob);

  const [rotX, rotY] = rotate(cx, cy, x, y, -rotation);

  const dh = vertical === "n" ? y0 - rotY : vertical === "s" ? rotY - y1 : 0;
  const dw =
    horizontal === "w" ? x0 - rotX : horizontal === "e" ? rotX - x1 : 0;
  const keepRatio = vertical != null && horizontal != null;

  let newHeight = height + dh;
  let newWidth = width + dw;
  if (keepRatio && dh > dw * ratio) {
    newWidth = newHeight / ratio;
  } else if (keepRatio) {
    newHeight = newWidth * ratio;
  }
  const scaleY = newHeight / pathExtent.height;
  const scaleX = newWidth / pathExtent.width;

  const [newCx, newCy] = rotate(
    cx,
    cy,
    horizontal === "w"
      ? x1 - newWidth / 2
      : horizontal === "e"
      ? x0 + newWidth / 2
      : cx,
    vertical === "n"
      ? y1 - newHeight / 2
      : vertical === "s"
      ? y0 + newHeight / 2
      : cy,
    rotation
  );
  const [rotX0, rotY0] = rotate(
    cx,
    cy,
    horizontal === "w" ? x1 - newWidth : x0,
    vertical === "n" ? y1 - newHeight : y0,
    rotation
  );
  const [newX0, newY0] = rotate(newCx, newCy, rotX0, rotY0, -rotation);

  return {
    x: newX0 - pathExtent.x0,
    y: newY0 - pathExtent.y0,
    scaleY,
    scaleX
  };
};

const rotateBlob = (blob, center, [x, y]) => {
  const { cx, cy } = getBlobRect(blob);

  const cdy = -(center.y - cy);
  const cdx = center.x - cx;
  const referenceAngle =
    ((cdx > 0 ? Math.atan(cdy / cdx) : Math.atan(cdy / cdx) + Math.PI) * 180) /
    Math.PI;

  const dy = -(y - cy);
  const dx = x - cx;
  const angle =
    ((dx > 0 ? Math.atan(dy / dx) : Math.atan(dy / dx) + Math.PI) * 180) /
    Math.PI;
  const dAngle = referenceAngle - angle;
  const rotation = blob.rotate + dAngle;
  return { rotate: rotation };
};

function rotate(cx, cy, x, y, angle) {
  const radians = (Math.PI / 180) * -angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

export const HandleContainer = ({
  width,
  height,
  offset,
  blob,
  children,
  onUpdateBlob
}) => {
  const [cursor, setCursor] = React.useState({ x: null, y: null, id: null });
  const [dragging, setDragging] = React.useState("");
  const [blobReference, setBlobReference] = React.useState(null);
  const [initialCoordinate, setInitialCoordinate] = React.useState(null);

  const wrapperRef = React.useRef(null);

  const getEventCoordinates = e => {
    const { clientX, clientY } = e;
    const parentRect = wrapperRef.current.getBoundingClientRect();
    const x = clientX - parentRect.left;
    const y = clientY - parentRect.top;
    return { x, y };
  };

  // const cursorClass = cursor.id != null && cursor.id.split("-")[1];
  // console.log({ cursorClass });

  return (
    <div
      id="handler-wrapper"
      ref={wrapperRef}
      className={css.handlesWrapper}
      style={{
        top: offset.top,
        left: offset.left,
        width: width,
        height: height
      }}
      onMouseDown={e => {
        if (e.target.id != null) {
          const { x, y } = getEventCoordinates(e);
          setInitialCoordinate({ x, y });
          setBlobReference({ ...blob });
          setDragging(e.target.id);
        }
      }}
      onMouseMove={e => {
        const { x, y } = getEventCoordinates(e);
        setCursor({ x, y, id: e.target.id });
        if (dragging === "handle-body") {
          onUpdateBlob({
            x: blobReference.x + (x - initialCoordinate.x),
            y: blobReference.y + (y - initialCoordinate.y)
          });
        } else if (dragging.includes("handle") && !dragging.includes("rot")) {
          const handleId = dragging.split("-")[1];
          const vertical = handleId.includes("n")
            ? "n"
            : handleId.includes("s")
            ? "s"
            : null;
          const horizontal = handleId.includes("w")
            ? "w"
            : handleId.includes("e")
            ? "e"
            : null;
          onUpdateBlob(scaleBlob(blobReference, [x, y], vertical, horizontal));
        } else if (dragging.includes("rot")) {
          onUpdateBlob(rotateBlob(blobReference, initialCoordinate, [x, y]));
        }
      }}
      onMouseUp={_e => {
        if (dragging) {
          setDragging("");
          setBlobReference(null);
          setInitialCoordinate(null);
        }
      }}
      onMouseLeave={() => setCursor({ x: null, y: null })}
    >
      {/* {cursor.x != null && cursor.y != null && (
        <div
          id="cursor"
          className={[css.cursor]}
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: `rotate(${blob.rotate}deg)`,
            border: "1px solid black"
          }}
        >
          T
        </div>
      )} */}
      {children}
    </div>
  );
};
