const JWT=require('jsonwebtoken');

const secret="Shubhakdkjdmlkmd"

function generateusertoken(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return JWT.sign(payload, secret);
}

function validateToken(token) {
    return JWT.verify(token, secret);
}

module.exports = { generateusertoken, validateToken };