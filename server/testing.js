var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mymedscare@gmail.com",
    pass: "Mymedscare#1",
  },
});

var mailOptions = {
  from: "mymedscare@gmail.com",
  to: "kapishsingla1326@gmail.com",
  subject: "Testing",
  text: `Hey`,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
