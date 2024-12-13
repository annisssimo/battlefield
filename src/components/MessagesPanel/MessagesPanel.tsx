import { useEffect, useRef } from 'react';

import * as style from './MessagesPanel.css';

const MessagesPanel = ({ messages }: { messages: string[] }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={style.messagesPanel} ref={panelRef}>
      <h4>Activity Logs</h4>
      {messages.map((message, index) => (
        <div key={index} className={style.message}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessagesPanel;
