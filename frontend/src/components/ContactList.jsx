import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useauthstore";

function ContactList() {
  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (!Array.isArray(allContacts) || allContacts.length === 0) return <NoChatsFound />;

  return (
    <>
      {allContacts.map((contact) => ( 
        <div
          key={contact._id}
          className="bg-emerald-500/15 p-4 rounded-lg cursor-pointer hover:bg-emerald-500/25 transition-colors contact-card"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.name} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{contact.name}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;
