const {
  getImageDataFromImageDataUrl,
  getImageDimensionsFromImageDataUrl,
  saveImageFromImageData,
  getBase64ImageDataFromImageDataUrl,
  imageToPdf,
  print,
  getImageDataUrlsFromDirectory,
  getDirectoryNamesInDirectory,
  cmd,
} = require("../helpers/index");
const sharp = require("sharp");
const fs = require("fs");

const delay = async (x) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), x);
  });
};
const ping = async (req, res) => {
  await delay(1000);
  return res.status(200).json({ success: true });
};

const saveSquareImageHandler = async (req, res) => {
  const imageDataUrl = req.body.image;
  const imageDimensions = await getImageDimensionsFromImageDataUrl(
    imageDataUrl
  );

  const isSquare = imageDimensions.ratio > 0.9 || imageDimensions.ratio < 1.1;
  if (!isSquare)
    return res
      .status(500)
      .json({ success: false, message: "Image is not square" });

  const imageData = getImageDataFromImageDataUrl(imageDataUrl);
  const imagePath = `../files/squareImages/${new Date().toISOString()}.png`;

  const resp = await saveImageFromImageData(imagePath, imageData);
  const responseCode = resp.success ? 200 : 500;
  return res.status(responseCode).json(resp);
};

const savePdfPrintImageHandler = async (req, res) => {
  const imageDataUrl = req.body.image;
  const pdfPath = `../files/pdfs/${new Date().toISOString()}.pdf`;

  await imageToPdf(imageDataUrl, pdfPath);

  try {
    print(pdfPath);
  } catch (error) {
    console.log("error");
    return res.status(500).json({ success: false, message: "can't print" });
  }

  return res.json({ success: true, message: "success" });
};

const savePdfPrint6x4ImageHandler = async (req, res) => {
  const imageDataUrl = req.body.image;
  const pdfPath = `../files/pdfs/${new Date().toISOString()}.pdf`;

  await imageToPdf(imageDataUrl, pdfPath);

  try {
    print(pdfPath);
  } catch (error) {
    console.log("error");
    return res.status(500).json({ success: false, message: "can't print" });
  }

  return res.json({ success: true, message: "success" });
};

const backupImagesHandler = async (req, res) => {
  console.log(`index.js:${/*LL*/ 74}`, { asd: 123 });

  const imageDataUrls = req.body.imageDataUrls;
  const isoStringDate = new Date().toISOString();
  const folderPath = `../files/backup-images/${isoStringDate}/`;
  await fs.mkdirSync(folderPath);

  let i = 0;
  for (const imageDataUrl of imageDataUrls) {
    i += 1;
    const base64ImageData = getBase64ImageDataFromImageDataUrl(imageDataUrl);
    const imagePath = `${folderPath}${isoStringDate}-${i}.png`;
    saveImageFromImageData(imagePath, base64ImageData);
  }

  return res.json({ success: true, message: "success" });
};

const getBackupImagesListHandler = async (req, res) => {
  const directoryPath = `../files/backup-images/`;
  const directoryNames = getDirectoryNamesInDirectory(directoryPath).sort(
    (a, b) => (a > b ? -1 : 1)
  );
  return res.json(directoryNames);
};

const getBackupImagesHandler = async (req, res) => {
  const backupImageDirectory = req.body.backupImageDirectory;
  const directoryPath = `../files/backup-images/${backupImageDirectory}/`;

  const response = await getImageDataUrlsFromDirectory(directoryPath);

  return res.json(response);
};

const getPrintQueueHandler = async (req, res) => {
  const response = await cmd("lpq");
  return res.json(response);
};

const resizeSavePdfPrintImageHandler = async (req, res) => {
  const imageDataUrl = req.body.image;
  const data = Buffer.from(imageDataUrl.split(",")[1], "base64");
  const pdfPath = `../files/pdfs/${new Date().toISOString()}.pdf`;

  const { width, height } = await getImageDimensionsFromImageDataUrl(
    imageDataUrl
  );

  const resizedImageDataUrl = await new Promise((resolve) => {
    sharp(data)
      .resize(width / 4, height / 4)
      .toBuffer((err, buffer) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "can't print" });
        } else {
          const base64Image = buffer.toString("base64");

          resolve(`data:image/png;base64,${base64Image}`);
        }
      });
  });

  await imageToPdf(resizedImageDataUrl, pdfPath);

  try {
    print(pdfPath);
  } catch (error) {
    console.log("error");
    return res.status(500).json({ success: false, message: "can't print" });
  }
  return res.status(500).json({ success: true, message: "success" });
};

module.exports = {
  ping,
  backupImagesHandler,
  saveSquareImageHandler,
  savePdfPrintImageHandler,
  savePdfPrint6x4ImageHandler,
  getBackupImagesListHandler,
  getBackupImagesHandler,
  getPrintQueueHandler,
  resizeSavePdfPrintImageHandler,
};
