document.addEventListener('DOMContentLoaded', function() {
    
    // Данные проектов
    const projects = [
        { 
            id: 1, 
            name: 'Маркетинг Q1', 
            meta: 'ROI +156%', 
            gradient: 'linear-gradient(135deg, #00d4aa 0%, #0ea5e9 100%)'
        },
        { 
            id: 2, 
            name: 'Продажи 2024', 
            meta: 'Выручка $2.4M', 
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
        },
        { 
            id: 3, 
            name: 'RFM-анализ', 
            meta: '5 сегментов', 
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
        },
        { 
            id: 4, 
            name: 'Когортный анализ', 
            meta: 'LTV +34%', 
            gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
        },
        { 
            id: 5, 
            name: 'Аномалии', 
            meta: '12 срабатываний', 
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        },
        { 
            id: 6, 
            name: 'Прогноз Q2', 
            meta: '+23% рост', 
            gradient: 'linear-gradient(135deg, #f472b6 0%, #c084fc 100%)'
        }
    ];
    
    // Элементы
    const wheel = document.getElementById('projectWheel');
    const wheelSelected = document.getElementById('wheelSelected');
    const searchInput = document.getElementById('searchInput');
    
    if (!wheel) return;
    
    // Создаём сектора
    createSectors();
    
    // Обработчики событий
    initWheelInteraction();
    initSearch();
    
    /**
     * Создание секторов колеса
     */
    function createSectors() {
        const sectorAngle = 360 / projects.length;
        const wheelRadius = 200;
        const centerRadius = 70;
        
        projects.forEach((project, index) => {
            const sector = document.createElement('div');
            sector.className = 'wheel-sector';
            sector.dataset.projectId = project.id;
            sector.dataset.projectName = project.name;
            
            const startAngle = index * sectorAngle - 90;
            sector.style.transform = `rotate(${startAngle}deg)`;
            
            const bg = document.createElement('div');
            bg.className = 'wheel-sector-bg';
            bg.style.background = project.gradient;
            
            sector.appendChild(bg);
            wheel.appendChild(sector);
            
            // Текст сектора
            const label = document.createElement('div');
            label.className = 'wheel-sector-label';
            label.innerHTML = `
                <div class="wheel-sector-name">${project.name}</div>
                <div class="wheel-sector-meta">${project.meta}</div>
            `;
            
            // Позиционируем текст в середине сектора
            const midAngle = startAngle + sectorAngle / 2;
            const angleRad = midAngle * Math.PI / 180;
            const labelRadius = (wheelRadius + centerRadius) / 2;
            
            // Инвертируем координаты
            const x = 200 - Math.cos(angleRad) * labelRadius;
            const y = 200 - Math.sin(angleRad) * labelRadius;
            
            label.style.left = x + 'px';
            label.style.top = y + 'px';
            label.style.transform = 'translate(-50%, -50%)';
            
            wheel.appendChild(label);
        });
    }
    
    /**
     * Инициализация взаимодействия с колесом
     */
    function initWheelInteraction() {
        let activeSectorIndex = null;
        
        wheel.addEventListener('mousemove', function(e) {
            const rect = wheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 70 || distance > rect.width / 2) {
                resetSectors();
                return;
            }
            
            let angle = Math.atan2(-dy, -dx) * (180 / Math.PI);
            if (angle < 0) angle += 360;
            
            let sectorAngle = 360 / projects.length;
            let normalizedAngle = angle + 90;
            if (normalizedAngle >= 360) normalizedAngle -= 360;
            
            let sectorIndex = Math.floor(normalizedAngle / sectorAngle);
            if (sectorIndex >= projects.length) sectorIndex = 0;
            
            if (activeSectorIndex !== sectorIndex) {
                updateActiveSector(sectorIndex);
                activeSectorIndex = sectorIndex;
            }
        });
        
        wheel.addEventListener('mouseleave', function() {
            resetSectors();
            activeSectorIndex = null;
        });
        
        wheel.addEventListener('click', function(e) {
            if (activeSectorIndex !== null) {
                const project = projects[activeSectorIndex];
                window.location.href = 'project.html?id=' + project.id;
            }
        });
        
        function updateActiveSector(sectorIndex) {
            const sectors = wheel.querySelectorAll('.wheel-sector');
            const labels = wheel.querySelectorAll('.wheel-sector-label');
            
            sectors.forEach((sector, i) => {
                if (i === sectorIndex) {
                    sector.classList.add('active');
                    sector.classList.remove('dimmed');
                } else {
                    sector.classList.remove('active');
                    sector.classList.add('dimmed');
                }
            });
            
            labels.forEach((label, i) => {
                label.style.opacity = i === sectorIndex ? '1' : '0.4';
            });
            
            const project = projects[sectorIndex];
            wheelSelected.textContent = project.name;
        }
        
        function resetSectors() {
            const sectors = wheel.querySelectorAll('.wheel-sector');
            const labels = wheel.querySelectorAll('.wheel-sector-label');
            
            sectors.forEach(sector => {
                sector.classList.remove('active', 'dimmed');
            });
            
            labels.forEach(label => {
                label.style.opacity = '1';
            });
            
            wheelSelected.textContent = '—';
        }
    }
    
    /**
     * Поиск по проектам
     */
    function initSearch() {
        if (!searchInput) return;
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const sectors = wheel.querySelectorAll('.wheel-sector');
            const labels = wheel.querySelectorAll('.wheel-sector-label');
            
            sectors.forEach((sector, index) => {
                const project = projects[index];
                const matches = project.name.toLowerCase().includes(query) || 
                               project.meta.toLowerCase().includes(query);
                
                if (query && !matches) {
                    sector.classList.add('dimmed');
                    labels[index].style.opacity = '0.3';
                } else {
                    sector.classList.remove('dimmed');
                    labels[index].style.opacity = '1';
                }
            });
        });
    }
    
    // Кнопка нового проекта
    const newProjectBtn = document.getElementById('newProjectBtn');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', function() {
            alert('Создание нового проекта');
        });
    }
    
    console.log('DPO-AAS-AI: Profile module loaded');
});