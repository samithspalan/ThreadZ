import { SendIcon } from "lucide-react";
import { useState } from "react";

function MessageInput() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("Send message:", message);

    setMessage(""); // clear input after send
  };

  return (
    <div className="w-full border-t border-slate-700 bg-slate-900 p-4 message-input">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-lg bg-slate-800 px-4 py-2 text-slate-200 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500 message-input-field"
        />

        <button
          onClick={handleSend}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-slate-900 font-medium hover:bg-cyan-400 transition-colors"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
      
    </div>
  );
}

export default MessageInput;
