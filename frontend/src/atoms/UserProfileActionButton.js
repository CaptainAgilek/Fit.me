import React from 'react';

import Button from 'react-bootstrap/Button';

export function UserProfileActionButton({
  variant,
  type,
  actionButtonClass,
  onClick,
  size,
  children,
}) {
  return (
    <Button
      variant={variant}
      type={type}
      className={actionButtonClass && actionButtonClass}
      onClick={onClick}
      size={size}
    >
      {children}
    </Button>
  );
}
