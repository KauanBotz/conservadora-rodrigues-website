const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.static('src'));
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.post('/api/orcamento', async (req, res) => {
    console.log('Requisição recebida:', req.body);
    try {
        const { nome, email, telefone, servico, mensagem } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: 'Novo Pedido de Orçamento - Conservadora Rodrigues',
            html: `
                <h2>Novo Pedido de Orçamento</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${telefone}</p>
                <p><strong>Serviço:</strong> ${servico}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Orçamento recebido com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ message: 'Erro ao processar orçamento' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Servidor iniciado com sucesso!');
});
