import fs, { unlink } from 'fs';

export const writeFileOnDisk = async (fileStream, path) => {
  return new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = fs.createWriteStream(path);
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
}
