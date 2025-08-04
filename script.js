document.addEventListener('DOMContentLoaded', function() {

    // Carrinho de compras. Cada item pode ser:
    // - Jantinha Completa: { id: 'pp-1', espeto: 'Carne', feijao: 'Tropeiro', quantity: 1 }
    // - Jantinha Nota 1000: { id: 'pp-2', espeto: 'Carne', feijao: 'Tropeiro', quantity: 1 }
    // - Jantinha sem Espeto: { id: 'pp-3', feijao: 'Tropeiro', quantity: 1 }
    // - Outros produtos: { id: 'produto_id', quantity: X }
    let cart = [];

    // --- Elementos do DOM ---
    const body = document.body;

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
    const pickupNameInput = document.getElementById('pickup-name'); // Corrigido = document = document.getElementById
    const deliveryFeeInfo = document.getElementById('delivery-fee-info');
    const notesTextarea = document.getElementById('notes');

    // Botões de rolagem do carrinho
    const scrollUpBtn = document.getElementById('scroll-up-btn');
    const scrollDownBtn = document.getElementById('scroll-down-btn');

    // Elementos do Modal de Informações
    const infoModal = document.getElementById('info-modal');
    const infoToggleContainer = document.getElementById('info-toggle-container');

    // Elementos do Modal de Fotos (AJUSTADOS PARA O CARROSSEL)
    const photosModal = document.getElementById('photos-modal');
    // REMOVIDO: const modalPhotosGrid = document.getElementById('modal-photos-grid'); // Não será mais uma grade diretamente
    const carouselTrackPhotos = document.getElementById('carousel-track-photos'); // O novo track para as imagens do carrossel
    const prevPhotoButton = document.getElementById('prev-photo-btn'); // Botão Anterior
    const nextPhotoButton = document.getElementById('next-photo-btn'); // Botão Próxima

    // Elemento para o modal de imagem grande (REMOVIDO / NÃO USADO DIRETAMENTE AGORA)
    // const imageModal = document.getElementById('image-modal'); // Certifique-se de ter este modal no HTML
    // const modalImage = imageModal ? imageModal.querySelector('img') : null; // A imagem dentro do modal
    // const closeImageModalBtn = imageModal ? imageModal.querySelector('.close-button') : null; // Botão de fechar do modal de imagem grande


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
    
    //alerta de funcionamento

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
    // A variável 'photos' agora é esperada para vir do seu cardapio.js como um array de strings.
    // Exemplo de como 'photos' pode ser (se não estiver em cardapio.js):
    // const photos = [
    //     './images/foto1.jpg',
    //     './images/foto2.jpg',
    //     './images/foto3.jpg'
    // ];

    
    /** *Função para verificar o dia e atualizar o status de funcionamento na tela principal.
    * @returns {string} true se a loja estiver aberta, false se estiver fechada.*/
    function getStoreStatus() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // 1. Verificar se é o dia de fechamento (Segunda-feira)
        if (dayOfWeek === operatingHours.closedDay) {
            return 'CLOSED'; // Fechado às segundas-feiras
        }

        // Converte os horários de string para números para comparação
        const [openHour, openMinute] = operatingHours.openTime.split(':').map(Number);
        const [closeHour, closeMinute] = operatingHours.closeTime.split(':').map(Number);

        // Cria objetos Date para os horários de abertura e fechamento no dia atual
        const openTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openHour, openMinute, 0);
        const closeTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeHour, closeMinute, 0);

        // 2. Verifica se a hora atual está DENTRO do intervalo de funcionamento
        if (now >= openTimeToday && now <= closeTimeToday) {
            return 'OPEN'; // Aberto
        }

        // 3. Verifica se a hora atual está ANTES do horário de abertura (mas em um dia de funcionamento)
        if (now < openTimeToday) {
            return 'AWAITING_OPENING'; // Em breve abriremos
        }

        // 4. Se não é dia de fechamento, não está aberto e não está esperando abrir, então já passou do horário de fechamento.
        return 'CLOSED'; // Fechado (já passou do horário)
    }

        
    function updateMainScreenOperatingStatus() {
     
        if (statusFuncionamentoMainElement) {
            const status = getStoreStatus(); // Pega o status atual

            if (status === 'OPEN') {
                statusFuncionamentoMainElement.textContent = "🥳 Estamos abertos! Faça seu pedido!";
                statusFuncionamentoMainElement.classList.add('aberto-main');
                statusFuncionamentoMainElement.classList.remove('fechado-main');
                statusFuncionamentoMainElement.style.display = 'block';
            } else if (status === 'CLOSED') {
                statusFuncionamentoMainElement.textContent = "😔 Olá! Estamos fechados hoje. Nosso horário de funcionamento é de TERÇA a DOMINGO, das 18:00h às 00:00h.";
                statusFuncionamentoMainElement.classList.add('fechado-main');
                statusFuncionamentoMainElement.classList.remove('aberto-main');
                statusFuncionamentoMainElement.style.display = 'block';
            } else if (status === 'AWAITING_OPENING') {
                // Mensagem para quando não está aberto ainda, mas vai abrir no dia
                statusFuncionamentoMainElement.textContent = "⏰ Abriremos hoje às " + operatingHours.openTime + "! Prepare-se!";
                statusFuncionamentoMainElement.classList.add('awaiting-opening-main'); // Opcional: Nova classe para estilizar
                statusFuncionamentoMainElement.classList.remove('aberto-main');
                statusFuncionamentoMainElement.classList.remove('fechado-main');
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
        // REMOVIDO: else if (event.target === imageModal) { closeModal(imageModal); }
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

        const status = getStoreStatus(); // Pega o status atual

        if (status === 'CLOSED') { // Se a loja estiver explicitamente 'CLOSED'
            return "😔 Olá! Estamos fechados. Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 00:00h.";
        } else if (status === 'AWAITING_OPENING') { // Se a loja ainda vai abrir
            return "⏰ Olá! Ainda não abrimos. Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 00:00h. Abriremos às " + operatingHours.openTime + " de hoje! 😉";
        }

        // Se a loja estiver 'OPEN', procede com a lógica de palavras-chave
        if (typeof chatbotKnowledgeBase !== 'undefined') {
            for (const keyword in chatbotKnowledgeBase) {
                if (userMessage.includes(keyword)) {
                    return chatbotKnowledgeBase[keyword];
                }
            }
        }

        // 3. Se nenhuma palavra-chave for encontrada e não for segunda, retornar mensagem genérica
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
        } else if (productId === 'pp-3') {
            newItem.feijao = '';
        }

        // Lógica para as misturas dos caldos //
        if (productId === 'cald-1' || productId === 'cald-2' || productId === 'cald-3') {
        newItem.acompanhamento = ''; // Inicializa a opção de acompanhamento
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
        } else {
            if (orderDetailsContainer) {
                orderDetailsContainer.style.display = 'block';
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
                                <select id="espeto-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="espeto">
                                    <option value="" disabled ${cartItem.espeto === '' ? 'selected' : ''}>Selecione</option>
                                    <option value="ASINHA (TULIPA)" ${cartItem.espeto === 'ASINHA (TULIPA)' ? 'selected' : ''}>ASINHA (TULIPA)</option>
                                    <option value="COXINHA DA ASA" ${cartItem.espeto === 'COXINHA DA ASA)' ? 'selected' : ''}>COXINHA DA ASA</option>
                                    <option value="CORAÇÃO" ${cartItem.espeto === 'CORAÇÃO' ? 'selected' : ''}>CORAÇÃO</option>
                                    <option value="CONTRA FILÉ" ${cartItem.espeto === 'CONTRA FILÉ' ? 'selected' : ''}>CONTRA FILÉ</option>
                                    <option value="CUPIM GRILL" ${cartItem.espeto === 'CUPIM GRILL' ? 'selected' : ''}>CUPIM GRILL</option>
                                    <option value="PICANHA MONTADA" ${cartItem.espeto === 'PICANHA MONTADA' ? 'selected' : ''}>PICANHA MONTADA</option>
                                    <option value="FRANGO COM BACON" ${cartItem.espeto === 'FRANGO COM BACON' ? 'selected' : ''}>FRANGO COM BACON</option>
                                    <option value="FRANGO SEM BACON" ${cartItem.espeto === 'FRANGO SEM BACON' ? 'selected' : ''}>FRANGO SEM BACON</option>
                                    <option value="LINGUIÇA CAIPIRA" ${cartItem.espeto === 'LINGUIÇA CAIPIRA' ? 'selected' : ''}>LINGUIÇA CAIPIRA</option>
                                    <option value="LINGUIÇA C. APIMENTADA" ${cartItem.espeto === 'LINGUIÇA C. APIMENTADA' ? 'selected' : ''}>LINGUIÇA C. APIMENTADA</option>
                                </select>
                            </div>
                        `;
                    }

                    if (product.id === 'pp-1' || product.id === 'pp-2' || product.id === 'pp-3') {
                        optionsHtml += `
                            <div class="input-group-inline">
                                <label for="feijao-${index}">Feijão:</label>
                                <select id="feijao-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="feijao">
                                    <option value="" disabled ${cartItem.feijao === '' ? 'selected' : ''}>Selecione</option>
                                    <option value="Tropeiro" ${cartItem.feijao === 'Tropeiro' ? 'selected' : ''}>Tropeiro</option>
                                    <option value="Caldo" ${cartItem.feijao === 'Caldo' ? 'selected' : ''}>Caldo</option>
                                </select>
                            </div>
                        `;
                    }
                }
                
                if (['cald-1', 'cald-2', 'cald-3'].includes(product.id)) {
                    let acompanhamentoOptions = '';
                    let selectLabel = 'Acompanha:';
                    // Define as opções baseadas no tipo de caldo
                    switch (product.id) {
                        case 'cald-1': // Caldo de Feijão
                        acompanhamentoOptions = `
                            <option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ? 'selected' : ''}>Sem mistura</option>
                            <option value="Feijão com Costela" ${cartItem.acompanhamento === 'Feijão com Costela' ? 'selected' : ''}>Feijão com Costela</option>
                            <option value="Feijão com Frango" ${cartItem.acompanhamento === 'Feijão com Frango' ? 'selected' : ''}>Feijão com Frango</option>
                        `;
                            break;
                        case 'cald-2': // Caldo de Frango
                            acompanhamentoOptions = `
                                <option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ? 'selected' : ''}>Sem mistura</option>
                                <option value="Frango com Feijão" ${cartItem.acompanhamento === 'Frango com Feijão' ? 'selected' : ''}>Frango com Feijão</option>
                                <option value="Frango com Costela" ${cartItem.acompanhamento === 'Frango com Costela' ? 'selected' : ''}>Frango com Costela</option>
                            `;
                            break;
                        case 'cald-3': // Caldo de Costela
                            acompanhamentoOptions = `
                                <option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ? 'selected' : ''}>Sem mistura</option>
                                <option value="Costela com Feijão" ${cartItem.acompanhamento === 'Costela com Feijão' ? 'selected' : ''}>Costela com Feijão</option>
                                <option value="Costela com Frango" ${cartItem.acompanhamento === 'Costela com Frango' ? 'selected' : ''}>Costela com Frango</option>
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
                        <span class="item-name">${product.name} ${['pp-1', 'pp-2', 'pp-3'].includes(product.id) ? '' : `(x${cartItem.quantity})`}</span>
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

        cartItemsModalContainer.querySelectorAll('.jantinha-options-individual select').forEach(select => {
            select.addEventListener('change', (event) => {
                const cartIndex = parseInt(event.target.dataset.cartIndex);
                const optionType = event.target.dataset.optionType;
                const value = event.target.value;

                if (cart[cartIndex]) {
                    cart[cartIndex][optionType] = value;
                }
            });
        });
    }

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

    function sendOrderToWhatsapp() {
        if (cart.length === 0) {
            alert('❌ Seu carrinho está vazio! Adicione itens antes de fazer o pedido.');
            return;
        }

        const orderType = orderTypeSelect.value;
        const deliveryAddress = deliveryAddressInput.value.trim();
        const pickupName = pickupNameInput.value.trim();
        const notes = notesTextarea.value.trim();

        if (orderType === 'delivery' && !deliveryAddress) {
            alert('Por favor, digite o endereço de entrega para prosseguir.');
            return;
        }
        if (orderType === 'pickup' && !pickupName) {
            alert('Por favor, digite o nome para retirada para prosseguir.');
            return;
        }

        let message = `*Boa noite!! Novo Pedido*\n\n`;
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

                let itemDetails = `1x ${product.name}:\n`;

                if (product.id === 'pp-1' || product.id === 'pp-2') {
                    const espeto = cartItem.espeto || 'Não selecionado';
                    if (espeto === 'Não selecionado') {
                        alert(`Por favor, selecione o espeto para a "${product.name}" (Item #${index + 1} no carrinho).`);
                        validationFailed = true;
                        return;
                    }
                    itemDetails += `    - Espeto: ${espeto}\n`;
                }

                const feijao = cartItem.feijao || 'Não selecionado';
                if (feijao === 'Não selecionado') {
                    alert(`Por favor, selecione o tipo de feijão para a "${product.name}" (Item #${index + 1} no carrinho).`);
                    validationFailed = true;
                    return;
                }
                itemDetails += `    - Feijão: ${feijao}\n`;
                itemDetails += `    - Preço: R$ ${itemPrice.toFixed(2).replace('.', ',')}\n\n`;

                message += itemDetails;

                // --- NOVO CÓDIGO ADICIONADO PARA CALDOS ---
                } else if (['cald-1', 'cald-2', 'cald-3'].includes(product.id)) {
                    const itemPrice = product.price;
                    total += itemPrice;

                    let itemDetails = `1x ${product.name}:\n`;
                    const acompanhamento = cartItem.acompanhamento || 'Não selecionado';

                    if (acompanhamento === 'Não selecionado') {
                        alert(`Por favor, selecione a mistura para o "${product.name}" (Item #${index + 1} no carrinho).`);
                        validationFailed = true;
                        return;
                    }

                itemDetails += `    - Mistura: ${acompanhamento}\n`;
                itemDetails += `    - Preço: R$ ${itemPrice.toFixed(2).replace('.', ',')}\n\n`;
                message += itemDetails;
        
        // --- FIM DO CÓDIGO NOVO ---

            } else {
                const itemPrice = product.price * cartItem.quantity;
                total += itemPrice;
                message += `${cartItem.quantity}x ${product.name} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n\n`;
            }
        });

        if (validationFailed) {
            return;
        }

        message += `*Tipo de Pedido:* ${orderType === 'delivery' ? 'Entrega' : 'Retirada no Local'}\n`;

        if (orderType === 'delivery') {
            message += `*Endereço de Entrega:*\n${deliveryAddress}\n`;
          
        } else {
            message += `*Nome para Retirada:*\n${pickupName}\n`;
        }
        if (notes) {
            message += `\n*Observações:*\n${notes}\n`;
        }

        message += `\n*Total dos Produtos: R$ ${total.toFixed(2).replace('.', ',')}*\n`;

        if (orderType === 'delivery') {
            message += `_Atenção: Taxa de entrega será calculada conforme o endereço._\n`;
        }

        message += `\nObrigado por pedir na Jantinha Nota 1000!`;

        const whatsappNumber = '5562992020331';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

        console.log('Mensagem final do WhatsApp:', decodeURIComponent(encodedMessage));
        window.open(whatsappUrl, '_blank');
    }


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
        // Verifica se o produto é uma jantinha que precisa de personalização
        if (['pp-1', 'pp-2', 'pp-3'].includes(productId)) {
            addCustomizableJantinhaToCart(productId);
        } else {
            addToCart(productId); // Outros itens são agrupados
        }
    }

    // =========================================================
    // NOVO CÓDIGO DO CARROSSEL DE FOTOS - INÍCIO
    // =========================================================
    let currentSlideIndex = 0;
    let photoSlides = []; // Array para armazenar os elementos <img> do carrossel

    /**
     * Renderiza as fotos dentro do modal de fotos como um carrossel.
     * Usa a variável 'photos' que vem do cardapio.js.
     */
    function renderPhotosInModal() {
        // Verifica se carouselTrackPhotos e 'photos' existem e se 'photos' é um array
        if (!carouselTrackPhotos || typeof photos === 'undefined' || !Array.isArray(photos)) {
            console.warn("'photos' não está definida ou não é um array. Não foi possível renderizar fotos no carrossel.");
            carouselTrackPhotos.innerHTML = '<p>Nenhuma foto disponível no momento.</p>';
            if (prevPhotoButton) prevPhotoButton.style.display = 'none';
            if (nextPhotoButton) nextPhotoButton.style.display = 'none';
            return;
        }

        carouselTrackPhotos.innerHTML = ''; // Limpa as imagens existentes no track
        photoSlides = []; // Reseta o array de slides

        if (photos.length === 0) {
            carouselTrackPhotos.innerHTML = '<p>Nenhuma foto disponível no momento.</p>';
            if (prevPhotoButton) prevPhotoButton.style.display = 'none';
            if (nextPhotoButton) nextPhotoButton.style.display = 'none';
            return;
        }

        photos.forEach((photoUrl, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('carousel-slide');

            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = `Foto da Jantinha Nota 1000 - ${index + 1}`;
            
            imgContainer.appendChild(img);
            carouselTrackPhotos.appendChild(imgContainer);
            photoSlides.push(imgContainer); // Adiciona o container da imagem ao array de slides
        });

        currentSlideIndex = 0; // Garante que começa na primeira foto
        updateCarouselButtons(); // Atualiza o estado dos botões
    }

    /**
     * Exibe o slide no índice especificado no carrossel de fotos.
     * @param {number} index - O índice do slide a ser exibido.
     */
    function showPhotoSlide(index) {
        if (photoSlides.length === 0) return;

        // Garante que o índice esteja dentro dos limites
        currentSlideIndex = Math.max(0, Math.min(index, photoSlides.length - 1));
        const scrollPosition = currentSlideIndex * carouselTrackPhotos.offsetWidth;
        carouselTrackPhotos.scrollTo({
            left: scrollPosition,
            behavior: 'smooth' // Rolagem suave
        
        });
        updateCarouselButtons();
    }

    /**
     * Atualiza a visibilidade dos botões de navegação do carrossel.
     */
    function updateCarouselButtons() {
        if (photoSlides.length <= 1) { // Se houver 0 ou 1 foto, esconde os botões
            if (prevPhotoButton) prevPhotoButton.style.display = 'none';
            if (nextPhotoButton) nextPhotoButton.style.display = 'none';
        } else {
            if (prevPhotoButton) prevPhotoButton.style.display = (currentSlideIndex === 0) ? 'none' : 'block';
            if (nextPhotoButton) nextPhotoButton.style.display = (currentSlideIndex === photoSlides.length - 1) ? 'none' : 'block';
        }
    }

    // Event Listeners para os botões do carrossel
    if (prevPhotoButton) {
        prevPhotoButton.addEventListener('click', () => {
            showPhotoSlide(currentSlideIndex - 1);
        });
    }

    if (nextPhotoButton) {
        nextPhotoButton.addEventListener('click', () => {
            showPhotoSlide(currentSlideIndex + 1);
        });
    }
    if (carouselTrackPhotos) {
        carouselTrackPhotos.addEventListener('scroll', () => {
            const newIndex = Math.round(carouselTrackPhotos.scrollLeft / carouselTrackPhotos.offsetWidth);
            if (newIndex !== currentSlideIndex) {
                currentSlideIndex = newIndex;
                updateCarouselButtons();
            }
        });
    }
    // =========================================================
    // NOVO CÓDIGO DO CARROSSEL DE FOTOS - FIM
    // =========================================================


    function renderMenu() {
        if (!menuSections || !categoryNavigation || typeof products === 'undefined' || typeof categoriesData === 'undefined') return;

        menuSections.innerHTML = '';
        categoryNavigation.innerHTML = '';

        const categories = products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});

        categoriesData.forEach(item => {
            const normalizedId = normalizeCategoryName(item.name);

            const categoryButton = document.createElement('button');
            categoryButton.classList.add('category-button');

            if (item.type === 'category') {
                categoryButton.dataset.targetId = `category-${normalizedId}`;
                categoryButton.dataset.type = 'category';
            } else if (item.type === 'link') {
                categoryButton.dataset.url = item.url;
                categoryButton.dataset.type = 'link';
            } else if (item.type === 'modal') {
                categoryButton.dataset.targetModalId = item.targetModalId;
                categoryButton.dataset.type = 'modal';
            }

            const lottieContainer = document.createElement('div');
            lottieContainer.classList.add('lottie-icon-container');
            categoryButton.appendChild(lottieContainer);

            // Garante que as variáveis DEFAULT_LOTTIE_JSON e DEFAULT_CATEGORY_IMAGE existem
            const lottieJsonUrlToUse = item.lottieJsonUrl || (typeof DEFAULT_LOTTIE_JSON !== 'undefined' ? DEFAULT_LOTTIE_JSON : '');
            const imageUrlToUseForFallback = item.imageUrl || (typeof DEFAULT_CATEGORY_IMAGE !== 'undefined' ? DEFAULT_CATEGORY_IMAGE : '');

            if (lottieJsonUrlToUse && typeof lottie !== 'undefined') {
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
                const fallbackImage = document.createElement('img');
                fallbackImage.src = imageUrlToUseForFallback;
                fallbackImage.alt = `Ícone da categoria ${item.name}`;
                lottieContainer.appendChild(fallbackImage);
            }

            const buttonText = document.createElement('span');
            buttonText.classList.add('button-text');
            buttonText.textContent = item.name;
            categoryButton.appendChild(buttonText);

            categoryButton.addEventListener('click', (event) => {
                const targetType = event.currentTarget.dataset.type;
                if (targetType === 'category') {
                    const targetId = event.currentTarget.dataset.targetId;
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else if (targetType === 'link') {
                    const url = event.currentTarget.dataset.url;
                    window.open(url, '_blank');
                } else if (targetType === 'modal') {
                    const targetModalId = event.currentTarget.dataset.targetModalId;
                    const targetModal = document.getElementById(targetModalId);
                    if (targetModal) {
                        openModal(targetModal);
                        // ***** CHAMADA DA NOVA FUNÇÃO PARA RENDERIZAR FOTOS *****
                        if (targetModalId === 'photos-modal') {
                            renderPhotosInModal(); // Chama a função que configura o carrossel
                        }
                    }
                }
            });
            categoryNavigation.appendChild(categoryButton);
        });

        for (const categoryName in categories) {
            const categoryDataEntry = categoriesData.find(cat => cat.name === categoryName && cat.type === 'category');
            if (!categoryDataEntry) {
                continue;
            }

            const normalizedId = normalizeCategoryName(categoryName);

            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            categoryDiv.id = `category-${normalizedId}`;

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = categoryName;
            categoryDiv.appendChild(categoryTitle);

            const productsGrid = document.createElement('div');
            productsGrid.classList.add('products-grid');

            categories[categoryName].forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.dataset.id = product.id;

                const imageUrlToUse = (product.imageUrl && !product.imageUrl.includes('link_da_sua_imagem_')) ? product.imageUrl : (typeof DEFAULT_PLACEHOLDER_IMAGE !== 'undefined' ? DEFAULT_PLACEHOLDER_IMAGE : '');

                productCard.innerHTML = `
                    <div class="product-image-container">
                        <img src="${imageUrlToUse}" class="product-image-small" alt="${product.name}">
                    </div>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button class="add-to-cart" data-id="${product.id}">Adicionar</button>
                `;
                productsGrid.appendChild(productCard);
            });
            categoryDiv.appendChild(productsGrid);
            menuSections.appendChild(categoryDiv);
        }

        setupProductEventListeners();
    }

    /**
     * Configura os event listeners para os botões "Adicionar" dos produtos.
     */
    function setupProductEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.removeEventListener('click', handleAddButtonClick); // Remove listeners antigos para evitar duplicação
            button.addEventListener('click', handleAddButtonClick); // Adiciona o listener
        });
    }

    // --- Event Listeners Globais ---

    // Event Listeners para botões de rolagem do carrinho
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', scrollCartUp);
    }
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', scrollCartDown);
    }

    // Event listener para o botão "Voltar ao Topo"
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            // Usa window.scrollY para navegadores modernos
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            if (scrollPosition > 200) {
                scrollToTopBtn.style.display = "flex";
                scrollToTopBtn.style.opacity = "1";
            } else {
                scrollToTopBtn.style.opacity = "0";
                setTimeout(() => {
                    // Verifica novamente a opacidade antes de esconder completamente
                    if (scrollToTopBtn.style.opacity === "0") {
                        scrollToTopBtn.style.display = "none";
                    }
                }, 300); // Tempo igual ao 'transition' no CSS
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Event listener para o botão do carrinho no header
    if (cartIconContainer) {
        cartIconContainer.addEventListener('click', () => {
            openModal(cartModal);
            updateCartDisplay(); // Força a atualização do display ao abrir
            handleOrderTypeChange(); // Garante que os campos de entrega/retirada estejam corretos
        });
    }

    // Adiciona event listeners para todos os botões de fechar modal (classe '.close-button')
    document.querySelectorAll('.modal .close-button').forEach(button => {
        button.addEventListener('click', () => {
            const modalElement = button.closest('.modal'); // Encontra o modal pai do botão
            if (modalElement) {
                closeModal(modalElement);
                // Lógica específica para o chatbot ao fechar
                if (modalElement.id === 'chatModal') {
                    if (chatbox) {
                        chatbox.innerHTML = '';
                        delete chatbox.dataset.initialMessageShown;
                    }
                }
            }
        });
    });

    // Event listener para o botão de checkout do WhatsApp
    if (checkoutWhatsappModalBtn) {
        checkoutWhatsappModalBtn.addEventListener('click', sendOrderToWhatsapp);
    }

    // Event listener para o botão de alternar tema
    if (themeToggleContainer) {
        themeToggleContainer.addEventListener('click', toggleTheme);
    }

    // Event listener para abrir o modal de informações
    if (infoToggleContainer) {
        infoToggleContainer.addEventListener('click', () => openModal(infoModal));
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
                const storeStatus = getStoreStatus();
                let initialBotMessage = "";

               if (storeStatus === 'CLOSED') {
                    // Se a loja estiver fechada (incluindo segunda-feira), use a mensagem de fechado
                    initialBotMessage = "😔 Olá! Estamos fechados. Nosso horário de funcionamento é de TERÇA a DOMINGO, das 18:00h às 00:00h. 😉";
                } else if (storeStatus === 'AWAITING_OPENING') {
                    // Se estiver esperando abrir (no dia de funcionamento)
                    initialBotMessage = "⏰ Olá! Ainda não abrimos. Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 00:00h. Abriremos às " + operatingHours.openTime + " de hoje! 😉";
                } else {
                    // Para os outros dias e horários (quando está OPEN)
                    const currentDayName = getWeekdayName(new Date().getDay());
                    // Verifica se chatbotKnowledgeBase está definido para evitar erros
                    if (typeof chatbotKnowledgeBase !== 'undefined') {
                        chatbotKnowledgeBase["ola"] = `👋 Olá! Feliz ${currentDayName}! Como posso ajudar você hoje? 😊\n\nVocê pode perguntar sobre:\n- 🍢 Nossos **Espetos**\n- 🍛 As **Jantinhas**\n- 🥤 **Bebidas**\n- 🍟 **Porções** e **Pastéis**\n- 🍰 **Doces** e **Drinks**\n- ⏰ Nossos **Horários** de funcionamento\n- 🛵 **Entrega**\n- 📞 **Contato**\n\nOu qualquer outra dúvida sobre o cardápio! 😉`;
                        chatbotKnowledgeBase["oi"] = chatbotKnowledgeBase["ola"]; // 'oi' também usa a mesma mensagem
                        initialBotMessage = chatbotKnowledgeBase["ola"];
                    } else {
                        initialBotMessage = "Olá! Como posso ajudar você hoje?";
                    }
                }

                // Adiciona a mensagem inicial ao chat
                addMessage(initialBotMessage, 'bot');
                chatbox.dataset.initialMessageShown = 'true';
            }
        });
    }

    // Event listener para fechar o modal do chat
    if (closeChatModalBtn) {
        closeChatModalBtn.addEventListener('click', () => {
            closeModal(chatModal);
            if (chatbox) { // Garante que chatbox existe antes de limpar
                chatbox.innerHTML = '';
                delete chatbox.dataset.initialMessageShown;
            }
        });
    }

    // Event listener para enviar mensagem no chat
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

    // Event listener para enviar mensagem no chat com Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatBtn.click();
            }
        });
    }

    // --- Inicializações ao carregar o DOM ---
    initializeTheme(); // Aplica o tema salvo ao carregar a página
    renderMenu(); // Renderiza o cardápio inicial
    updateCartDisplay(); // Garante que o contador do carrinho e o display estejam corretos ao carregar a página
    handleOrderTypeChange(); // Chama ao carregar para definir o estado inicial (Entrega) ou Retirada.
});