import React from "react";
import { ChatDateTime, ShowDetails } from "./index";

function ChatSchedule() {
  return (
    <section className="section" id="chat-bg">
      <div className="container is-fluid">
        <div className="columns content is-mobile">
          <div className="column is-3 cs-bg-color">
            {/* <h3>Date</h3> */}
            <ChatDateTime />
            <ChatDateTime />
            <ChatDateTime />
            <ChatDateTime />
            <ChatDateTime />
          </div>
          <div className="column is-9 cs-bg-color">
            <ShowDetails />
            <ShowDetails />
            <ShowDetails />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatSchedule;
