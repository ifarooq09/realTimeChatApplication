/* eslint-disable no-unused-vars */
export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    instantMessagesContacts: [],
    isUploading: false,
    isDownloading: false,
    fileUploadProgress: 0,
    fileDownloadProgress: 0,
    groups: [],
    setGroups: (groups) => set({ groups }),
    setIsUploading: (isUploading) => set({ isUploading }),
    setIsDownloading: (isDownloading) => set({ isDownloading }),
    setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
    setFileDownloadProgress: (fileDownloadProgress) => set({ fileDownloadProgress }),
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    setInstantMessagesContacts: (instantMessagesContacts) => set({ instantMessagesContacts }),
    addGroup: (group) => {
        const groups = get().groups
        set({
            groups: [ group, ...groups]
        })
    },
    closeChat: () => set({
        selectedChatData: undefined,
        selectedChatType: undefined,
        selectedChatMessages: []
    }),
    addMessage: (message) => {
        const selectedChatMessages = get().selectedChatMessages
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages: [
                ...selectedChatMessages,
                {
                    ...message,
                    recipient:
                        selectedChatType === "channel"
                            ? message.recipient
                            : message.recipient._id,
                    sender:
                        selectedChatType === "channel"
                            ? message.sender
                            : message.sender._id
                },
            ],
        });
    },
    addGroupInGroupList: (message) => {
        const channels = get().channels;
        const data = channels.find((channel) => channel._id === message.channelId)
        const index = channels.findIndex(
            (channel) => channel._id === message.channelId
        )
        if (index !== -1 && index !== undefined) {
            channels.splice(index, 1)
            channels.unshift(data)
        }
    },
    addContactsInIMContacts: (message) => {
        const userId = get().userInfo.id;
        const fromId = 
            message.sender._id === userId
            ? message.recipient._id
            : message.sender._id
        const fromData = message.sender._id === userId ? message.recipient : message.sender
        const IMContacts = get().instantMessagesContacts;
        const data = IMContacts.find((contact) => contact._id === fromId)
        const index = IMContacts.findIndex((contact) => contact._id === fromId)
        if (index !== -1 && index !== undefined) {
            IMContacts.splice(index, 1)
            IMContacts.unshift(data)
        } else {
            IMContacts.unshift(fromData)
        }
        set({
            instantMessagesContacts: IMContacts
        })
    }
})