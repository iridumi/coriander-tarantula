//src/reducer.js
export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_USERS") {
        state = {
            ...state,
            users: action.users
        };
    }
    // if (action.type == "MAKE_FRIENDS" || action.type == "UNFRIEND") {
    //     //return {
    //     state = {
    //         ...state,
    //         users: state.users.map(user => {
    //             if (user.id == action.id) {
    //                 return {
    //                     ...user,
    //                     accepted: action.type == "MAKE_FRIENDS"
    //                 };
    //             } else {
    //                 return user;
    //             }
    //         })
    //     };
    // }

    if (action.type == "MAKE_FRIENDS") {
        //return {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter(user => user.id != action.id)
        };
    }

    if (action.type == "GET_CHAT_MESSAGES") {
        console.log("getting messages reducer: ", action);
        state = {
            ...state,
            chatMessages: action.messages.reverse()
        };
    }
    if (action.type == "ADD_NEW_MESSAGE") {
        console.log("adding message in the reducer: ", action);
        state = {
            ...state,
            //chatMessages: ...state.chatMessages, action.msg
            //    chatMessages: [...state.chatMessages, action.msg[0]]
            chatMessages: state.chatMessages.concat(action.msg)
        };
    }
    console.log("reducer state: ", state);
    return state;
}
