import nodemailer from "nodemailer";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static("views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "./views/index.ejs"));
});

//Using SMTP for Nodemailer Transport
// let transport = nodemailer.createTransport(options[, defaults])

app.post("/", (req, res) => {
  console.log(req.body);
  const { content, subject, name } = req.body;

  async function main() {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error("Failed to create a testing account. " + err.message);
        return process.exit(1);
      }

      console.log("Credentials obtained, sending message...");

      //Testing our Code with Ethereal
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        //to remove authorization error
        tls: {
          rejectUnauthorized: false,
        },
      });

      const message = {
        from: "priyanshi.sachan@iwebcode.net", // Sender address
        to: "priyanshianamika@gmail.com", // List of recipients
        subject: `${subject}`, // Subject line
        text: `${name} \n ${content}`, // Plain text body or html script
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
    });
  }

  main().catch((error) => {
    res.json({
      error: error,
    });
  });

  res.send("Email sent");
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server connected on ${PORT}`));
