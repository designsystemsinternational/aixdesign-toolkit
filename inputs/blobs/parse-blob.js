const parseViewBox = stringValue => {
  const [x1, y1, x2, y2] = stringValue.split(" ");
  return [x2 - x1, y2 - y1];
};

const getMinAndMax = array => {
  if (array.length <= 0) return;
  let min = array[0];
  let max = array[0];
  if (array.length === 1) return [min, max];
  for (let index = 1; index < array.length; index++) {
    const v = array[index];
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return [min, max];
};

const getPathExtent = path => {
  const matches = [...path.matchAll(/\d+(\.\d*)?\s\d+(\.\d*)?/g)].map(m =>
    m[0].split(" ").map(s => parseFloat(s))
  );
  const x = matches.map(m => m[0]);
  const y = matches.map(m => m[1]);
  return [getMinAndMax(x), getMinAndMax(y)];
};

export const parseBlob = htmlString => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(htmlString, "text/html");
  const svg = parsed.querySelector("#viewer_svg");
  const image = parsed.querySelector("#viewer_svg #viewer_im");
  const pathElement = parsed.querySelector("#viewer_svg path");

  const viewBox = svg.getAttribute("viewBox");
  const [width, height] = parseViewBox(viewBox);

  const path = pathElement.getAttribute("d");
  const pathExtent = getPathExtent(path);

  const object = {
    svgData: {
      viewBox,
      width,
      height
    },
    href: image.getAttribute("xlink:href"),
    path,
    pathExtent: {
      x0: pathExtent[0][0],
      y0: pathExtent[1][0],
      x1: pathExtent[0][1],
      y1: pathExtent[1][1],
      width: pathExtent[0][1] - pathExtent[0][0],
      height: pathExtent[1][1] - pathExtent[1][0]
    },
    x: -pathExtent[0][0],
    y: -pathExtent[1][0],
    scaleX: 1,
    scaleY: 1,
    rotate: 0
  };
  object.transform = `translate(${object.x} ${object.y}) scale(${object.scaleX} ${object.scaleY}) rotate(${object.rotate})`;
  return object;
};
