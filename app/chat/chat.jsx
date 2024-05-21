// pages/chat.js
import React, { useState, useEffect } from 'react';
import { useUser } from "@/app/context/user";
import { useRouter } from "next/router";
import { useChat } from '@/context/ChatContext';
import { BiSend } from 'react-icons/bi';

const users = [
    { id: 1, name: 'User One' },
    { id: 2, name: 'User Two' },
    { id: 3, name: 'User Three' }
];

const Chat = () => {
    const contextUser = useUser();
    const router = useRouter();
    const { sendMessage, getMessages } = useChat();
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!contextUser?.user) {
            router.push('/');
        }
    }, [contextUser, router]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message = {
            sender: contextUser?.user?.name,
            content: newMessage,
            timestamp: new Date()
        };

        sendMessage(selectedUser.id, message);
        setNewMessage('');
    };

    const messages = selectedUser ? getMessages(selectedUser.id) : [];

    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-gray-100 p-4">
                <input
                    type="text"
                    placeholder="Search users"
                    value={search}
                    onChange={handleSearch}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <ul>
                    {users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).map(user => (
                        <li
                            key={user.id}
                            onClick={() => handleSelectUser(user)}
                            className={`p-2 cursor-pointer rounded ${selectedUser?.id === user.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-2/3 flex flex-col bg-white">
                <div className="flex-grow p-4 overflow-auto">
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-2 p-2 rounded ${message.sender === contextUser?.user?.name ? 'bg-blue-100 self-end' : 'bg-gray-100'}`}>
                            <div className="font-bold">{message.sender}</div>
                            <div>{message.content}</div>
                            <div className="text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-300">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-grow p-2 border border-gray-300 rounded"
                        />
                        <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded">
                            <BiSend size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
