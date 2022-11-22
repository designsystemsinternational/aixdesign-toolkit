// import puppeteer from "puppeteer";

const getUrl = id =>
  `https://storage.googleapis.com/openimages/web/visualizer/index.html?type=segmentation&set=train&r=false&c=%2Fm%2F01dwwc&id=${id}`;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// export const getBlob = async (id, cb) => {
//   const url = getUrl(id);

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(url);
//   await delay(1000);

//   const imageSelector = "#viewer_wrap #viewer_svg #viewer_im";
//   await page.waitForSelector(imageSelector);

//   // Extract the results from the page.
//   const links = await page.evaluate(resultsSelector => {
//     return [...document.querySelectorAll(resultsSelector)].map(anchor => {
//       const href = anchor.href.baseVal;
//       return href;
//     });
//   }, imageSelector);

//   const pathSelector = "#viewer_wrap #viewer_svg path";
//   await page.waitForSelector(pathSelector);

//   const path = await page.evaluate(resultsSelector => {
//     return [...document.querySelectorAll(resultsSelector)].map(anchor => {
//       const href = anchor.getAttribute("d");
//       return href;
//     });
//   }, pathSelector);

//   const footnoteSelector = "#viewer_footnote .left-column";
//   await page.waitForSelector(footnoteSelector);

//   const footnote = await page.evaluate(resultsSelector => {
//     return [...document.querySelectorAll(resultsSelector)].map(anchor => {
//       const href = anchor.textContent;
//       return href;
//     });
//   }, footnoteSelector);

//   links.forEach(link => console.log(link));
//   path.forEach(link => console.log(link));
//   footnote.forEach(link => console.log(link));

//   await browser.close();

//   cb({ links, path, footnote });

//   return;
// };

export const getBlob = async (id, cb) => {
  const url = getUrl(id);

  const iframe = document.createElement("iframe");
  iframe.setAttribute("src", url);
  console.log(iframe.contentWindow);
  iframe.addEventListener("load", async ev => {
    console.log(ev);
    await delay(2000);
    const img = ev.target.contentDocument.querySelector(
      "#viewer_wrap #viewer_svg #viewer_im"
    );
    console.log({ img });
    cb("LOL");
  });
  document.body.appendChild(iframe);

  return;
};
