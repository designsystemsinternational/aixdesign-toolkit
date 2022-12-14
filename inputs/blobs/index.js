import React from "react";
import ReactDOM from "react-dom";

import { Modal } from "./Modal";
import { BlobForm } from "./BlobForm";
import { BlobElementControl } from "./BlobElementControl";
import { HandleContainer, Handles, updateBlobTransform } from "./Handles";

import * as css from "./styles.module.css";

export const initValue = input => [];

export const prepareValue = (value, input) => {
  return value == null ? [] : value;
};

export const Input = ({ name, values, onChange }) => {
  const blobs = values[name] ?? [];

  // console.log({ blobs });

  const [openModal, setOpenModal] = React.useState(false);
  const [selected, setSelected] = React.useState(-1);

  const moveBlob = (index1, index2) => {
    if (index2 < 0 || index2 >= blobs.length) return;
    const copy = [...blobs];
    const aux = copy[index1];
    copy[index1] = copy[index2];
    copy[index2] = aux;
    if (selected === index1) {
      setSelected(index2);
    }
    if (selected === index2) {
      setSelected(index1);
    }
    onChange(null, name, copy);
  };
  const removeBlob = index => {
    const filteredBlobs = blobs.filter((_, idx) => idx != index);
    if (selected === index) {
      setSelected(-1);
    }
    onChange(null, name, filteredBlobs);
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
        ReactDOM.createPortal(
          selected > -1 && (
            <HandleContainer
              ratio={ratio}
              width={width}
              height={height}
              offset={{ top: "1em", left: "1em" }}
              blob={blobs[selected]}
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
                onChange(null, name, blobsCopy);
              }}
            >
              <Handles
                ratio={ratio}
                blob={selected > -1 ? blobs[selected] : null}
              />
            </HandleContainer>
          ),
          mainRef.current
        )}
    </div>
  );
};
