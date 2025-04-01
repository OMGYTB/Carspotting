    document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les boutons de filtre et toutes les cartes
    const filterButtons = document.querySelectorAll('.brand-filter');
    const carCards = document.querySelectorAll('.car-card');

    // Ajouter un écouteur d'événement à chaque bouton de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Récupérer la valeur du filtre
            const filterValue = button.getAttribute('data-filter');
            
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');

            // Filtrer les cartes
            carCards.forEach(card => {
                const cardFilter = card.getAttribute('data-filter');
                if (filterValue === 'all' || cardFilter === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});


// Fonction pour le défilement fluide
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Fonction d'accélération
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Ajouter l'écouteur d'événements à tous les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target, 1000); // 1000ms = 1 seconde pour l'animation
    });
});


// Configuration des API (à remplacer par vos identifiants)
const INSTAGRAM_TOKEN = 'votre_token_instagram';
const TIKTOK_TOKEN = 'votre_token_tiktok';

// Fonction pour charger les posts Instagram
async function loadInstagramPosts() {
    try {
       // Exemple de structure de données pour les posts Instagram avec plusieurs images
const posts = [
    {
        images: [
            'img/posts/audi-posts1.jpg',
            'img/posts/audi-posts2.jpg',
            'img/posts/audi-posts3.jpg',
            'img/posts/audi-posts4.jpg',
            'img/posts/audi-posts5.jpg'
        ],
        caption: 'Voici mon SUV préféré, une machine démoniaque prête à dévorer la route : l Audi SQ7 ABT Pack Carbon 2018 ! Une bête de puissance et d élégance, avec une préparation qui le rend encore plus bestial. Souvent sous-estimé par certains, c est dommage… Pour donner quelques stats abberantes : 🔥 V8 4.0 TDI bi-turbo poussé à 520 chevaux et 970 Nm de couple grâce à ABT🚀 0 à 100 km/h en 4,6 secondes  🏁 Vitesse max : 250 km/h (bridée)  🔊 Échappement ABT pour une sonorité encore plus rageuse  Pack Carbon : agressivité maximale  ✅ Kit carrosserie full carbone ultra léger ✅ Diffuseur arrière et lame avant en carbone ✅ Jantes 22 pouces ABT noires ✅ Calandre et badges ABT exclusifs Un monstre de luxe et de technologie 💎 Intérieur cuir & Alcantara, finitions premium 📲 Virtual Cockpit & MMI Navigation Plus ⚙️ Suspension adaptative pour un mix parfait entre sport et confort Ce SQ7 ABT Pack Carbon est une véritable machine de guerre, un tank ultra-sportif qui fait tourner toutes les têtes. Puissant, agressif, luxueux : la perfection sur roues. Vous validez la bête ? Parce que moi, c est mon coup de cœur absolu ! #Audi #SQ7 #ABT #AudiSport #Quattro #V8 #TurboDiesel #SUVSport #PackCarbon #AudiABT #AudiLovers #GermanCars #LuxurySUV #Performance #Powerful #CarPorn #AutoAddict #CarbonFiber #TunedCars #FastCar #DreamCar #BeastMode #CarLover #Horsepower #AudiLove #Speed #BlackEdition #AudiNation #ABTSportsline #V8Power',
        likes: '21',
        comments: '0',
        date: '2025-03-22'
    },
            // Ajoutez d'autres posts...
        ];

        displayPosts(posts, 'instagram');
    } catch (error) {
        console.error('Erreur lors du chargement des posts Instagram:', error);
        showError();
    }
}

// Fonction pour charger les posts TikTok
async function loadTikTokPosts() {
    try {
        // Exemple de structure de données pour les posts TikTok
        const posts = [
            {
                thumbnail: 'img/posts/peugeot-posts.jpeg',
                caption: 'Best car sound😍 #foryoupage #pourtoi #fyp #car #humour #trend #carspotting #viral',
                views: '2193',
                likes: '31',
                date: '2025-03-30'
            },
            // Ajoutez d'autres posts...
        ];

        displayPosts(posts, 'tiktok');
    } catch (error) {
        console.error('Erreur lors du chargement des posts TikTok:', error);
        showError();
    }
}

// Fonction pour afficher les posts
function displayPosts(posts, platform) {
    const grid = document.getElementById('socialFeedGrid');
    grid.innerHTML = '';

    posts.forEach(post => {
        const postElement = createPostElement(post, platform);
        grid.appendChild(postElement);
    });
}

// Fonction pour créer un élément de post
function createPostElement(post, platform) {
    const article = document.createElement('article');
    article.className = 'social-post';

    // Tronquer le texte à 30 caractères
    const shortCaption = post.caption.slice(0, 50);
    const hasMoreText = post.caption.length > 50;

    // Créer le carrousel d'images
    const imagesHTML = platform === 'instagram' ? `
        <div class="post-image-carousel">
            <div class="carousel-container">
                ${post.images.map((img, index) => `
                    <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                        <img src="${img}" alt="Post image ${index + 1}">
                    </div>
                `).join('')}
            </div>
            ${post.images.length > 1 ? `
                <button class="carousel-btn prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-btn next">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="carousel-dots">
                    ${post.images.map((_, index) => `
                        <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    ` : `<div class="post-image"><img src="${post.thumbnail}" alt="Post"></div>`;

    article.innerHTML = `
        ${imagesHTML}
        <div class="post-content">
            <div class="post-header">
                <i class="fab fa-${platform} platform-icon"></i>
                <span class="post-date">${formatDate(post.date)}</span>
            </div>
            <div class="post-text-container">
                <p class="post-text">
                    <span class="short-text">${shortCaption}${hasMoreText ? '...' : ''}</span>
                    <span class="full-text" style="display: none;">${post.caption}</span>
                </p>
                ${hasMoreText ? `
                    <button class="read-more-btn">
                        <span class="more">Voir plus</span>
                        <span class="less" style="display: none;">Voir moins</span>
                    </button>
                ` : ''}
            </div>
            <div class="post-stats">
                ${platform === 'instagram' ? `
                    <span class="stat-item"><i class="far fa-heart"></i> ${post.likes}</span>
                    <span class="stat-item"><i class="far fa-comment"></i> ${post.comments}</span>
                ` : `
                    <span class="stat-item"><i class="far fa-play-circle"></i> ${post.views}</span>
                    <span class="stat-item"><i class="far fa-heart"></i> ${post.likes}</span>
                `}
            </div>
        </div>
    `;

    // Ajouter les gestionnaires d'événements pour le carrousel
    if (platform === 'instagram' && post.images.length > 1) {
        const carousel = article.querySelector('.post-image-carousel');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        prevBtn.addEventListener('click', () => {
            const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            showSlide(newIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
    }

    // Ajouter l'écouteur d'événements pour le bouton "Voir plus"
    const readMoreBtn = article.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            const container = this.closest('.post-text-container');
            const shortText = container.querySelector('.short-text');
            const fullText = container.querySelector('.full-text');
            const moreText = this.querySelector('.more');
            const lessText = this.querySelector('.less');

            if (shortText.style.display !== 'none') {
                shortText.style.display = 'none';
                fullText.style.display = 'inline';
                moreText.style.display = 'none';
                lessText.style.display = 'inline';
            } else {
                shortText.style.display = 'inline';
                fullText.style.display = 'none';
                moreText.style.display = 'inline';
                lessText.style.display = 'none';
            }
        });
    }

    return article;
}


// Fonction pour formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

// Gestion des onglets
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Mise à jour des classes active
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Chargement des posts selon la plateforme
            const platform = tab.dataset.platform;
            if (platform === 'instagram') {
                loadInstagramPosts();
            } else {
                loadTikTokPosts();
            }
        });
    });

    // Chargement initial des posts Instagram
    loadInstagramPosts();
});


document.addEventListener('DOMContentLoaded', function() {
    const brandFilters = document.querySelector('.brand-filters');
    const prevButton = document.querySelector('.nav-arrow.prev');
    const nextButton = document.querySelector('.nav-arrow.next');
    
    // Fonction pour faire défiler
    function scroll(direction) {
        const scrollAmount = brandFilters.offsetWidth;
        brandFilters.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    }

    // Écouteurs d'événements pour les boutons
    prevButton.addEventListener('click', () => scroll('prev'));
    nextButton.addEventListener('click', () => scroll('next'));

    // Vérifier si les flèches doivent être affichées
    function checkArrows() {
        const isAtStart = brandFilters.scrollLeft === 0;
        const isAtEnd = brandFilters.scrollLeft + brandFilters.offsetWidth >= brandFilters.scrollWidth;

        prevButton.style.opacity = isAtStart ? '0.5' : '1';
        prevButton.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextButton.style.opacity = isAtEnd ? '0.5' : '1';
        nextButton.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }

    // Vérifier les flèches au chargement et au scroll
    brandFilters.addEventListener('scroll', checkArrows);
    window.addEventListener('resize', checkArrows);
    checkArrows();
});

// Système de like
document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Toggle de la classe 'liked'
        this.classList.toggle('liked');
        
        // Changement de l'icône
        const icon = this.querySelector('i');
        if (this.classList.contains('liked')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
        
        // Animation
        this.classList.add('animate');
        setTimeout(() => {
            this.classList.remove('animate');
        }, 300);
        
        // Ici vous pourriez ajouter une requête AJAX pour sauvegarder l'état du like
        // savelike(cardId, isLiked);
    });
});
