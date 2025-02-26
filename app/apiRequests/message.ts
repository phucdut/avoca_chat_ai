import http from "@/lib/http";
import {
  MessageBodyType,
  MessageLandingPageResType,
  MessageListResType,
  MessageResType,
} from "@/schemas/message.schema";

const messageApiRequest = {
  loadMessage: (conversation_id: string) =>
    http.get<MessageListResType>(
      `/api/v1/conversation/${conversation_id}/load-message`
    ),

  sentMessageLandingPage: (body: MessageBodyType) =>
    http.post<MessageLandingPageResType>(`/api/v1/chat/ask`, body),

  sentMessageWithAuth: (
    body: MessageBodyType,
    id: string,
    knowledge_base_id: string
  ) =>
    http.post<MessageResType>(
      `/api/v1/ai-agent/${id}/message/${knowledge_base_id}/with-auth`,
      body
    ),

  sentMessageLiveAgent: (
    body: MessageBodyType,
    org_id: string,
    agent_id: string,
    conversation_id: string
  ) =>
    http.post<MessageResType>(
      `/api/v1/organization/${org_id}/ai-agent/${agent_id}/conversation/${conversation_id}/hybrid`,
      body
    ),
};

export default messageApiRequest;
