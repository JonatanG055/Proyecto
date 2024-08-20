"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
const PORT = process.env.PORT || 3000;
// Conectar a MongoDB
(0, db_1.default)();
// Inicia el servidor
app_1.default.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
