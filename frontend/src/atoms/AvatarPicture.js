import React from 'react';

import { Image } from 'react-bootstrap';

import classNames from 'classnames';

export function AvatarPicture({ src, alt, size = '3', className, onChange }) {
  return (
    <Image src={src} alt={alt} fluid rounded className={classNames(`${className}`)}/>
  );
}
