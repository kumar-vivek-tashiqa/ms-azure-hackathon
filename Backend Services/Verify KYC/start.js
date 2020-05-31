const app = require('./server.js')

const port = process.env.PORT || 1337;
app.listen(port)

console.log('Verify KYC service started on: 80');