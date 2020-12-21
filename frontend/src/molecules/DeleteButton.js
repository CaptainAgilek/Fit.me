import React from "react";
import { RemovePopUp } from "src/molecules/";

export function DeleteButton({
  handleRemove,
  name,
  colClassName,
  imageClassname,
}) {
  return (
    <div className={colClassName}>
      <RemovePopUp
        onConfirm={handleRemove}
        openObjectClassName={
          "organization-icon-color organization-icon-clickable " +
          imageClassname
        }
        target={name}
      ></RemovePopUp>
    </div>
  );
}
