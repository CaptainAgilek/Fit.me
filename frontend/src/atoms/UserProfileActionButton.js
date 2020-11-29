import React from 'react';

import Button from 'react-bootstrap/Button';

export function UserProfileActionButton( { variant, type, onClick, size, children } ) {
  return (
    <Button variant={variant} type={type} onClick={onClick} size={size}>{children}</Button>
  );
}
