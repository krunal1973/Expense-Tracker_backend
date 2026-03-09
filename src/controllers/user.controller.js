import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as userService from "../services/user.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfileService(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile fetched"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfileService(
    req.user._id,
    req.body
  );

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await userService.changePasswordService(
    req.user._id,
    currentPassword,
    newPassword
  );

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"));
});

export const deleteAccount = asyncHandler(async (req, res) => {
  await userService.deleteAccountService(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Account deleted"));
});