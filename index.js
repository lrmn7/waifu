require('./Structures/WaifuMusic')
const express = require('express')
const app = express()

// Set up routes
app.get('/', (req, res) => {
  res.send('Dev L RMN!')
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {

})
