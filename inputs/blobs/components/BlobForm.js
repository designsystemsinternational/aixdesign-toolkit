import React from "react";

import { Button } from "@mechanic-design/ui-components";

import { parseBlob } from "../utils/parse-blob.js";
import { bookletCode } from "../utils/bookmarklet.js";
import { ColorSelector } from "./ColorSelector";

import * as css from "./BlobForm.module.css";
import { colors } from "../../../identity/colors.js";

const toolkitHelperCode = `<a
target="_blank"
rel="noopener noreferrer"
href="https://storage.googleapis.com/openimages/web/visualizer/index.html?type=segmentation"
>
Google Open Images Dataset
</a>`;

const FirstStep = ({ onNextStep, setLoadedObject }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState("");
  const showError = error !== "";

  return (
    <div className={css.setupSection}>
      <h2>Add an Open Images blob!</h2>
      <p>
        To do so, first you need to add a bookmark to your browser. You can do
        so saving or dragging the following link your bookmarks:{" "}
        <a href={bookletCode}>AIxDesign Toolkit helper</a>. You only need to
        this step once.
      </p>
      <p>
        Then, go to{" "}
        <span dangerouslySetInnerHTML={{ __html: toolkitHelperCode }} />, go
        through the roaster, click to preview the blob you want to add, and
        while on preview mode click on the bookmark helper.
      </p>
      <p>
        Then copy over the blob code you'll get from the helper and press the
        button:
      </p>
      <textarea
        className={css.blobInput}
        rows="5"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {showError && <p className={css.errorMessage}>{error}</p>}
      <Button
        onClick={async () => {
          let blobData;
          try {
            blobData = parseBlob(inputValue);
            setLoadedObject(blobData);
            setError("");
            onNextStep();
          } catch (e) {
            setError("Error loading blob! Did you copy over the correct code?");
            console.error(e);
          }
        }}
      >
        Load blob!
      </Button>
    </div>
  );
};

const SecondStep = ({
  onPreviousStep,
  loadedObject,
  setLoadedObject,
  onLoadBlob
}) => {
  const [fill, setFill] = React.useState(colors.brighter[0]);
  const [stroke, setStroke] = React.useState(colors.darker[0]);

  return (
    <div className={css.loadingSection}>
      <Button
        className={css.backButton}
        onClick={() => {
          onPreviousStep();
        }}
      >
        Back
      </Button>
      <p>Loaded blob and image:</p>
      <div className={css.previews}>
        <svg viewBox={loadedObject.svgData.viewBox}>
          <image xlinkHref={loadedObject.href} />{" "}
          <path
            d={loadedObject.path}
            fill="rgba(2555,0,255,0.5)"
            stroke="black"
            strokeWidth="5"
          />
        </svg>

        <svg viewBox={loadedObject.svgData.viewBox}>
          <defs>
            <clipPath id="clip">
              <path d={loadedObject.path} />
            </clipPath>
          </defs>
          <rect
            width={loadedObject.svgData.width}
            height={loadedObject.svgData.height}
            fill="white"
          />
          <image xlinkHref={loadedObject.href} clipPath="url(#clip)" />
        </svg>

        <svg viewBox={loadedObject.svgData.viewBox}>
          <rect
            width={loadedObject.svgData.width}
            height={loadedObject.svgData.height}
            fill="white"
          />
          <path
            d={loadedObject.path}
            fill="rgba(2555,0,255,0.5)"
            stroke="black"
            strokeWidth="10"
          />
        </svg>
      </div>

      <p>Choose colors:</p>

      <div className={css.colors}>
        <div className={css.colorSelectorContainer}>
          <label>Fill</label>
          <ColorSelector value={fill} onChange={setFill} size={20} />
        </div>
        <div className={css.colorSelectorContainer}>
          <label>Stroke</label>
          <ColorSelector value={stroke} onChange={setStroke} size={20} />
        </div>
      </div>

      <p>Preview:</p>
      <div className={css.previews}>
        <svg
          viewBox={`0 0 ${loadedObject.pathExtent.width} ${loadedObject.pathExtent.height}`}
          height={200}
        >
          <g transform={loadedObject.transform}>
            <path
              d={loadedObject.path}
              fill={fill}
              stroke={stroke}
              strokeWidth="10"
            />
          </g>
        </svg>
      </div>

      <Button
        onClick={() => {
          onLoadBlob({ ...loadedObject, fill, stroke });
          setLoadedObject(null);
          onPreviousStep();
        }}
      >
        Add blob!
      </Button>
    </div>
  );
};

export const BlobForm = ({ onLoadBlob }) => {
  const [showFirstStep, setShowFirstStep] = React.useState(true);
  const [loadedObject, setLoadedObject] = React.useState(null);

  return (
    <div className={css.root}>
      {showFirstStep ? (
        <FirstStep
          loadedObject={loadedObject}
          setLoadedObject={setLoadedObject}
          onNextStep={() => setShowFirstStep(false)}
        />
      ) : (
        <SecondStep
          loadedObject={loadedObject}
          setLoadedObject={setLoadedObject}
          onPreviousStep={() => setShowFirstStep(true)}
          onLoadBlob={onLoadBlob}
        />
      )}
    </div>
  );
};
