const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();

app.use(bodyParser.json());

// Your CRUD routes will be defined here
app.get('/api/users', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    console.log(name,email);
    try {
        const { rows } = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/users/:id', async (req, res) => {
    const itemId = req.params.id;
    const { name, email } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, itemId]
        );
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const { rows } = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [itemId]
        );
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
