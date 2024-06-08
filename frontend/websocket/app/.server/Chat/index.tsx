import { ClientOnly } from "remix-utils/client-only";
import Chat from "~/.client/Chat";

export default function ChatServer() {
    return (
        <>
            oi
            <ClientOnly fallback={<div>Loading...</div>}>
                {() => <Chat />}
            </ClientOnly>
            
        </>
    )
}