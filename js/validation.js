document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    
    if (!form) return;
    
    // ========== РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ ==========
    const patterns = {
        fullname: /^[а-яёА-ЯЁa-zA-Z\s\-]+$/,
        
        phone: /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
        
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        
        company: /^[а-яёА-ЯЁa-zA-Z0-9\s\-.,&]+$/
    };
    
    // ========== Маска для телефона ==========
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            let formatted = '';
            
            if (value.length > 0) {
                if (value[0] === '8') {
                    formatted = '+7';
                } else {
                    formatted = '+' + value[0];
                }
                
                if (value.length > 1) {
                    formatted += ' (' + value.slice(1, 4);
                }
                if (value.length > 4) {
                    formatted += ') ' + value.slice(4, 7);
                }
                if (value.length > 7) {
                    formatted += '-' + value.slice(7, 9);
                }
                if (value.length > 9) {
                    formatted += '-' + value.slice(9, 11);
                }
            }
            
            this.value = formatted;
        });
    }
    
    // ========== Обработка отправки формы ==========
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        clearErrors();
        
        let isValid = true;
        const errors = [];
        
        // ========== ФИО ==========
        const fullnameInput = document.getElementById('fullname');
        const fullnameValue = fullnameInput.value.trim();
        const fullnameWords = fullnameValue.split(/\s+/).filter(word => word.length > 0);
        
        if (fullnameValue === '') {
            showError(fullnameInput, 'Введите ФИО');
            errors.push('ФИО: поле не заполнено');
            isValid = false;
        } else if (!patterns.fullname.test(fullnameValue)) {
            showError(fullnameInput, 'ФИО должно содержать только буквы');
            errors.push('ФИО: недопустимые символы');
            isValid = false;
        } else if (fullnameWords.length < 2) {
            showError(fullnameInput, 'Введите минимум фамилию и имя');
            errors.push('ФИО: недостаточно слов');
            isValid = false;
        } else if (fullnameWords.length > 3) {
            showError(fullnameInput, 'Максимум 3 слова (фамилия, имя, отчество)');
            errors.push('ФИО: слишком много слов');
            isValid = false;
        }
        
        // ========== Email ==========
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        
        if (emailValue === '') {
            showError(emailInput, 'Введите email');
            errors.push('Email: поле не заполнено');
            isValid = false;
        } else if (!patterns.email.test(emailValue)) {
            showError(emailInput, 'Введите корректный email (example@domain.ru)');
            errors.push('Email: неверный формат');
            isValid = false;
        }
        
        // ========== Телефон ==========
        const phoneValue = phoneInput.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        
        if (phoneValue === '') {
            showError(phoneInput, 'Введите номер телефона');
            errors.push('Телефон: поле не заполнено');
            isValid = false;
        } else if (!patterns.phone.test(phoneValue)) {
            showError(phoneInput, 'Формат: +7 (XXX) XXX-XX-XX');
            errors.push('Телефон: неверный формат');
            isValid = false;
        } else if (phoneDigits.length !== 11) {
            showError(phoneInput, 'Номер должен содержать 11 цифр');
            errors.push('Телефон: неверное количество цифр');
            isValid = false;
        }
        
        // ========== Компания ==========
        const companyInput = document.getElementById('company');
        const companyValue = companyInput.value.trim();
        
        if (companyValue !== '' && !patterns.company.test(companyValue)) {
            showError(companyInput, 'Недопустимые символы в названии');
            errors.push('Компания: недопустимые символы');
            isValid = false;
        }
        
        // ========== Чекбокс ==========
        const agreementCheckbox = document.getElementById('agreement');
        
        if (!agreementCheckbox.checked) {
            showError(checkboxWrapper(agreementCheckbox), 'Необходимо согласие на обработку данных');
            errors.push('Согласие: не отмечено');
            isValid = false;
        }
        
        // ========== Если валидно ==========
        if (isValid) {
            const userData = {
                fullname: fullnameValue,
                email: emailValue,
                phone: phoneValue,
                company: companyValue || '',
                registeredAt: new Date().toISOString()
            };

            localStorage.setItem('dpo_user', JSON.stringify(userData));
            localStorage.setItem('dpo_registered', 'true');

            const event = new CustomEvent('formValid', { 
                detail: {
                    ...userData,
                    timestamp: new Date().toLocaleString('ru-RU')
                }
            });
            document.dispatchEvent(event);
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 800);
        } else {
            console.group('Ошибки валидации');
            errors.forEach(error => console.error(error));
            console.groupEnd();
        }
    });
    
    // ========== Вспомогательные функции ==========
    
    function showError(input, message) {
        input.classList.add('is-danger');
        
        const helpBlock = document.createElement('p');
        helpBlock.classList.add('form-help', 'is-danger');
        helpBlock.textContent = message;
        
        const container = input.closest('.form-field');
        if (container) {
            container.appendChild(helpBlock);
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.form-input.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        
        document.querySelectorAll('.form-help.is-danger').forEach(el => {
            el.remove();
        });
    }
    
    function checkboxWrapper(checkbox) {
        return checkbox.closest('.form-checkbox-field') || checkbox.parentElement;
    }
    
    // ========== Сброс ошибки при вводе ==========
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            
            const container = this.closest('.form-field');
            if (container) {
                const errorMessages = container.querySelectorAll('.form-help.is-danger');
                errorMessages.forEach(el => el.remove());
            }
        });
    });
    
    const agreementCheckbox = document.getElementById('agreement');
    if (agreementCheckbox) {
        agreementCheckbox.addEventListener('change', function() {
            const container = this.closest('.form-checkbox-field');
            if (container) {
                const errorMessages = container.querySelectorAll('.form-help.is-danger');
                errorMessages.forEach(el => el.remove());
            }
        });
    }
});