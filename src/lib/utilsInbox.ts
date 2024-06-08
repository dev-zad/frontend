// utilsInbox.ts
import fs from 'fs-extra';
import path from 'path';

const messagesFilePath = path.resolve(process.cwd(), 'messages.json');
export type Message = {
    id: number;
    email: string;
    name: string;
    message: string;
};
export async function readMessages() {
    try {
        const data = await fs.readFile(messagesFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading messages file:', error);
        throw new Error('Failed to read messages file');
    }
}

export async function getMessage(id: number) {
    try {
        const messages = await readMessages();
        return messages.find((message: Message) => message.id === id);
    } catch (error) {
        console.error('Error getting message:', error);
        throw new Error('Failed to get message');
    }
}

export async function writeMessages(messages: Array<Message>) {
    try {
        await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2));
    } catch (error) {
        console.error('Error writing messages file:', error);
        throw new Error('Failed to write messages file');
    }
}