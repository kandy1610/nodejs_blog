const express = require('express')
const morgan = require("morgan")
const {engine} = require('express-handlebars')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
//HTTP
app.use(morgan('combined'))

//templace engine
app.engine('hbs', engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'resources/views/layouts'),
  partialsDir: path.join(__dirname, 'resources/views/partials')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources\\views'))

app.get('/trang-chu', (req, res) => {
    res.render('home');
})

app.get('/news', (req, res) => {
    res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
