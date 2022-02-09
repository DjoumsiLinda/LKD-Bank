//reducer
export default function usersReducer(users = null, action) {
    if (action.type === "users/receivedUsers") {
        users = action.payload.users;
    } else if (action.type === "users/setUserHook") {
        const newUser = { ...users, ...action.payload.users };
        return newUser;
    } else if (action.type === "users/setUserInPause") {
        const newUser = { ...users, pause: action.payload.pause };
        return newUser;
    }
    return users;
}

//actions creations
export function receivedUsers(users) {
    return {
        type: "users/receivedUsers",
        payload: { users },
    };
}

export function setUserHook(users) {
    return {
        type: "users/setUserHook",
        payload: { users },
    };
}

export function setUserInPause(pause) {
    return {
        type: "users/setUserInPause",
        payload: { pause },
    };
}
