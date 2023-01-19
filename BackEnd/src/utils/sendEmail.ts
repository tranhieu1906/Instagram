
import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  console.log(options);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "nguyentranhieugttn@gmail.com",
        pass: "Hieu@19062004",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "nguyentranhieugttn@gmail.com",
      subject: "subject",
      to: options.email,
      text: options.data,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
