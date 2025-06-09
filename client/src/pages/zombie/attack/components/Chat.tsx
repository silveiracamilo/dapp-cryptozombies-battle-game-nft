import { Button, Drawer, Form, Input, Row } from 'antd';
import { map } from 'lodash';
import { ForwardRefRenderFunction, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { socket } from '@/utils/socket';

const { TextArea } = Input;

interface IMessage {
   message: string
   isMe: boolean 
}

interface IChatProps {
    from: string
    to: string
}

export interface IChatRef {
    showChat: () => void
    closeChat: () => void
}

const Chat: ForwardRefRenderFunction<IChatRef, IChatProps> = ({ from, to}, ref) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [openChat, setOpenChat] = useState(false);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        showChat,
        closeChat,
    }))

    useEffect(() => {
        const roomId = [from, to].sort().join('-');

        socket.emit('join-room', roomId);

        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, { message: msg, isMe: false }]);
        });

        return () => {
            socket.off('message');
        }
    }, [])

    useEffect(() => {
        const chatBody = document.getElementsByClassName('ant-drawer-body')[0];
        chatBody && chatBody.scrollTo(0, chatBody.scrollHeight);
    }, [messages]);

    const sendMessage = useCallback(({ message = '' }: { message: string }) => {
        if (message.trim() !== '') {
            socket.emit('message', message);
            setMessages((prev) => [...prev, { message, isMe: true }]);
            form.resetFields();
            setTimeout(() => form.focusField('message'), 0);
        }
    }, []);

    const showChat = useCallback(() => {
        setOpenChat(true);
    }, [])

    const closeChat = useCallback(() => {
        setOpenChat(false);
    }, [])

    const onEnterPress = useCallback((e: any) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          form.submit();
        }
    }, [])

    return (
        <Drawer
            title="Battle Chat"
            onClose={closeChat}
            open={openChat}
            footer={(
                <Form form={form} onFinish={sendMessage}>
                    <Form.Item name="message">
                        <TextArea onKeyDown={onEnterPress} style={{width: '100%', marginRight: '16px' }}/>
                    </Form.Item>
                    <Row justify="end">
                        <Button htmlType="submit">Enviar</Button>
                    </Row>
                </Form>
            )}
        >
            {map(messages, (msg, i) => (
                <div 
                    key={i}
                    style={{ textAlign: `${msg.isMe ? 'right' : 'left'}`, ...(msg.isMe ? { color: '#444' } : {}) }}
                >
                    {msg.message}
                </div>
            ))}
        </Drawer>
    )
}

export default forwardRef(Chat);
