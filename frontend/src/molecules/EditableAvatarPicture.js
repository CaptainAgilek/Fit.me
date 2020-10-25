import React from 'react';

import classNames from 'classnames';

import { AvatarPicture, EditAvatarPopUp } from 'src/atoms/';

export function EditableAvatarPicture({ src, alt, size = '3', className, onChange }) {
  return (
    <>
      <AvatarPicture
                  src={ src }
                  alt={ alt }
                  size={ size }
                  className={ className }
      />

      <EditAvatarPopUp/>
    </>
  );
}
