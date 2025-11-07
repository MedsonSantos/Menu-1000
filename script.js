document.addEventListener('DOMContentLoaded', function() {

    // --- Variáveis de Configuração (Devem vir antes de qualquer função que as utilize) ---
    const operatingHours = {
        openTime: '18:30', // Horário de abertura (HH:MM)
        closeTime: '23:30', // Horário de fechamento (HH:MM)
        closedDay: 1 // Dia de fechamento (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    };

    // Carrinho de compras. Cada item pode ser:
    // - Jantinha Completa: { id: 'pp-1', espeto: 'Carne', feijao: 'Tropeiro', salada: 'Vinagrete', quantity: 1 }
    // - Jantinha Nota 1000: { id: 'pp-2', espeto: 'Carne', feijao: 'Tropeiro', salada: 'Vinagrete', quantity: 1 }
    // - Jantinha sem Espeto: { id: 'pp-3', feijao: 'Tropeiro', salada: 'Vinagrete', quantity: 1 }
    // - Outros produtos: { id: 'produto_id', quantity: X }
    let cart = [];

    // - Elementos do DOM -
    const body = document.body;
    const menuSections = document.getElementById('menu-sections');
    const categoryNavigation = document.getElementById('category-navigation');

    // Elementos do Carrinho
    const cartIconContainer = document.getElementById('cart-icon-container');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsModal = document.getElementById('cart-items-modal'); // Container para os itens do carrinho no modal
    const cartTotalModal = document.getElementById('cart-total-modal');
    const checkoutWhatsappModalBtn = document.getElementById('checkout-whatsapp-modal');

    // Elementos para detalhes do pedido (entrega ou retirada)
    const orderTypeSelect = document.getElementById('order-type');
    const deliveryOptions = document.getElementById('delivery-options');
    const pickupOptions = document.getElementById('pickup-options');
    const deliveryAddressInput = document.getElementById('delivery-address');
    const pickupNameInput = document.getElementById('pickup-name');
    const notesTextarea = document.getElementById('notes');
    const orderDetailsContainer = document.getElementById('order-details-container'); // Container para os campos de detalhes

    // Elementos do Resumo do Pedido
    const summaryModal = document.getElementById('summary-modal');
    const summaryContentDiv = document.getElementById('summary-content');
    const sendOrderBtn = document.getElementById('send-order-btn');

    // Botões de rolagem do carrinho
    const scrollUpBtn = document.getElementById('scroll-up-btn');
    const scrollDownBtn = document.getElementById('scroll-down-btn');

    // Elementos do Modal de Informações
    const infoModal = document.getElementById('info-modal');
    const infoToggleContainer = document.getElementById('info-toggle-container');

    // Elementos do Modal de Fotos (AJUSTADOS PARA O CARROSSEL)
    const photosModal = document.getElementById('photos-modal');
    const carouselTrackPhotos = document.getElementById('carousel-track-photos');
    const prevPhotoBtn = document.getElementById('prev-photo-btn');
    const nextPhotoBtn = document.getElementById('next-photo-btn');
    let currentSlideIndex = 0;
    let photoSlides = [];

    // Elementos do Modal de Reserva (NOVO)
    const reservationModal = document.getElementById('reservation-modal');
    const reservationIcon = document.getElementById('reservation-icon');
    const sendReservationWhatsappBtn = document.getElementById('send-reservation-whatsapp');

    // Elementos do Botão de Rolagem do Carrinho (JÁ EXISTENTES)
    const cartItemsScrollContainer = document.getElementById('cart-items-scroll-container'); // Container para rolagem

    // Elementos do Chatbot
    const openChatBtn = document.getElementById('openChatBtn');
    const chatModal = document.getElementById('chatModal');
    const closeChatModalBtn = document.getElementById('closeChatModalBtn'); // Botão de fechar dentro do modal
    const chatbox = document.getElementById('chatbox');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    // Elementos de Status de Funcionamento
    const statusFuncionamentoMainElement = document.getElementById('status-funcionamento-main');

    // - Funções de Carrinho -
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
            newItem.salada = '';
        } else if (productId === 'pp-3') {
            newItem.feijao = '';
            newItem.salada = '';
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

    /**
     * Atualiza a exibição do carrinho no modal e no ícone.
     */
    function updateCartDisplay() {
        if (!cartItemsModal || !cartTotalModal) return;

        cartItemsModal.innerHTML = '';

        let total = 0;
        let itemCount = 0; // Contador de itens (quantidade total)

        if (cart.length === 0) {
            cartItemsModal.innerHTML = '<p>❌Nenhum item no carrinho.</p>';
            if (orderDetailsContainer) {
                orderDetailsContainer.style.display = 'none'; // Esconde detalhes do pedido se carrinho vazio
            }
            // Oculta o botão de checkout do WhatsApp se o carrinho estiver vazio
            if (checkoutWhatsappModalBtn) {
                checkoutWhatsappModalBtn.style.display = 'none';
            }
        } else {
            if (orderDetailsContainer) {
                orderDetailsContainer.style.display = 'block'; // Mostra detalhes do pedido se carrinho não vazio
            }
            // Mostra o botão de checkout do WhatsApp se o carrinho tiver itens
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
                itemCount += cartItem.quantity; // Adiciona quantidade do item ao contador total

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');

                // Botão de Remoção
                const removeButton = document.createElement('button');
                removeButton.textContent = '🗑️';
                removeButton.className = 'remove-item-btn';
                removeButton.onclick = () => removeItemFromCart(index);
                cartItemDiv.appendChild(removeButton);

                // Detalhes do Item
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'cart-item-details';
                detailsDiv.innerHTML = `
                    <span class="cart-item-name">${cartItem.quantity}x ${product.name}</span>
                    <span class="cart-item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                `;
                cartItemDiv.appendChild(detailsDiv);

                // Opções Personalizadas (Espeto, Feijão, Salada)
                let optionsHtml = '';

                if (['pp-1', 'pp-2', 'pp-3'].includes(product.id)) {
                    optionsHtml += `<div class="input-group-inline"><label for="espeto-${index}">Espeto:</label><select id="espeto-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="espeto"><option value="" disabled ${cartItem.espeto === '' ? 'selected' : ''}>Selecione</option><option value="CONTRA FILÉ" ${cartItem.espeto === 'CONTRA FILÉ' ? 'selected' : ''}>CONTRA FILÉ</option><option value="FRANGO COM BACON" ${cartItem.espeto === 'FRANGO COM BACON' ? 'selected' : ''}>FRANGO COM BACON</option><option value="FRANGO SEM BACON" ${cartItem.espeto === 'FRANGO SEM BACON' ? 'selected' : ''}>FRANGO SEM BACON</option><option value="ASINHA" ${cartItem.espeto === 'ASINHA' ? 'selected' : ''}>ASINHA</option><option value="COXINHA DA ASA" ${cartItem.espeto === 'COXINHA DA ASA' ? 'selected' : ''}>COXINHA DA ASA</option><option value="CORAÇÃO" ${cartItem.espeto === 'CORAÇÃO' ? 'selected' : ''}>CORAÇÃO</option><option value="CUPIM GRILL" ${cartItem.espeto === 'CUPIM GRILL' ? 'selected' : ''}>CUPIM GRILL</option><option value="PICANHA MONTADA" ${cartItem.espeto === 'PICANHA MONTADA' ? 'selected' : ''}>PICANHA MONTADA</option><option value="LINGUIÇA CAIPIRA" ${cartItem.espeto === 'LINGUIÇA CAIPIRA' ? 'selected' : ''}>LINGUIÇA CAIPIRA</option><option value="LINGUIÇA C. APIMENTADA" ${cartItem.espeto === 'LINGUIÇA C. APIMENTADA' ? 'selected' : ''}>LINGUIÇA C. APIMENTADA</option></select></div>`;

                    optionsHtml += `<div class="input-group-inline"><label for="feijao-${index}">Feijão:</label><select id="feijao-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="feijao"><option value="" disabled ${cartItem.feijao === '' ? 'selected' : ''}>Selecione</option><option value="Tropeiro" ${cartItem.feijao === 'Tropeiro' ? 'selected' : ''}>Tropeiro</option><option value="Caldo" ${cartItem.feijao === 'Caldo' ? 'selected' : ''}>Caldo</option></select></div>`;

                    optionsHtml += `<div class="input-group-inline"><label for="salada-${index}">Salada:</label><select id="salada-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="salada"><option value="" disabled ${cartItem.salada === '' ? 'selected' : ''}>Selecione</option><option value="Salada de macarrão" ${cartItem.salada === 'Salada de macarrão' ? 'selected' : ''}>Salada de macarrão</option><option value="Vinagrete" ${cartItem.salada === 'Vinagrete' ? 'selected' : ''}>Vinagrete</option><option value="Alface com tomate" ${cartItem.salada === 'Alface com tomate' ? 'selected' : ''}>Alface com tomate</option></select></div>`;
                }

                // Opções para Caldos
                if (['cald-1', 'cald-2', 'cald-3'].includes(product.id)) {
                    let acompanhamentoOptions = '';
                    let selectLabel = 'Acompanha:';

                    switch (product.id) {
                        case 'cald-1': // Caldo de Feijão
                            acompanhamentoOptions = `<option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ? 'selected' : ''}>Sem mistura</option><option value="Feijão com Costela" ${cartItem.acompanhamento === 'Feijão com Costela' ? 'selected' : ''}>Feijão com Costela</option><option value="Feijão com Frango" ${cartItem.acompanhamento === 'Feijão com Frango' ? 'selected' : ''}>Feijão com Frango</option>`;
                            break;
                        case 'cald-2': // Caldo de Frango
                            acompanhamentoOptions = `<option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ? 'selected' : ''}>Sem mistura</option><option value="Frango com Feijão" ${cartItem.acompanhamento === 'Frango com Feijão' ? 'selected' : ''}>Frango com Feijão</option><option value="Frango com Costela" ${cartItem.acompanhamento === 'Frango com Costela' ? 'selected' : ''}>Frango com Costela</option>`;
                            break;
                        case 'cald-3': // Caldo de Costela
                            acompanhamentoOptions = `<option value="Sem mistura" ${cartItem.acompanhamento === 'Sem mistura' ? 'selected' : ''}>Sem mistura</option><option value="Costela com Feijão" ${cartItem.acompanhamento === 'Costela com Feijão' ? 'selected' : ''}>Costela com Feijão</option><option value="Costela com Frango" ${cartItem.acompanhamento === 'Costela com Frango' ? 'selected' : ''}>Costela com Frango</option>`;
                            break;
                    }
                    optionsHtml += `<div class="input-group-inline"><label for="acompanhamento-${index}">${selectLabel}</label><select id="acompanhamento-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="acompanhamento">${acompanhamentoOptions}</select></div>`;
                }

                if (optionsHtml) {
                    const optionsDiv = document.createElement('div');
                    optionsDiv.className = 'order-options';
                    optionsDiv.innerHTML = optionsHtml;
                    cartItemDiv.appendChild(optionsDiv);

                    // Adiciona event listeners para os selects
                    const selects = optionsDiv.querySelectorAll('select');
                    selects.forEach(select => {
                        select.addEventListener('change', function() {
                            const cartIndex = parseInt(this.dataset.cartIndex);
                            const optionType = this.dataset.optionType;
                            const optionValue = this.value;
                            if (cart[cartIndex]) {
                                cart[cartIndex][optionType] = optionValue;
                                updateCartDisplay(); // Atualiza o total e o resumo se necessário
                            }
                        });
                    });
                }

                cartItemsModal.appendChild(cartItemDiv);
            });
        }

        cartTotalModal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartCount.textContent = itemCount; // Atualiza o contador com o número total de itens
    }

    function flashCartIcon() {
        if (cartIconContainer) {
            cartIconContainer.classList.add('flash');
            setTimeout(() => {
                cartIconContainer.classList.remove('flash');
            }, 800);
        }
    }

    // - Funções para Modais -
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // - Função para lidar com a mudança no tipo de pedido (entrega/retirada) -
    function handleOrderTypeChange() {
        if (!orderTypeSelect || !deliveryOptions || !pickupOptions || !orderDetailsContainer) return;

        const type = orderTypeSelect.value;
        if (type === 'delivery') {
            deliveryOptions.style.display = 'block';
            pickupOptions.style.display = 'none';
        } else if (type === 'pickup') {
            deliveryOptions.style.display = 'none';
            pickupOptions.style.display = 'block';
        }
        // Mostra o container de detalhes quando o tipo é selecionado, mas só se houver itens no carrinho
        // (Esta lógica pode ser ajustada se for sempre mostrado após selecionar o tipo)
        // orderDetailsContainer.style.display = 'block';
    }

    // - Funções para o Resumo do Pedido e WhatsApp -
    function showOrderSummary() {
        // --- COLETA DADOS DO MODAL DO CARRINHO ---
        const orderType = orderTypeSelect.value;
        const deliveryAddress = deliveryAddressInput.value.trim();
        const pickupName = pickupNameInput.value.trim();
        const notes = notesTextarea.value.trim();

        // Validação dos campos obrigatórios de entrega/retirada
        if (orderType === 'delivery' && !deliveryAddress) {
            alert('Por favor, digite o endereço de entrega para prosseguir.');
            return null;
        }
        if (orderType === 'pickup' && !pickupName) {
            alert('Por favor, digite o nome para retirada para prosseguir.');
            return null;
        }
        // --- FIM DA COLETA ---

        let whatsappMessage = `*Boa noite!! Novo Pedido*`;
        let htmlSummary = `<div class="summary-section"><h3>Detalhes do Pedido</h3><p><strong>Tipo:</strong> ${orderType === 'delivery' ? 'Entrega 🏍️' : 'Retirada no Local 📦'}</p>${orderType === 'delivery' ? `<p><strong>Endereço:</strong> ${deliveryAddress}</p>` : `<p><strong>Nome Retirada:</strong> ${pickupName}</p>`}${notes ? `<p><strong>Observações:</strong> ${notes}</p>` : ''}</div><div class="summary-section"><h3>Itens</h3><ul class="summary-items-list">`;

        let total = 0;
        let validationFailed = false;

        cart.forEach((cartItem, index) => {
            const product = products.find(p => p.id === cartItem.id);
            if (!product) {
                 console.warn(`Produto com ID ${cartItem.id} não encontrado para resumo.`);
                 return; // Pula este item se não for encontrado
            }

            const itemTotal = product.price * cartItem.quantity;
            total += itemTotal;

            // Validação de opções personalizadas
            if (['pp-1', 'pp-2', 'pp-3'].includes(cartItem.id)) {
                if (!cartItem.espeto && cartItem.id !== 'pp-3') { // pp-3 não precisa de espeto
                    alert(`Por favor, selecione o espeto para a ${product.name} (Item #${index + 1}) antes de finalizar.`);
                    validationFailed = true;
                    return; // Sai do loop forEach para parar a validação
                }
                if (!cartItem.feijao) {
                    alert(`Por favor, selecione o feijão para a ${product.name} (Item #${index + 1}) antes de finalizar.`);
                    validationFailed = true;
                    return;
                }
                 if (!cartItem.salada) { // ✅ ADIÇÃO: Validação para salada
                    alert(`Por favor, selecione a salada para a ${product.name} (Item #${index + 1}) antes de finalizar.`);
                    validationFailed = true;
                    return;
                }
            }

             // Validação para caldos
             if (['cald-1', 'cald-2', 'cald-3'].includes(cartItem.id)) {
                if (!cartItem.acompanhamento) {
                    alert(`Por favor, selecione o acompanhamento para o ${product.name} (Item #${index + 1}) antes de finalizar.`);
                    validationFailed = true;
                    return;
                }
            }

            // Adiciona item à mensagem do WhatsApp
            whatsappMessage += `\n\n*${cartItem.quantity}x ${product.name}* - R$ ${itemTotal.toFixed(2).replace('.', ',')}`;
            if (cartItem.espeto) whatsappMessage += `\n- Espeto: ${cartItem.espeto}`;
            if (cartItem.feijao) whatsappMessage += `\n- Feijão: ${cartItem.feijao}`;
            if (cartItem.salada) whatsappMessage += `\n- Salada: ${cartItem.salada}`; // ✅ ADIÇÃO: Adiciona salada à mensagem
            if (cartItem.acompanhamento) whatsappMessage += `\n- Acompanhamento: ${cartItem.acompanhamento}`; // ✅ ADIÇÃO: Adiciona acompanhamento à mensagem
            if (notes) whatsappMessage += `\n- Obs: ${notes}`;

            // Adiciona item ao resumo HTML
            htmlSummary += `<li><strong>${cartItem.quantity}x ${product.name}</strong> - R$ ${itemTotal.toFixed(2).replace('.', ',')}`;
            const optionsList = [];
            if (cartItem.espeto) optionsList.push(`Espeto: ${cartItem.espeto}`);
            if (cartItem.feijao) optionsList.push(`Feijão: ${cartItem.feijao}`);
            if (cartItem.salada) optionsList.push(`Salada: ${cartItem.salada}`); // ✅ ADIÇÃO: Adiciona salada ao resumo HTML
            if (cartItem.acompanhamento) optionsList.push(`Acompanhamento: ${cartItem.acompanhamento}`); // ✅ ADIÇÃO: Adiciona acompanhamento ao resumo HTML
            if (optionsList.length > 0) {
                htmlSummary += `<ul class="item-options-list">`;
                optionsList.forEach(opt => {
                    htmlSummary += `<li>${opt}</li>`;
                });
                htmlSummary += `</ul>`;
            }
            htmlSummary += `</li>`;
        });

        if (validationFailed) {
            return; // Interrompe se houver erro de validação
        }

        if (cart.length === 0) {
            alert("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
            return;
        }

        // Adiciona total à mensagem do WhatsApp
        whatsappMessage += `\n\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

        // Adiciona total ao resumo HTML
        htmlSummary += `</ul><div class="final-total">Total: R$ ${total.toFixed(2).replace('.', ',')}</div>`;

        // --- FIM DA GERAÇÃO DA MENSAGEM ---
        // Fecha o carrinho e abre o resumo
        if (!sendOrderBtn) {
            console.error("Erro no Script: Botão de envio final (ID 'send-order-btn') não encontrado no HTML.");
            alert("Erro ao preparar o pedido. Por favor, verifique o HTML para garantir que o botão com ID 'send-order-btn' exista.");
            return;
        }

        // Armazena a mensagem final no botão de envio para uso posterior
        sendOrderBtn.dataset.whatsappMessage = whatsappMessage;
        sendOrderBtn.dataset.whatsappNumber = '5562992020331'; // Seu número
        summaryContentDiv.innerHTML = htmlSummary;
        closeModal(cartModal);
        openModal(summaryModal);
    }

    function sendOrderToWhatsApp() {
        const whatsappNumber = sendOrderBtn.dataset.whatsappNumber;
        const message = sendOrderBtn.dataset.whatsappMessage;

        if (!whatsappNumber || !message) {
            // Não deve acontecer, pois o botão deve estar desabilitado/oculto
            console.error("Erro: Número ou mensagem do WhatsApp não encontrados no botão.");
            return null;
        }

        const encodedMessage = encodeURIComponent(message);
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

    // - Funções de Renderização do Menu e Fotos -
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

    // =========================================================
    // NOVO CÓDIGO DO CARROSSEL DE FOTOS - INÍCIO
    // =========================================================
    /**
     * Renderiza as fotos dentro do modal de fotos como um carrossel.
     */
    function renderPhotosInModal() {
        if (!carouselTrackPhotos || typeof photos === 'undefined' || !Array.isArray(photos)) {
            console.error("Erro no Script: Elementos ou dados de fotos para o carrossel não encontrados.");
            return;
        }

        carouselTrackPhotos.innerHTML = '';
        photoSlides = [];

        photos.forEach(photoUrl => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';

            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = "Foto do Estabelecimento";
            img.loading = 'lazy';

            slide.appendChild(img);
            carouselTrackPhotos.appendChild(slide);
            photoSlides.push(slide);
        });

        updateCarouselButtons();
    }

    function updateCarouselButtons() {
        if (prevPhotoBtn && nextPhotoBtn && photoSlides.length > 0) {
            prevPhotoBtn.disabled = currentSlideIndex === 0;
            nextPhotoBtn.disabled = currentSlideIndex === photoSlides.length - 1;
        }
    }

    function goToSlide(index) {
        if (index >= 0 && index < photoSlides.length) {
            const offset = -index * 100;
            carouselTrackPhotos.style.transform = `translateX(${offset}%)`;
            if (index !== currentSlideIndex) {
                currentSlideIndex = index;
                updateCarouselButtons();
            }
        }
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

            const lottieJsonUrlToUse = item.lottieJsonUrl ||
            (typeof DEFAULT_LOTTIE_JSON !== 'undefined' ? DEFAULT_LOTTIE_JSON : '');
            const imageUrlToUseForFallback = item.imageUrl ||
            (typeof DEFAULT_CATEGORY_IMAGE !== 'undefined' ? DEFAULT_CATEGORY_IMAGE : '');

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
                        if (targetModalId === 'photos-modal') {
                            renderPhotosInModal();
                        }
                    }
                }
            });
            categoryNavigation.appendChild(categoryButton);
        });

        for (const categoryName in categories) {
            const categoryDataEntry = categoriesData.find(cat => cat.name === categoryName && cat.type === 'category');
            if (!categoryDataEntry) continue;

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

    }

    // - Função para renderizar os cards de produtos com botão "Ler Mais" (NOVO) -
    function renderProductCards(categoryName, products) {
        const section = document.createElement('section');
        section.className = 'category';
        section.id = normalizeCategoryName(categoryName); // Cria um ID baseado no nome da categoria

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = categoryName;
        section.appendChild(categoryTitle);

        const productsGrid = document.createElement('div');
        productsGrid.className = 'products-grid';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            // Criar a imagem do produto
            const img = document.createElement('img');
            img.src = product.imageUrl || DEFAULT_PLACEHOLDER_IMAGE;
            img.alt = product.name;
            img.loading = 'lazy'; // Para melhor desempenho
            productCard.appendChild(img);

            // Criar o título do produto
            const title = document.createElement('h3');
            title.textContent = product.name;
            productCard.appendChild(title);

            // Criar a descrição do produto
            const descriptionContainer = document.createElement('div');
            descriptionContainer.className = 'description-container';

            const descriptionText = document.createElement('p');
            descriptionText.className = 'product-description';
            descriptionText.innerHTML = product.description; // Usando innerHTML para manter as quebras de linha (<br>)
            descriptionContainer.appendChild(descriptionText);

            // Criar o botão "Ler Mais"
            const readMoreButton = document.createElement('button');
            readMoreButton.className = 'read-more-button';
            readMoreButton.textContent = 'Ler Mais';
            readMoreButton.addEventListener('click', function() {
                if (descriptionText.classList.contains('expanded')) {
                    descriptionText.classList.remove('expanded');
                    readMoreButton.textContent = 'Ler Mais';
                } else {
                    descriptionText.classList.add('expanded');
                    readMoreButton.textContent = 'Ler Menos';
                }
            });

            descriptionContainer.appendChild(readMoreButton);
            productCard.appendChild(descriptionContainer);

            // Criar o preço do produto
            const price = document.createElement('div');
            price.className = 'price';
            price.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
            productCard.appendChild(price);

            // Criar o botão "Adicionar ao Carrinho"
            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart';
            addToCartBtn.textContent = 'Adicionar ➕';
            addToCartBtn.dataset.id = product.id; // Armazena o ID do produto no botão
            productCard.appendChild(addToCartBtn);

            productsGrid.appendChild(productCard);
        });

        section.appendChild(productsGrid);
        return section;
    }

    // - Funções para Tema -
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.classList.toggle('dark-theme', savedTheme === 'dark');
        body.classList.toggle('light-theme', savedTheme === 'light');
        updateThemeIcon(savedTheme);
    }

    function toggleTheme() {
        const isDark = body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        body.className = ''; // Remove todas as classes de tema
        body.classList.add(`${newTheme}-theme`);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    function updateThemeIcon(theme) {
        const iconElement = document.getElementById('theme-toggle-icon');
        if (iconElement) {
            iconElement.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // - Funções para Status de Funcionamento -
    function getStoreStatus() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentMinutes = currentHour * 60 + currentMinute; // Minutos totais do dia

        const openTime = operatingHours.openTime.split(':').map(Number);
        const closeTime = operatingHours.closeTime.split(':').map(Number);
        const openMinutes = openTime[0] * 60 + openTime[1];
        const closeMinutes = closeTime[0] * 60 + closeTime[1];

        // 1. Verifica se é o dia de fechamento (ex: Segunda-feira)
        if (dayOfWeek === operatingHours.closedDay) {
            return 'CLOSED_DAY'; // Estamos fechados hoje
        }

        // 2. Verifica se a hora atual está DENTRO do horário de funcionamento (mas não é dia de fechamento)
        if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
            return 'OPEN'; // Estamos abertos
        }

        // 3. Verifica se a hora atual está ANTES do horário de abertura (mas em um dia de funcionamento)
        if (currentMinutes < openMinutes) {
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
                statusFuncionamentoMainElement.textContent = "❌ Olá! Já passamos do horário de funcionamento. Volte amanhã!";
                statusFuncionamentoMainElement.classList.add('fechado-main');
                statusFuncionamentoMainElement.classList.remove('aberto-main');
                statusFuncionamentoMainElement.style.display = 'block';
            } else if (status === 'AWAITING_OPENING') {
                 statusFuncionamentoMainElement.textContent = "⏰ Olá! Ainda não abrimos. Volte mais tarde!";
                 statusFuncionamentoMainElement.classList.add('fechado-main'); // Pode usar uma classe diferente se desejar
                 statusFuncionamentoMainElement.classList.remove('aberto-main');
                 statusFuncionamentoMainElement.style.display = 'block';
            } else { // CLOSED_DAY
                 statusFuncionamentoMainElement.textContent = "😔 Olá! Estamos fechados às segundas-feiras. Volte amanhã!";
                 statusFuncionamentoMainElement.classList.add('fechado-main');
                 statusFuncionamentoMainElement.classList.remove('aberto-main');
                 statusFuncionamentoMainElement.style.display = 'block';
            }
        }
    }

    // - Event Listeners para Modais e Outros -
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) { // Fecha o modal se clicar fora do conteúdo
                if (modal.id === 'cart-modal') {
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
            }
        });
    });

    // - Funções Auxiliares do Chatbot -
    function getWeekdayName(dayIndex) {
        const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira","Quinta-feira", "Sexta-feira", "Sábado"];
        return weekdays[dayIndex];
    }

    function addMessage(message, sender) {
        if (chatbox) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);
            messageDiv.innerHTML = message.replace(/\n/g, '<br>'); // Substitui \n por <br> para quebra de linha
            chatbox.appendChild(messageDiv);
            chatbox.scrollTop = chatbox.scrollHeight; // Rola para a última mensagem
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

        // 2. Se nenhuma palavra-chave for encontrada e não for segunda, retornar mensagem genérica
        return "Desculpe, não entendi sua pergunta. Poderia reformular ou perguntar sobre o menu, entrega, horários, etc.?";
    }

    // - Event Listeners para o Carrinho -
    if (cartIconContainer) {
        cartIconContainer.addEventListener('click', () => {
            // ADIÇÃO: Ajusta o tamanho do container de itens do carrinho (máximo 40% da altura da viewport)
            if (cartItemsScrollContainer) {
                cartItemsScrollContainer.style.maxHeight = '40vh';
            }
            openModal(cartModal);
            updateCartDisplay(); // Atualiza o carrinho ao abri-lo
            handleOrderTypeChange(); // Atualiza a visibilidade dos campos de entrega/retirada
        });
    }

    // Event listener para o botão de checkout do WhatsApp (MODIFICADO para abrir o resumo)
    if (checkoutWhatsappModalBtn) {
        checkoutWhatsappModalBtn.addEventListener('click', showOrderSummary); // Nova função que abre o resumo
    }

    // Event listener para o botão de envio final no modal de resumo (ADIÇÃO)
    if (sendOrderBtn) {
        sendOrderBtn.addEventListener('click', sendOrderToWhatsApp);
    }

    // Event listener para o select de tipo de pedido
    if (orderTypeSelect) {
        orderTypeSelect.addEventListener('change', handleOrderTypeChange);
    }

    // Event listener para o botão de rolagem do carrinho
    if (scrollUpBtn && cartItemsScrollContainer) {
        scrollUpBtn.addEventListener('click', () => {
            const scrollAmount = cartItemsScrollContainer.clientHeight * 0.5;
            cartItemsScrollContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        });
    }

    if (scrollDownBtn && cartItemsScrollContainer) {
        scrollDownBtn.addEventListener('click', () => {
            const scrollAmount = cartItemsScrollContainer.clientHeight * 0.5;
            cartItemsScrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        });
    }

    // ✅ Event listener para abrir o modal de informações (FUNCIONA EM QUALQUER PÁGINA)
    if (infoToggleContainer && infoModal) {
        infoToggleContainer.addEventListener('click', () => {
            openModal(infoModal);
        });
    }

    // Event listener para o botão de fechar do modal de fotos
    if (prevPhotoBtn) {
        prevPhotoBtn.addEventListener('click', () => {
            if (currentSlideIndex > 0) {
                goToSlide(currentSlideIndex - 1);
            }
        });
    }

    if (nextPhotoBtn) {
        nextPhotoBtn.addEventListener('click', () => {
            if (currentSlideIndex < photoSlides.length - 1) {
                goToSlide(currentSlideIndex + 1);
            }
        });
    }

    // - Event Listeners para o Modal de Reserva (NOVO) -

    /**
     * Abre o modal de reserva.
     */
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

    /**
     * Fecha o modal de reserva.
     */
    function closeReservationModal() {
        if (reservationModal) {
            reservationModal.style.display = 'none';
        }
    }

    /**
     * Valida os dados da reserva antes de gerar a mensagem.
     * @returns {boolean} True se os dados forem válidos, false caso contrário.
     */
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
        const today = new Date();
        const reservationDayOfWeek = reservationDate.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

        // Verifica se a data selecionada é anterior à data atual
        if (reservationDate < today) {
            alert('Desculpe, não é possível fazer reservas para datas passadas. Por favor, escolha uma data futura.');
            return false;
        }

        // Verifica se a data selecionada é uma Segunda-feira
        if (reservationDayOfWeek === 1) { // 1 representa Segunda-feira
            alert('Desculpe, não fazemos reservas às segundas-feiras, pois estamos fechados. Por favor, escolha outro dia.');
            return false;
        }

        return true;
    }

    /**
     * Gera a mensagem de reserva formatada para o WhatsApp.
     * @returns {string} A mensagem pronta para ser enviada.
     */
    function generateReservationMessage() {
        if (!validateReservationData()) {
            return null; // Retorna null se a validação falhar
        }

        const name = document.getElementById('reservation-name').value.trim();
        const people = document.getElementById('reservation-people').value.trim();
        const dateInput = document.getElementById('reservation-date').value;
        const time = document.getElementById('reservation-time').value.trim();
        const notes = document.getElementById('reservation-notes').value.trim();

        // Formata a data para DD/MM/YYYY
        const reservationDate = new Date(dateInput);
        const formattedDate = reservationDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

        let message = `*NOVA RESERVA*\n\n`;
        message += `*Nome:* ${name}\n`;
        message += `*Pessoas:* ${people}\n`;
        message += `*Data:* ${formattedDate}\n`;
        message += `*Horário:* ${time}\n`;
        if (notes) {
            message += `*Observações:* ${notes}\n`;
        }
        message += `\n*Importante:* Esta reserva será analisada para confirmar a disponibilidade.`;

        return encodeURIComponent(message);
    }

    /**
     * Envia a mensagem de reserva para o WhatsApp.
     */
    function sendReservationToWhatsApp() {
        const message = generateReservationMessage();

        if (message === null) { // Verifica se a validação falhou
            return; // Sai da função se a validação falhar
        }

        const whatsappNumber = '5562992020331'; // Seu número de WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappUrl, '_blank');
        closeReservationModal(); // Fecha o modal após enviar
    }

    // Event listener para abrir o modal de reserva
    if (reservationIcon) {
        reservationIcon.addEventListener('click', openReservationModal);
    }

    // Event listener para fechar o modal de reserva
    if (reservationModal) {
        reservationModal.addEventListener('click', function(event) {
            if (event.target === reservationModal) {
                closeReservationModal();
            }
        });
    }

    // Event listener para o botão de envio da reserva
    if (sendReservationWhatsappBtn) {
        sendReservationWhatsappBtn.addEventListener('click', sendReservationToWhatsApp);
    }

    // Event listener para o botão de fechar do modal de reserva
    document.querySelectorAll('.close-button[data-modal="reservation"]').forEach(button => {
        button.addEventListener('click', closeReservationModal);
    });

    // - Event Listeners para o Chatbot -
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            openModal(chatModal);
            // Adiciona a mensagem inicial do bot ao abrir o chat
            // Garante que a mensagem só seja adicionada uma vez por sessão de chat
            if (chatbox && !chatbox.dataset.initialMessageShown) {
                // Preenche as mensagens "ola" e "oi" na base de conhecimento
                // Apenas quando a função getWeekdayName está disponível
                const currentDayName = getWeekdayName(new Date().getDay());
                if (typeof chatbotKnowledgeBase !== 'undefined') {
                    chatbotKnowledgeBase["ola"] = `👋 Olá! Feliz ${currentDayName}! Como posso ajudar você hoje? 😊\n\nVocê pode perguntar sobre:\n- 🍢 Nossos **Espetos**\n- 🍛 As **Jantinhas**\n- 🥤 **Bebidas** (Cervejas, Refrigerantes, Sucos)\n- 🍟 **Porções** e **Pastéis**\n- 🍰 **Doces** e **Drinks**\n- ⏰ Nossos **Horários** de funcionamento\n- 🛵 **Entrega**\n- 📞 **Contato**\n\nOu qualquer outra dúvida sobre o cardápio! 😉`;
                    chatbotKnowledgeBase["oi"] = chatbotKnowledgeBase["ola"]; // "oi" usa a mesma mensagem que "ola"
                } else {
                    // Mensagem padrão se a base de conhecimento não estiver carregada
                    chatbotKnowledgeBase["ola"] = "Olá!\nComo posso ajudar você hoje?";
                    chatbotKnowledgeBase["oi"] = chatbotKnowledgeBase["ola"];
                }

                const initialBotMessage = chatbotKnowledgeBase["ola"]; // Usa a resposta "ola" como mensagem inicial
                addMessage(initialBotMessage, 'bot');
                chatbox.dataset.initialMessageShown = 'true'; // Marca que a mensagem já foi mostrada
            }
        });
    }

    // Event listener para fechar o modal do chat
    if (closeChatModalBtn) {
        closeChatModalBtn.addEventListener('click', () => {
            closeModal(chatModal);
            if (chatbox) {
                chatbox.innerHTML = '';
                delete chatbox.dataset.initialMessageShown; // Permite que a mensagem inicial apareça novamente
            }
        });
    }

    // Event listener para enviar mensagem ao clicar no botão
    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', () => {
            const userMessage = chatInput.value;
            if (userMessage.trim() === '') return; // Não envia mensagens vazias

            addMessage(userMessage, 'user');
            chatInput.value = ''; // Limpa o input

            // Simula um atraso para a resposta do bot para parecer mais natural
            setTimeout(() => {
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse, 'bot');
            }, 500); // 0.5 segundo de atraso
        });
    }

    // Event listener para enviar mensagem ao pressionar Enter no input
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatBtn.click(); // Dispara o clique do botão de enviar
            }
        });
    }

    // - Inicializações -
    initializeTheme();
    renderMenu();
    updateCartDisplay();
    handleOrderTypeChange(); // Atualiza o estado inicial dos campos de entrega/retirada
    updateMainScreenOperatingStatus(); // Atualiza o status ao carregar

    // Botão Voltar ao Topo
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

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

    // Event listener para abrir o modal de fotos
    document.getElementById('photos-toggle-container')?.addEventListener('click', () => {
        renderPhotosInModal(); // Renderiza as fotos ao abrir o modal
        openModal(photosModal);
    });

    // - Event Listener para o Botão de Fechar do Modal do Carrinho (NOVO) -
    // Adiciona um event listener específico para o botão de fechar do carrinho
    const closeCartModalBtn = document.querySelector('#cart-modal .close-button');
    if (closeCartModalBtn) {
        closeCartModalBtn.addEventListener('click', () => {
            closeModal(cartModal);
        });
    }

});