javascript: (function () {
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
});

export const bookletCode = `javascript: (function () {
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

`;
