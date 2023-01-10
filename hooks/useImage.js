import React, { useState, useEffect, useMemo } from "react";

export const useSrcImage = (image, mechanic) => {
  const [imageHref, setImageHref] = useState("");

  useMemo(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        setImageHref(reader.result);
      };
      reader.onerror = function () {
        console.error(reader.error);
      };
    }
  }, [image?.name]);

  useEffect(() => {
    if (!image || imageHref !== "") {
      mechanic.done();
    }
  }, [image, imageHref]);

  return imageHref;
};
