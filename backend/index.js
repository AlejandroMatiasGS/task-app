require('dotenv').config();
const app = require('./app.js');

function main() {
    try {
        app.listen(process.env.PORT || 4000);
        console.log('Servidor iniciado.')
    }catch(error) {
        console.error(error);
    }
}

main()