const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/tarantula`
);

module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, password]
    );
};

module.exports.getHashAndUserId = email => {
    return db.query(
        `SELECT password, id
         FROM users
         WHERE email = $1`,
        [email]
    );
};

module.exports.getUser = user => {
    return db.query(
        `SELECT *
        FROM users
        WHERE id = $1
        `,
        [user]
    );
};

module.exports.getFile = file => {
    return db.query(
        `SELECT *
        FROM plots
        WHERE id = $1
        `,
        [file]
    );
};

module.exports.addImage = (id, image) => {
    return db.query(
        `UPDATE users
        SET image = $2
        WHERE id = $1
        RETURNING image`,
        [id, image]
    );
};

// module.exports.editBio = (id, bio) => {
//     return db.query(
//         `UPDATE users
//         SET bio = $2
//         WHERE id = $1
//         RETURNING bio`,
//         [id, bio]
//     );
// };

module.exports.latestFiles = () => {
    return db.query(
        `SELECT id, ra, dec, name, file, description, url
        FROM plots
        ORDER BY id DESC
        LIMIT 15`
    );
};

module.exports.findFiles = input => {
    return db.query(
        `SELECT id, ra, dec, name, file, description FROM plots
        WHERE name ILIKE $1`,
        [input + "%"]
    );
};

// module.exports.getFriendship = (sender_id, receiver_id) => {
//     return db.query(
//         `SELECT * FROM friendships
//         WHERE (receiver_id = $1 AND sender_id = $2)
//         OR (receiver_id = $2 AND sender_id = $1)
//         `,
//         [sender_id, receiver_id]
//     );
// };
//
// module.exports.reqFriendship = (sender_id, receiver_id) => {
//     return db.query(
//         `INSERT INTO friendships (sender_id, receiver_id)
//         VALUES ($1, $2)
//         `,
//         [sender_id, receiver_id]
//     );
// };
//
// module.exports.acceptFriendship = (sender_id, receiver_id) => {
//     return db.query(
//         `UPDATE friendships
//         SET accepted = true
//         WHERE (sender_id=$1 AND receiver_id=$2)
//         OR (sender_id=$2 AND receiver_id=$1)
//         `,
//         [sender_id, receiver_id]
//     );
// };

// module.exports.unFriend = (sender_id, receiver_id) => {
//     return db.query(
//         `DELETE FROM friendships
//         WHERE (sender_id=$1 AND receiver_id=$2)
//         OR (sender_id=$2 AND receiver_id=$1)`,
//         [sender_id, receiver_id]
//     );
// };
//
// module.exports.getFriendsWannabes = id => {
//     return db.query(
//         `   SELECT users.id, first, last, image, accepted
//             FROM friendships
//             JOIN users
//             ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
//             OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
//             OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
//         `,
//         [id]
//     );
// };

module.exports.getLastTenChatMessages = () => {
    return db.query(
        `SELECT chats.id, users.first, users.last, users.image, chats.message, chats.created_at, chats.user_message_id
        FROM chats
        JOIN users
        ON (users.id = chats.user_message_id)
        ORDER BY chats.id DESC
        LIMIT 10
        `
    );
};

module.exports.addNewMessage = (message, user_message_id) => {
    return db.query(
        `INSERT INTO chats (message, user_message_id)
        VALUES ($1, $2)
        RETURNING (message, id)
        `,
        [message, user_message_id]
    );
};

module.exports.getMessageInfo = id => {
    return db.query(
        `SELECT chats.id AS chatsid, users.first, users.last, users.image, chats.message, chats.created_at, chats.user_message_id
        FROM chats
        JOIN users
        ON (users.id = chats.user_message_id AND chats.user_message_id = $1)
        ORDER BY chats.id DESC
        LIMIT 1
        `,
        [id]
    );
};

// module.exports.getOtherProfileFriends = id => {
//     return db.query(
//         `SELECT users.id, first, last, image, accepted
//         FROM friendships
//         JOIN users
//         ON (accepted = true AND receiver_id = $1 AND sender_id = users.id)
//         OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
//         `,
//         [id]
//     );
// };
