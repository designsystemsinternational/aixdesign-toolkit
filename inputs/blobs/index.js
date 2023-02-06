import React from "react";
import ReactDOM from "react-dom";

import { Button } from "@mechanic-design/ui-components";
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
import { Add } from "./components/Icons";

const KEYS = {
  UP: 38,
  DOWN: 40,
  DELETE: 8
};

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

    onChange(null, name, { blobs: copy, selected: index2 });
  };

  const modifyBlob = (index, newBlob) => {
    const copy = [...blobs];
    copy[index] = { ...copy[index], ...newBlob };
    onChange(null, name, { blobs: copy, selected });
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

  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (!inputRef.current) return;
    const handleKeydown = evt => {
      if (
        Object.values(KEYS).includes(evt.keyCode) &&
        selected > -1 &&
        "INPUT" !== evt.target.tagName
      ) {
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.keyCode == KEYS.UP) {
          moveBlob(selected, selected + 1);
        } else if (evt.keyCode == KEYS.DOWN) {
          moveBlob(selected, selected - 1);
        } else if (evt.keyCode == KEYS.DELETE) {
          removeBlob(selected);
        }
      }
    };

    inputRef.current.addEventListener("keydown", handleKeydown);
    return () => {
      inputRef.current &&
        inputRef.current.removeEventListener("keydown", handleKeydown);
    };
  }, [inputRef, selected]);

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
      <div className={css.newBlobContainer}>
        <button className={css.newBlob} onClick={() => setOpenModal(true)}>
          <Add />
        </button>
      </div>

      <div className={css.blobContainer} ref={inputRef} tabIndex="-1">
        {blobs.length === 0 ? (
          <Button className={css.firstBlob} onClick={() => setOpenModal(true)}>
            Load your first blob
          </Button>
        ) : (
          blobs.map((blob, index) => (
            <BlobElementControl
              key={index}
              selected={index === selected}
              blob={blob}
              disableMoveUp={index === blobs.length - 1}
              disableMoveDown={index === 0}
              onClick={() => selectBlob(index)}
              onMoveUp={() => moveBlob(index, index + 1, 1)}
              onMoveDown={() => moveBlob(index, index - 1, 1)}
              onRemove={() => removeBlob(index)}
              onModify={newBlob => modifyBlob(index, newBlob)}
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
