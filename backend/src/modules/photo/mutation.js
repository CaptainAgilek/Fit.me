import fs, { unlink } from 'fs';
import { writeFileOnDisk } from './util';

export const singleUploadOrganizationPhoto = async (
  _,
  { file, user_id, photo_id, is_profile_picture },
  { dbConnection },
) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const fileStream = createReadStream();

  const relativePath = `photos/organizations/${filename}`;
  const path = `./public/` + relativePath;

  const fileWritten = await writeFileOnDisk(fileStream, path);
  const publicUrl = process.env.BACKEND_URL + relativePath;
  await createOrUpdatePhoto(
    file,
    user_id,
    photo_id,
    publicUrl,
    is_profile_picture,
    dbConnection,
  );

  return { filename, mimetype, encoding, url: publicUrl };
};

export const singleUpload = async (
  _,
  { file, user_id, photo_id, is_profile_picture },
  { dbConnection },
) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const fileStream = createReadStream();
  const relativePath = `photos/${filename}`;
  const path = `./public/` + relativePath;

  const fileWritten = await writeFileOnDisk(fileStream, path);
  const publicUrl = process.env.BACKEND_URL + relativePath;
  await createOrUpdatePhoto(
    file,
    user_id,
    photo_id,
    publicUrl,
    is_profile_picture,
    dbConnection,
  );

  return { filename, mimetype, encoding, url: publicUrl };
};

export const singleUploadOrganizationGalleryPhoto = async (
  _, 
  { file, photo_id, user_id, description, is_profile_picture }, 
  { dbConnection }, ) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const fileStream = createReadStream();

  const relativePath = `photos/organizations/${filename}`;
  const path = `./public/` + relativePath;

  const fileWritten = await writeFileOnDisk(fileStream, path);
  const publicUrl = process.env.BACKEND_URL + relativePath;
  const gallery_name = "DEFAULT";

  const input = { photo_id, user_id: user_id, description: description, url: publicUrl, gallery_name: gallery_name, is_profile_picture: is_profile_picture };

  await insertPhoto(null, { input }, { dbConnection });

  return { filename, mimetype, encoding, url: publicUrl };
};

export const updateOrganizationGalleryPhoto = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE photo SET gallery_name = ?
     WHERE user_id = ? AND photo_id = ?`,
    [input.gallery_name, input.user_id, input.photo_id],
  );

  return dbResponse.affectedRows === 1;
};

const createOrUpdatePhoto = async (
  file,
  user_id,
  photo_id,
  url,
  is_profile_picture,
  dbConnection,
) => {
  const input = {
    photo_id,
    user_id: user_id,
    description: null,
    url: url,
    gallery_name: null,
    is_profile_picture: is_profile_picture,
  };
  if (!photo_id) {
    return await insertPhoto(null, { input }, { dbConnection });
  } else {
    return await updatePhotoUrl(null, { input }, { dbConnection });
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

export const updatePhotoUrl = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE photo SET url = ?
     WHERE user_id = ? AND photo_id = ?`,
    [input.url, input.user_id, input.photo_id],
  );

  return dbResponse.affectedRows === 1;
};
