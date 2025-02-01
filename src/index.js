document.addEventListener("DOMContentLoaded", function () {
    // Função para enviar o formulário de orçamento
    function enviarFormularioOrcamento() {
        const formulario = document.getElementById('orcamento-form');
        const dados = new FormData(formulario);

        fetch('/api/orcamento', {
            method: 'POST',
            body: dados
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            formulario.reset();
        })
        .catch(error => console.error('Erro:', error));
    }

    // Função para alternar o menu
    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        const toggleButton = document.querySelector('.menu-toggle');
        navLinks.classList.toggle('active');
        toggleButton.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    }

    // Adiciona evento de clique para o menu
    document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

    // Lida com o clique nos links de navegação
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const nav = document.querySelector('.nav-links');
            nav.classList.remove('active'); // Fecha o menu
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll suave para a seção de orçamento ao clicar no botão
    const budgetButton = document.querySelector('.cta-button');
    budgetButton.addEventListener('click', (event) => {
        const targetElement = document.getElementById('orcamento');
        if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Esconde ou mostra a navbar ao rolar a página
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('hide');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
            navbar.classList.add('hide');
        } else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
            navbar.classList.remove('hide');
        }

        lastScroll = currentScroll;
    });

    // Envio do formulário de contato com fetch
    const form = document.getElementById("forSubmit");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("https://formsubmit.co/ajax/conservadorar3@hotmail.com", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const data = await response.json();

            if (data.success) {
                const message = document.getElementById("thank-you-message");
                message.innerHTML =
                    "<p style='color: #004d40;'>Formulário enviado com sucesso!</p>";
                console.log('Mensagem de sucesso exibida:', data.success);
                console.log('Conteúdo da mensagem:', message.innerHTML);
                form.reset();
            } else {
                document.getElementById("thank-you-message").innerHTML =
                    "<p style='color: red;'>Erro ao enviar. Tente novamente.</p>";
            }
        } catch (error) {
            document.getElementById("thank-you-message").innerHTML =
                "<p style='color: red;'>Falha na conexão. Verifique sua internet e tente novamente.</p>";
        }
    });

    // Envio do formulário de trabalho
    const formTrabalhe = document.getElementById("trabalhe-form");

    formTrabalhe.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(formTrabalhe);

        try {
            const response = await fetch("https://formsubmit.co/ajax/conservadorar3@hotmail.com", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const data = await response.json();

            if (data.success) {
                const message = document.getElementById("thank-you-message-trabalhe");
                message.innerHTML = "Seu currículo foi enviado com sucesso!";
                console.log('Mensagem de sucesso exibida:', data.success);
                console.log('Conteúdo da mensagem:', message.innerHTML);
                formTrabalhe.reset();
            } else {
                document.getElementById("thank-you-message-trabalhe").innerHTML =
                    "<p style='color: red;'>Erro ao enviar. Tente novamente.</p>";
            }
        } catch (error) {
            document.getElementById("thank-you-message-trabalhe").innerHTML =
                "<p style='color: red;'>Falha na conexão. Verifique sua internet e tente novamente.</p>";
        }
    });
});
