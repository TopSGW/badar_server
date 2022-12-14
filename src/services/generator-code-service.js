import generator from 'password-generator';

export const generateVerifyCode = (regex) => {
    if (regex) {
        return generator(6,false,regex)
    }else{
        return generator(6,false)
    }
};
