require("module-alias/register");
const dotenv = require('dotenv');
dotenv.config();
const app = require('@/app');
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`connect http://localhost:${PORT}`);
});
