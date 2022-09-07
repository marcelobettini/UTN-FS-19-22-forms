import express from "express"
const router = express.Router()
import validationRules from "../validators/validationRules.js";
import transport from "../config/nodemailer.js"

router.get("/", (req, res) => {
  res.render("form")
})

router.post("/", validationRules, async (req, res) => {
  const { name, lastName, email, message } = req.body
  const emailMsg = {
    to: "atencioncliente@nuestraempresa.com",
    from: email,
    subject: "Mensaje desde formulario de contacto",
    html: `Contacto de ${name} ${lastName}: ${message}`
  }

  const sendMailStatus = await transport.sendMail(emailMsg);
  if (sendMailStatus.rejected.length) {
    req.app.locals.sendMailFeedback = "No pudimos enviar.";
  } else {
    req.app.locals.sendMailFeedback = "Mensaje enviado.";
  }

  res.redirect("/")
}
)

export default router