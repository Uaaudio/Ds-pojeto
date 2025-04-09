     // Animação suave ao rolar
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Animação de entrada dos cards
  const cards = document.querySelectorAll('.card');
  window.addEventListener('scroll', () => {
      cards.forEach(card => {
          const cardTop = card.getBoundingClientRect().top;
          if(cardTop < window.innerHeight - 100) {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
          }
      });
  });

  // Configuração inicial da animação
  cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease-out';
  });
