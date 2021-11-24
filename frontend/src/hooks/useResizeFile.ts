import React, { useState } from "react";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}
export const useResizeFile = (initFiles: FileObject[] = []) => {
  const [files, setFiles] = useState<FileObject[]>(initFiles);
  let imageCnt = 0;

  const addFile = (file: File) => {
    const MB = 1048567;
    const baseSize = MB * 4;
    const compSize = MB;
    if (file.size <= baseSize) {
      setFiles([...files, { imageUrl: file, imageId: (imageCnt++).toString() }]);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (!e.target?.result) return;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = e.target.result as string;
        img.onload = function () {
          const ratio = Math.sqrt(file.size / compSize);
          canvas.width = img.width / ratio;
          canvas.height = img.height / ratio;
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL("image/png");
          const byteString = atob(dataURL.split(",")[1]);
          const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const tmpThumbFile = new Blob([ab], { type: mimeString });
          setFiles([...files, { imageUrl: new File([tmpThumbFile], file.name), imageId: (imageCnt++).toString() }]);
        };
      };
    }
  };

  const removeFile = (deleteItem: FileObject) => {
    setFiles(files.filter((file) => file.imageId !== deleteItem.imageId));
  };

  return {
    files,
    addFile,
    removeFile,
  };
};
