import nodeMailer from "nodemailer";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplates.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to UnLinked",
      html: createWelcomeEmailTemplate(name, profileUrl),
      category: "welcome",
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: "New Comment on Your Post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commenterName,
        postUrl,
        commentContent
      ),
      category: "comment_notification",
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Comment Notification Email sent successfully", response);
  } catch (error) {
    console.error("Error sending comment notification email:", error);
  }
};

export const sendConnectionAcceptedEmail = async (
  senderEmail,
  senderName,
  recipientName,
  profileUrl
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: senderEmail,
      subject: `${recipientName} accepted your connection request`,
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
      category: "connection_accepted",
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Connection Accepted Email sent successfully", response);
  } catch (error) {
    console.error("Error sending connection accepted email:", error);
  }
};
