const sharp = require("sharp");
const fs = require("fs");
const fsPromises = fs.promises;
const base64 = require("base64-js");
const { exec } = require("child_process");

const imgToPDF = require("image-to-pdf");

const imageToPdf = async (imagePath, pdfPath, options = {}) => {
  const imagePaths = [imagePath];

  // const paperDimensions = [88.9, 127];
  const paperDimensions =
    options?.width && options?.height
      ? [options.width, options.height]
      : [152.4, 101.6];
  await imgToPDF(imagePaths, paperDimensions).pipe(
    fs.createWriteStream(pdfPath)
  );

  return pdfPath;
};

const getImageDataFromImageDataUrl = (imageDataUrl) => {
  return imageDataUrl.split(";base64,")[1];
};
const getBase64ImageDataFromImageDataUrl = (imageDataUrl) => {
  return imageDataUrl.split(";base64,")[1];
};

const getImageDimensionsFromImageDataUrl = (imageDataUrl) => {
  return new Promise(async (resolve) => {
    const imageData = getImageDataFromImageDataUrl(imageDataUrl);

    const buffer = Buffer.from(imageData, "base64");

    const metadata = await sharp(buffer).metadata();
    const imgDims = {
      width: metadata.width,
      height: metadata.height,
      ratio: metadata.height / metadata.width,
    };

    resolve(imgDims);
  });
};

const saveImageFromImageData = async (imagePath, imageData) => {
  try {
    await fsPromises.writeFile(imagePath, imageData, "base64");
    console.log(`${imagePath} uploaded successfully`);

    return { success: true, message: "File uploaded successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error writing the file" };
  }
};

const exc = (x) => {
  exec(x, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

const cmd = async (command) => {
  const response = await new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        resolve({ success: false, data: error.message });
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        resolve({ success: false, data: stderr });
        return;
      }

      resolve({ success: true, data: stdout });
    });
  });

  return response;
};

const print = (pdfPath) => {
  const cmd = `lp ${pdfPath}`;
  console.log(cmd);
  exc(cmd);
};
const getFilePathsInDirectory = async (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) return console.error("Error reading folder:", err);

      resolve(files.map((file) => `${directoryPath}${file}`));
    });
  });
};

const getPngImageFilePathsInDirectory = async (directoryPath) => {
  const filePaths = await getFilePathsInDirectory(directoryPath);
  const pngImageFilePaths = filePaths.filter(
    (x) => x.split(".").slice(-1)[0].toLowerCase() === "png"
  );
  return pngImageFilePaths;
};
const getImageDataUrlFromPngFilePath = (pngFilePath) => {
  const imageBuffer = fs.readFileSync(pngFilePath);
  const base64String = base64.fromByteArray(imageBuffer);
  const imageDataUrl = `data:image/jpeg;base64,${base64String}`;
  return imageDataUrl;
};

const getImageDataUrlsFromDirectory = async (directoryPath) => {
  const pngImageFilePaths = await getPngImageFilePathsInDirectory(
    directoryPath
  );
  return pngImageFilePaths.map((filePath) =>
    getImageDataUrlFromPngFilePath(filePath)
  );
};

const getDirectoryNamesInDirectory = (directoryPath) => {
  try {
    const fileNamesAndDirectoryNames = fs.readdirSync(directoryPath);

    const directoryNames = fileNamesAndDirectoryNames.filter((fileOrDir) => {
      const stat = fs.statSync(`${directoryPath}${fileOrDir}`);
      return stat.isDirectory();
    });

    return directoryNames;
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};

module.exports = {
  imageToPdf,
  getImageDataFromImageDataUrl,
  getBase64ImageDataFromImageDataUrl,
  getImageDimensionsFromImageDataUrl,
  saveImageFromImageData,
  exc,
  cmd,
  print,
  getFilePathsInDirectory,
  getPngImageFilePathsInDirectory,
  getImageDataUrlsFromDirectory,
  getDirectoryNamesInDirectory,
};
