import { useEffect, useId, useState } from "react"

interface IMessage {
    id: string,
    text: string
}

export const Messages = () => {
    const [messages, setMessages] = useState<Array<IMessage>>([])
    const [input, setInput] = useState('')
    const [activedEditId, SetActivedEditId] = useState('')
    const [secondInput, setSecondInput] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        setSecondInput(messages.find((message) => message.id === activedEditId)?.text || '') 
    },
    [activedEditId]) // якщо міняється activedEditId то буде отрабативать функция яку я передав в юз ефект

    const addMessage = () => {
        if(!input) return;
        const newmessage = {
            id: new Date().getTime().toString(),
            text: input
        }
        const newMessages = [...messages, newmessage]
        setMessages(newMessages)
        setInput('')
    }

    const changeMessage = () => {
        if(!secondInput) return;
        const newMessages = messages.map((oldMessage) => {
            if (oldMessage.id === activedEditId) {
                return {
                    id: oldMessage.id,
                    text: secondInput
                }
            } else {
                return oldMessage;
            }
        })
        setMessages(newMessages);
        SetActivedEditId('');
    }

    const deleteMessage = (message: IMessage) => {
        const filteredArray = messages.filter((oldMessage) => oldMessage.id !== message.id)
        setMessages(filteredArray);
    }

    return (
        <div>
            <input onChange={(e) => {setSearch(e.target.value)}} value={search} placeholder="Find" />
            <input onChange={(e) => { setInput(e.target.value) }} value={input} placeholder="text" />
            <button onClick={addMessage}>Create</button>
            <div>
                {
                    messages
                    .filter((message) => (
                        message.text.toLowerCase().startsWith(search.toLowerCase())
                    ))
                    .map((message: IMessage) => (
                        <div key={message.id}>
                            <div>{message.text}</div>
                            <div>
                                <button onClick={() => { SetActivedEditId(message.id) }}>Edit</button>
                                <button onClick={() => { deleteMessage(message) }}>Delete</button>
                            </div>
                        </div>
                    ))
                }
                {activedEditId ?
                    <div>
                        <input onChange={(e) => { setSecondInput(e.target.value) }} value={secondInput} placeholder="text" />
                        <button onClick={() => { changeMessage() }}>Change</button>
                    </div> : ''
                }
            </div>
        </div>
    )
}