import nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";

export const sendEmail = async (options) => {
  try {
    const templateFile = fs
      .readFileSync("/Users/hoa/MD5/BackEnd/src/utils/email.html", "utf-8")
      .toString();
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
      subject: "chúng tôi giúp bạn dễ dàng đăng nhập lại trên Instagram",
      to: options.email,
      html: templateFile.replace("{{link}}", options.data.reset_url),
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
