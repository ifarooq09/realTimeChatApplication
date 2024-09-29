export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = "/api/v1/auth"
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/userInfo`
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/updateProfile`
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/addProfileImage`
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/removeProfileImage`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`


export const CONTACTS_ROUTES = "/api/v1/contacts"
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/search`
export const GET_CONTACTS_FOR_IM_LIST = `${CONTACTS_ROUTES}/getContactsForIM`
export const GET_ALL_CONTACTS = `${CONTACTS_ROUTES}/getAllContacts`

export const MESSAGES_ROUTES = "/api/v1/messages"
export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/getMessages`
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/uploadFiles`

export const GROUPS_ROUTES = "/api/v1/groups"
export const CREATE_GROUP_ROUTES = `${GROUPS_ROUTES}/createGroup`