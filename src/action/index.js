export const selectEmail =(email)=>{
    console.log("email select which is sent by ",email.sender_mail);
    return{
        type:'SELECT_EMAIL',
        payload:email
    }
}