// cardapio.js

// Dados dos produtos
//--------------------------------------PRATOS-------------------------------------//
const products = [
    {
        id: 'pp-1',
        category: 'Pratos',
        name: 'Jantinha Completa',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, vinagrete e 1 espeto a escolha',
        price: 22.00,
        imageUrl: 'https://imgur.com/j8KuBRF.png'
    },
    {
        id: 'pp-2',
        category: 'Pratos',
        name: 'Jantinha Nota 1000',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, estrogonofe de frango, batata palha, vinagrete e 1 espeto a escolha',
        price: 25.00,
        imageUrl: 'https://imgur.com/j8KuBRF.png'
    },
    {
        id: 'pp-3',
        category: 'Pratos',
        name: 'Jantinha sem Espeto',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, vinagrete sem espeto',
        price: 19.00,
        imageUrl: 'https://imgur.com/j8KuBRF.png'
    },
    {
        id: 'pp-4',
        category: 'Pratos',
        name: 'Jantinha de Estrogonofe',
        description: 'Estrogonofe de frango, batata palha e Arroz branco',
        price: 22.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'pp-5',
        category: 'Pratos',
        name: 'Jantinha Kids',
        description: '(somente consumo no local) um pouco de arroz, um pouco de estrogonofe e batata palha',
        price: 22.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },

    //--------------------------------------ESPETOS-------------------------------------//
    {
        id: 'esp-1',
        category: 'Espetos',
        name: 'Frango com Bacon',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-2',
        category: 'Espetos',
        name: 'Frango sem Bacon',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-3',
        category: 'Espetos',
        name: 'Contra Filé',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-4',
        category: 'Espetos',
        name: 'Picanha Montada',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-5',
        category: 'Espetos',
        name: 'Asinha',
        description: 'Tulipa',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-6',
        category: 'Espetos',
        name: 'Cupim',
        description: 'Grill',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-7',
        category: 'Espetos',
        name: 'Coração',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-8',
        category: 'Espetos',
        name: 'Coxinha da Asa',
        description: 'Drumette',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-9',
        category: 'Espetos',
        name: 'Linguiça Caipira',
        description: 'Linguiça Suína da fazenda sem pimenta',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-10',
        category: 'Espetos',
        name: 'Linguiça Caipira Apimentada',
        description: 'Linguiça Suína com um toque de pimenta',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-11',
        category: 'Espetos',
        name: 'Cafta',
        description: 'Carne bovina recheada com queijo',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-12',
        category: 'Espetos',
        name: 'Cafta 1000',
        description: 'Carne bovina envolta em bacon, recheada com queijo',
        price: 14.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-13',
        category: 'Espetos',
        name: 'Provolone',
        description: 'Queijo provolone bola defumado no espeto',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-14',
        category: 'Espetos',
        name: 'Coalho',
        description: 'Queijo Coalho no espeto',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    //--------------------------------------CERVEJAS-------------------------------------//
    {
        id: 'cev-1',
        category: 'Cervejas',
        name: 'Amstel Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploSkol.jpg'
    },
    {
        id: 'cev-2',
        category: 'Cervejas',
        name: 'Brahma Duplo Malte Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },
    {
        id: 'cev-3',
        category: 'Cervejas',
        name: 'Antartica Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },
    {
        id: 'cev-4',
        category: 'Cervejas',
        name: 'Império lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },
    //--------------------------------------CALDOS-------------------------------------//
    {
        id: 'cald-1',
        category: 'Caldos',
        name: 'Caldo de Feijão',
        description: '500ml',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoFeijao.jpg'
    },
    {
        id: 'cald-2',
        category: 'Caldos',
        name: 'Caldo de Frango',
        description: '500ml',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoVerde.jpg'
    },
    {
        id: 'cald-3',
        category: 'Caldos',
        name: 'Caldo de Costela',
        description: '500ml, com pedaços de costela e mandioca',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoVerde.jpg'
    },
    //--------------------------------------GUARNIÇÕES-------------------------------------//
    {
        id: 'guar-1',
        category: 'Guarnições',
        name: 'Arroz Branco',
        description: 'Arroz soltinho e fresquinho.',
        price: 8.00,
        imageUrl: 'https://i.imgur.com/ExemploArroz.jpg'
    },
    {
        id: 'guar-2',
        category: 'Guarnições',
        name: 'Mandioca',
        description: 'Mandioca cozida no ponto certo, macia por dentro.',
        price: 7.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'guar-3',
        category: 'Guarnições',
        name: 'Vinagrete',
        description: 'Tomates selecionados fresquinho.',
        price: 7.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'guar-4',
        category: 'Guarnições',
        name: 'Feijão Tropeiro (P)',
        description: 'Porção de feijão tropeiro pequena, mas grande no sabor!',
        price: 10.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'guar-5',
        category: 'Guarnições',
        name: 'Feijão Tropeiro (G)',
        description: 'Porção de feijão tropeiro grande, para quem quer dividir!',
        price: 15.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    //--------------------------------------LANCHES-------------------------------------//
    {
        id: 'lan-1',
        category: 'Lanches',
        name: 'Pastel Frango com Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'lan-2',
        category: 'Lanches',
        name: 'Pastel Presunto e Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'lan-3',
        category: 'Lanches',
        name: 'Pastel Carne com Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
];

// Definição de categorias com suas imagens e URLs Lottie
const categoriesData = [
    {
        name: 'Pratos',
        imageUrl: 'https://thumbs2.imgbox.com/a5/41/fTXQM9Hn_t.gif',
        lottieJsonUrl: 'iconsJSON/cookingsafe.json',
        type: 'category'
    },
    {
        name: 'Espetos',
        imageUrl: 'https://thumbs2.imgbox.com/a5/41/fTXQM9Hn_t.gif',
        lottieJsonUrl: 'iconsJSON/espetos.json',
        type: 'category'
    },
    {
        name: 'Cervejas',
        imageUrl: 'https://i.imgur.com/BannerCervejas.jpg',
        lottieJsonUrl: 'iconsJSON/cerveja.json',
        type: 'category'
    },
    {
        name: 'Caldos',
        imageUrl: 'https://i.imgur.com/BannerCaldos.jpg',
        lottieJsonUrl: 'iconsJSON/caldos.json',
        type: 'category'
    },
    {
        name: 'Guarnições',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/guarnicao.json',
        type: 'category'
    },
    {
        name: 'Bebidas',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/bebidas sucos.json',
        type: 'category'
    },
    {
        name: 'Porções',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/porcoes.json',
        type: 'category'
    },
    {
        name: 'Lanches',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/lanches.json',
        type: 'category'
    },
    {
        name: 'WhatsApp',
        imageUrl: 'https://i.imgur.com/ExemploWhatsapp.png',
        lottieJsonUrl: 'iconsJSON/whatsapp.json',
        type: 'link',
        url: 'https://wa.me/5562992020331'
    },
    {
        name: 'Instagram',
        imageUrl: 'https://i.imgur.com/ExemploInstagram.png',
        lottieJsonUrl: 'iconsJSON/instagram.json',
        type: 'link',
        url: 'https://www.instagram.com/jantinhanota1000/'
    },
    {
        name: 'Mapa',
        imageUrl: 'https://i.imgur.com/ExemploMaps.png',
        lottieJsonUrl: 'iconsJSON/localizacao.json',
        type: 'link',
        url: 'https://maps.app.goo.gl/zoV6bZ6LjkFXQHsu8'
    },
    {
        name: 'Fotos',
        imageUrl: 'https://i.imgur.com/ExemploFotos.png',
        lottieJsonUrl: 'iconsJSON/fotos.json',
        type: 'modal',
        targetModalId: 'photos-modal'
    }
];

const photos = [
    'https://via.placeholder.com/600x400?text=Sua+Foto+1',
    'https://via.placeholder.com/600x400?text=Sua+Foto+2',
    'https://via.placeholder.com/600x400?text=Sua+Foto+3',
    'https://via.placeholder.com/600x400?text=Sua+Foto+4'
];

const DEFAULT_PLACEHOLDER_IMAGE = 'https://via.placeholder.com/180x180?text=Jantinha+Nota+1000';
const DEFAULT_CATEGORY_IMAGE = 'https://via.placeholder.com/600x200?text=Categoria';
const DEFAULT_LOTTIE_JSON = 'iconsJSON/KnifeForkie.json';