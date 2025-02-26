import * as z from "zod";

export const SettingsSchema = z
  .object({
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});
export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordSchema>;

export const ChangePasswordSchema = z.object({
  password_old: z.string().min(6, {
    message: "Old password must be at least 6 characters",
  }),
  password_new: z.string().min(6, {
    message: "New password must be at least 6 characters",
  }),
});

export type ChangePasswordBodyType = z.infer<typeof ChangePasswordSchema>;

export const ForgotPasswordRes = z.object({
  status: z.number(),
  message: z.string(),
});
export type ForgotPasswordResType = z.infer<typeof ForgotPasswordRes>;

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirm_password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long.",
      })
      .max(100, {
        message: "Password must be at most 100 characters long.",
      }),
  })
  .strict()
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password and confirm password do not match",
        path: ["confirm_password"],
      });
    }
  });

export type SignUpBodyType = z.infer<typeof SignUpSchema>;

// export const SignUpRes = z.object({
//   id: z.string(),
//   email: z.string(),
//   display_name: z.string(),
//   avatar_url: z.string(),
//   payment_information: z.string(),
//   is_verified: z.string(),
//   user_role: z.string(),
//   is_active: z.string(),
//   created_at: z.date(),
//   updated_at: z.date(),
//   deleted_at: z.string(),
// });

// export type SignUpResType = z.infer<typeof SignUpRes>;

export const SignUpRes = z.object({
  id: z.string(),
  email: z.string(),
  display_name: z.string(),
  role: z.string(),
  // password_hash: z.string(),
  // verification_code: z.string(),
  avatar_url: z.string(),
  is_verified: z.boolean(),
  // package_id: z.string(),
  is_active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date(),
});

export type SignUpResType = z.infer<typeof SignUpRes>;

export const VerifyEmailSchema = z.object({
  email: z.string(),
  verification_code: z.string(),
});
export type VerifyEmailBodyType = z.infer<typeof VerifyEmailSchema>;

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});
export type SignInBodyType = z.infer<typeof SignInSchema>;

export const SignInRes = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  is_organization: z.boolean(),
  is_store: z.boolean(),
  is_ai_agent: z.boolean(),
  is_admin: z.boolean(),
  expiresAt: z.string(),
});

export type SignInResType = z.TypeOf<typeof SignInRes>;

export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;

export const SlideSessionRes = SignInRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
