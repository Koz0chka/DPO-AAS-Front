// main.js - интерактивность для DataViz AI лендинга

document.addEventListener('DOMContentLoaded', function() {
    
    // Плавный скролл для кнопки "Начать"
    const startButton = document.querySelector('.circle-button');
    
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Добавляем эффект "наведения" на карточки проектов
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Ничего не делаем, стили через CSS
        });
        
        card.addEventListener('mouseleave', function() {
            // Ничего не делаем, стили через CSS
        });
        
        card.addEventListener('click', function() {
            alert('Демо: вы выбрали проект "' + this.querySelector('.project-title').textContent + '"');
        });
    });
    
    // Скрываем индикатор скролла при достижении последней секции
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollContainer && scrollIndicator) {
        scrollContainer.addEventListener('scroll', function() {
            const scrollTop = this.scrollTop;
            const scrollHeight = this.scrollHeight;
            const clientHeight = this.clientHeight;
            
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.5';
            }
        });
    }
    
    // Приветственное сообщение
    console.log('DataViz AI: интерактивные графики загружены');
    
});