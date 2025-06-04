const express = require('express')
const cors = require('cors')

const app = express()

const path = require('path')
//app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use('/images/pets', express.static(path.join(__dirname, 'public/images/pets')))



//Config JSON response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)