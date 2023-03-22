// Dex last merged this code on 22nd mar 2023

import React, { Component } from "react";

const checkPermissions = (userPermissions, allowedPermissions) => {
  if (allowedPermissions.length === 0) {
    return true;
  }

  return userPermissions.some(permission =>
    allowedPermissions.includes(permission)
  );
};

const AccessControl = ({
  requireLogin,
  allowedPermissions,
  children,
  renderNoAccess,
}) => {
  const userPermissions = ["maxViewsReached"] //To be linked to Redux
  const isLoggedIn = false //To be linked to Redux
  const permitted = (requireLogin ? isLoggedIn : true) && checkPermissions(userPermissions, allowedPermissions)

  if (permitted) {
    return children
  } else {
    return renderNoAccess()
  }
}
export default AccessControl;
