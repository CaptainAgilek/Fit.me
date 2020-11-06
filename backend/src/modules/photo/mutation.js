import fs from 'fs';

export const singleUpload = async (_, { file, user_id }, { dbConnection }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;

  const fileStream = createReadStream();
  function handler (err) { throw Error(err); };
  fileStream.on('error', handler);
  await fileStream.pipe(fs.createWriteStream(`./public/photos/${filename}`));

  const publicUrl = process.env.BACKEND_URL + `photos/${filename}`;
  const input = {
    user_id: user_id,
    description: null,
    url: publicUrl,
    gallery_name: null,
    is_profile_picture: true,
  }
  await insertPhoto(_, { input }, { dbConnection });
  return { filename, mimetype, encoding, url: publicUrl };
};

export const insertPhoto = async (
  _,
  { input }, {dbConnection} ,
) => {
  const insertPhoto = await dbConnection.query(
    `INSERT INTO photo (photo_id, user_id, description, url, gallery_name, is_profile_picture)
    VALUES (NULL, ?, ?, ?, ?, ?);`,
    [input.user_id, input.description, input.url, input.gallery_name, input.is_profile_picture],
  );

  return insertPhoto.warningStatus == 0;
};
