import http from "@/lib/http";

import {
  SignInBodyType,
  ForgotPasswordBodyType,
  ForgotPasswordResType,
  SignInResType,
  SignUpBodyType,
  SignUpResType,
  SlideSessionResType,
  VerifyEmailBodyType,
  ChangePasswordBodyType,
} from "@/schemas/auth.schema";
import { MessageResType } from "@/schemas/message.schema";

const authApiRequest = {
  signIn: (body: SignInBodyType) =>
    http.post<SignInResType>("/api/v1/auth/sign-in", body),
  signUp: (body: SignUpBodyType) =>
    http.post<SignUpResType>("/api/v1/auth/sign-up", body),
  verify: (body: VerifyEmailBodyType) =>
    http.post<SignInResType>("/api/v1/auth/verify-email", body),
  auth: (body: { sessionToken: string; expiresAt: string }) =>
    http.post("/api/auth/[...nextauth]", body, {
      baseUrl: "",
    }),
  updateIsOrganization: (body: { isOrganization: boolean }) =>
    http.post("/api/auth/[...nextauth]", body, {
      baseUrl: "",
    }),
  forgotPassword: (body: ForgotPasswordBodyType) =>
    http.post<ForgotPasswordResType>("/api/v1/auth/forgot-password", body),

  changePassword: (body: ChangePasswordBodyType) =>
    http.post(`/api/v1/auth/change-password`, body),

  logoutFromNextServerToServer: () =>
    http.get<MessageResType>("/api/v1/auth/sign-out"),
  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<MessageResType>(
      "/api/auth/sign-out",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    ),
  slideSessionFromNextServerToServer: (sessionToken: string) =>
    http.post<SlideSessionResType>(
      "/api/v1/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  slideSessionFromNextClientToNextServer: () =>
    http.post<SlideSessionResType>(
      "/api/auth/slide-session",
      {},
      { baseUrl: "" }
    ),
};
export default authApiRequest;
