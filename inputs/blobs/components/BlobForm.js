import React from "react";

import { Button } from "@mechanic-design/ui-components";

import { parseBlob } from "../utils/parse-blob.js";
import { bookmarkletCode } from "../utils/bookmarklet.js";
import { ColorSelector } from "./ColorSelector";

import * as css from "./BlobForm.module.css";
import { colors } from "../../../identity/colors.js";

const FirstStep = ({ onNextStep, setLoadedObject }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState("");
  const showError = error !== "";

  return (
    <div className={css.setupSection}>
      <h2>Use this bookmarklet to insert a blob from Open Images</h2>
      <p>
        Add the AIxDesign bookmarklet to your browser by dragging the following
        link your bookmarks bar. You'll only need to do this step once.
      </p>

      <p
        dangerouslySetInnerHTML={{
          __html: `<a class="${css.bookmarkletButton}" href="${encodeURI(
            bookmarkletCode
          )}">AIxDesign Toolkit helper</a>`
        }}
      />

      <p>
        Then, go to{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://storage.googleapis.com/openimages/web/visualizer/index.html?type=segmentation"
        >
          Google Open Images Dataset
        </a>{" "}
        to find the image/blob you want to add. Click on a tile to open the
        preview view, and then click on the bookmark helper to generate and grab
        the svg blob.
      </p>
      <p>
        The helper with generate a svg object from the preview and copy it to
        your clipboard. <br />
        After doing it, come back to this window to paste the code in the field
        below and press <strong>Load blob</strong>
      </p>
      <textarea
        className={css.blobInput}
        rows="3"
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
        Load blob
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
  const [strokeWidth, setStrokeWidth] = React.useState(2);
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
        <svg viewBox={loadedObject.svgData.viewBox} height={100}>
          <image xlinkHref={loadedObject.href} />{" "}
          <path
            d={loadedObject.path}
            fill="rgba(2555,0,255,0.5)"
            stroke="black"
            strokeWidth="5"
          />
        </svg>

        <svg viewBox={loadedObject.svgData.viewBox} height={100}>
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

        <svg viewBox={loadedObject.svgData.viewBox} height={100}>
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
          height={150}
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
          onLoadBlob({ ...loadedObject, fill, stroke, strokeWidth });
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
