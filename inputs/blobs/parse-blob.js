const parseViewBox = stringValue => {
  const [x1, y1, x2, y2] = stringValue.split(" ");
  return [x2 - x1, y2 - y1];
};

export const parseBlob = htmlString => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(htmlString, "text/html");
  const svg = parsed.querySelector("#viewer_svg");
  const image = parsed.querySelector("#viewer_svg #viewer_im");
  const pathElement = parsed.querySelector("#viewer_svg path");

  const viewBox = svg.getAttribute("viewBox");
  const [width, height] = parseViewBox(viewBox);
  const object = {
    viewBox,
    width,
    height,
    href: image.getAttribute("xlink:href"),
    path: pathElement.getAttribute("d")
  };
  return object;
};
