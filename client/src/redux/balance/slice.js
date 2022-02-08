//reducer
export default function balanceReducer(balance = null, action) {
    if (action.type === "users/setbalanceHook") {
        balance = action.payload.balance;
    }
    return balance;
}

//actions creations
export function setbalanceHook(balance) {
    return {
        type: "users/setbalanceHook",
        payload: { balance },
    };
}
