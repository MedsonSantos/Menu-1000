// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Carrinho de compras. Cada item pode ser:
    // - Jantinha Completa: { id: 'pp-1', espeto: 'Carne', feijao: 'Tropeiro', quantity: 1 }
    // - Jantinha Nota 1000: { id: 'pp-2', espeto: 'Carne', feijao: 'Tropeiro', quantity: 1 }
    // - Jantinha sem Espeto: { id: 'pp-3', feijao: 'Tropeiro', quantity: 1 }
    // - Outros produtos: { id: 'produto_id', quantity: X }
    let cart = [];

    // --- Elementos do DOM ---
    const menuSections = document.getElementById('menu-sections');

    // Elementos do Modal do Carrinho
    const cartModal = document.getElementById('cart-modal');
    const closeCartModalBtn = cartModal.querySelector('.close-button');
    const cartItemsModalContainer = document.getElementById('cart-items-modal');
    const cartTotalModalSpan = document.getElementById('cart-total-modal');
    const checkoutWhatsappModalBtn = document.getElementById('checkout-whatsapp-modal');

    // NOVOS ELEMENTOS PARA ENTREGA/RETIRADA
    const orderTypeSelect = document.getElementById('order-type');
    const deliveryOptionsDiv = document.getElementById('delivery-options');
    const pickupOptionsDiv = document.getElementById('pickup-options');
    const deliveryAddressInput = document.getElementById('delivery-address');
    const pickupNameInput = document.getElementById('pickup-name');
    const deliveryFeeInfo = document.getElementById('delivery-fee-info'); // Referência ao parágrafo de aviso da taxa

    const notesTextarea = document.getElementById('notes');

    // Elementos do Modal de Informações
    const infoModal = document.getElementById('info-modal');
    const closeInfoModalBtn = infoModal.querySelector('.close-button');
    const infoToggleContainer = document.getElementById('info-toggle-container');

    // Elementos do Modal de Fotos (em grade, como "Em Breve")
    const photosModal = document.getElementById('photos-modal');
    const closePhotosModalBtn = photosModal.querySelector('.close-button');
    const modalPhotosGrid = document.getElementById('modal-photos-grid');

    // NOVO: Elementos do Modal de Imagem Única (para clique em fotos de produtos)
    const imageModal = document.getElementById('image-modal'); // Seu modal existente para imagem
    const fullImage = document.getElementById('full-image'); // A <img> dentro dele
    const closeImageModalButton = document.getElementById('close-image-modal'); // Botão fechar do modal de imagem
    // const captionText = document.getElementById("caption"); // Removi pois não há elemento com id="caption" no seu HTML e não é necessário para esta função

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


    // --- Funções de Manipulação do Tema ---
    /**
     * Define o tema da aplicação (claro ou escuro).
     * @param {string} theme - 'light' para tema claro, 'dark' para tema escuro.
     */
    function setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }

    /**
     * Alterna entre o tema claro e escuro.
     */
    function toggleTheme() {
        if (document.body.classList.contains('light-theme')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    /**
     * Inicializa o tema com base na preferência salva no localStorage.
     */
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setTheme('light');
        } else {
            // Padrão para escuro se não houver preferência salva ou for 'dark'
            setTheme('dark');
        }
    }


    // --- Funções de Manipulação de Modais (Generalizadas) ---
    /**
     * Abre um modal específico.
     * @param {HTMLElement} modalElement - O elemento DOM do modal a ser aberto.
     */
    function openModal(modalElement) {
        modalElement.style.display = 'flex'; // Usando 'flex' para centralização CSS
        document.body.style.overflow = 'hidden'; // Impede o scroll do body
    }

    /**
     * Fecha um modal específico.
     * @param {HTMLElement} modalElement - O elemento DOM do modal a ser fechado.
     */
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura o scroll do body
    }

    // Fechar modal ao clicar fora dele (AJUSTADO PARA INCLUIR imageModal)
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeModal(cartModal);
        } else if (event.target === infoModal) {
            closeModal(infoModal);
        } else if (event.target === photosModal) {
            closeModal(photosModal);
        } else if (event.target === chatModal) {
            closeModal(chatModal);
            chatbox.innerHTML = ''; // Limpa o chatbox ao fechar
            delete chatbox.dataset.initialMessageShown; // Permite que a mensagem inicial apareça novamente
        } else if (event.target === imageModal) { // NOVO: Para o modal de imagem única
            closeModal(imageModal);
        }
    });


    // --- Funções Auxiliares do Chatbot ---
    // Função para obter o nome do dia da semana em português
    function getWeekdayName(dayIndex) {
        const weekdays = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado"
        ];
        return weekdays[dayIndex];
    }

    // Função para adicionar uma mensagem ao chatbox
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        // Para exibir as quebras de linha (\n) corretamente no HTML
        messageDiv.innerHTML = message.replace(/\n/g, '<br>');
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight; // Rolagem automática para a última mensagem
    }

    // Lógica Principal do Chatbot
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase().trim(); // Normaliza a mensagem do usuário

        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

        // 1. Verificar se é Segunda-feira (Dia de Fechamento)
        if (dayOfWeek === 1) { // Se for segunda-feira
            return "😔 Olá! Infelizmente, estamos fechados às segundas-feiras. Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 23:30h. Te esperamos a partir de amanhã! 😉";
        }

        // 2. Se não for Segunda-feira, verificar as palavras-chave na base de conhecimento
        // NOTE: chatbotKnowledgeBase é global, carregada de knowledgeBase.js
        for (const keyword in chatbotKnowledgeBase) {
            if (userMessage.includes(keyword)) {
                return chatbotKnowledgeBase[keyword];
            }
        }

        // 3. Se nenhuma palavra-chave for encontrada e não for segunda, retornar mensagem genérica
        return "Desculpe, não entendi sua pergunta. Poderia reformular ou perguntar sobre o menu, entrega, horários, etc.?";
    }

    // --- Funções de Carrinho ---
    /**
     * Adiciona um item genérico (não-jantinha personalizável) ao carrinho,
     * agrupando se o item já existir.
     * @param {string} productId - O ID do produto a ser adicionado.
     */
    function addToCart(productId) {
        // Procura por um item existente no carrinho que tenha o mesmo ID E não seja uma jantinha personalizável
        const existingItemIndex = cart.findIndex(item => item.id === productId && !['pp-1', 'pp-2', 'pp-3'].includes(item.id));

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        updateCartDisplay();
        flashCartIcon();
    }

    /**
     * Adiciona uma nova instância de uma jantinha personalizável (pp-1, pp-2, pp-3) ao carrinho.
     * Cada jantinha é um item separado no carrinho para permitir personalização individual.
     * @param {string} productId - O ID do produto da jantinha.
     */
    function addCustomizableJantinhaToCart(productId) {
        const newItem = { id: productId, quantity: 1 }; // quantity será sempre 1 para essas jantinhas personalizadas

        // Adiciona as opções de personalização baseadas no ID do produto
        if (productId === 'pp-1' || productId === 'pp-2') { // Jantinha Completa e Jantinha Nota 1000
            newItem.espeto = '';
            newItem.feijao = '';
        } else if (productId === 'pp-3') { // Jantinha sem Espeto
            newItem.feijao = '';
        }

        cart.push(newItem);
        updateCartDisplay();
        flashCartIcon();
    }

    /**
     * Atualiza a quantidade de um item no carrinho com base no seu índice no array 'cart'.
     * Para jantinhas personalizáveis, remove ou adiciona instâncias.
     * Para outros itens, apenas ajusta a quantidade.
     * @param {number} cartIndex - O índice do item no array `cart`.
     * @param {number} change - O valor da mudança (+1 para aumentar, -1 para diminuir).
     */
    function updateCartItemQuantity(cartIndex, change) {
        // Verifica se o índice é válido
        if (cartIndex < 0 || cartIndex >= cart.length) {
            console.error('Índice do carrinho inválido:', cartIndex);
            return;
        }

        const item = cart[cartIndex];
        // Verifica se é uma jantinha personalizável
        if (['pp-1', 'pp-2', 'pp-3'].includes(item.id)) {
            if (change < 0) { // Tentando diminuir
                cart.splice(cartIndex, 1); // Remove esta instância de jantinha
            } else { // Tentando aumentar (adicionar outra jantinha)
                addCustomizableJantinhaToCart(item.id); // Adiciona uma nova instância do mesmo tipo de jantinha
            }
        } else {
            // Para outros produtos, ajusta a quantidade do item existente
            item.quantity += change;
            if (item.quantity <= 0) {
                cart.splice(cartIndex, 1);
            }
        }
        updateCartDisplay();
        flashCartIcon();
    }

    /**
     * Adiciona uma animação de "flash" ao ícone do carrinho.
     */
    function flashCartIcon() {
        cartIconContainer.classList.add('flash');
        setTimeout(() => {
            cartIconContainer.classList.remove('flash');
        }, 500);
    }

    /**
     * Atualiza a exibição do carrinho no modal, incluindo as opções de personalização.
     */
    function updateCartDisplay() {
        cartItemsModalContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            cartItemsModalContainer.innerHTML = '<p> ❌Nenhum item no carrinho.</p>';
        } else {
            // Objeto para agrupar produtos não-jantinhas personalizáveis para exibição
            const groupedOtherItems = {};

            cart.forEach((cartItem, index) => {
                const product = products.find(p => p.id === cartItem.id);
                if (!product) {
                    console.warn(`Produto com ID ${cartItem.id} não encontrado.`);
                    return; // Pula para o próximo item se o produto não for encontrado
                }

                // Verifica se é uma jantinha personalizável
                if (['pp-1', 'pp-2', 'pp-3'].includes(product.id)) {
                    const itemTotal = product.price; // O preço da jantinha é para 1 unidade
                    total += itemTotal;
                    itemCount += 1; // Cada jantinha é contada como 1 item para o total de itens

                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    // Usamos o 'index' do array `cart` para identificar essa jantinha única
                    let optionsHtml = '';

                    if (product.id === 'pp-1' || product.id === 'pp-2') { // Jantinha Completa e Jantinha Nota 1000
                        optionsHtml += `
                            <div class="input-group-inline">
                                <label for="espeto-${index}">Espeto:</label>
                                <select id="espeto-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="espeto">
                                    <option value="" disabled ${cartItem.espeto === '' ? 'selected' : ''}>Selecione</option>
                                    <option value="ASINHA (TULIPA)" ${cartItem.espeto === 'ASINHA (TULIPA)' ? 'selected' : ''}>ASINHA (TULIPA)</option>
                                    <option value="COXINHA DA ASA" ${cartItem.espeto === 'COXINHA DA ASA' ? 'selected' : ''}>COXINHA DA ASA</option>
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

                    if (product.id === 'pp-1' || product.id === 'pp-2' || product.id === 'pp-3') { // Todas as jantinhas precisam de feijão
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


                    cartItemDiv.innerHTML = `
                        <div class="cart-item-info">
                            <span class="item-name">${product.name}</span>
                            <span class="item-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                            <div class="jantinha-options-individual">
                                ${optionsHtml}
                            </div>
                        </div>
                        <div class="cart-item-quantity">
                            <button data-cart-index="${index}" data-action="decrease">-</button>
                            <span>1</span>
                            <button data-cart-index="${index}" data-action="increase">+</button>
                        </div>
                    `;
                    cartItemsModalContainer.appendChild(cartItemDiv);

                } else {
                    // Para outros produtos, agrupamos por ID (sem personalização)
                    if (!groupedOtherItems[product.id]) {
                        groupedOtherItems[product.id] = { product: product, quantity: 0 };
                    }
                    groupedOtherItems[product.id].quantity += cartItem.quantity;
                }
            });

            // Adiciona os itens agrupados (não-jantinhas personalizáveis)
            for (const productId in groupedOtherItems) {
                const item = groupedOtherItems[productId];
                const product = item.product;
                const quantity = item.quantity;

                const itemTotal = product.price * quantity;
                total += itemTotal;
                itemCount += quantity;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <span class="item-name">${product.name}</span>
                        <span class="item-price">R$ ${product.price.toFixed(2).replace('.', ',')} cada</span>
                    </div>
                    <div class="cart-item-quantity">
                        <button data-product-id="${product.id}" data-action="decrease-grouped">-</button>
                        <span>${quantity}</span>
                        <button data-product-id="${product.id}" data-action="increase-grouped">+</button>
                    </div>
                `;
                cartItemsModalContainer.appendChild(cartItemDiv);
            }
        }

        cartTotalModalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartCountSpan.textContent = itemCount;

        // Adiciona event listeners para os botões de quantidade (AJUSTADO PARA SER CHAMADO AQUI)
        cartItemsModalContainer.querySelectorAll('.cart-item-quantity button').forEach(button => {
            button.addEventListener('click', (event) => {
                const action = event.target.dataset.action;

                if (action.includes('grouped')) { // Para itens agrupados (não jantinhas personalizáveis)
                    const productId = event.target.dataset.productId;
                    const change = action === 'increase-grouped' ? 1 : -1;
                    // Encontre o índice do PRIMEIRO item não-jantinha desse tipo no carrinho
                    const itemIndex = cart.findIndex(item => item.id === productId && !['pp-1', 'pp-2', 'pp-3'].includes(item.id));
                    if (itemIndex !== -1) {
                        updateCartItemQuantity(itemIndex, change);
                    }
                } else { // Para jantinhas personalizáveis (individual)
                    const cartIndex = parseInt(event.target.dataset.cartIndex);
                    const change = action === 'increase' ? 1 : -1;
                    updateCartItemQuantity(cartIndex, change);
                }
            });
        });

        // Event listeners para os selects de espeto e feijão das jantinhas individuais (AJUSTADO PARA SER CHAMADO AQUI)
        cartItemsModalContainer.querySelectorAll('.jantinha-options-individual select').forEach(select => {
            select.addEventListener('change', (event) => {
                const cartIndex = parseInt(event.target.dataset.cartIndex);
                const optionType = event.target.dataset.optionType; // 'espeto' ou 'feijao'
                const value = event.target.value;

                // Atualiza a propriedade do item correspondente no array `cart`
                if (cart[cartIndex]) {
                    cart[cartIndex][optionType] = value;
                }
                // Não precisa de updateCartDisplay() completo, só armazena o valor
            });
        });
    }

    /**
     * Controla a visibilidade dos campos de endereço e nome de retirada
     * com base na seleção do tipo de pedido.
     */
    function handleOrderTypeChange() {
        const selectedType = orderTypeSelect.value;

        if (selectedType === 'delivery') {
            deliveryOptionsDiv.style.display = 'block';
            pickupOptionsDiv.style.display = 'none';
            deliveryFeeInfo.style.display = 'block'; // Mostra aviso de taxa
            deliveryAddressInput.required = true; // Torna o endereço obrigatório
            pickupNameInput.required = false; // Garante que o nome não é obrigatório
            pickupNameInput.value = ''; // Limpa o campo de nome ao mudar para entrega
        } else { // 'pickup'
            deliveryOptionsDiv.style.display = 'none';
            pickupOptionsDiv.style.display = 'block';
            deliveryFeeInfo.style.display = 'none'; // Esconde aviso de taxa
            deliveryAddressInput.required = false; // Endereço não é obrigatório
            pickupNameInput.required = true; // Nome de retirada é obrigatório
            deliveryAddressInput.value = ''; // Limpa o campo de endereço ao mudar para retirada
        }
    }


    /**
     * Envia o pedido para o WhatsApp com todos os detalhes.
     */
    function sendOrderToWhatsapp() {
        if (cart.length === 0) {
            alert('❌ Seu carrinho está vazio! Adicione itens antes de fazer o pedido.');
            return;
        }

        const orderType = orderTypeSelect.value;
        const deliveryAddress = deliveryAddressInput.value.trim();
        const pickupName = pickupNameInput.value.trim();
        const notes = notesTextarea.value.trim();

        // Validação de campos obrigatórios
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

        // Processa os itens do carrinho
        cart.forEach((cartItem, index) => {
            const product = products.find(p => p.id === cartItem.id);
            if (!product) {
                console.warn(`Produto com ID ${cartItem.id} não encontrado ao gerar mensagem.`);
                return;
            }

            // Se for uma jantinha personalizável
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
                    itemDetails += `   - Espeto: ${espeto}\n`;
                }

                const feijao = cartItem.feijao || 'Não selecionado';
                if (feijao === 'Não selecionado') {
                    alert(`Por favor, selecione o tipo de feijão para a "${product.name}" (Item #${index + 1} no carrinho).`);
                    validationFailed = true;
                    return;
                }
                itemDetails += `   - Feijão: ${feijao}\n`;
                itemDetails += `   - Preço: R$ ${itemPrice.toFixed(2).replace('.', ',')}\n\n`;

                message += itemDetails;

            } else {
                const itemPrice = product.price * cartItem.quantity;
                total += itemPrice;
                message += `${cartItem.quantity}x ${product.name} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n\n`;
            }
        });

        // Se alguma validação de Jantinha falhou, interrompe o processo
        if (validationFailed) {
            return;
        }

        message += `*Tipo de Pedido:* ${orderType === 'delivery' ? 'Entrega' : 'Retirada no Local'}\n`;

        if (orderType === 'delivery') {
            message += `***Endereço de Entrega:***\n${deliveryAddress}\n`;

            // Codifica o endereço para ser usado na URL
            const encodedDeliveryAddress = encodeURIComponent(deliveryAddress);
            // AJUSTE: Corrigido o link do Google Maps para ser funcional
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedDeliveryAddress}`;

            // Mantém apenas o link mascarado com "Ver no Mapa"
            message += `[Ver no Mapa](${googleMapsUrl})\n`;
        } else { // 'pickup'
            message += `***Nome para Retirada:***\n${pickupName}\n`;
        }
        if (notes) {
            message += `\n*Observações:*\n${notes}\n`;
        }

        message += `\n*Total dos Produtos: R$ ${total.toFixed(2).replace('.', ',')}*\n`;

        if (orderType === 'delivery') {
            message += `_Atenção: Taxa de entrega será calculada conforme o endereço._\n`;
        }

        message += `\nObrigado por pedir no Jantinha Nota 1000!`;

        const whatsappNumber = '5562992020331';

        const encodedMessage = encodeURIComponent(message);

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

        console.log('Mensagem final do WhatsApp:', decodeURIComponent(encodedMessage));
        window.open(whatsappUrl, '_blank');
    }


    // --- Funções de Renderização do Menu e Fotos ---
    /**
     * Função auxiliar para normalizar nomes de categoria para IDs HTML.
     * @param {string} name - O nome da categoria.
     * @returns {string} O nome normalizado para uso como ID HTML.
     */
    function normalizeCategoryName(name) {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    /**
     * Renderiza o cardápio principal e os botões de atalho/categorias.
     */
    function renderMenu() {
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

        // Renderiza os botões de categoria e os botões de atalho
        categoriesData.forEach(item => {
            const normalizedId = normalizeCategoryName(item.name);

            const categoryButton = document.createElement('button');
            categoryButton.classList.add('category-button');

            // Define o target (ID da seção, URL ou ID do modal)
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

            // Define a URL Lottie ou imagem de fallback
            const lottieJsonUrlToUse = item.lottieJsonUrl || DEFAULT_LOTTIE_JSON;
            const imageUrlToUseForFallback = item.imageUrl || DEFAULT_CATEGORY_IMAGE;

            // Tenta carregar Lottie, se não, usa imagem de fallback
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
            } else {
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
                    window.open(url, '_blank'); // Abre em nova aba
                } else if (targetType === 'modal') {
                    const targetModalId = event.currentTarget.dataset.targetModalId;
                    const targetModal = document.getElementById(targetModalId);
                    if (targetModal) {
                        openModal(targetModal);
                        // Apenas renderiza fotos se for o modal de fotos
                        if (targetModalId === 'photos-modal') {
                            renderPhotosInModal();
                        }
                    }
                }
            });
            categoryNavigation.appendChild(categoryButton);
        });

        // Renderiza as seções de produtos (apenas para as categorias 'type: category')
        for (const categoryName in categories) {
            // Verifica se a categoria é do tipo 'category' na categoriesData
            const categoryDataEntry = categoriesData.find(cat => cat.name === categoryName && cat.type === 'category');
            if (!categoryDataEntry) {
                continue; // Pula se não for uma categoria de produtos
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

                const imageUrlToUse = (product.imageUrl && !product.imageUrl.includes('link_da_sua_imagem_'))
                    ? product.imageUrl
                    : DEFAULT_PLACEHOLDER_IMAGE;

                // AJUSTE: Adicionado um container para a imagem para melhor controle de clique
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

        // Adiciona event listeners aos botões "Adicionar" dos produtos
        setupProductEventListeners();
        // NOVO: Chama a função para configurar os listeners das imagens após o menu ser renderizado
        setupImageModalEventListeners();
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


    /**
     * Renderiza as fotos dentro do modal de fotos.
     */
    function renderPhotosInModal() {
        if (modalPhotosGrid) {
            modalPhotosGrid.innerHTML = ''; // Limpa antes de adicionar
            photos.forEach(photoUrl => {
                const img = document.createElement('img');
                img.src = photoUrl;
                img.alt = 'Foto da Jantinha Nota 1000';
                img.classList.add('modal-grid-image'); // Adiciona uma classe para o listener
                modalPhotosGrid.appendChild(img);
            });
            // NOVO: Adiciona listeners para as imagens do grid de fotos também
            setupImageModalEventListeners();
        }
    }

    // --- Funções e Lógica para o Modal de Imagem Única ---
    // Funções openImageModal e closeImageModal agora são mais genéricas
    // e reutilizam as funções openModal/closeModal já existentes para
    // padronizar o comportamento de scroll do body.

    /**
     * Abre o modal de imagem única com a imagem fornecida.
     * @param {string} imgSrc - A URL da imagem a ser exibida.
     */
      function openSingleImageModal(imgSrc) {
        // Verifique se a imagem de fato existe antes de tentar carregar
        if (!imgSrc || imgSrc.includes(DEFAULT_PLACEHOLDER_IMAGE)) {
            alert('Item sem imagem disponível para visualização.');
            return;
        }
        fullImage.src = imgSrc; // Define a fonte da imagem no modal
        openModal(imageModal); // Usa a função genérica para abrir o modal
    }

    /**
     * Fecha o modal de imagem única.
     */
    function closeSingleImageModal() {
        closeModal(imageModal); // Usa a função genérica para fechar o modal
    }

    // AJUSTE: Handler para o clique no botão de fechar do modal de imagem
    if (closeImageModalButton) {
        closeImageModalButton.addEventListener('click', closeSingleImageModal);
    }

    // Adiciona o evento de clique a todas as imagens pequenas após a renderização do menu
    // Esta função DEVE ser chamada após renderMenu() ter adicionado os produtos ao DOM
    function setupImageModalEventListeners() {
        // Seleciona todas as imagens pequenas de produtos
        document.querySelectorAll('.product-image-small').forEach(img => {
            // Remove qualquer listener anterior para evitar duplicação se renderMenu for chamado várias vezes
            img.removeEventListener('click', handleProductImageClick);
            // Adiciona o novo listener
            img.addEventListener('click', handleProductImageClick);
        });

        // NOVO: Adiciona listeners para as imagens dentro do modal de "Nossas Fotos" também
        document.querySelectorAll('.modal-grid-image').forEach(img => {
            img.removeEventListener('click', handleProductImageClick);
            img.addEventListener('click', handleProductImageClick);
        });
    }
/**
 * Handler para o clique em imagens de produtos ou do grid de fotos.
 * @param {Event} event - O evento de clique.
 */
function handleProductImageClick(event) {
    // Obtém a URL da imagem clicada
    const imageUrl = event.target.src; // Usa o src atual da imagem

    // Verifica se a URL da imagem é a imagem de placeholder padrão
    // Certifique-se de que DEFAULT_PLACEHOLDER_IMAGE esteja definido no seu código
    if (imageUrl.includes(DEFAULT_PLACEHOLDER_IMAGE)) {
        alert('Item sem imagem disponível para visualização.'); // Exibe a mensagem de aviso
        return; // Impede que o modal seja aberto
    }

    // Se a imagem não for o placeholder, abre o modal normalmente
    openSingleImageModal(imageUrl);
}


    // --- Event Listeners Globais ---

    // Event listener para o botão "Voltar ao Topo"
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "flex"; // Mostra o botão
            scrollToTopBtn.style.opacity = "1"; // Torna visível
        } else {
            scrollToTopBtn.style.opacity = "0"; // Torna invisível
            // Usa um pequeno atraso para esconder completamente após a transição de opacidade
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === "0") {
                    scrollToTopBtn.style.display = "none";
                }
            }, 300); // Deve ser igual ao tempo de transition no CSS
        }
    };

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Adiciona rolagem suave
        });
    });

    // Event listener para o botão do carrinho no header
    if (cartIconContainer) {
        cartIconContainer.addEventListener('click', () => {
            openModal(cartModal);
            updateCartDisplay(); // Força a atualização do display ao abrir
            handleOrderTypeChange(); // Garante que os campos de entrega/retirada estejam corretos
        });
    }

    // Adiciona event listeners para todos os botões de fechar modal (AJUSTADO: remove a busca pelo data-modal, usa closest)
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const modalElement = button.closest('.modal'); // Encontra o modal pai do botão
            if (modalElement) {
                closeModal(modalElement);
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


    // NOVO: Event listener para o select de tipo de pedido
    if (orderTypeSelect) {
        orderTypeSelect.addEventListener('change', handleOrderTypeChange);
    }


    // Event listener para abrir o modal do chat
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            openModal(chatModal);
            if (!chatbox.dataset.initialMessageShown) {
                const currentDayName = getWeekdayName(new Date().getDay());
                // Verifica se chatbotKnowledgeBase está definida antes de usar
                if (typeof chatbotKnowledgeBase !== 'undefined') {
                    chatbotKnowledgeBase["ola"] = `👋 Olá! Feliz ${currentDayName}! Como posso ajudar você hoje? 😊\n\nVocê pode perguntar sobre:\n- 🍔 Nossos **Espetos**\n- 🍛 As **Jantinhas**\n- 🥤 **Bebidas** (Cervejas, Refrigerantes, Sucos)\n- 🍟 **Porções** e **Pastéis**\n- 🍰 **Doces** e **Drinks**\n- ⏰ Nossos **Horários** de funcionamento\n- 🛵 **Entrega**\n- 📞 **Contato**\n\nOu qualquer outra dúvida sobre o cardápio! 😉`;
                    chatbotKnowledgeBase["oi"] = chatbotKnowledgeBase["ola"];
                }
                const initialBotMessage = typeof chatbotKnowledgeBase !== 'undefined' ? chatbotKnowledgeBase["ola"] : "Olá! Como posso ajudar você hoje?";
                addMessage(initialBotMessage, 'bot');
                chatbox.dataset.initialMessageShown = 'true';
            }
        });
    }

    // Event listener para fechar o modal do chat
    if (closeChatModalBtn) {
        closeChatModalBtn.addEventListener('click', () => {
            closeModal(chatModal);
            chatbox.innerHTML = '';
            delete chatbox.dataset.initialMessageShown;
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
    renderMenu(); // Renderiza o cardápio inicial (e chama setupImageModalEventListeners() dentro dela)
    updateCartDisplay(); // Garante que o contador do carrinho e o display estejam corretos ao carregar a página
    handleOrderTypeChange(); // Chama ao carregar para definir o estado inicial (Entrega) ou Retirada.
});