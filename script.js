document.addEventListener('DOMContentLoaded', function() {
    // Carrinho de compras. Cada item pode ser:
    // - Jantinha Completa: { id: 'pp-1', espeto: 'Carne', feijao: 'Tropeiro', salada: 'Vinagrete', quantity: 1 }
    // - Jantinha Nota 1000: { id: 'pp-2', espeto: 'Carne', feijao: 'Tropeiro', salada: 'Vinagrete', quantity: 1 }
    // - Jantinha sem Espeto: { id: 'pp-3', feijao: 'Tropeiro', salada: 'Vinagrete', quantity: 1 }
    // - Outros produtos: { id: 'produto_id', quantity: X }
    let cart = [];

    // --- Elementos do DOM ---
 
    const body = 
document.body;
    const menuSections = document.getElementById('menu-sections');

    // Elementos do Modal do Carrinho
    const cartModal = document.getElementById('cart-modal');
    const cartItemsScrollContainer = document.getElementById('cart-items-scroll-container');
    const cartItemsModalContainer = document.getElementById('cart-items-modal');
    const cartTotalModalSpan = document.getElementById('cart-total-modal');
    const checkoutWhatsappModalBtn = document.getElementById('checkout-whatsapp-modal');
    const orderDetailsContainer = document.getElementById('order-details-container');
    const orderTypeSelect = document.getElementById('order-type');
    const deliveryOptionsDiv = document.getElementById('delivery-options');
    const pickupOptionsDiv = document.getElementById('pickup-options');
    const deliveryAddressInput = document.getElementById('delivery-address');
    const pickupNameInput = document.getElementById('pickup-name');
    const deliveryFeeInfo = document.getElementById('delivery-fee-info');
    const notesTextarea = document.getElementById('notes');

    // Elementos do Modal de Resumo (ADIÇÃO)
    const summaryModal = document.getElementById('summary-modal');
    const summaryContentDiv = document.getElementById('summary-content');
    const sendOrderBtn = document.getElementById('send-order-btn'); 

   
    
    // Elementos do Modal de Informações
    const infoModal = document.getElementById('info-modal');
    const infoToggleContainer = document.getElementById('info-toggle-container');
    
 
    
    // Elementos do Ícone do Carrinho no Header
    const cartIconContainer = document.getElementById('cart-icon-container');
    const cartCountSpan = document.getElementById('cart-count');
    
    // Elementos do Tema
    const themeToggleContainer = document.getElementById('theme-toggle-container');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    
    // Elemento para a navegação de categorias
    const categoryNavigation = document.getElementById('category-navigation');
    
    // Elementos do Chatbot
    const openChatBtn = document.getElementById('openChatBtn');
    const chatModal = document.getElementById('chatModal');
    const closeChatModalBtn = document.getElementById('closeChatModalBtn');
    const chatbox = document.getElementById('chatbox');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    
    // Script para o botão "Voltar ao Topo"
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // --- Elementos do DOM para o Modal de Reserva ---
    const reservationModal = document.getElementById('reservation-modal');
    const reservationIcon = document.getElementById('reservation-icon');
    const sendReservationWhatsappBtn = document.getElementById('send-reservation-whatsapp');

    // Alerta de funcionamento
    const statusFuncionamentoMainElement = document.getElementById('status-funcionamento-main');
    const operatingHours = {
        // Horários no formato HH:MM
        openTime: '18:00', // 18:00h
        closeTime: '23:59', // 23:59h
        closedDay: 1 // 1 para Segunda-feira (0=Dom, 1=Seg, ..., 6=Sab)
    };
    
    // --- Variáveis de Dados (assumindo que vêm de cardapio.js e knowledgeBase.js) ---
    // Certifique-se de que 'products', 'categoriesData', 'chatbotKnowledgeBase',
    // 'photos', 'DEFAULT_LOTTIE_JSON', 'DEFAULT_CATEGORY_IMAGE', 'DEFAULT_PLACEHOLDER_IMAGE'
    // estão definidos em 'cardapio.js' e 'knowledgeBase.js' e são globais ou importados.
    
    /** *Função para verificar o dia e atualizar o status de funcionamento na tela principal.
    * @returns {string} true se a loja estiver aberta, false se estiver fechada.*/
    function getStoreStatus() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // 1. Verificar se é o dia de fechamento (Segunda-feira)
        if (dayOfWeek === operatingHours.closedDay) {
            return 'CLOSED';
        // Fechado às segundas-feiras
        }

        // Converte os horários de string para números para comparação
        const [openHour, openMinute] = operatingHours.openTime.split(':').map(Number);
        const [closeHour, closeMinute] = operatingHours.closeTime.split(':').map(Number);

        // Cria objetos Date para os horários de abertura e fechamento no dia atual
        const openTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openHour, openMinute, 0);
        const closeTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeHour, closeMinute, 0);
        
        // 2. Verifica se a hora atual está DENTRO do intervalo de funcionamento
        if (now >= openTimeToday && now <= closeTimeToday) {
            return 'OPEN';
        // Aberto
        }

        // 3. Verifica se a hora atual está ANTES do horário de abertura (mas em um dia de funcionamento)
        if (now < openTimeToday) {
            return 'AWAITING_OPENING';
        // Em breve abriremos
        }

        // 4. Se não é dia de fechamento, não está aberto e não está esperando abrir, então já passou do horário de fechamento.
        return 'CLOSED'; // Fechado (já passou do horário)
    }

    function updateMainScreenOperatingStatus() {
        if (statusFuncionamentoMainElement) {
            const status = getStoreStatus();
            // Pega o status atual
            if (status === 'OPEN') {
                statusFuncionamentoMainElement.textContent = "🥳 Estamos abertos! Faça seu pedido!";
                statusFuncionamentoMainElement.classList.add('aberto-main');
                statusFuncionamentoMainElement.classList.remove('fechado-main');
                statusFuncionamentoMainElement.style.display = 'block';
            } else if (status === 'CLOSED') {
                statusFuncionamentoMainElement.textContent = "❌ Olá! Estamos fechados hoje. Nosso horário de funcionamento é de TERÇA a DOMINGO, das 18:00h às 00:00h.";
                statusFuncionamentoMainElement.classList.add('fechado-main');
                statusFuncionamentoMainElement.classList.remove('aberto-main');
                statusFuncionamentoMainElement.style.display = 'block';
            }
        }
    }

    updateMainScreenOperatingStatus();
    
    // --- Funções de Manipulação do Tema ---
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }

    function toggleTheme() {
        if (body.classList.contains('light-theme')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    // --- Funções de Manipulação de Modais (Generalizadas) ---
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'flex';
            body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
            body.style.overflow = 'auto';
        }
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeModal(cartModal);
        } else if (event.target === summaryModal) { // ADIÇÃO
            closeModal(summaryModal);
        } else if (event.target === infoModal) {
            closeModal(infoModal);
        } else if (event.target === photosModal) {
            
            closeModal(photosModal);
        } else if (event.target === chatModal) {
            closeModal(chatModal);
            if (chatbox) {
                chatbox.innerHTML = '';
                delete chatbox.dataset.initialMessageShown;
            }
        }
    });
    
    // --- Funções Auxiliares do Chatbot ---
    function getWeekdayName(dayIndex) {
        const weekdays = [
            "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
            "Quinta-feira", "Sexta-feira", "Sábado"
        ];
        return weekdays[dayIndex];
    }

    function addMessage(message, sender) {
        if (chatbox) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);
            messageDiv.innerHTML = message.replace(/\n/g, '<br>');
            chatbox.appendChild(messageDiv);
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }

    // 1. Lógica Principal do Chatbot
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase().trim();
        if (typeof chatbotKnowledgeBase !== 'undefined') {
        for (const keyword in chatbotKnowledgeBase) {
            if (userMessage.includes(keyword)) {
                return chatbotKnowledgeBase[keyword];
            }
        }
    }
        return "Desculpe, não entendi sua pergunta. Poderia reformular ou perguntar sobre o menu, entrega, horários, etc.?";
    }

    // --- Funções de Carrinho ---
    function addToCart(productId) {
        const existingItemIndex = cart.findIndex(item => item.id === productId && !['pp-1', 'pp-2', 'pp-3'].includes(item.id));
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        updateCartDisplay();
        flashCartIcon();
    }

    function addCustomizableJantinhaToCart(productId) {
        const newItem = { id: productId, quantity: 1 };
        if (productId === 'pp-1' || productId === 'pp-2') {
            newItem.espeto = '';
            newItem.feijao = '';
            newItem.salada = ''; // ✅ ADIÇÃO: Inicializa a opção de Salada
        } else if (productId === 'pp-3') {
            newItem.feijao = '';
            newItem.salada = ''; // ✅ ADIÇÃO: Inicializa a opção de Salada
        }
        // Lógica para as misturas dos caldos //
        if (productId === 'cald-1' || productId === 'cald-2' || productId === 'cald-3') {
            newItem.acompanhamento = '';
        // Inicializa a opção de acompanhamento
        }
        cart.push(newItem);
        updateCartDisplay();
        flashCartIcon();
    }

    function removeItemFromCart(cartIndex) {
        if (cartIndex >= 0 && cartIndex < cart.length) {
            cart.splice(cartIndex, 1);
            updateCartDisplay();
            flashCartIcon();
        }
    }

    function scrollCartUp() {
        if (cartItemsScrollContainer) {
            const scrollAmount = cartItemsScrollContainer.clientHeight * 0.5;
            cartItemsScrollContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        }
    }

    function scrollCartDown() {
        if (cartItemsScrollContainer) {
            const scrollAmount = cartItemsScrollContainer.clientHeight * 0.5;
            cartItemsScrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    }

    function flashCartIcon() {
        if (cartIconContainer) {
            cartIconContainer.classList.add('flash');
            setTimeout(() => {
                cartIconContainer.classList.remove('flash');
            }, 500);
        }
    }

    function updateCartDisplay() {
        if (!cartItemsModalContainer || !cartTotalModalSpan || !cartCountSpan) return;

        cartItemsModalContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            cartItemsModalContainer.innerHTML = '<p> ❌Nenhum item no carrinho.</p>';
            if (orderDetailsContainer) {
                orderDetailsContainer.style.display = 'none';
            }
            if (checkoutWhatsappModalBtn) {
                checkoutWhatsappModalBtn.style.display = 'none';
            }
        } else {
            if (orderDetailsContainer) {
                orderDetailsContainer.style.display = 'block';
            }

            if (checkoutWhatsappModalBtn) {
                checkoutWhatsappModalBtn.style.display = 'block';
            }
            cart.forEach((cartItem, index) => {
                const product = products.find(p => p.id === cartItem.id);
                if (!product) {
                    console.warn(`Produto com ID ${cartItem.id} não encontrado.`);
                   
                    return;
                }
                const itemTotal = product.price * cartItem.quantity;
                total += itemTotal;
                itemCount += cartItem.quantity;

                const cartItemDiv = document.createElement('div');
       
                cartItemDiv.classList.add('cart-item');

                let optionsHtml = '';

                if (['pp-1', 'pp-2', 'pp-3'].includes(product.id)) {
                    if (product.id === 'pp-1' || product.id === 'pp-2') {
                        
                        optionsHtml += `
                            <div class="input-group-inline">
                                <label for="espeto-${index}">Espeto:</label>
                                <select id="espeto-${index}" class="order-input small-select" 
                                data-cart-index="${index}" data-option-type="espeto">
                                    <option value="" disabled ${cartItem.espeto === '' ?
                                'selected' : ''}>Selecione</option>
                                    <option value="ASINHA (TULIPA)" ${cartItem.espeto === 'ASINHA (TULIPA)' ?
                                'selected' : ''}>ASINHA (TULIPA)</option>
                                    <option value="COXINHA DA ASA" ${cartItem.espeto === 'COXINHA DA ASA)' ?
                                'selected' : ''}>COXINHA DA ASA</option>
                                    <option value="CORAÇÃO" ${cartItem.espeto === 'CORAÇÃO' ?
                                'selected' : ''}>CORAÇÃO</option>
                                    <option value="CONTRA FILÉ" ${cartItem.espeto === 'CONTRA FILÉ' ?
                                'selected' : ''}>CONTRA FILÉ</option>
                                    <option value="CUPIM GRILL" ${cartItem.espeto === 'CUPIM GRILL' ?
                                'selected' : ''}>CUPIM GRILL</option>
                                    <option value="PICANHA MONTADA" ${cartItem.espeto === 'PICANHA MONTADA' ?
                                'selected' : ''}>PICANHA MONTADA</option>
                                    <option value="FRANGO COM BACON" ${cartItem.espeto === 'FRANGO COM BACON' ?
                                'selected' : ''}>FRANGO COM BACON</option>
                                    <option value="FRANGO SEM BACON" ${cartItem.espeto === 'FRANGO SEM BACON' ?
                                'selected' : ''}>FRANGO SEM BACON</option>
                                    <option value="LINGUIÇA CAIPIRA" ${cartItem.espeto === 'LINGUIÇA CAIPIRA' ?
                                'selected' : ''}>LINGUIÇA CAIPIRA</option>
                                    <option value="LINGUIÇA C. APIMENTADA" ${cartItem.espeto === 'LINGUIÇA C. APIMENTADA' ?
                                'selected' : ''}>LINGUIÇA C. APIMENTADA</option>
                                </select>
                            </div>
                        `;
                    }
                    if (product.id === 'pp-1' || product.id === 'pp-2' || product.id === 'pp-3') {
                        optionsHtml += `
                            <div class="input-group-inline">
             
                   <label for="feijao-${index}">Feijão:</label>
                                <select id="feijao-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="feijao">
                                    <option value="" disabled ${cartItem.feijao === '' ?
                                'selected' : ''}>Selecione</option>
                                    <option value="Tropeiro" ${cartItem.feijao === 'Tropeiro' ?
                                'selected' : ''}>Tropeiro</option>
                                    <option value="Caldo" ${cartItem.feijao === 'Caldo' ?
                                'selected' : ''}>Caldo</option>
                                </select>
                            </div>
                        `;
                    // ✅ ADIÇÃO: Campo de Salada
                        optionsHtml += `
                            <div class="input-group-inline">
                                <label for="salada-${index}">Salada:</label>
       
                                 <select id="salada-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="salada">
                                    <option value="" disabled ${cartItem.salada === '' ?
                                'selected' : ''}>Selecione</option>
                                    <option value="Salada de macarrão" ${cartItem.salada === 'Salada de macarrão' ?
                                'selected' : ''}>Salada de macarrão</option>
                                    <option value="Vinagrete" ${cartItem.salada === 'Vinagrete' ?
                                'selected' : ''}>Vinagrete</option>
                                    <option value="Alface com tomate" ${cartItem.salada === 'Alface com tomate' ?
                                'selected' : ''}>Alface com tomate</option>
                                </select>
                            </div>
                        `;
                    }
                }

                if (['cald-1', 'cald-2', 'cald-3'].includes(product.id)) {
                    let acompanhamentoOptions = '';
                    let selectLabel = 'Acompanha:';

                    switch (product.id) {
                        case 'cald-1':
                            acompanhamentoOptions = `
<<<<<<< HEAD
                                <option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ? 'selected' : ''}>Sem mistura</option>
=======
                                <option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ?
                                'selected' : ''}>Sem mistura</option>
>>>>>>> a4a2898d4fa2973a8d8b8afcadb51a58bd3ad13d
                                <option value="Feijão com Costela" ${cartItem.acompanhamento === 'Feijão com Costela' ?
                                'selected' : ''}>Feijão com Costela</option>
                                <option value="Feijão com Frango" ${cartItem.acompanhamento === 'Feijão com Frango' ?
                                'selected' : ''}>Feijão com Frango</option>
                            `;
                        break;
                        case 'cald-2':
                            acompanhamentoOptions = `
                                <option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ?
                                'selected' : ''}>Sem mistura</option>
                                <option value="Frango com Feijão" ${cartItem.acompanhamento === 'Frango com Feijão' ?
                                'selected' : ''}>Frango com Feijão</option>
                                <option value="Frango com Costela" ${cartItem.acompanhamento === 'Frango com Costela' ?
                                'selected' : ''}>Frango com Costela</option>
                            `;
                        break;
                        case 'cald-3':
                            acompanhamentoOptions = `
                                <option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ?
                                'selected' : ''}>Sem mistura</option>
                                <option value="Costela com Feijão" ${cartItem.acompanhamento === 'Costela com Feijão' ?
                                'selected' : ''}>Costela com Feijão</option>
                                <option value="Costela com Frango" ${cartItem.acompanhamento === 'Costela com Frango' ?
                                'selected' : ''}>Costela com Frango</option>
                            `;
                        break;
                    }

                    optionsHtml += `
                        <div class="input-group-inline">
                            <label for="acompanhamento-${index}">${selectLabel}</label>
                       
                            <select id="acompanhamento-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="acompanhamento">
                                <option value="" disabled ${cartItem.acompanhamento === '' ? 'selected' : ''}>Selecione</option>
                                ${acompanhamentoOptions}
                            </select>
                        </div>
              
                      `;
                }

                cartItemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <span class="item-name">${product.name} ${['pp-1', 'pp-2', 'pp-3'].includes(product.id) ?
                        '' : `(x${cartItem.quantity})`}</span>
                        <span class="item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                        <div class="jantinha-options-individual">
                            ${optionsHtml}
                  
                      </div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item-btn" data-cart-index="${index}">Remover</button>
                    </div>
       
                 `;

                cartItemsModalContainer.appendChild(cartItemDiv);
            });
        }

        cartTotalModalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartCountSpan.textContent = itemCount;
        cartItemsModalContainer.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const cartIndex = parseInt(event.target.dataset.cartIndex);
                removeItemFromCart(cartIndex);
            });
        });
        
    }
    // ✅ Adicione isso (por exemplo, após `updateCartDisplay();` no final do DOMContentLoaded):
    cartItemsModalContainer.addEventListener('change', function(event) {
        // Verifica se o alvo é um <select> com atributos específicos
        if (event.target.tagName === 'SELECT' && event.target.hasAttribute('data-cart-index')) {
            const cartIndex = parseInt(event.target.dataset.cartIndex);
            const optionType = event.target.dataset.optionType;
            const value = event.target.value;

            if (cartIndex >= 0 && cartIndex < cart.length && optionType) {
                cart[cartIndex][optionType] = value;
                // ⚠️ Opcional: para debug — remova depois
                // console.log(`Atualizado: item[${cartIndex}].${optionType} = "${value}"`);
            }
        }
    });

    function handleOrderTypeChange() {
        if (!orderTypeSelect || !deliveryOptionsDiv || !pickupOptionsDiv || !deliveryFeeInfo || !deliveryAddressInput || !pickupNameInput) return;
        const selectedType = orderTypeSelect.value;
        if (selectedType === 'delivery') {
            deliveryOptionsDiv.style.display = 'block';
            pickupOptionsDiv.style.display = 'none';
            deliveryFeeInfo.style.display = 'block';
            deliveryAddressInput.required = true;
            pickupNameInput.required = false;
            pickupNameInput.value = '';
        } else {
            deliveryOptionsDiv.style.display = 'none';
            pickupOptionsDiv.style.display = 'block';
            deliveryFeeInfo.style.display = 'none';
            deliveryAddressInput.required = false;
            pickupNameInput.required = true;
            deliveryAddressInput.value = '';
        }
    }

    // =========================================================
    // LÓGICA DO RESUMO DO PEDIDO E WHATSAPP (Refatorada) - INÍCIO
    // =========================================================

    /**
     * Gera o conteúdo da mensagem de pedido e realiza a validação.
     * @returns {object|null} Objeto com { message, total, htmlSummary } ou null se a validação falhar.
     */
    function generateOrderMessage() {
        if (cart.length === 0) {
            // Não deve acontecer, pois o botão deve estar desabilitado/oculto
            return null;
        }

        const orderType = orderTypeSelect.value;
        const deliveryAddress = deliveryAddressInput.value.trim();
        const pickupName = pickupNameInput.value.trim();
        const notes = notesTextarea.value.trim();

        if (orderType === 'delivery' && !deliveryAddress) {
            alert('Por favor, digite o endereço de entrega para prosseguir.');
            return null;
        }

        if (orderType === 'pickup' && !pickupName) {
            alert('Por favor, digite o nome para retirada para prosseguir.');
            return null;
        }

        let whatsappMessage = `*Boa noite!! Novo Pedido*\n`;
        let htmlSummary = `
            <div class="summary-section">
                <h3>Detalhes do Pedido</h3>
                <p><strong>Tipo:</strong> ${orderType === 'delivery' ? 'Entrega 🏍️' : 'Retirada no Local 📦'}</p>
                ${orderType === 'delivery' ? `<p><strong>Endereço:</strong> ${deliveryAddress}</p>` : `<p><strong>Nome Retirada:</strong> ${pickupName}</p>`}
                ${notes ? `<p><strong>Observações:</strong> ${notes}</p>` : ''}
            </div>
            <div class="summary-section">
                <h3>Itens</h3>
                <ul class="summary-items-list">
        `;
        let total = 0;
        let validationFailed = false;

        cart.forEach((cartItem, index) => {
            const product = products.find(p => p.id === cartItem.id);
            if (!product) {
                console.warn(`Produto com ID ${cartItem.id} não encontrado ao gerar mensagem.`);
                return;
            }

            if (['pp-1', 'pp-2', 'pp-3'].includes(product.id)) {
                const itemPrice = product.price;
                total += itemPrice;
                let itemDetails = `1x ${product.name} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n`;
                let htmlItem = `<li><strong>1x ${product.name}</strong> (R$ ${itemPrice.toFixed(2).replace('.', ',')})<br><ul class="item-options-list">`;

                if (product.id === 'pp-1' || product.id === 'pp-2') {
                    const espeto = cartItem.espeto || 'Não selecionado';
                    if (espeto === 'Não selecionado') {
                        alert(`Por favor, selecione o espeto para a "${product.name}" (Item #${index + 1} no carrinho).`);
                        validationFailed = true;
                        return;
                    }
                    itemDetails += `    - Espeto: ${espeto}\n`;
                    htmlItem += `<li>Espeto: ${espeto}</li>`;
                }

                const feijao = cartItem.feijao || 'Não selecionado';
                if (feijao === 'Não selecionado') {
                    alert(`Por favor, selecione o tipo de feijão para a "${product.name}" (Item #${index + 1} no carrinho).`);
                    validationFailed = true;
                    return;
                }
                itemDetails += `    - Feijão: ${feijao}\n`;
                htmlItem += `<li>Feijão: ${feijao}</li>`;

                const salada = cartItem.salada || 'Não selecionado';
                if (salada === 'Não selecionado') {
                    alert(`Por favor, selecione a salada para a "${product.name}" (Item #${index + 1} no carrinho).`);
                    validationFailed = true;
                    return;
                }
                itemDetails += `    - Salada: ${salada}\n`;
                htmlItem += `<li>Salada: ${salada}</li>`;

                htmlItem += `</ul></li>`;
                whatsappMessage += itemDetails;
                htmlSummary += htmlItem;

            } else if (['cald-1', 'cald-2', 'cald-3'].includes(product.id)) {
                const itemPrice = product.price;
                total += itemPrice;
                let itemDetails = `1x ${product.name} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n`;
                let htmlItem = `<li><strong>1x ${product.name}</strong> (R$ ${itemPrice.toFixed(2).replace('.', ',')})<br><ul class="item-options-list">`;

                if (cartItem.acompanhamento === '' || cartItem.acompanhamento == null) {
                    alert(`Por favor, selecione a mistura para o "${product.name}" (Item #${index + 1} no carrinho).`);
                    validationFailed = true;
                    return;
                }
                const acompanhamento = cartItem.acompanhamento; // agora é garantidamente uma string válida
                
                itemDetails += `    - Mistura: ${acompanhamento}\n`;
                htmlItem += `<li>Mistura: ${acompanhamento}</li>`;

                htmlItem += `</ul></li>`;
                whatsappMessage += itemDetails;
                htmlSummary += htmlItem;

            } else {
                const itemPrice = product.price * cartItem.quantity;
                total += itemPrice;
                whatsappMessage += `${cartItem.quantity}x ${product.name} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n`;
                htmlSummary += `<li><strong>${cartItem.quantity}x ${product.name}</strong> - R$ ${itemPrice.toFixed(2).replace('.', ',')}</li>`;
            }
        });

        if (validationFailed) {
            return null;
        }

        htmlSummary += `</ul></div>`; // Fecha lista e seção de itens

        whatsappMessage += `\n*Tipo de Pedido:* ${orderType === 'delivery' ? 'Entrega' : 'Retirada no Local'}\n`;

        if (orderType === 'delivery') {
            whatsappMessage += `*Endereço de Entrega:*\n${deliveryAddress}\n`;
        } else {
            whatsappMessage += `*Nome para Retirada:*\n${pickupName}\n`;
        }

        if (notes) {
            whatsappMessage += `\n*Observações:*\n${notes}\n`;
            htmlSummary += `<div class="summary-section"><p><strong>Observações:</strong> ${notes}</p></div>`;
        }

        whatsappMessage += `\n*Total dos Produtos: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
        htmlSummary += `<div class="summary-section final-total"><h3>Total dos Produtos: R$ ${total.toFixed(2).replace('.', ',')}</h3></div>`;

        if (orderType === 'delivery') {
            whatsappMessage += `_Atenção: Taxa de entrega será calculada conforme o endereço._\n`;
            htmlSummary += `<p class="delivery-fee-info"><strong>Atenção:</strong> Taxa de entrega será calculada conforme o endereço.</p>`;
        }

        whatsappMessage += `\nObrigado por pedir na Jantinha Nota 1000!`;

        return {
            message: whatsappMessage,
            total: total,
            htmlSummary: htmlSummary,
            whatsappNumber: '5562992020331' 
        };
        
    }

    /**
     * Exibe o modal de resumo e preenche o conteúdo.
     */
    function showOrderSummary() {
        const orderData = generateOrderMessage();

        if (orderData) {
            // CORREÇÃO DE ERRO: Verifica se o botão de envio foi carregado do DOM.
            if (!sendOrderBtn) {
                console.error("Erro no Script: Botão de envio final (ID 'send-order-btn') não encontrado no HTML.");
                alert("Erro ao preparar o pedido. Por favor, verifique o HTML para garantir que o botão com ID 'send-order-btn' exista.");
                return; 
            }
            
            // Armazena a mensagem final no botão de envio para uso posterior
            sendOrderBtn.dataset.whatsappMessage = orderData.message; // LINHA CORRIGIDA PELA VERIFICAÇÃO ACIMA
            sendOrderBtn.dataset.whatsappNumber = orderData.whatsappNumber;

            summaryContentDiv.innerHTML = orderData.htmlSummary;

            closeModal(cartModal);
            openModal(summaryModal);
        }
    }

    /**
     * Envia a mensagem final do pedido para o WhatsApp.
     */
    /**
 * Envia a mensagem final do pedido para o WhatsApp.
 */
    function sendFinalOrderToWhatsapp(event) {
        const whatsappMessage = event.currentTarget.dataset.whatsappMessage;
        const whatsappNumber = event.currentTarget.dataset.whatsappNumber;

        if (!whatsappMessage || !whatsappNumber) {
            alert('Erro: O resumo do pedido não foi gerado corretamente.');
            return;
        }
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // MUDANÇA AQUI: Usando o formato wa.me, que é o padrão recomendado.
        // Ele carrega mais rápido, mas não impede a edição nem envia automaticamente.
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        console.log('Mensagem final do WhatsApp:', decodeURIComponent(encodedMessage));
        // Abre a URL, levando o usuário para o WhatsApp com a mensagem pronta.
        window.open(whatsappUrl, '_blank');
        
        closeModal(summaryModal);
        
        // Opcional: Limpar carrinho após o envio
        cart = [];
        updateCartDisplay();
    }
    // =========================================================
    // LÓGICA DO RESUMO DO PEDIDO E WHATSAPP (Refatorada) - FIM
    // =========================================================

    // --- Funções de Renderização do Menu e Fotos ---
    function normalizeCategoryName(name) {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    /**
     * Handler para o clique no botão "Adicionar".
    * @param {Event} event - O evento de clique.
     */
    function handleAddButtonClick(event) {
        const productId = event.target.dataset.id;
        if (['pp-1', 'pp-2', 'pp-3'].includes(productId)) {
            addCustomizableJantinhaToCart(productId);
        } else {
            addToCart(productId);
        }
    }

function renderMenu() {
    if (!menuSections || !categoryNavigation || typeof products === 'undefined' || typeof categoriesData === 'undefined') return;

    menuSections.innerHTML = '';
    categoryNavigation.innerHTML = '';

    // Agrupa os produtos por categoria
    const categories = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    // 1. Renderiza as categorias de produtos
    Object.keys(categories).forEach(categoryName => {
        const categoryProducts = categories[categoryName];
        const categorySection = renderProductCards(categoryName, categoryProducts);
        menuSections.appendChild(categorySection);

        // Cria o botão de navegação para esta categoria
        const navButton = document.createElement('button');
        navButton.className = 'category-button';

        // Procura dados específicos desta categoria em categoriesData
        const categoryDataEntry = categoriesData.find(
            item => item.name === categoryName && item.type === 'category'
        );

        let lottieContainer;
        if (categoryDataEntry) {
            // Se encontrar dados na categoriesData, cria o container para o ícone
            lottieContainer = document.createElement('div');
            lottieContainer.classList.add('lottie-icon-container');

            const lottieJsonUrlToUse = categoryDataEntry.lottieJsonUrl || DEFAULT_LOTTIE_JSON || '';
            const imageUrlToUseForFallback = categoryDataEntry.imageUrl || DEFAULT_CATEGORY_IMAGE || '';

            if (lottieJsonUrlToUse && typeof lottie !== 'undefined') {
                // Carrega a animação Lottie
                lottie.loadAnimation({
                    container: lottieContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: lottieJsonUrlToUse,
                    rendererSettings: {
                        className: 'lottie-svg'
                    }
                });
            } else if (imageUrlToUseForFallback) {
                // Usa imagem como fallback
                const fallbackImage = document.createElement('img');
                fallbackImage.src = imageUrlToUseForFallback;
                fallbackImage.alt = `Ícone da categoria ${categoryName}`;
                fallbackImage.loading = 'lazy';
                lottieContainer.appendChild(fallbackImage);
            }

            navButton.appendChild(lottieContainer);
        }

        // Texto do botão
        const buttonText = document.createElement('span');
        buttonText.classList.add('button-text');
        buttonText.textContent = categoryName;
        navButton.appendChild(buttonText);

        // Evento para rolar até a seção da categoria
        navButton.onclick = () => {
            const element = document.getElementById(normalizeCategoryName(categoryName));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // Adiciona o botão (com ou sem ícone) à navegação
        categoryNavigation.appendChild(navButton);
    });

    // 2. Renderiza os botões de link/modais (WHATSAPP, INSTAGRAM, MAPA, FOTOS, etc.)
    categoriesData.forEach(item => {
        if (item.type === 'link') {
            const navButton = document.createElement('button');
            navButton.className = 'category-button';

            // Container para o ícone (Lottie ou imagem)
            const lottieContainer = document.createElement('div');
            lottieContainer.classList.add('lottie-icon-container');

            const lottieJsonUrlToUse = item.lottieJsonUrl || DEFAULT_LOTTIE_JSON || '';
            const imageUrlToUseForFallback = item.imageUrl || DEFAULT_CATEGORY_IMAGE || '';

            if (lottieJsonUrlToUse && typeof lottie !== 'undefined') {
                // Carrega a animação Lottie
                lottie.loadAnimation({
                    container: lottieContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: lottieJsonUrlToUse,
                    rendererSettings: {
                        className: 'lottie-svg'
                    }
                });
            } else if (imageUrlToUseForFallback) {
                // Usa imagem como fallback
                const fallbackImage = document.createElement('img');
                fallbackImage.src = imageUrlToUseForFallback;
                fallbackImage.alt = `Ícone do link ${item.name}`;
                fallbackImage.loading = 'lazy';
                lottieContainer.appendChild(fallbackImage);
            }

            navButton.appendChild(lottieContainer);

            // Texto do botão
            const buttonText = document.createElement('span');
            buttonText.classList.add('button-text');
            buttonText.textContent = item.name;
            navButton.appendChild(buttonText);

            // Evento para abrir o link ou modal
            navButton.onclick = () => {
                if (item.targetModalId) {
                    openModal(document.getElementById(item.targetModalId));
                    if (item.targetModalId === 'photos-modal') {
                        renderPhotosInModal();
                    }
                } else if (item.url) {
                    window.open(item.url, '_blank');
                }
            };

            // Adiciona o botão à navegação
            categoryNavigation.appendChild(navButton);
        }
    });

    // Adiciona event listeners para os botões de adicionar ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddButtonClick);
    });
}

    // Event listener para o botão do carrinho no header
    if (cartIconContainer) {
        cartIconContainer.addEventListener('click', () => {
            // ADIÇÃO: Ajusta o tamanho do container de itens do carrinho (máximo 40% da altura da viewport)
            if (cartItemsScrollContainer) {
                cartItemsScrollContainer.style.maxHeight = '40vh'; 
            }

            openModal(cartModal);
            updateCartDisplay();
            handleOrderTypeChange();
        });
    }

    // Adiciona event listeners para todos os botões de fechar modal (classe '.close-button')
    document.querySelectorAll('.modal .close-button').forEach(button => {
        button.addEventListener('click', () => {
            const modalElement = button.closest('.modal');
            if (modalElement) {
                closeModal(modalElement);
                if (modalElement.id === 'chatModal' && 
                chatbox) {
                    chatbox.innerHTML = '';
                    delete chatbox.dataset.initialMessageShown;
                }
            }
        });
    });
    
    // Event listener para o botão de checkout do WhatsApp (MODIFICADO para abrir o resumo)
    if (checkoutWhatsappModalBtn) {
        // Correção do erro anterior: a remoção da função indefinida foi mantida fora.
        checkoutWhatsappModalBtn.addEventListener('click', showOrderSummary); // Nova função que abre o resumo
    }

    // Event listener para o botão de envio final no modal de resumo (ADIÇÃO)
    if (sendOrderBtn) {
        sendOrderBtn.addEventListener('click', sendFinalOrderToWhatsapp);
    }


    // Event listener para o botão de alternar tema
    if (themeToggleContainer) {
        themeToggleContainer.addEventListener('click', toggleTheme);
    }

    // ✅ Event listener para abrir o modal de informações (FUNCIONA EM QUALQUER PÁGINA)
    if (infoToggleContainer && infoModal) {
        infoToggleContainer.addEventListener('click', () => {
            openModal(infoModal);
        });
    }

    // Event listener para o select de tipo de pedido
    if (orderTypeSelect) {
        orderTypeSelect.addEventListener('change', handleOrderTypeChange);
    }

    // Event listener para abrir o modal do chat
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            openModal(chatModal);
            if (chatbox && !chatbox.dataset.initialMessageShown) {
                const currentDayName = getWeekdayName(new Date().getDay());
                let initialBotMessage = "";
    
            if (typeof chatbotKnowledgeBase !== 'undefined') {
                    chatbotKnowledgeBase["ola"] = `👋 Olá! Feliz ${currentDayName}! Como posso ajudar você hoje? 😊\nVocê pode perguntar sobre:\n- 🍢 Nossos **Espetos**\n- 🍛 As **Jantinhas**\n- 🥤 **Bebidas**\n- 🍟 **Porções** e **Pastéis**\n- 🍰 **Doces** e **Drinks**\n- ⏰ Nossos **Horários** de funcionamento\n- 🛵 **Entrega**\n- 📞 **Contato**\nOu qualquer outra dúvida sobre o cardápio! 😉`;
                 
                    chatbotKnowledgeBase["oi"] = chatbotKnowledgeBase["ola"];
                    initialBotMessage = chatbotKnowledgeBase["ola"];
                } else {
                    initialBotMessage = "Olá!";
            "Como posso ajudar você hoje?";
                }
                addMessage(initialBotMessage, 'bot');
            chatbox.dataset.initialMessageShown = 'true';
            }
        });
    }

    // Event listener para fechar o modal do chat
    if (closeChatModalBtn) {
   
     closeChatModalBtn.addEventListener('click', () => {
            closeModal(chatModal);
            if (chatbox) {
                chatbox.innerHTML = '';
                delete chatbox.dataset.initialMessageShown;
          
            }
        });
    }

    // Event listener 

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', () => {
            const userMessage = chatInput.value;
            if (userMessage.trim() === '') return;
            addMessage(userMessage, 'user');
            chatInput.value = '';
            setTimeout(() => {
    
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse, 'bot');
}, 500);
        });
    }
    function openReservationModal() {
    if (reservationModal) {
            reservationModal.style.display = 'flex';
            // Limpa o formulário ao abrir
            document.getElementById('reservation-name').value = '';
            document.getElementById('reservation-people').value = '';
            document.getElementById('reservation-date').value = '';
            document.getElementById('reservation-time').value = '';
            document.getElementById('reservation-notes').value = '';

            // Define a data mínima como hoje
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('reservation-date').min = today;
        }
    }
    function closeReservationModal() {
        if (reservationModal) {
            reservationModal.style.display = 'none';
        }
    }
    
    function validateReservationData() {
        const name = document.getElementById('reservation-name').value.trim();
        const people = document.getElementById('reservation-people').value.trim();
        const dateInput = document.getElementById('reservation-date').value;
        const time = document.getElementById('reservation-time').value.trim();

        if (!name || !people || !dateInput || !time) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, Quantidade de Pessoas, Data e Horário.');
            return false;
        }
        const reservationDate = new Date(dateInput);
        const [hours, minutes] = time.split(':').map(Number);
        reservationDate.setHours(hours, minutes, 0, 0); // Define a hora da reserva
        const reservationDayOfWeek = reservationDate.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado 
         // Verifica se a data selecionada é anterior à data atual

        const now = new Date();

        if (reservationDate < now) {
            alert('Desculpe, não é possível fazer reservas para datas e horários passados. Por favor, escolha uma data e horário futuros.');
            return false;
        }
        if (reservationDayOfWeek === 1) { // 1 representa Segunda-feira
            alert('Desculpe, não fazemos reservas às segundas-feiras, pois estamos fechados. Por favor, escolha outro dia.');
            return false;
        }
        return true;
    }

    function generateReservationMessage() {
        if (!validateReservationData()) {
            return null;
        }
        const name = document.getElementById('reservation-name').value.trim();
        const people = document.getElementById('reservation-people').value.trim();
        const dateInput = document.getElementById('reservation-date').value;
        const time = document.getElementById('reservation-time').value.trim();
        const notes = document.getElementById('reservation-notes').value.trim();
        const reservationDate = new Date(dateInput);
        const formattedDate = reservationDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        let message = `*NOVA RESERVA*\n\n`;
        message += `*Nome:* ${name}\n`;
        message += `*Pessoas:* ${people}\n`;
        message += `*Data:* ${formattedDate}\n`;
        message += `*Horário:* ${time}\n`;
        if (notes) {
            message += `*Observações:* ${notes}\n`;
        }
        message += `\nImportante:* Esta reserva será analisada para confirmar a disponibilidade.`;
        return encodeURIComponent(message);
    }


    function sendReservationToWhatsApp() {
        const message = generateReservationMessage();
        if (!message === null) {
            return;
        }
        const whatsappNumber = '5562992020331'; // Substitua pelo número de telefone desejado
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappUrl, '_blank');
        closeReservationModal(); // Fecha o modal após enviar
    }

// --- Event Listeners para o Modal de Reserva ---

/**
 * Função para renderizar os cards de produtos de uma categoria específica.
 * @param {string} categoryName - O nome da categoria a ser renderizada.
 * @param {Array} products - O array de produtos pertencentes à categoria.
 * @returns {HTMLElement} - O elemento HTML da seção da categoria com os produtos.
 */
function renderProductCards(categoryName, products) {
    const section = document.createElement('section');
    section.className = 'category';
    section.id = normalizeCategoryName(categoryName);

    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = categoryName;
    section.appendChild(categoryTitle);

    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

            // --- Imagem do Produto ---
            const img = document.createElement('img');
            img.src = product.imageUrl || DEFAULT_PLACEHOLDER_IMAGE; // Usa uma imagem padrão se não houver
            img.alt = product.name;
            img.loading = 'lazy'; // Carrega a imagem quando entra na viewport (melhora performance)
            productCard.appendChild(img);

            // --- Nome do Produto ---
            const title = document.createElement('h3');
            title.textContent = product.name;
            productCard.appendChild(title);

            // --- Descrição do Produto com Botão "Ler Mais" ---
            const descriptionContainer = document.createElement('div');
            descriptionContainer.className = 'description-container';

            const descriptionText = document.createElement('p');
            descriptionText.className = 'product-description';
            descriptionText.innerHTML = product.description;
            // Importante: O descriptionText é adicionado AO descriptionContainer AQUI
            descriptionContainer.appendChild(descriptionText);

            // Cria o botão "Ler Mais"
            const readMoreButton = document.createElement('button');
            readMoreButton.className = 'read-more-button';
            readMoreButton.textContent = 'Ler Mais';

            readMoreButton.addEventListener('click', function() {
                // Alterna a classe 'expanded' no texto da descrição
                if (descriptionText.classList.contains('expanded')) {
                    descriptionText.classList.remove('expanded');
                    readMoreButton.textContent = 'Ler Mais'; // Atualiza o texto do botão
                } else {
                    descriptionText.classList.add('expanded');
                    readMoreButton.textContent = 'Ler Menos'; // Atualiza o texto do botão
                }
            });

            // Adiciona o botão ao container
            descriptionContainer.appendChild(readMoreButton);

            // Adiciona o container (com descrição e botão) ao card do produto
            // Esta é a ÚNICA linha que adiciona a descrição e o botão ao productCard
            productCard.appendChild(descriptionContainer);

            // --- Preço do Produto ---
            const price = document.createElement('div');
            price.className = 'price';
            price.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
            productCard.appendChild(price);

            // --- Botão "Adicionar ao Carrinho" ---
            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart';
            addToCartBtn.textContent = 'Adicionar ➕';
            // Armazena o ID do produto no botão para uso posterior
            addToCartBtn.dataset.id = product.id;

            // Adiciona o evento de clique para adicionar ao carrinho
            addToCartBtn.addEventListener('click', handleAddButtonClick);

            productCard.appendChild(addToCartBtn);

            // Adiciona o card do produto à grade
            productsGrid.appendChild(productCard);
        });

    // Adiciona a grade de produtos à seção
    section.appendChild(productsGrid);

    // Retorna a seção completa
    return section;
}


// Event listener para abrir o modal de reserva
if (reservationIcon) {
    reservationIcon.addEventListener('click', openReservationModal);
}
if (sendReservationWhatsappBtn) {
    sendReservationWhatsappBtn.addEventListener('click', sendReservationToWhatsApp);
}

// Event listener para o botão de fechar do modal de reserva
document.querySelectorAll('.close-button[data-modal="reservation"]').forEach(button => {
    button.addEventListener('click', closeReservationModal);
});

// Event listener para fechar o modal de reserva
if (reservationModal) {
    reservationModal.addEventListener('click', function(event) {
        if (event.target === reservationModal) {
            closeReservationModal();
        }
    });
}
// Event listener para o botão "Voltar ao Topo" - USO DA VARIÁVEL
if (scrollToTopBtn) { // <-- Este IF pode estar falhando
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition > 200) {
            scrollToTopBtn.style.display = "flex";
            scrollToTopBtn.style.opacity = "1";
        } else {
            scrollToTopBtn.style.opacity = "0";
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === "0") {
                    scrollToTopBtn.style.display = "none";
                }
            }, 300);
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

    // Event listener para enviar mensagem no chat com Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatBtn.click();
            }
        });
    }

    // --- Inicializações ao carregar o DOM ---
    initializeTheme();
    renderMenu();
    updateCartDisplay();
    handleOrderTypeChange();
});