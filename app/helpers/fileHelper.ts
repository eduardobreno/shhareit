import * as RNFS from "react-native-fs";

export const generateFileName = (ext: string) => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const ss =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${yyyy}${mm}${dd}_${hh}${min}${ss}.${ext}`;
};

export const getExtensionFromFile = (file: string) => {
  let ext = ".unknown";
  if (file) {
    const arrFN = file.split(".");
    ext = arrFN[arrFN.length - 1];
  }
  return ext;
};

export const saveFileToFolder = async (
  fileName: string,
  filePath: string,
  folder: string
) => {
  const folderPath = `${RNFS.DocumentDirectoryPath}/${folder}`;
  RNFS.mkdir(folderPath, {
    NSURLIsExcludedFromBackupKey: true
  });

  await RNFS.copyFile(filePath, `${folderPath}/${fileName}`).catch(e => {
    console.error("ERROR copyFile", e);
  });
};
