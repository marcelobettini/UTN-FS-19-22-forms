import hbs from "express-handlebars";
import express from "express";
const PORT = 3000;
const app = express();
import routerForm from "./routes/form.js"

//variables globales (locals), accesibles en todas las vistas, útiles para un redirect, por ej.
app.locals.sendMailFeedback

//express-hbs config
app.engine(".hbs", hbs.engine({ extname: "hbs" }));
app.set('view engine', 'hbs');
app.set('views', './views');

//definimos la carpeta de recursos estáticos
app.use(express.static("public"))
//habilitamos la lectura de datos del body de la request
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, (err) => {
  !err ? console.log(`Running on http://localhost:${PORT}`) : console.log('Essssplotó todooo');
})
app.get("/", (req, res) => {
  res.render("home")
})
app.use("/form", routerForm)



