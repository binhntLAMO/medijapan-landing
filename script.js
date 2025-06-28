// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .hospital-card, .treatment-item, .stat-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.phone) {
                showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Đang gửi yêu cầu tư vấn...', 'info');
            
            setTimeout(() => {
                showNotification('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Add CSS for notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        border-top: 1px solid #e5e7eb;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(notificationStyles);

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3, .stat-card h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const suffix = counter.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Form validation enhancement
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Format phone number
            if (value.length > 0) {
                if (value.startsWith('84')) {
                    value = '+' + value;
                } else if (value.startsWith('0')) {
                    value = '+84' + value.substring(1);
                } else {
                    value = '+84' + value;
                }
            }
            
            e.target.value = value;
        });
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function(e) {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                e.target.style.borderColor = '#ef4444';
                showNotification('Email không hợp lệ', 'error');
            } else {
                e.target.style.borderColor = '#e5e7eb';
            }
        });
    }
});

// Lazy loading for images (if any are added later)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Hospital card click effects
document.addEventListener('DOMContentLoaded', function() {
    const hospitalCards = document.querySelectorAll('.hospital-card');
    
    hospitalCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
});

// Loading animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // Search data - các từ khóa tìm kiếm và bệnh viện chuyên môn
        const searchData = {
            // Tế bào gốc
            'tế bào gốc': [
                '#treatments', 
                'Liệu pháp Tế bào gốc', 
                'Bệnh viện Đại học Tokyo - Chuyên tế bào gốc',
                'Viện Nghiên cứu Tế bào gốc Kobe - Chuyên tế bào gốc',
                'Bệnh viện Đại học Kyoto - Chuyên tế bào gốc'
            ],
            'stem cell': [
                '#treatments', 
                'Liệu pháp Tế bào gốc', 
                'Bệnh viện Đại học Tokyo - Chuyên tế bào gốc',
                'Viện Nghiên cứu Tế bào gốc Kobe - Chuyên tế bào gốc'
            ],
            
            // Làm đẹp
            'làm đẹp': [
                '#treatments', 
                'Thẩm mỹ & Làm đẹp', 
                'Trung tâm Y tế Thẩm mỹ Osaka - Chuyên làm đẹp',
                'Bệnh viện Đại học Tokyo - Chuyên thẩm mỹ'
            ],
            'thẩm mỹ': [
                '#treatments', 
                'Thẩm mỹ & Làm đẹp', 
                'Trung tâm Y tế Thẩm mỹ Osaka - Chuyên thẩm mỹ',
                'Trẻ hóa da bằng tế bào gốc'
            ],
            'trẻ hóa': [
                '#treatments', 
                'Thẩm mỹ & Làm đẹp', 
                'Trung tâm Y tế Thẩm mỹ Osaka - Chuyên trẻ hóa',
                'Trẻ hóa da bằng tế bào gốc'
            ],
            
            // Ung thư
            'ung thư': [
                '#treatments', 
                'Điều trị ung thư', 
                'Bệnh viện Đại học Tokyo - Chuyên ung thư',
                'Bệnh viện Đại học Kyoto - Chuyên ung thư'
            ],
            'cancer': [
                '#treatments', 
                'Điều trị ung thư', 
                'Bệnh viện Đại học Tokyo - Chuyên ung thư'
            ],
            
            // Các loại ung thư cụ thể
            'ung thư phổi': [
                '#treatments', 
                'Điều trị ung thư phổi', 
                'Bệnh viện Đại học Tokyo - Chuyên ung thư phổi',
                'Xạ trị Tiên tiến'
            ],
            'ung thư gan': [
                '#treatments', 
                'Điều trị ung thư gan', 
                'Bệnh viện Đại học Tokyo - Chuyên ung thư gan',
                'Liệu pháp Miễn dịch'
            ],
            'ung thư dạ dày': [
                '#treatments', 
                'Điều trị ung thư dạ dày', 
                'Bệnh viện Đại học Kyoto - Chuyên ung thư dạ dày',
                'Y học tái tạo'
            ],
            'ung thư vú': [
                '#treatments', 
                'Điều trị ung thư vú', 
                'Bệnh viện Đại học Tokyo - Chuyên ung thư vú',
                'Liệu pháp Miễn dịch'
            ],
            
            // Bệnh viện
            'bệnh viện': [
                '#hospitals', 
                'Bệnh viện đối tác', 
                'Bệnh viện Đại học Tokyo',
                'Trung tâm Y tế Thẩm mỹ Osaka',
                'Bệnh viện Đại học Kyoto',
                'Viện Nghiên cứu Tế bào gốc Kobe'
            ],
            'tokyo': [
                '#hospitals', 
                'Bệnh viện Đại học Tokyo', 
                'Tokyo, Nhật Bản - Chuyên tế bào gốc và ung thư'
            ],
            'osaka': [
                '#hospitals', 
                'Trung tâm Y tế Thẩm mỹ Osaka', 
                'Osaka, Nhật Bản - Chuyên thẩm mỹ và làm đẹp'
            ],
            'kyoto': [
                '#hospitals', 
                'Bệnh viện Đại học Kyoto', 
                'Kyoto, Nhật Bản - Chuyên tế bào gốc và ung thư'
            ],
            'kobe': [
                '#hospitals', 
                'Viện Nghiên cứu Tế bào gốc Kobe', 
                'Kobe, Nhật Bản - Chuyên nghiên cứu tế bào gốc'
            ],
            
            // Dịch vụ
            'dịch vụ': [
                '#services', 
                'Dịch vụ toàn diện', 
                'Tư vấn y tế',
                'Hỗ trợ visa',
                'Phiên dịch y tế'
            ],
            'tư vấn': [
                '#contact', 
                'Liên hệ tư vấn', 
                'Tư vấn miễn phí',
                'Tư vấn y tế chuyên sâu'
            ],
            'visa': [
                '#services', 
                'Hỗ trợ visa', 
                'Visa y tế',
                'Hỗ trợ Visa & Du lịch'
            ],
            
            // Phương pháp điều trị
            'xạ trị': [
                '#treatments', 
                'Xạ trị Tiên tiến', 
                'IMRT',
                'SBRT',
                'Xạ trị proton'
            ],
            'miễn dịch': [
                '#treatments', 
                'Liệu pháp Miễn dịch', 
                'Checkpoint inhibitors',
                'CAR-T cell therapy',
                'Vaccine ung thư'
            ],
            'phẫu thuật': [
                '#treatments', 
                'Phẫu thuật robot', 
                'da Vinci',
                'Phẫu thuật ít xâm lấn'
            ],
            
            // Nhật Bản
            'nhật bản': [
                '#about', 
                'Về MediJapan', 
                'Công nghệ y tế Nhật Bản',
                'Hệ thống y tế Nhật Bản'
            ],
            'japan': [
                '#about', 
                'Về MediJapan', 
                'Công nghệ y tế Nhật Bản'
            ]
        };
        
        // Search function
        function performSearch(query) {
            if (!query.trim()) return;
            
            const lowerQuery = query.toLowerCase();
            let foundResults = [];
            
            // Tìm kiếm trong searchData
            for (const [keyword, results] of Object.entries(searchData)) {
                if (keyword.includes(lowerQuery) || lowerQuery.includes(keyword)) {
                    foundResults.push(...results);
                }
            }
            
            // Tìm kiếm trong nội dung trang
            const pageContent = document.body.textContent.toLowerCase();
            if (pageContent.includes(lowerQuery)) {
                foundResults.push('Nội dung liên quan được tìm thấy');
            }
            
            // Hiển thị kết quả
            if (foundResults.length > 0) {
                showSearchResults(foundResults, query);
            } else {
                showNotification('Không tìm thấy kết quả cho "' + query + '"', 'info');
            }
        }
        
        // Debounced search
        const debouncedSearch = debounce(performSearch, 500);
        
        // Search input event
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length >= 2) {
                debouncedSearch(query);
            }
        });
        
        // Search button click
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }
});

// Show search results
function showSearchResults(results, query) {
    // Remove existing search results
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    // Loại bỏ kết quả trùng lặp
    const uniqueResults = [...new Set(results)];
    
    // Phân loại kết quả
    const hospitals = uniqueResults.filter(result => result.includes('Bệnh viện') || result.includes('Trung tâm') || result.includes('Viện'));
    const treatments = uniqueResults.filter(result => result.includes('Điều trị') || result.includes('Liệu pháp') || result.includes('Xạ trị') || result.includes('Thẩm mỹ'));
    const sections = uniqueResults.filter(result => result.startsWith('#'));
    const others = uniqueResults.filter(result => !result.includes('Bệnh viện') && !result.includes('Trung tâm') && !result.includes('Viện') && !result.includes('Điều trị') && !result.includes('Liệu pháp') && !result.includes('Xạ trị') && !result.includes('Thẩm mỹ') && !result.startsWith('#'));
    
    // Tạo HTML cho kết quả
    let resultsHTML = '';
    
    if (hospitals.length > 0) {
        resultsHTML += `
            <div class="search-category">
                <h5><i class="fas fa-hospital"></i> Bệnh viện chuyên môn</h5>
                ${hospitals.slice(0, 3).map(result => `
                    <div class="search-result-item" onclick="handleSearchResult('${result}')">
                        <i class="fas fa-search"></i>
                        <span>${result}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (treatments.length > 0) {
        resultsHTML += `
            <div class="search-category">
                <h5><i class="fas fa-stethoscope"></i> Phương pháp điều trị</h5>
                ${treatments.slice(0, 3).map(result => `
                    <div class="search-result-item" onclick="handleSearchResult('${result}')">
                        <i class="fas fa-search"></i>
                        <span>${result}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (sections.length > 0) {
        resultsHTML += `
            <div class="search-category">
                <h5><i class="fas fa-sitemap"></i> Danh mục</h5>
                ${sections.slice(0, 2).map(result => `
                    <div class="search-result-item" onclick="handleSearchResult('${result}')">
                        <i class="fas fa-search"></i>
                        <span>${result === '#treatments' ? 'Phương pháp điều trị' : result === '#hospitals' ? 'Bệnh viện đối tác' : result === '#services' ? 'Dịch vụ' : result === '#contact' ? 'Liên hệ' : result === '#about' ? 'Về chúng tôi' : result}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (others.length > 0) {
        resultsHTML += `
            <div class="search-category">
                <h5><i class="fas fa-info-circle"></i> Thông tin khác</h5>
                ${others.slice(0, 2).map(result => `
                    <div class="search-result-item" onclick="handleSearchResult('${result}')">
                        <i class="fas fa-search"></i>
                        <span>${result}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Create search results container
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.innerHTML = `
        <div class="search-results-header">
            <h4>Kết quả tìm kiếm cho "${query}" (${uniqueResults.length} kết quả)</h4>
            <button class="search-results-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="search-results-content">
            ${resultsHTML}
        </div>
    `;
    
    // Add styles
    searchResults.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        margin-top: 0.5rem;
        max-height: 400px;
        overflow-y: auto;
    `;
    
    // Add to search container
    const searchContainer = document.querySelector('.search-container');
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(searchResults);
    
    // Auto remove after 15 seconds
    setTimeout(() => {
        if (searchResults.parentElement) {
            searchResults.remove();
        }
    }, 15000);
}

// Handle search result click
function handleSearchResult(result) {
    // Remove search results
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
        searchResults.remove();
    }
    
    // Clear search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Navigate to section if it's a section link
    if (result.startsWith('#')) {
        scrollToSection(result.substring(1));
        showNotification('Đang chuyển đến ' + result, 'info');
    } else {
        showNotification('Kết quả: ' + result, 'info');
    }
}

// Add CSS for search results
const searchResultsStyles = document.createElement('style');
searchResultsStyles.textContent = `
    .search-results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .search-results-header h4 {
        margin: 0;
        color: #374151;
        font-size: 0.9rem;
    }
    
    .search-results-close {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .search-results-close:hover {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
    }
    
    .search-results-content {
        padding: 0.5rem 0;
    }
    
    .search-category {
        margin-bottom: 1rem;
    }
    
    .search-category:last-child {
        margin-bottom: 0;
    }
    
    .search-category h5 {
        margin: 0 0 0.5rem 1rem;
        color: #6b7280;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .search-category h5 i {
        margin-right: 0.5rem;
        color: #2563eb;
    }
    
    .search-result-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        border-left: 3px solid transparent;
    }
    
    .search-result-item:hover {
        background-color: #f3f4f6;
        border-left-color: #2563eb;
    }
    
    .search-result-item i {
        color: #6b7280;
        font-size: 0.8rem;
    }
    
    .search-result-item span {
        color: #374151;
        font-size: 0.9rem;
        flex: 1;
    }
    
    .search-result-item:hover span {
        color: #2563eb;
    }
`;
document.head.appendChild(searchResultsStyles); 