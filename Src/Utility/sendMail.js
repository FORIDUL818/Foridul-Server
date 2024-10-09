import nodemailer from "nodemailer"
const SendEmailUtility= async(emailTo,emailText,emailSubject)=>{
  const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
      user: "foridulislamdise880@gmail.com",
       pass: "jxcs swke gkoh widq",
        },
      });
      let mailOptions={
        from:"<foridulislamdise880@gmail.com",
        to:emailTo,
        subject:emailSubject,
        text:emailText
      }
      return await transporter.sendMail(mailOptions)

}
export {SendEmailUtility}