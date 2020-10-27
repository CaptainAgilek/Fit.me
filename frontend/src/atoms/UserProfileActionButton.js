import React from 'react';

import Button from 'react-bootstrap/Button';

export function UserProfileActionButton( { variant, onClick, children } ) {
  return (
    <Button variant={variant} onClick={onClick}>{children}</Button>
  );
}
