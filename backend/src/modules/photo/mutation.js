import fs from 'fs'

export const singleUpload = async (_, { file }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;

  const fileStream = createReadStream();
  console.log("received file");
  await fileStream.pipe(fs.createWriteStream(`./public/photos/${filename}`))

  return { filename, mimetype, encoding, url: '' };
};
