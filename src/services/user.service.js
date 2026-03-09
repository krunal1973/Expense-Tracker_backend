import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const getProfileService = async (userId) => {
  const user = await User.findOne({ _id: userId, isActive: true });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

export const updateProfileService = async (userId, data) => {
  const allowedUpdates = ["name", "email"];

  const updateData = {};
  allowedUpdates.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  const user = await User.findOneAndUpdate(
    { _id: userId, isActive: true },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const changePasswordService = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findOne({ _id: userId, isActive: true }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(401, "Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  return true;
};

export const deleteAccountService = async (userId) => {
  const user = await User.findOneAndUpdate(
    { _id: userId, isActive: true },
    { isActive: false },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return true;
};