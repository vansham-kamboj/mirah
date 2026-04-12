document.addEventListener('DOMContentLoaded', () => {
    // Basic interaction for the bid cards
    const bidCards = document.querySelectorAll('.bid-card');
    
    bidCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove 'selected' class from all
            bidCards.forEach(c => {
                c.classList.remove('selected');
                const radioInner = c.querySelector('.radio-inner');
                if(radioInner) {
                    radioInner.remove();
                }
                const radioBtn = c.querySelector('.radio-btn');
                if(radioBtn) {
                    radioBtn.classList.remove('active');
                }
            });
            
            // Add 'selected' class to clicked
            card.classList.add('selected');
            
            const radioBtn = card.querySelector('.radio-btn');
            if(radioBtn) {
                radioBtn.classList.add('active');
                if(!radioBtn.querySelector('.radio-inner')) {
                    const inner = document.createElement('div');
                    inner.className = 'radio-inner';
                    radioBtn.appendChild(inner);
                }
            }
        });
    });

    // Add scroll reveal animation with stagger
    const revealElements = document.querySelectorAll('.process-col, .split-left, .app-mockup, .gallery-item, .hero-title, .hero-subtitle, .blog-card, .contact-info, .contact-form-box, .section-title, .section-desc');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Navbar Logic
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    if (mobileMenuToggle && navbarLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
        });
    }

    // Blog Modal Logic
    const blogCards = document.querySelectorAll('.blog-card');
    const blogModal = document.getElementById('blogModal');
    if (blogCards.length > 0 && blogModal) {
        const modalClose = blogModal.querySelector('.modal-close');
        const modalTitle = blogModal.querySelector('.modal-title');
        const modalBody = blogModal.querySelector('.modal-body');
        const modalImg = blogModal.querySelector('.modal-img');

        blogCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                // Extract info
                const title = card.querySelector('.blog-title').innerText;
                const excerpt = card.querySelector('.blog-excerpt').innerText;
                const meta = card.querySelector('.blog-meta').innerText;
                const imgBg = card.querySelector('.blog-card-img').style.backgroundColor;
                const imgSrc = card.querySelector('.blog-card-img').style.backgroundImage;

                // Populate modal
                modalTitle.innerText = title;
                modalBody.innerHTML = `
                    <p class="blog-meta mb-4" style="color: var(--accent-blue); font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">${meta}</p>
                    <p style="font-size: 1.15rem; color: var(--text-dark); line-height: 1.6; margin-bottom: 32px;">${excerpt}</p>
                    <p class="mb-4">Welcome to our deep dive into <strong>${title}</strong>. As the industry evolves, staying up to date with the complexities of jewelry manufacturing is critical. This comprehensive guide covers everything from foundational principles to advanced expert tips.</p>
                    <h3 style="margin: 32px 0 16px; font-family: var(--font-serif); color: var(--text-dark);">1. The Fundamentals</h3>
                    <p class="mb-4">Before diving into the specifics, it is essential to understand the broader context. Manufacturers look for precision, clarity, and well-documented requirements to provide accurate bids. Leaving critical details to assumption often leads to inflated costs or compromises in final piece quality.</p>
                    <h3 style="margin: 32px 0 16px; font-family: var(--font-serif); color: var(--text-dark);">2. Expert Insights & Best Practices</h3>
                    <ul style="margin-left: 20px; margin-bottom: 32px; color: var(--text-muted-light); line-height: 1.7;">
                        <li style="margin-bottom: 12px;"><strong>Always over-communicate:</strong> Whether it's tolerance levels or gemstone grades, precision is key.</li>
                        <li style="margin-bottom: 12px;"><strong>Understand timelines:</strong> High-end manufacturing isn't immediate. Establish flexible yet clear deadlines.</li>
                        <li style="margin-bottom: 12px;"><strong>Leverage technology:</strong> Utilizing advanced CAD previews can save weeks of manual back-and-forth between artisans.</li>
                    </ul>
                    <div style="background: rgba(64, 91, 138, 0.05); padding: 24px; border-radius: 8px; border-left: 4px solid var(--accent-blue); margin: 32px 0;">
                        <p style="margin: 0; font-style: italic; color: var(--text-dark); font-size: 1.1rem;">"Mastering these nuances is the single biggest difference between a good collection and an extraordinary one. Never compromise on clarity."</p>
                    </div>
                    <p>We hope this breakdown offers the crucial understanding needed for your next ambitious project. Continue to explore our marketplace to connect with verified manufacturers who can bring this understanding directly to your exquisite designs.</p>
                `;
                if (imgSrc) {
                    modalImg.style.backgroundImage = imgSrc;
                } else {
                    modalImg.style.backgroundColor = imgBg;
                }

                blogModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        modalClose.addEventListener('click', () => {
            blogModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                blogModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
