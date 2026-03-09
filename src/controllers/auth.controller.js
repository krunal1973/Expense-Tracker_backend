import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as authService from "../services/auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {
  const user = await authService.registerService(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } =
    await authService.loginService(email, password);

  res.status(200).json(
    new ApiResponse(
      200,
      { user, accessToken, refreshToken },
      "Login successful"
    )
  );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const newAccessToken =
    await authService.refreshTokenService(refreshToken);

  res
    .status(200)
    .json(new ApiResponse(200, { accessToken: newAccessToken }, "Access token refreshed"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  await authService.logoutService(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});