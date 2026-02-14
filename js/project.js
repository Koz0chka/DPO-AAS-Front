document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация графиков
    initCharts();
    
    // Инициализация кнопок в полукруге
    initWheelButtons();
    
    console.log('DPO-AAS-AI: Project module loaded');
});

/**
 * Инициализация графиков Chart.js
 */
function initCharts() {
    
    // Общие настройки для белой темы
    Chart.defaults.color = '#4a4a4a';
    Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.08)';
    Chart.defaults.font.family = "'Space Grotesk', sans-serif";
    
    // График 1: Динамика продаж (линейный)
    const chart1Canvas = document.getElementById('chart1');
    if (chart1Canvas) {
        new Chart(chart1Canvas, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Продажи',
                    data: [120, 145, 132, 178, 195, 220],
                    borderColor: '#0078e7',
                    backgroundColor: 'rgba(0, 120, 231, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#0078e7',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6
                }, {
                    label: 'План',
                    data: [130, 140, 150, 160, 170, 180],
                    borderColor: '#10b981',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // График 2: Активность (бар)
    const chart2Canvas = document.getElementById('chart2');
    if (chart2Canvas) {
        new Chart(chart2Canvas, {
            type: 'bar',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Активность',
                    data: [65, 78, 90, 81, 56, 95, 88],
                    backgroundColor: 'rgba(0, 120, 231, 0.7)',
                    borderColor: '#0078e7',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: false
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // График 3: Каналы (пирог)
    const chart3Canvas = document.getElementById('chart3');
    if (chart3Canvas) {
        new Chart(chart3Canvas, {
            type: 'doughnut',
            data: {
                labels: ['Organic', 'Paid', 'Social', 'Referral'],
                datasets: [{
                    data: [35, 28, 22, 15],
                    backgroundColor: [
                        '#0078e7',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 8,
                            padding: 8,
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }
    
    // График 4: География (горизонтальный бар)
    const chart4Canvas = document.getElementById('chart4');
    if (chart4Canvas) {
        new Chart(chart4Canvas, {
            type: 'bar',
            data: {
                labels: ['Москва', 'СПб', 'Казань', 'Екатеринбург'],
                datasets: [{
                    label: 'Пользователи',
                    data: [4500, 2800, 1200, 980],
                    backgroundColor: [
                        'rgba(0, 120, 231, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * Инициализация кнопок в полукруге
 */
function initWheelButtons() {
    const wheelBtns = document.querySelectorAll('.wheel-btn');
    
    wheelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            
            switch(action) {
                case 'add':
                    alert('Добавление нового графика');
                    break;
                case 'refresh':
                    // Анимация обновления
                    this.style.transform = 'rotate(360deg)';
                    setTimeout(() => {
                        this.style.transform = '';
                        console.log('Данные обновлены');
                    }, 500);
                    break;
                case 'filter':
                    alert('Открытие панели фильтров');
                    break;
            }
        });
    });
    
    // Кнопки в плашках
    const footerPlanks = document.querySelectorAll('.footer-plank');
    
    footerPlanks.forEach(plank => {
        plank.addEventListener('click', function() {
            const action = this.querySelector('.footer-plank-inner span').textContent;
            alert('Действие: ' + action);
        });
    });
}