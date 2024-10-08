/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { userAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = userAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleRecieveMessage = (message) => {
        console.log("Message received on client: ", message); // Add this log
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addContactsInIMContacts,
        } = userAppStore.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        }
        addContactsInIMContacts(message);
      };

      const handleReceiveGroupMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addGroupInGroupList,
        } = userAppStore.getState();

        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.groupId
        ) {
          addMessage(message);
        }
        addGroupInGroupList(message);
      };

      socket.current.on("recieveMessage", handleRecieveMessage);
      socket.current.on("receiveGroupMessage", handleReceiveGroupMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
