export const getSender = (loggedUser, users) => {
    // Kiểm tra xem mảng users có ít nhất 2 người và có giá trị hợp lệ không
    if (!users || users.length < 2) {
        return "No users available"; // Hoặc giá trị mặc định nếu không có đủ users
    }

    // Kiểm tra xem loggedUser và users[0], users[1] có tồn tại không
    if (!loggedUser || !users[0] || !users[1]) {
        return "Invalid user data"; // Hoặc giá trị mặc định nếu có đối tượng không hợp lệ
    }

    // Nếu loggedUser là user[0], thì trả về user[1].name, ngược lại trả về user[0].name
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

//Kiểm tra tin nhắn đang nhắn ai là người nhắn, 2 tín nhắn giống nhau liên tục có được nhắn cùng 1 người hay ko, nếu không phải là người dùng hiện tại đang đăng nhập thì ko hiển thị avatar
export const isSameSender = (messages, m, i, userId) => { // danh sách tin nhắn, tin nhắn đó, chỉ mục của tin nhắn, login ueserId 
    return (
        i < messages.length - 1 && 
        (messages[i+1].sender._id !== m.sender._id ||
            messages[i+1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

export const isLateMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    ); 
};

export const isSameSenderMargin = (messages, m, i, userId) => {
    if(
        i < messages.length - 1 && 
        messages[i+1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    ) return 33;
    else if(
        (i < messages.length - 1 && 
        messages[i+1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    ) return 0;
    return "auto";
}

export const isSameUser = (messages, m, i) =>{
    return i > 0 && messages[i-1].sender._id === m.sender._id;
}