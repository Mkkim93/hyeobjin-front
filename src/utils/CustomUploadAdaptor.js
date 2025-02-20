export class CustomUploadAdaptor {
    constructor(loader) {
      this.loader = loader;
    }
  
    upload() {
      return this.loader.file.then((file) => {
        const formData = new FormData();
        formData.append("file", file);
  
        return axios
          .post("image/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            return { default: response.data.url };
          })
          .catch((error) => {
            console.error("Upload failed:", error);
            throw error;
          });
      });
    }
  }
  