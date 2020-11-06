import fs, { unlink } from 'fs';

export const singleUpload = async (_, { file, user_id }, { dbConnection }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;

  const fileStream = createReadStream();

  const fileWritten = await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = fs.createWriteStream(`./public/photos/${filename}`);
    // When the upload is fully written, resolve the promise.
    writeStream.on('finish', resolve);
    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on('error', (error) => {
      unlink(path, () => {
        reject(error);
      });
    });
    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    fileStream.on('error', (error) => writeStream.destroy(error));
    // Pipe the upload into the write stream.
    fileStream.pipe(writeStream);
  });

  const publicUrl = process.env.BACKEND_URL + `photos/${filename}`;
  const input = {
    user_id: user_id,
    description: null,
    url: publicUrl,
    gallery_name: null,
    is_profile_picture: true,
  };

  await insertPhoto(_, { input }, { dbConnection });

  return { filename, mimetype, encoding, url: publicUrl };
};

export const insertPhoto = async (_, { input }, { dbConnection }) => {
  const insertPhoto = await dbConnection.query(
    `INSERT INTO photo (photo_id, user_id, description, url, gallery_name, is_profile_picture)
    VALUES (NULL, ?, ?, ?, ?, ?);`,
    [
      input.user_id,
      input.description,
      input.url,
      input.gallery_name,
      input.is_profile_picture,
    ],
  );

  return insertPhoto.warningStatus == 0;
};
