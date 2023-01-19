import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "nguyentranhieugttn@gmail.com",
        pass: "ppfibrvfwfdlnedo",
      },
    });

    await transporter.sendMail({
      from: options.email,
      subject: "subject",
      to: options.email,
      text: options.data.reset_url,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
