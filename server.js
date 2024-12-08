import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3020, () => {
    console.log('Server running on port 3020');
});
