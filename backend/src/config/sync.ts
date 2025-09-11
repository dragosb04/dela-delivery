import sequelize from './database.js';
import '../models/User.js';

console.log('Modele în Sequelize:', sequelize.models);
sequelize.sync({ force: true }) // recreează tabelele
    .then(() => {
        console.log("Tabele sincronizate în MySQL");
        process.exit(); // închidem scriptul după sincronizare
    })
    .catch(err => console.log("Eroare:", err));


//rulam cu node src/config/sync.js