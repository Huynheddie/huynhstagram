const readUploadedFileAsText = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export default { readUploadedFileAsText };
