require('dotenv').config()
const app = require('./app')
require('./database')
//  const port = 4000
function main() {
    app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`)
}
main();