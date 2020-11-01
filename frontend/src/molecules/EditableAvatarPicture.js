import React from 'react';

import { Form } from 'react-bootstrap';

import { AvatarPicture, GenericPopUp } from 'src/atoms/';

export function EditableAvatarPicture({ src, alt, size = '3', className, onChange }) {
  return (
    <>
      <AvatarPicture
                  src={ src }
                  alt={ alt }
                  size={ size }
                  className={ "botOffset" }
      />

      <GenericPopUp
        triggerVariant="outline-primary"
        triggerText="Change Avatar"
        modalTitle="Upload new avatar"
        footerLeftVariant="outline-secondary"
        footerLeftText="Cancel"
        footerRightVariant="outline-primary"
        footerRightText="Upload"
      >
        <Form>
          <Form.File id="formcheck-api-regular">
            <Form.File.Input />
          </Form.File>
        </Form>
      </GenericPopUp>
    </>
  );
}
