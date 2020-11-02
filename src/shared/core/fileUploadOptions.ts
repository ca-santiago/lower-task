
import fileUpload from "express-fileupload";

const baseConfig: fileUpload.Options = Object.freeze({
    abortOnLimit: true,
    createParentPath: true,
    parseNested: true,
    uriDecodeFileNames: true
})

const fileUploadMiddleware = () => {
    fileUpload(baseConfig)
}


export {
    fileUploadMiddleware,
    baseConfig
};