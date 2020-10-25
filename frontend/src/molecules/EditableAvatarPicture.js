import React from 'react';

import Popup from 'reactjs-popup';

import classNames from 'classnames';

import { AvatarPicture } from 'src/atoms/';

export function EditableAvatarPicture({ src, alt, size = '3', className, onChange }) {
  return (
    <>
      <AvatarPicture
                  src={ src }
                  alt={ alt }
                  size={ size }
                  className={ className }
      />

      {/*TODO: https://www.npmjs.com/package/reactjs-popup*/}
      <Popup
        trigger={<button> Change Avatar</button>}
        position="right center"
      >
        <div class="edit-avatar-popup" id="avatar-input-form">
          <form>
            <h1>Select new avatar</h1>

            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              multiple="false"
            />

            <button type="submit" class="btn" onClick={console.log("changing avatar")}>Change Avatar</button>
            <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
          </form>
        </div>
      </Popup>
    </>
  );
}
