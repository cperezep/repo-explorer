import React from 'react';
import './index.scss';

type MessageProps = {
  title: string;
};

const Message: React.FC<MessageProps> = ({ title }) => (
  <section className="message" role="alert" aria-live="assertive">
    <div className="message__content">
      <h2 className="message__title">{title}</h2>
    </div>
  </section>
);

export default Message;
