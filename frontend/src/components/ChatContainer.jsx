import { useEffect} from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useauthstore";
import ChatHeader from "./chatHeader.jsx";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import MessageInput from "./MessageInput.jsx";

export default function ChatContainer() {
  const{ getMessageByUserId,selectedUser,messages,isMessagesLoading,subscribeToMessages,
    unsubscribeFromMessages, } = useChatStore();
  const { authUser } = useAuthStore();
  useEffect(() => {
      getMessageByUserId(selectedUser._id);
    },[selectedUser, getMessageByUserId]);
    return<>
    <ChatHeader/>
    <div className="flex-1 px-6 overflow-y-auto py-8">
      {messages && messages.length > 0 ? (<div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                 >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    </p>
                    </div>
              </div>
            ))}
          </div>
      ) : (
        <NoChatHistoryPlaceholder name={selectedUser.name} />
      )}
        </div>
<MessageInput />
    </> 

}
