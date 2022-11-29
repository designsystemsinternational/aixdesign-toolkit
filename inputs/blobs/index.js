import React from "react";
import ReactDOM from "react-dom";

import { Modal } from "./Modal";
import { BlobForm } from "./BlobForm";

import * as css from "./styles.module.css";

export const initValue = input => [];

export const prepareValue = (value, input) => {
  return value == null ? [] : value;
};

const updateTransform = blob => {
  const { x, y, scaleX, scaleY, rotate, pathExtent } = blob;
  blob.transform = `translate(${x} ${y}) rotate(${rotate} ${
    pathExtent.x0 + (blob.scaleX * pathExtent.width) / 2
  } ${pathExtent.y0 + (blob.scaleY * pathExtent.height) / 2}) translate(${
    pathExtent.x0
  } ${
    pathExtent.y0
  }) scale(${scaleX} ${scaleY}) translate(${-pathExtent.x0} ${-pathExtent.y0})`;
};

// Icons from http://svgicons.sparkk.fr/

const BlobElementControl = ({
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
      className={css.blobElement}
      key={index}
      style={{ background: selected ? "#eee" : "transparent" }}
    >
      <button className={css.blobControl} onClick={onClick}>
        Select
      </button>
      <button
        className={css.blobControl}
        onClick={() => onMoveUp()}
        disabled={disableMoveUp}
      >
        <svg viewBox="0 0 20 20" width={20}>
          <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
        </svg>
      </button>
      <button
        className={css.blobControl}
        onClick={() => onMoveDown()}
        disabled={disableMoveDown}
      >
        <svg viewBox="0 0 20 20" width={20}>
          <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
        </svg>
      </button>
      <button className={css.blobControl} onClick={() => onRemove()}>
        <svg viewBox="0 0 20 20" width={20}>
          <path d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"></path>
        </svg>
      </button>
      <svg className={css.blobSvg} viewBox={viewBox}>
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
};

const Handles = ({ blob }) => {
  if (blob == null) return null;
  return (
    <>
      <div
        id="handler-body"
        style={{
          position: "absolute",
          border: "1px dashed black",
          left: blob.pathExtent.x0 + blob.x,
          top: blob.pathExtent.y0 + blob.y,
          height: blob.scaleY * blob.pathExtent.height,
          width: blob.scaleX * blob.pathExtent.width,
          cursor: "move"
        }}
      />
      <div
        id="handle-n"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left: blob.pathExtent.x0 + blob.x,
          top: blob.pathExtent.y0 + blob.y - 3,
          height: 7,
          width: blob.scaleX * blob.pathExtent.width,
          cursor: "ns-resize"
        }}
      />
      <div
        id="handle-e"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left:
            blob.pathExtent.x0 +
            blob.x +
            blob.scaleX * blob.pathExtent.width -
            4,
          top: blob.pathExtent.y0 + blob.y,
          height: blob.scaleY * blob.pathExtent.height,
          width: 7,
          cursor: "ew-resize"
        }}
      />
      {/* <div
        id="handle-ne-rot"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left:
            blob.pathExtent.x0 +
            blob.x +
            blob.scaleX * blob.pathExtent.width -
            4,
          top: blob.pathExtent.y0 + blob.y - 17,
          height: 20,
          width: 20,
          cursor: "nwse-resize"
        }}
      /> */}
      <div
        id="handle-ne"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left:
            blob.pathExtent.x0 +
            blob.x +
            blob.scaleX * blob.pathExtent.width -
            4,
          top: blob.pathExtent.y0 + blob.y - 3,
          height: 7,
          width: 7,
          cursor: "nesw-resize"
        }}
      />
      <div
        id="handle-s"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left: blob.pathExtent.x0 + blob.x,
          top:
            blob.pathExtent.y0 +
            blob.y +
            blob.scaleY * blob.pathExtent.height -
            4,
          height: 7,
          width: blob.scaleX * blob.pathExtent.width,
          cursor: "ns-resize"
        }}
      />
      <div
        id="handle-se"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left:
            blob.pathExtent.x0 +
            blob.x +
            blob.scaleX * blob.pathExtent.width -
            4,
          top:
            blob.pathExtent.y0 +
            blob.y +
            blob.scaleY * blob.pathExtent.height -
            4,
          height: 7,
          width: 7,
          cursor: "nwse-resize"
        }}
      />
      <div
        id="handle-w"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left: blob.pathExtent.x0 + blob.x - 3,
          top: blob.pathExtent.y0 + blob.y,
          height: blob.scaleY * blob.pathExtent.height,
          width: 7,
          cursor: "ew-resize"
        }}
      />
      <div
        id="handle-sw"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left: blob.pathExtent.x0 + blob.x + -4,
          top:
            blob.pathExtent.y0 +
            blob.y +
            blob.scaleY * blob.pathExtent.height -
            4,
          height: 7,
          width: 7,
          cursor: "nesw-resize"
        }}
      />
      <div
        id="handle-nw"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left: blob.pathExtent.x0 + blob.x - 4,
          top: blob.pathExtent.y0 + blob.y - 4,
          height: 7,
          width: 7,
          cursor: "nwse-resize"
        }}
      />
    </>
  );
};

export const Input = ({ name, values, onChange }) => {
  const blobs = values[name] ?? [];

  // console.log({ blobs });

  const [openModal, setOpenModal] = React.useState(false);
  const [selected, setSelected] = React.useState(-1);
  const [dragging, setDragging] = React.useState("");

  const moveBlob = (index1, index2) => {
    if (index2 < 0 || index2 >= blobs.length) return;
    const copy = [...blobs];
    const aux = copy[index1];
    copy[index1] = copy[index2];
    copy[index2] = aux;
    onChange(null, name, copy);
  };
  const removeBlob = index => {
    const filteredBlobs = blobs.filter((_, idx) => idx != index);
    onChange(null, name, filteredBlobs);
  };

  const mainRef = React.useRef(null);

  React.useEffect(() => {
    mainRef.current = document.getElementsByClassName("App-module__main")[0];
    mainRef.current.style = "position: relative;";
  }, []);

  return (
    <div className={css.container}>
      <label>Blobs</label>
      <div className={css.blobContainer}>
        {blobs.length === 0 ? (
          <p>No blobs loaded!</p>
        ) : (
          blobs.map((blob, index) => (
            <BlobElementControl
              key={index}
              selected={index === selected}
              blob={blob}
              disableMoveUp={index === 0}
              disableMoveDown={index === blobs.length - 1}
              onClick={() => setSelected(s => (s !== index ? index : -1))}
              onMoveUp={() => moveBlob(index, index - 1)}
              onMoveDown={() => moveBlob(index, index + 1)}
              onRemove={() => removeBlob(index)}
            />
          ))
        )}
      </div>
      <div className={css.newBlobContainer}>
        <button className={css.newBlob} onClick={() => setOpenModal(true)}>
          Add new blob
        </button>
      </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <BlobForm
            onLoadBlob={newBlob => {
              setOpenModal(false);
              onChange(null, name, [...blobs, newBlob]);
            }}
          />
        </Modal>
      )}

      {mainRef.current &&
        // App-module__main
        ReactDOM.createPortal(
          <div>
            {selected > -1 && (
              <div
                style={{
                  position: "absolute",
                  top: "1em",
                  left: "1em",
                  width: values.width,
                  height: values.height,
                  overflow: "hidden"
                }}
                onMouseDown={e => {
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
                  // if (e.target.id === "handle-ne-rot") {
                  //   setDragging("rotate-ne");
                  // }
                }}
                onMouseMove={e => {
                  if (dragging === "body") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    newBlob = {
                      ...newBlob,
                      x: newBlob.x + e.movementX,
                      y: newBlob.y + e.movementY
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    onChange(null, name, copy);
                  }
                  if (dragging === "resize-n") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    const newHeight =
                      newBlob.pathExtent.height * newBlob.scaleY - e.movementY;
                    console.log(
                      newHeight,
                      newBlob.pathExtent.height,
                      newHeight / newBlob.pathExtent.height
                    );
                    const scaleY = newHeight / newBlob.pathExtent.height;
                    newBlob = {
                      ...newBlob,
                      y: newBlob.y + e.movementY,
                      scaleY
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    console.log({ prev: blobs[selected].y, new: newBlob.y });
                    onChange(null, name, copy);
                  }

                  if (dragging === "resize-s") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    const newHeight =
                      newBlob.pathExtent.height * newBlob.scaleY + e.movementY;
                    console.log(
                      newHeight,
                      newBlob.pathExtent.height,
                      newHeight / newBlob.pathExtent.height
                    );
                    newBlob = {
                      ...newBlob,
                      scaleY: newHeight / newBlob.pathExtent.height
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    console.log({ prev: blobs[selected].y, new: newBlob.y });
                    onChange(null, name, copy);
                  }
                  if (dragging === "resize-w") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    const newWidth =
                      newBlob.pathExtent.width * newBlob.scaleX - e.movementX;
                    console.log(
                      newWidth,
                      newBlob.pathExtent.width,
                      newWidth / newBlob.pathExtent.width
                    );
                    newBlob = {
                      ...newBlob,
                      x: newBlob.x + e.movementX,
                      scaleX: newWidth / newBlob.pathExtent.width
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    console.log({ prev: blobs[selected].y, new: newBlob.y });
                    onChange(null, name, copy);
                  }
                  if (dragging === "resize-e") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    const newWidth =
                      newBlob.pathExtent.width * newBlob.scaleX + e.movementX;
                    console.log(
                      newWidth,
                      newBlob.pathExtent.width,
                      newWidth / newBlob.pathExtent.width
                    );
                    newBlob = {
                      ...newBlob,
                      scaleX: newWidth / newBlob.pathExtent.width
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    console.log({ prev: blobs[selected].y, new: newBlob.y });
                    onChange(null, name, copy);
                  }
                  if (dragging === "resize-ne") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    const newHeight =
                      newBlob.pathExtent.height * newBlob.scaleY - e.movementY;
                    const newWidth =
                      newBlob.pathExtent.width * newBlob.scaleX + e.movementX;
                    const scaleY = newHeight / newBlob.pathExtent.height;
                    const scaleX = newWidth / newBlob.pathExtent.width;
                    newBlob = {
                      ...newBlob,
                      y: newBlob.y + e.movementY,
                      scaleY,
                      scaleX
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    console.log({ prev: blobs[selected].y, new: newBlob.y });
                    onChange(null, name, copy);
                  }
                  if (dragging === "resize-se") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    const newHeight =
                      newBlob.pathExtent.height * newBlob.scaleY + e.movementY;
                    const newWidth =
                      newBlob.pathExtent.width * newBlob.scaleX + e.movementX;
                    const scaleY = newHeight / newBlob.pathExtent.height;
                    const scaleX = newWidth / newBlob.pathExtent.width;
                    newBlob = {
                      ...newBlob,
                      scaleY,
                      scaleX
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    console.log({ prev: blobs[selected].y, new: newBlob.y });
                    onChange(null, name, copy);
                  }
                  if (dragging === "resize-sw") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    const newHeight =
                      newBlob.pathExtent.height * newBlob.scaleY + e.movementY;
                    const newWidth =
                      newBlob.pathExtent.width * newBlob.scaleX - e.movementX;
                    const scaleY = newHeight / newBlob.pathExtent.height;
                    const scaleX = newWidth / newBlob.pathExtent.width;
                    newBlob = {
                      ...newBlob,
                      x: newBlob.x + e.movementX,
                      scaleY,
                      scaleX
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    console.log({ prev: blobs[selected].y, new: newBlob.y });
                    onChange(null, name, copy);
                  }
                  if (dragging === "resize-nw") {
                    const copy = [...blobs];
                    let newBlob = {
                      ...blobs[selected]
                    };
                    const newHeight =
                      newBlob.pathExtent.height * newBlob.scaleY - e.movementY;
                    const newWidth =
                      newBlob.pathExtent.width * newBlob.scaleX - e.movementX;
                    const scaleY = newHeight / newBlob.pathExtent.height;
                    const scaleX = newWidth / newBlob.pathExtent.width;
                    newBlob = {
                      ...newBlob,
                      x: newBlob.x + e.movementX,
                      y: newBlob.y + e.movementY,
                      scaleY,
                      scaleX
                    };
                    updateTransform(newBlob);
                    copy[selected] = newBlob;
                    console.log({ prev: blobs[selected].y, new: newBlob.y });
                    onChange(null, name, copy);
                  }
                  // if (dragging === "rotate-ne") {
                  //   const copy = [...blobs];
                  //   let newBlob = {
                  //     ...blobs[selected]
                  //   };
                  //   const newHeight =
                  //     newBlob.pathExtent.height * newBlob.scaleY - e.movementY;
                  //   const newWidth =
                  //     newBlob.pathExtent.width * newBlob.scaleX - e.movementX;
                  //   const rotation = newBlob.rotate + 10;
                  //   newBlob = {
                  //     ...newBlob,
                  //     rotate: rotation
                  //   };
                  //   updateTransform(newBlob);
                  //   copy[selected] = newBlob;
                  //   console.log({ prev: blobs[selected].y, new: newBlob.y });
                  //   onChange(null, name, copy);
                  // }
                }}
                onMouseUp={e => {
                  if (dragging) {
                    setDragging("");
                  }
                }}
              >
                <Handles blob={selected > -1 ? blobs[selected] : null} />
              </div>
            )}
          </div>,
          mainRef.current
        )}
    </div>
  );
};
