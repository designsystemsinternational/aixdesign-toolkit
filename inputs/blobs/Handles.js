import React from "react";

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
const halfRotationHandleSize = Math.floor(rotationHandleSize / 2);

const debug = true;

export const Handles = ({ blob }) => {
  if (blob == null) return null;

  const rotate = blob.rotate;
  const x0 = blob.pathExtent.x0 + blob.x;
  const y0 = blob.pathExtent.y0 + blob.y;
  const width = blob.scaleX * blob.pathExtent.width;
  const height = blob.scaleY * blob.pathExtent.height;

  console.log({ rotate });
  return (
    <>
      <div
        id="handler-body"
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
        style={{
          position: "absolute",
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
        id="handle-se-rot"
        style={{
          position: "absolute",
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
        id="handle-sw-rot"
        style={{
          position: "absolute",
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
        id="handle-nw-rot"
        style={{
          position: "absolute",
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

export const HandleContainer = ({
  width,
  height,
  offset,
  blob,
  children,
  onUpdateBlob
}) => {
  const [dragging, setDragging] = React.useState("");
  const [blobReference, setBlobReference] = React.useState(null);
  const [rotationInitialCoordinate, setRotationInitialCoordinate] =
    React.useState(null);

  const wrapperRef = React.useRef(null);

  return (
    <div
      id="handler-wrapper"
      ref={wrapperRef}
      style={{
        position: "absolute",
        top: offset.top,
        left: offset.left,
        width: width,
        height: height,
        overflow: "hidden"
      }}
      onMouseDown={e => {
        if (e.target.id.includes("handle")) {
          setBlobReference({ ...blob });
        }
        if (e.target.id.includes("rot")) {
          const { clientX, clientY } = e;
          const parentRect = wrapperRef.current.getBoundingClientRect();
          const x = clientX - parentRect.left;
          const y = clientY - parentRect.top;
          setRotationInitialCoordinate({ x, y });
        }
        if (e.target.id === "handler-body") {
          setDragging("body");
        }
        if (e.target.id === "handle-n") {
          setDragging("resize-n");
        }
        if (e.target.id === "handle-s") {
          setDragging("resize-s");
        }
        if (e.target.id === "handle-w") {
          setDragging("resize-w");
        }
        if (e.target.id === "handle-e") {
          setDragging("resize-e");
        }
        if (e.target.id === "handle-ne") {
          setDragging("resize-ne");
        }
        if (e.target.id === "handle-se") {
          setDragging("resize-se");
        }
        if (e.target.id === "handle-sw") {
          setDragging("resize-sw");
        }
        if (e.target.id === "handle-nw") {
          setDragging("resize-nw");
        }
        if (e.target.id === "handle-ne-rot") {
          setDragging("rotate-ne");
        }
        if (e.target.id === "handle-nw-rot") {
          setDragging("rotate-nw");
        }
        if (e.target.id === "handle-se-rot") {
          setDragging("rotate-se");
        }
        if (e.target.id === "handle-sw-rot") {
          setDragging("rotate-sw");
        }
      }}
      onMouseMove={e => {
        if (dragging === "body")
          onUpdateBlob(blob => ({
            x: blob.x + e.movementX,
            y: blob.y + e.movementY
          }));
        else if (dragging === "resize-n")
          onUpdateBlob(blob => {
            const newHeight =
              blob.pathExtent.height * blob.scaleY - e.movementY;
            const scaleY = newHeight / blob.pathExtent.height;
            return {
              y: blob.y + e.movementY,
              scaleY
            };
          });
        else if (dragging === "resize-s")
          onUpdateBlob(blob => {
            const newHeight =
              blob.pathExtent.height * blob.scaleY + e.movementY;
            const scaleY = newHeight / blob.pathExtent.height;
            return {
              scaleY
            };
          });
        else if (dragging === "resize-w")
          onUpdateBlob(blob => {
            const newWidth = blob.pathExtent.width * blob.scaleX - e.movementX;
            return {
              x: blob.x + e.movementX,
              scaleX: newWidth / blob.pathExtent.width
            };
          });
        else if (dragging === "resize-e")
          onUpdateBlob(blob => {
            const newWidth = blob.pathExtent.width * blob.scaleX + e.movementX;
            return {
              scaleX: newWidth / blob.pathExtent.width
            };
          });
        else if (dragging === "resize-ne")
          onUpdateBlob(blob => {
            const { clientX, clientY } = e;
            const parentRect = wrapperRef.current.getBoundingClientRect();
            const x = clientX - parentRect.left;
            const y = clientY - parentRect.top;

            const height =
              blobReference.pathExtent.height * blobReference.scaleY;
            const width = blobReference.pathExtent.width * blobReference.scaleX;
            const y0 = blobReference.y + blobReference.pathExtent.y0;
            const x1 = blobReference.x + blobReference.pathExtent.x0 + width;
            const ratio = height / width;
            const dy = y0 - y;
            const dx = x - x1;
            let newHeight = height;
            let newWidth = width;
            let diff = 0;
            if (dy > dx * ratio) {
              newHeight = height + dy;
              newWidth = newHeight / ratio;
              diff = dy;
            } else {
              newWidth = width + dx;
              newHeight = newWidth * ratio;
              diff = dx * ratio;
            }
            const scaleY = newHeight / blobReference.pathExtent.height;
            const scaleX = newWidth / blobReference.pathExtent.width;
            return {
              y: blobReference.y - diff,
              scaleY,
              scaleX
            };
          });
        else if (dragging === "resize-se")
          onUpdateBlob(blob => {
            const { clientX, clientY } = e;
            const parentRect = wrapperRef.current.getBoundingClientRect();
            const x = clientX - parentRect.left;
            const y = clientY - parentRect.top;

            const height =
              blobReference.pathExtent.height * blobReference.scaleY;
            const width = blobReference.pathExtent.width * blobReference.scaleX;
            const y1 = blobReference.y + blobReference.pathExtent.y0 + height;
            const x1 = blobReference.x + blobReference.pathExtent.x0 + width;
            const ratio = height / width;
            const dy = y - y1;
            const dx = x - x1;
            let newHeight = height;
            let newWidth = width;
            let diff = 0;
            if (dy > dx * ratio) {
              newHeight = height + dy;
              newWidth = newHeight / ratio;
              diff = dy;
            } else {
              newWidth = width + dx;
              newHeight = newWidth * ratio;
              diff = dx * ratio;
            }
            // console.log({ newHeight, newWidth, dy, dx, diff });
            const scaleY = newHeight / blobReference.pathExtent.height;
            const scaleX = newWidth / blobReference.pathExtent.width;
            return {
              scaleY,
              scaleX
            };
          });
        else if (dragging === "resize-sw")
          onUpdateBlob(blob => {
            const { clientX, clientY } = e;
            const parentRect = wrapperRef.current.getBoundingClientRect();
            const x = clientX - parentRect.left;
            const y = clientY - parentRect.top;

            const height =
              blobReference.pathExtent.height * blobReference.scaleY;
            const width = blobReference.pathExtent.width * blobReference.scaleX;
            const y1 = blobReference.y + blobReference.pathExtent.y0 + height;
            const x0 = blobReference.x + blobReference.pathExtent.x0;
            const ratio = height / width;
            const dy = y - y1;
            const dx = -(x - x0);
            let newHeight = height;
            let newWidth = width;
            let diff = 0;
            if (dy > dx * ratio) {
              newHeight = height + dy;
              newWidth = newHeight / ratio;
              diff = dy / ratio;
            } else {
              newWidth = width + dx;
              newHeight = newWidth * ratio;
              diff = dx;
            }
            const scaleY = newHeight / blobReference.pathExtent.height;
            const scaleX = newWidth / blobReference.pathExtent.width;
            return {
              x: blobReference.x - diff,
              scaleY,
              scaleX
            };
          });
        else if (dragging === "resize-nw")
          onUpdateBlob(blob => {
            const { clientX, clientY } = e;
            const parentRect = wrapperRef.current.getBoundingClientRect();
            const x = clientX - parentRect.left;
            const y = clientY - parentRect.top;

            const height =
              blobReference.pathExtent.height * blobReference.scaleY;
            const width = blobReference.pathExtent.width * blobReference.scaleX;
            const y0 = blobReference.y + blobReference.pathExtent.y0;
            const x0 = blobReference.x + blobReference.pathExtent.x0;
            const ratio = height / width;
            const dy = -(y - y0);
            const dx = -(x - x0);
            let newHeight = height;
            let newWidth = width;
            let diffX = 0;
            let diffY = 0;
            if (dy > dx * ratio) {
              newHeight = height + dy;
              newWidth = newHeight / ratio;
              diffX = dy / ratio;
              diffY = dy;
            } else {
              newWidth = width + dx;
              newHeight = newWidth * ratio;
              diffX = dx;
              diffY = dx * ratio;
            }
            const scaleY = newHeight / blobReference.pathExtent.height;
            const scaleX = newWidth / blobReference.pathExtent.width;
            return {
              x: blobReference.x - diffX,
              y: blobReference.y - diffY,
              scaleY,
              scaleX
            };
          });
        else if (dragging.includes("rotate"))
          onUpdateBlob(blob => {
            const { clientX, clientY } = e;
            const parentRect = wrapperRef.current.getBoundingClientRect();
            const x = clientX - parentRect.left;
            const y = clientY - parentRect.top;

            const width = blobReference.pathExtent.width * blobReference.scaleX;
            const height =
              blobReference.pathExtent.height * blobReference.scaleY;
            const cy =
              blobReference.y + blobReference.pathExtent.y0 + height / 2;
            const cx =
              blobReference.x + blobReference.pathExtent.x0 + width / 2;

            const cdy = -(rotationInitialCoordinate.y - cy);
            const cdx = rotationInitialCoordinate.x - cx;
            const referenceAngle = (Math.atan(cdy / cdx) * 180) / Math.PI;

            const dy = -(y - cy);
            const dx = x - cx;
            // console.log({ dx, dy });
            const angle =
              ((dx > 0 ? Math.atan(dy / dx) : Math.atan(dy / dx) + Math.PI) *
                180) /
              Math.PI;
            const dAngle = referenceAngle - angle;

            const rotation = blobReference.rotate + dAngle;

            return {
              rotate: rotation
            };
          });
      }}
      onMouseUp={e => {
        if (dragging) {
          setDragging("");
          setBlobReference(null);
          setRotationInitialCoordinate(null);
        }
      }}
    >
      {children}
    </div>
  );
};
