import validator from "express-validator";
const { body, validationResult } = validator
const validationRules = [
  body("name")
    .notEmpty().withMessage("NOMBRE: 'campo obligatorio'")
    .isLength({ min: 2, max: 30 }).withMessage("NOMBRE: 'requiere entre 2 y 30 caracteres")
    .isAlpha().withMessage("NOMBRE: 'solo letras, sin signos ni números"),
  body("lastName")
    .notEmpty().withMessage("Campo obligatorio")
    .isLength({ min: 2, max: 30 }).withMessage("Min 2, Max 30"),
  body("email")
    .notEmpty().withMessage("Campo obligatorio")
    .isEmail().withMessage("Debe ingresar un email válido"),
  body("message")
    .notEmpty().withMessage("")
    .trim(" ")
    .isLength({ min: 10, max: 300 }).withMessage("Mensaje debe contener entre 10 y 300 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const formData = req.body
      const arrWarnings = errors.array();
      res.render("form", { arrWarnings, formData })
    } else return next()
  }
]

export default validationRules