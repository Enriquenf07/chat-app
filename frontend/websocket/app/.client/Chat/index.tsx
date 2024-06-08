import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import dayjs from "dayjs"

interface message {
    dateTime: string
    user: string
    data: string
}

export default function Chat() {
    const socket = useWebSocket("ws://localhost:3000")
    const [messages, setMessages] = useState<Array<message>>([])
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')

    async function getMessage() {
        const messageJson = await socket.lastMessage?.data.text()
        const message = JSON.parse(messageJson)
        console.log(socket.lastJsonMessage)
        if (socket.lastMessage !== null) {
            setMessages((prev) => prev.concat(message));
        }
    }

    useEffect(() => {
        getMessage()
    }, [socket.lastMessage]);

    return (
        <>
            <div>
                <label htmlFor="user">Nome</label>
                <input id="user" type="text" onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="user">Mensagem</label>
                <input id="message" type="text" onChange={e => { setMessage(e.target.value) }} />
            </div>
            <button onClick={
                () => {
                    socket.sendJsonMessage({ dateTime: Date.now(), user: username, data: message })
                }
            }>enviar</button>
            <div>
                {messages.map(i => (
                    <p>
                        {dayjs(i.dateTime).format('HH:mm') } {i.user} <span>: </span> {i.data}
                    </p>
                ))}
            </div>
        </>
    )
}