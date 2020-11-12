import fs, { unlink } from 'fs';

export const singleUpload = async (
  _,
  { file, user_id, photo_id },
  { dbConnection },
) => {
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
        throw Error(error);
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
  await createOrUpdateProfilePhoto(file, user_id, photo_id, publicUrl, dbConnection);

  return { filename, mimetype, encoding, url: publicUrl };
};

const createOrUpdateProfilePhoto = async (
  file,
  user_id,
  photo_id,
  url,
  dbConnection,
) => {
  const input = {
    photo_id,
    user_id: user_id,
    description: null,
    url: url,
    gallery_name: null,
    is_profile_picture: true,
  };
  if (!photo_id) {
    return await insertPhoto(null, { input }, { dbConnection });
  } else {
    return await updateProfilePhotoUrl(null, { input }, { dbConnection });
  }
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

export const updateProfilePhotoUrl = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE photo SET url = ?
     WHERE user_id = ? AND photo_id = ? AND is_profile_picture = true;`,
    [input.url, input.user_id, input.photo_id],
  );

  return dbResponse.affectedRows === 1;
};
