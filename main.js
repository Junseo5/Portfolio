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
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.nav-link', {
        y: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
    }, '-=0.8')
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-title .line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    }, '-=0.8')
    .from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-cta a', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.scroll-indicator', {
        y: 50,
        opacity: 0,
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

gsap.from('.img-placeholder', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: 'power4.out'
});

// Skills Section
gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skills',
        start: 'top 75%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
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
