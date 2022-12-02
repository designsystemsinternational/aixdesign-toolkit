import React from "react";

import { Button } from "@mechanic-design/ui-components";

import { parseBlob } from "./parse-blob";
import { ColorSelector } from "./ColorSelector";

import * as css from "./BlobForm.module.css";

const toolkitHelperCode = `<a
target="_blank"
rel="noopener noreferrer"
href="https://storage.googleapis.com/openimages/web/visualizer/index.html?type=segmentation"
>
Google Open Images Dataset
</a>`;

export const BlobForm = ({ onLoadBlob }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [color, setColor] = React.useState("#4874FD");
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadedObject, setLoadedObject] = React.useState(null);
  const showPreview = loadedObject != null;
  const showError = error !== "";

  return (
    <div className={css.root}>
      <div className={css.setupSection}>
        <h2>Add an Open Images blob!</h2>

        <p>
          To do so, first you need to add a bookmark to your browser. You can do
          so saving or dragging the following link your bookmarks:{" "}
          <a
            href={`javascript: (function () {
              const canCopyConClipboard = navigator?.clipboard?.writeText != null;
            
              navigator.clipboard.writeText("HEY");
            
              const svgString = document.getElementById("viewer_svg").outerHTML;
            
              const modalContainer = document.createElement("div");
              modalContainer.id = "modal";
              modalContainer.style = "position: fixed;inset: 0;z-index: 1000;";
            
              const backdrop = document.createElement("div");
              backdrop.style = "width: 100%;height: 100%;background: rgba(0,0,0,0.5);";
              modalContainer.appendChild(backdrop);
            
              const dialog = document.createElement("div");
              dialog.style =
                "position: absolute;inset: 20%; background: #ccc; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 12px;";
              modalContainer.appendChild(dialog);
            
              let textContent =
                "Copy the text in the textarea below me and paste it in the toolkit!";
            
              if (canCopyConClipboard) {
                navigator.clipboard.writeText(svgString);
                textContent =
                  "The following blob SVG data just got copied into your clipboard! Go paste it in the toolkit.";
              }
            
              const parrafo = document.createElement("p");
              parrafo.textContent = textContent;
              dialog.appendChild(parrafo);
            
              const textarea = document.createElement("textarea");
              textarea.value = svgString;
              dialog.appendChild(textarea);
            
              const body = document.getElementsByTagName("body")[0];
            
              const closeModal = () => {
                body.removeChild(modalContainer);
              };
            
              const closeButton = document.createElement("button");
              closeButton.style = "margin: 1em";
            
              closeButton.addEventListener("click", closeModal);
              backdrop.addEventListener("click", closeModal);
            
              closeButton.textContent = "Close this window after coping!";
              dialog.appendChild(closeButton);
            
              body.appendChild(modalContainer);
            }.call(this));
            
`}
          >
            Toolkit helper
          </a>
          . You only need to this step once.
        </p>
        <p>
          Then, go to{" "}
          <span dangerouslySetInnerHTML={{ __html: toolkitHelperCode }} />, go
          through the roaster, click to preview the blob you want to add, and
          while on preview mode click on the bookmark helper.
        </p>
        <textarea
          className={css.blobInput}
          rows="5"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />

        <Button
          onClick={async () => {
            let blobData;
            try {
              blobData = parseBlob(inputValue);
              setLoadedObject(blobData);
              setError("");
            } catch (e) {
              setError("Error loading blob!");
              console.error(e);
            }
          }}
        >
          Load blob!
        </Button>
      </div>
      <div className={css.loadingSection}>
        {showPreview && (
          <>
            <h2>Preview</h2>
            <div className={css.previews}>
              <svg viewBox={loadedObject.svgData.viewBox}>
                <image xlinkHref={loadedObject.href} />{" "}
                <path d={loadedObject.path} fill={color} />
              </svg>
              <svg viewBox={loadedObject.svgData.viewBox}>
                <defs>
                  <clipPath id="clip">
                    <path d={loadedObject.path} />
                  </clipPath>
                </defs>
                <image xlinkHref={loadedObject.href} clipPath="url(#clip)" />
              </svg>
              <svg viewBox={loadedObject.svgData.viewBox}>
                <path d={loadedObject.path} fill={color} />
              </svg>
            </div>
            <div className={css.colorSelectorContainer}>
              <ColorSelector value={color} onChange={setColor} />
            </div>
            <Button
              onClick={() => {
                onLoadBlob({ ...loadedObject, fill: color });
                setLoadedObject(null);
              }}
            >
              Add blob!
            </Button>
          </>
        )}
        {showError && <p>{error}</p>}
      </div>
    </div>
  );
};
