import nodemailer from "nodemailer";

//Using SMTP for Nodemailer Transport
// let transport = nodemailer.createTransport(options[, defaults])

let testAccount = await nodemailer.createTestAccount();

//Testing our Code with Ethereal
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "kiel.lind27@ethereal.email",
    pass: "25YnN3UFqVbydzVeRs",
  },
  //to remove authorization error
  tls: {
    rejectUnauthorized: false,
  },
});

const message = {
  from: "priyanshi.sachan@iwebcode.net", // Sender address
  to: "priyanshianamika1815@gmail.com", // List of recipients
  subject: "Design Your Model S | Tesla", // Subject line
  html: "<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>", // Plain text body or html script
  attachments: [
    {
      // Use a URL as an attachment
      filename: "your-testla.png",
      path: "https://media.gettyimages.com/photos/view-of-tesla-model-s-in-barcelona-spain-on-september-10-2018-picture-id1032050330?s=2048x2048",
    },
  ],
};
transporter.sendMail(message, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
});
