import fs, { unlink } from 'fs';
import { writeFileOnDisk } from './util';
import { getTypeIdByName } from './helper';

export const singleUploadOrganizationPhoto = async (
  _,
  { file, user_id, photo_id, type },
  { dbConnection },
) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const fileStream = createReadStream();

  const relativePath = `photos/organizations/${filename}`;
  const path = `./public/` + relativePath;

  const fileWritten = await writeFileOnDisk(fileStream, path);
  const publicUrl = process.env.BACKEND_URL + relativePath;

  const photo_type_id = await getTypeIdByName(type, dbConnection);

  await createOrUpdatePhoto(
    file,
    user_id,
    photo_id,
    publicUrl,
    photo_type_id,
    dbConnection,
  );

  return { filename, mimetype, encoding, url: publicUrl };
};

export const singleUpload = async (
  _,
  { file, user_id, photo_id, type },
  { dbConnection },
) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const fileStream = createReadStream();
  const relativePath = `photos/${filename}`;
  const path = `./public/` + relativePath;

  const fileWritten = await writeFileOnDisk(fileStream, path);
  const publicUrl = process.env.BACKEND_URL + relativePath;

  const insertId = await createOrUpdatePhoto(
    file,
    user_id,
    photo_id,
    publicUrl,
    type,
    dbConnection,
  );

  return { filename, mimetype, encoding, url: publicUrl, insertId };
};

export const singleUploadOrganizationGalleryPhoto = async (
  _,
  { file, photo_id, user_id, description, type },
  { dbConnection },
) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const fileStream = createReadStream();

  const relativePath = `photos/organizations/${filename}`;
  const path = `./public/` + relativePath;

  const fileWritten = await writeFileOnDisk(fileStream, path);
  const publicUrl = process.env.BACKEND_URL + relativePath;
  const gallery_name = 'DEFAULT';

  const photo_type_id = await getTypeIdByName(type, dbConnection);
  const input = {
    photo_id,
    user_id: user_id,
    description: description,
    url: publicUrl,
    gallery_name: gallery_name,
    photo_type_id: photo_type_id,
  };

  await insertPhoto(null, { input }, { dbConnection });

  return { filename, mimetype, encoding, url: publicUrl };
};

export const updateOrganizationGalleryPhoto = async (
  _,
  { input },
  { dbConnection },
) => {
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
  type,
  dbConnection,
) => {
  const photo_type_id = await getTypeIdByName(type, dbConnection);

  const input = {
    photo_id,
    user_id: user_id,
    description: null,
    url: url,
    gallery_name: null,
    photo_type_id: photo_type_id,
  };
  if (!photo_id) {
    return await insertPhoto(null, { input }, { dbConnection });
  } else {
    return await updatePhotoUrl(null, { input }, { dbConnection });
  }
};

export const insertPhoto = async (_, { input }, { dbConnection }) => {
  const insertPhoto = await dbConnection.query(
    `INSERT INTO photo (photo_id, user_id, description, url, gallery_name, photo_type_id)
    VALUES (NULL, ?, ?, ?, ?, ?);`,
    [
      input.user_id,
      input.description,
      input.url,
      input.gallery_name,
      input.photo_type_id
    ],
  );

  return insertPhoto.insertId;
};

export const updatePhotoUrl = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE photo SET url = ?
     WHERE user_id = ? AND photo_id = ?`,
    [input.url, input.user_id, input.photo_id],
  );

  return dbResponse.insertId;
};
