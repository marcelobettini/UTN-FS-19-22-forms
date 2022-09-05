import express from "express"
const router = express.Router()
import nodemailer from "nodemailer"


router.get("/", (req, res) => {
  res.render("form")
})

router.post("/", async (req, res) => {
  const { name, lastName, email, message } = req.body

  const emailMsg = {
    to: "atencioncliente@nuestraempresa.com",
    from: email,
    subject: "Mensaje desde formulario de contacto",
    html: `Contacto de ${name} ${lastName}: ${message}`
  }

  //inseguro, refactorizar con variables de entorno
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  });

  const sendMailStatus = await transport.sendMail(emailMsg);
  let sendMailFeedback = "";
  if (sendMailStatus.rejected.length) {
    sendMailFeedback = "No pudimos enviar.";
  } else {
    sendMailFeedback = "Mensaje enviado.";
  }
  res.render("home", { message: sendMailFeedback })

})

export default router