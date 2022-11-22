javascript: (function () {
  const svgString = document.getElementById("viewer_svg").outerHTML;

  const modalContainer = document.createElement("div");
  modalContainer.id = "modal";
  modalContainer.style = "position: fixed;inset: 0;z-index: 1000;";

  const backdrop = document.createElement("div");
  backdrop.style = "width: 100%;height: 100%;background: rgba(0,0,0,0.5);";
  modalContainer.appendChild(backdrop);

  const dialog = document.createElement("div");
  dialog.style =
    "position: absolute;inset: 30%; background: #ccc; display: flex; flex-direction: column; justify-content: center; align-items: center;";
  modalContainer.appendChild(dialog);

  const parrafo = document.createElement("p");
  parrafo.textContent =
    "Copy the text in the textarea below me and paste it in the toolkit!";
  dialog.appendChild(parrafo);

  const textarea = document.createElement("textarea");
  textarea.value = svgString;
  dialog.appendChild(textarea);

  const body = document.getElementsByTagName("body")[0];

  const closeModal = () => {
    body.removeChild(modalContainer);
  };

  const closeButton = document.createElement("button");
  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  closeButton.textContent = "Close this window after coping!";
  dialog.appendChild(closeButton);

  body.appendChild(modalContainer);
}.call(this));
