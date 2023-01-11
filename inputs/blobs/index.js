import React from "react";
import ReactDOM from "react-dom";

import { Modal } from "./components/Modal";
import { BlobForm } from "./components/BlobForm";
import { BlobElementControl } from "./components/BlobElementControl";
import {
  HandleContainer,
  Handles,
  updateBlobTransform
} from "./components/Handles";

import "../../assets/fonts.css";
import * as css from "./styles.module.css";

export const initValue = input => ({ blobs: [], selected: -1 });

export const prepareValue = (value, input) => {
  return value == null ? { blobs: [], selected: -1 } : value;
};

export const Input = ({ name, values, onChange }) => {
  const { blobs, selected } = values[name] ?? { blobs: [], selected: -1 };

  const [openModal, setOpenModal] = React.useState(false);

  const selectBlob = index => {
    onChange(null, name, {
      blobs,
      selected: selected !== index ? index : -1
    });
  };

  const moveBlob = (index1, index2) => {
    if (index2 < 0 || index2 >= blobs.length) return;
    const copy = [...blobs];
    const aux = copy[index1];
    copy[index1] = copy[index2];
    copy[index2] = aux;
    let newSelected = selected;
    if (selected === index1) {
      newSelected = index2;
    }
    if (selected === index2) {
      newSelected = index1;
    }
    onChange(null, name, { blobs: copy, selected: newSelected });
  };
  const removeBlob = index => {
    const filteredBlobs = blobs.filter((_, idx) => idx != index);
    let newSelected = selected;
    if (selected === index) {
      newSelected = -1;
    }
    onChange(null, name, { blobs: filteredBlobs, selected: newSelected });
  };

  const mainRef = React.useRef(null);

  React.useEffect(() => {
    mainRef.current = document.getElementsByClassName("App-module__main")[0];
    mainRef.current.style = "position: relative;";
  }, []);

  let width = values.width;
  let height = values.height;
  let ratio = 1;

  const boundingClient = mainRef.current?.getBoundingClientRect();

  if (boundingClient) {
    const bounds = {
      width: boundingClient.width - 100,
      height: boundingClient.height - 100
    };
    const ratioWidth = bounds.width ? bounds.width / values.width : 1;
    const ratioHeight = bounds.height ? bounds.height / values.height : 1;
    if (ratioWidth < 1 || ratioHeight < 1) {
      ratio = ratioWidth < ratioHeight ? ratioWidth : ratioHeight;
      width = Math.floor(values.width * ratio);
      height = Math.floor(values.height * ratio);
    }
  }

  return (
    <div className={css.container}>
      <label>Blob background</label>
      <div className={css.newBlobContainer}>
        <button className={css.newBlob} onClick={() => setOpenModal(true)}>
          <svg viewBox="0 0 20 20" width={20}>
            <path d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"></path>
            <path
              transform="rotate(90 10 10)"
              d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"
            ></path>
          </svg>
        </button>
      </div>

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
              onClick={() => selectBlob(index)}
              onMoveUp={() => moveBlob(index, index - 1)}
              onMoveDown={() => moveBlob(index, index + 1)}
              onRemove={() => removeBlob(index)}
            />
          ))
        )}
      </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <BlobForm
            onLoadBlob={newBlob => {
              setOpenModal(false);
              onChange(null, name, { blobs: [...blobs, newBlob], selected });
            }}
          />
        </Modal>
      )}

      {mainRef.current &&
        ReactDOM.createPortal(
          <HandleContainer
            ratio={ratio}
            width={width}
            height={height}
            offset={{ top: "1em", left: "1em" }}
            blob={selected > -1 ? blobs[selected] : null}
            onUpdateBlob={changes => {
              const blobsCopy = [...blobs];
              let selectedBlobCopy = {
                ...blobs[selected]
              };
              if (changes.scaleX && changes.scaleX <= 0) return;
              if (changes.scaleY && changes.scaleY <= 0) return;
              selectedBlobCopy = {
                ...selectedBlobCopy,
                ...changes
              };
              updateBlobTransform(selectedBlobCopy);
              blobsCopy[selected] = selectedBlobCopy;
              onChange(null, name, { blobs: blobsCopy, selected });
            }}
            onUnselectBlob={() => selectBlob(-1)}
          >
            {
              <svg
                id="shadow-svg"
                style={{ position: "absolute", top: 0, left: 0, width, height }}
              >
                <g transform={`scale(${ratio})`}>
                  {blobs.map(({ path, transform }, index) => (
                    <path
                      key={index}
                      d={path}
                      id={`shadow-path-${index}`}
                      fill="transparent"
                      stroke="transparent"
                      strokeWidth={0}
                      transform={transform}
                      style={{ cursor: "pointer" }}
                      onClick={() => selectBlob(index)}
                    />
                  ))}
                </g>
              </svg>
            }
            {selected > -1 && (
              <Handles
                ratio={ratio}
                blob={selected > -1 ? blobs[selected] : null}
              />
            )}
          </HandleContainer>,
          mainRef.current
        )}
    </div>
  );
};
