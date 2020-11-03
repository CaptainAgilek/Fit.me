import React from 'react';

import Button from 'react-bootstrap/Button';

export function UserProfileActionButton( { variant, type, onClick, children } ) {
  return (
    <Button variant={variant} type={type} onClick={onClick}>{children}</Button>
  );
}
