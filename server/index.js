// 1️⃣ Express import karte hain
import express from 'express';
import mongoose from 'mongoose';
import employeesRoutes from './routes/employees.route.js';
import superAdminRoutes from './routes/superAdmin.route.js';
import adminRoutes from './routes/admin.route.js';
import { configDotenv } from 'dotenv';
import cors from 'cors'

import connectDB from './db/database.js';

configDotenv()
connectDB();
// 2️⃣ Express app banate hain
const app = express();

app.use(cors());
app.use(express.json());

// 3️⃣ Port define karte hain
const PORT = process.env.PORT || 3000;

// 4️⃣ Ek test route banate hain
app.get('/', (req, res) => {
  res.send('Server chal raha hai meri jaan! 🔥');
});

app.use('/api/employee' , employeesRoutes)
app.use('/api/superAdmin' , superAdminRoutes) 
app.use('/api/admin' , adminRoutes)




// 5️⃣ Server ko chalu karte hain
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
