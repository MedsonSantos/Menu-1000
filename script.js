document.addEventListener('DOMContentLoaded', function() {

    // Carrinho de compras. Cada item pode ser:
    // - Jantinha Completa: { id: 'pp-1', espeto: 'Carne', feijao: 'Tropeiro', quantity: 1 }
    // - Jantinha Nota 1000: { id: 'pp-2', espeto: 'Carne', feijao: 'Tropeiro', quantity: 1 }
    // - Jantinha sem Espeto: { id: 'pp-3', feijao: 'Tropeiro', quantity: 1 }
    // - Outros produtos: { id: 'produto_id', quantity: X }
    let cart = [];

    // --- Elementos do DOM ---
    const body = document.body;
    const searchInput = document.getElementById('searchInput'); // Elemento da barra de pesquisa
    const searchButton = document.getElementById('searchButton'); // Botão de pesquisa (se houver)
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
    const pickupNameInput = document = document.getElementById('pickup-name');
    const deliveryFeeInfo = document.getElementById('delivery-fee-info');
    const notesTextarea = document.getElementById('notes');

    // Botões de rolagem do carrinho
    const scrollUpBtn = document.getElementById('scroll-up-btn');
    const scrollDownBtn = document.getElementById('scroll-down-btn');

    // Elementos do Modal de Informações
    const infoModal = document.getElementById('info-modal');
    const infoToggleContainer = document.getElementById('info-toggle-container');

    // Elementos do Modal de Fotos (em grade, como "Em Breve")
    const photosModal = document.getElementById('photos-modal');
    const modalPhotosGrid = document.getElementById('modal-photos-grid');

    // Elemento para o modal de imagem grande (para clique nas miniaturas)
    const imageModal = document.getElementById('image-modal'); // Certifique-se de ter este modal no HTML
    const modalImage = imageModal ? imageModal.querySelector('img') : null; // A imagem dentro do modal
    const closeImageModalBtn = imageModal ? imageModal.querySelector('.close-button') : null; // Botão de fechar do modal de imagem grande


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


    // --- Variáveis de Dados (assumindo que vêm de cardapio.js e knowledgeBase.js) ---
    // Certifique-se de que 'products', 'categoriesData', 'chatbotKnowledgeBase',
    // 'photos', 'DEFAULT_LOTTIE_JSON', 'DEFAULT_CATEGORY_IMAGE', 'DEFAULT_PLACEHOLDER_IMAGE'
    // estão definidos em 'cardapio.js' e 'knowledgeBase.js' e são globais ou importados.
    // A variável 'photos' agora é esperada para vir do seu cardapio.js como um array de strings.


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
        } else if (event.target === imageModal) {
            closeModal(imageModal);
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

    // Lógica Principal do Chatbot
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase().trim();

        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

        // 1. Verificar se é Segunda-feira (Dia de Fechamento)
        if (dayOfWeek === 1) { // Se for segunda-feira
            return "😔 Olá! Infelizmente, estamos fechados às segundas-feiras. Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 00:00h. Te esperamos a partir de amanhã! 😉";
        }

        // 3. Se não for Segunda-feira, verificar as palavras-chave na base de conhecimento
        if (typeof chatbotKnowledgeBase !== 'undefined') {
            for (const keyword in chatbotKnowledgeBase) {
                if (userMessage.includes(keyword)) {
                    return chatbotKnowledgeBase[keyword];
                }
            }
        }

        // 4. Se nenhuma palavra-chave for encontrada e não for segunda, retornar mensagem genérica
        return "Desculpe, não entendi sua pergunta. Poderia reformular ou perguntar sobre o cardápio, entrega, horários, etc.?";
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
                    itemDetails += `     - Espeto: ${espeto}\n`;
                }

                const feijao = cartItem.feijao || 'Não selecionado';
                if (feijao === 'Não selecionado') {
                    alert(`Por favor, selecione o tipo de feijão para a "${product.name}" (Item #${index + 1} no carrinho).`);
                    validationFailed = true;
                    return;
                }
                itemDetails += `     - Feijão: ${feijao}\n`;
                itemDetails += `     - Preço: R$ ${itemPrice.toFixed(2).replace('.', ',')}\n\n`;

                message += itemDetails;

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
            message += `***Endereço de Entrega:***\n${deliveryAddress}\n`;
            const encodedDeliveryAddress = encodeURIComponent(deliveryAddress);
            // Corrigido o link do Google Maps para ser funcional no WhatsApp
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedDeliveryAddress}`; // URL mais genérica e robusta
            message += `[Ver no Mapa](${googleMapsUrl})\n`;
        } else {
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

    /**
     * Renderiza as fotos dentro do modal de fotos.
     * Agora usa a variável 'photos' que vem do cardapio.js.
     */
    function renderPhotosInModal() {
        // Verifica se modalPhotosGrid e 'photos' existem e se 'photos' é um array
        if (!modalPhotosGrid || typeof photos === 'undefined' || !Array.isArray(photos)) {
            console.warn("'photos' não está definida ou não é um array. Não foi possível renderizar fotos.");
            modalPhotosGrid.innerHTML = '<p>Nenhuma foto disponível no momento.</p>';
            return;
        }

        modalPhotosGrid.innerHTML = ''; // Limpa antes de adicionar

        if (photos.length === 0) {
            modalPhotosGrid.innerHTML = '<p>Nenhuma foto disponível no momento.</p>';
            return;
        }

        photos.forEach(photoUrl => { // Iteramos diretamente sobre a URL da foto
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('photo-item-modal');

            const img = document.createElement('img');
            img.src = photoUrl; // A URL da foto
            img.alt = 'Foto da Jantinha Nota 1000'; // Um alt genérico, já que não temos um específico no array


            imgContainer.appendChild(img);
            modalPhotosGrid.appendChild(imgContainer);
        });

        // Adiciona event listeners para abrir a imagem grande ao clicar nas miniaturas
        modalPhotosGrid.querySelectorAll('.modal-thumbnail').forEach(thumbnail => {
            thumbnail.removeEventListener('click', openLargeImageModal); // Evita duplicação
            thumbnail.addEventListener('click', openLargeImageModal);
        });
    }

    // Função para abrir o modal de imagem grande
    function openLargeImageModal(event) {
        if (modalImage && imageModal && event.target.tagName === 'IMG') {
            modalImage.src = event.target.src;
            modalImage.alt = event.target.alt;
            openModal(imageModal);
        }
    }

    /**
     * NOVO: Função para filtrar produtos.
     * @param {string} query - O termo de pesquisa.
     * @returns {Array} - Um array de produtos filtrados.
     */
    function filterProducts(query) {
        if (!query) {
            return products; // Se a query estiver vazia, retorna todos os produtos
        }
        const lowerCaseQuery = query.toLowerCase().trim();
        return products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            (product.description && product.description.toLowerCase().includes(lowerCaseQuery)) ||
            (product.category && product.category.toLowerCase().includes(lowerCaseQuery))
        );
    }


    /**
     * Modificada: A função renderMenu agora aceita um array de produtos para renderizar.
     * Isso permite que ela seja usada tanto para exibir todos os produtos quanto para exibir resultados de pesquisa.
     * @param {Array} productsToRender - O array de produtos a serem exibidos.
     */
    function renderMenu(productsToRender = products) { // Define products como padrão
        if (!menuSections || !categoryNavigation || typeof products === 'undefined' || typeof categoriesData === 'undefined') return;

        menuSections.innerHTML = '';
        // Manter categoryNavigation para os botões de categoria fixos, mas podemos limpá-lo e recriá-lo se a navegação precisar reagir à pesquisa.
        // Por enquanto, vamos re-criar os botões de categoria, mas o filtro será aplicado ao conteúdo principal.
        categoryNavigation.innerHTML = ''; // Limpa antes de adicionar os botões de navegação

        // Adicionar o botão "Todos" para exibir todos os produtos
        const allButton = document.createElement('button');
        allButton.classList.add('category-button');
        allButton.textContent = '🏠 Todos';
        allButton.addEventListener('click', () => {
            renderMenu(products); // Renderiza todos os produtos
            searchInput.value = ''; // Limpa a barra de pesquisa
            // Remove a classe 'active' de todos os botões de categoria e adiciona no "Todos"
            categoryNavigation.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
            allButton.classList.add('active');
        });
        categoryNavigation.appendChild(allButton);

        // Define o botão "Todos" como ativo por padrão na primeira renderização
        if (productsToRender === products) {
            allButton.classList.add('active');
        }


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
                // Remove a seleção de outras categorias
                categoryNavigation.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
                event.currentTarget.classList.add('active'); // Marca a categoria clicada como ativa
                searchInput.value = ''; // Limpa a barra de pesquisa ao selecionar uma categoria

                const targetType = event.currentTarget.dataset.type;
                if (targetType === 'category') {
                    const targetCategoryName = item.name;
                    const productsInCategory = products.filter(p => p.category === targetCategoryName);
                    renderMenu(productsInCategory); // Renderiza apenas produtos da categoria selecionada
                } else if (targetType === 'link') {
                    const url = event.currentTarget.dataset.url;
                    window.open(url, '_blank');
                } else if (targetType === 'modal') {
                    const targetModalId = event.currentTarget.dataset.targetModalId;
                    const targetModal = document.getElementById(targetModalId);
                    if (targetModal) {
                        openModal(targetModal);
                        if (targetModalId === 'photos-modal') {
                            renderPhotosInModal();
                        }
                    }
                }
            });
            categoryNavigation.appendChild(categoryButton);
        });

        // Agora, crie as seções do menu com base nos `productsToRender`
        const categoriesInDisplay = productsToRender.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});

        for (const categoryName in categoriesInDisplay) {
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

            categoriesInDisplay[categoryName].forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.dataset.id = product.id;

                const imageUrlToUse = (product.imageUrl && !product.imageUrl.includes('link_da_sua_imagem_')) ? product.imageUrl : (typeof DEFAULT_PLACEHOLDER_IMAGE !== 'undefined' ? DEFAULT_PLACEHOLDER_IMAGE : 'https://via.placeholder.com/100x100?text=Sem+Foto');

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
        setupProductEventListeners(); // Re-adiciona listeners para os novos botões "Adicionar"
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
                const currentDayName = getWeekdayName(new Date().getDay());
                if (typeof chatbotKnowledgeBase !== 'undefined') {
                    // Atualiza a resposta inicial do chatbot com o dia da semana
                    chatbotKnowledgeBase["ola"] = `👋 Olá! Feliz ${currentDayName}! Como posso ajudar você hoje? 😊\n\nVocê pode perguntar sobre:\n- 🍔 Nossos **Espetos**\n- 🍛 As **Jantinhas**\n- 🥤 **Bebidas**\n- 🍟 **Porções** e **Pastéis**\n- 🍰 **Doces** e **Drinks**\n- ⏰ Nossos **Horários** de funcionamento\n- 🛵 **Entrega**\n- 📞 **Contato**\n\nOu qualquer outra dúvida sobre o cardápio! 😉`;
                    chatbotKnowledgeBase["oi"] = chatbotKnowledgeBase["ola"]; // 'oi' também usa a mesma mensagem
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

    // NOVO: Event listener para a barra de pesquisa
    if (searchInput) {
        searchInput.addEventListener('input', (event) => { // 'input' é melhor que 'keyup' para capturar mudanças ao colar, etc.
            const query = event.target.value;
            const filteredProducts = filterProducts(query);
            renderMenu(filteredProducts); // Renderiza o menu com os produtos filtrados

            // Se houver pesquisa, desativar o botão "Todos" e os botões de categoria
            if (query) {
                categoryNavigation.querySelectorAll('.category-button.active').forEach(btn => btn.classList.remove('active'));
            } else {
                // Se a pesquisa for limpa, reativar o botão "Todos"
                const allButton = categoryNavigation.querySelector('.category-button:first-child');
                if (allButton) {
                    allButton.classList.add('active');
                }
            }
        });

        // Opcional: listener para o botão de pesquisa, se você quiser um.
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                const query = searchInput.value;
                const filteredProducts = filterProducts(query);
                renderMenu(filteredProducts);
            });
        }
    }


    // --- Inicializações ao carregar o DOM ---
    initializeTheme(); // Aplica o tema salvo ao carregar a página
    renderMenu(); // Renderiza o cardápio inicial (agora com a lógica de pesquisa integrada, exibindo todos por padrão)
    updateCartDisplay(); // Garante que o contador do carrinho e o display estejam corretos ao carregar a página
    handleOrderTypeChange(); // Chama ao carregar para definir o estado inicial (Entrega) ou Retirada.
});