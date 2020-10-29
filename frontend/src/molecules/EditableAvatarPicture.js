import React from 'react';

import { Container, Form } from 'react-bootstrap';

import { AvatarPicture, GenericPopUp, UserPro } from 'src/atoms/';

export function EditableAvatarPicture({ src, alt, size = '3', className, onChange }) {
  return (
    <>
      <AvatarPicture
                  src={ src }
                  alt={ alt }
                  size={ size }
                  className={ className }
      />

      <GenericPopUp
        triggerVariant="outline-primary"
        triggerText="Change Avatar"
        modalTitle="Upload new avatar"
        modalBody={
          <Form>
            <Form.File
              id="custom-file"
              label="Custom file input"
              custom
            />
          </Form>
        }
        footerLeftVariant="outline-secondary"
        footerLeftText="Cancel"
        footerRightVariant="outline-primary"
        footerRightText="Upload" />
    </>
  );
}
