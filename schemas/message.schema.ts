import z from "zod";

export const MessageSchema = z
  .object({
    question: z.string(),
  })
  .strict();

export type MessageBodyType = z.TypeOf<typeof MessageSchema>;

export const MessageLandingPageRes = z.string();
export type MessageLandingPageResType = z.TypeOf<typeof MessageLandingPageRes>;

export const MessageRes = z
  .object({
    id: z.string(),
    org_id: z.string(),
    sender_id: z.string(),
    message: z.string(),
    sender_type: z.string(),
    conversation_id: z.string(),
    latency: z.number(),
    is_active: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.string(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;

export type MessageListResType = {
  id: string;
  org_id: string;
  message: string;
  sender_id: string;
  sender_type: number;
  conversation_id: string;
  latency: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: string;
}[];

export const ConversationIdRes = z.object({
  conversation_id: z.string(),
});

export type ConversationIdResType = z.TypeOf<typeof ConversationIdRes>;

export const AgentDeleteRes = z
  .object({
    user_id: z.string(),
    ai_agent: z.object({
      id: z.string(),
      ai_agent_name: z.string(),
      deleted_at: z.date(),
    }),
  })
  .strict();

export type AgentDeleteResType = z.TypeOf<typeof AgentDeleteRes>;
