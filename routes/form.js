import express from "express"
const router = express.Router()
import nodemailer from "nodemailer"


router.get("/", (req, res) => {
  res.render("form")
})

router.post("/", (req, res) => {
  const { name, lastName, email, message } = req.body

  const emailMsg = {
    to: "atencioncliente@nuestraempresa.com",
    from: email,
    subject: "Mensaje desde formulario de contacto",
    html: `Contacto de ${name} ${lastName}: ${message}`
  }

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "139eb1eb7d9501",
      pass: "f08bba5cc733ff"
    }
  });

  transport.sendMail(emailMsg)
  res.render("home", { message: "Listo Calixto..." })

})

export default router