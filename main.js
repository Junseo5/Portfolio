// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .project-item');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 0, duration: 0.2 });
        gsap.to(follower, { scale: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', duration: 0.2 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.2 });
    });
});

// Hero Animations
const heroTimeline = gsap.timeline();

heroTimeline
    .from('.logo', {
        y: -50,
        autoAlpha: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.hero-subtitle', {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-title .line', {
        y: 100,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    }, '-=0.8')
    .from('.hero-desc', {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.scroll-indicator', {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5');

// Scroll Animations
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    gsap.from(section.querySelector('.section-header'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// About Section
gsap.from('.about-text > *', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.profile-img-container', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: 'power4.out'
});

// Skills Section Animation
gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 85%',
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power4.out'
});

// 3D Tilt Effect for Skills
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.1,
            ease: 'power1.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Projects Section
const projects = document.querySelectorAll('.project-item');

projects.forEach((project, index) => {
    const direction = index % 2 === 0 ? -50 : 50;
    
    gsap.from(project.querySelector('.project-content'), {
        scrollTrigger: {
            trigger: project,
            start: 'top 80%',
        },
        x: direction,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from(project.querySelector('.project-visual'), {
        scrollTrigger: {
            trigger: project,
            start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
    });
});

// Contact Section
gsap.from('.contact-content > *', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 90%', // Trigger earlier
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
