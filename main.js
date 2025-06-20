document.addEventListener('DOMContentLoaded', () => {
    // Chart.js eklentisini global olarak kaydet
    Chart.register(ChartDataLabels);

    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.section');
    const progressBar = document.getElementById('progressBar');
    const backToTopButton = document.getElementById('backToTop');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    const toggleSidebar = () => {
        const isActive = sidebar.classList.toggle('active');
        if (window.innerWidth <= 1024) {
            mainContent.style.filter = isActive ? 'blur(5px)' : 'none';
        }
    };

    menuToggle.addEventListener('click', toggleSidebar);
    
    const updateActiveLink = () => {
        let currentActiveSectionId = '';
        
        let minDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                 const distance = Math.abs(rect.top);
                 if (distance < minDistance) {
                     minDistance = distance;
                     currentActiveSectionId = section.id;
                 }
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentActiveSectionId) {
                link.classList.add('active');
            }
        });
    };


    function updateProgressBar() {
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollTotal <= 0) {
            progressBar.style.width = '0%';
            return;
        }
        const scrolled = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = `${scrolled}%`;
        
        let sidebarWidth = 0;
        if (window.innerWidth > 1024 && !sidebar.classList.contains('hidden') && !sidebar.classList.contains('active')) {
             sidebarWidth = sidebar.offsetWidth;
        }
        progressBar.style.left = `${sidebarWidth}px`;
    }

    const toggleBackToTop = () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    };

    window.addEventListener('scroll', () => {
        updateActiveLink();
        updateProgressBar();
        toggleBackToTop();
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                if (window.innerWidth <= 1024 && sidebar.classList.contains('active')) {
                   sidebar.classList.remove('active');
                   mainContent.style.filter = 'none';
                }
            }
        });
    });

    document.addEventListener('click', function(event) {
        const isSidebarActive = sidebar.classList.contains('active');
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);

        if (isSidebarActive && window.innerWidth <= 1024 && !isClickInsideSidebar && !isClickOnMenuToggle) {
            sidebar.classList.remove('active');
            mainContent.style.filter = 'none';
        }
    });

    // Initial state checks
    updateActiveLink();
    updateProgressBar();
    toggleBackToTop();

    // Chart.js Configuration
    Chart.defaults.font.family = "'Roboto', sans-serif";
    Chart.defaults.plugins.tooltip.boxPadding = 8;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.datalabels.color = '#fff';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.2)';
    Chart.defaults.color = '#F0F0F0';
    Chart.defaults.responsive = true;
    
    function getCssVarValue(varName) { return getComputedStyle(document.documentElement).getPropertyValue(varName).trim(); }

    // Chart Data & Colors
    const chartColors = ['#00BFB3', '#FFD166', '#EF476F', '#81A1C1', '#6ACCBC', '#B48EAD'];

    const competitorTrafficData = {
        labels: ['Megabad', 'Reuter', 'Bernstein', 'Badshop', 'Skybad', 'Emero'],
        monthlyVisits: [1200, 950, 233.6, 217.1, 202.6, 180.5]
    };
    const vitraSearchGermanyData = {
        labels: ['vitra waschbecken', 'vitra wc', 'vitra armatur', 'vitra spülkasten', 'vitra accessoires'],
        monthlySearchVolume: [590, 590, 320, 260, 170]
    };
    const trafficComparisonData = {
        channels: ['Direct', 'Organic', 'Paid', 'Referrals', 'Social', 'Email'],
        reuter: [32, 41, 19, 4, 2, 2],
        megabad: [50.75, 20.35, 15, 8, 2.5, 3.4]
    };
    const germanBathroomKeywordsData = {
        keywords: ['waschbecken', 'badmöbel', 'badewanne', 'duschkabine', 'spiegelschrank', 'badezimmer'],
        monthlyVolume: [74000, 44000, 43000, 35000, 23000, 40500],
        competitionLevel: ['Very High', 'High', 'High', 'Medium', 'Medium', 'High']
    };
    const megabadCustomerReviewsData = {
        Platform: ["Trusted Shops", "Google Reviews", "Trustpilot", "Idealo"],
        Rating: [4.7, 4.2, 3.8, 4.5],
        Total_Reviews: [25000, 1200, 85, 5000]
    };
    const keywordPerformanceData = {
         labels: ['megabad', 'badewanne', 'aufsatzwaschbecken', 'waschbecken', 'spiegelschrank bad'],
         traffic: [59200, 10044, 3670, 2662, 1158],
    };
    const pagePerformanceData = {
        labels: ['Ana Sayfa', 'Kategori Sayfaları', 'Ürün Sayfaları', 'Rehber (Ratgeber)', 'Diğer'],
        trafficPercent: [22, 35, 31, 8, 4],
    };
    const competitionMap = {
        'Very High': 'rgba(239, 71, 111, 0.7)',
        'High': 'rgba(255, 209, 102, 0.7)',
        'Medium': 'rgba(107, 122, 143, 0.7)'
    };

    const createChart = (canvasId, config) => {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (ctx) {
            if (Chart.getChart(canvasId)) {
                Chart.getChart(canvasId).destroy();
            }
            new Chart(ctx, config);
        }
    };

    const renderAllCharts = () => {
        // Rakip Trafik Analizi
        createChart('competitorTrafficAnalysisChart', {
            type: 'bar',
            data: {
                labels: competitorTrafficData.labels,
                datasets: [{
                    label: 'Aylık Ziyaretçi (Bin)',
                    data: competitorTrafficData.monthlyVisits,
                    backgroundColor: competitorTrafficData.labels.map((label, i) => label === 'Megabad' ? chartColors[0] : chartColors[i % chartColors.length]),
                }]
            },
            options: { 
                maintainAspectRatio: false,
                indexAxis: 'y', 
                plugins: { 
                    legend: { display: false }, 
                    title: { display: false }, 
                    datalabels: { 
                        color: '#fff', 
                        anchor: 'center', 
                        align: 'center',
                        font: { weight: 'bold' },
                        formatter: (v) => v.toLocaleString() + 'k' 
                    } 
                }, 
                scales: { 
                    x: { ticks: { color: getCssVarValue('--light-muted'), callback: (v) => v.toLocaleString() + 'k' } }, 
                    y: { ticks: { color: getCssVarValue('--light-muted') } } 
                } 
            }
        });

        // Müşteri Değerlendirmeleri
         createChart('customerReviewsChart', {
            type: 'doughnut',
            data: {
                labels: megabadCustomerReviewsData.Platform.map((p, i) => `${p} (${megabadCustomerReviewsData.Rating[i]}/5)`),
                datasets: [{
                    label: 'Değerlendirme Sayısı',
                    data: megabadCustomerReviewsData.Total_Reviews,
                    backgroundColor: chartColors,
                    borderColor: getCssVarValue('--card-bg'), 
                    borderWidth: 3
                }]
            },
            options: { 
                maintainAspectRatio: false, // Set to false to fit container
                plugins: { 
                    legend: { position: 'top', labels: {color: getCssVarValue('--light-muted')} }, 
                    title: { display: false }, 
                    datalabels: { 
                        formatter: (v, ctx) => (v * 100 / ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0)).toFixed(0) + "%", 
                        color: '#000', 
                        font: { weight: 'bold' } 
                    } 
                } 
            }
        });

        // Trafik Kanalı Karşılaştırması
        createChart('trafficChannelComparisonChart', {
            type: 'bar',
            data: {
                labels: trafficComparisonData.channels,
                datasets: [{
                    label: 'Megabad (%)', data: trafficComparisonData.megabad,
                    backgroundColor: chartColors[0]
                }, {
                    label: 'Reuter (%)', data: trafficComparisonData.reuter,
                    backgroundColor: chartColors[3]
                }]
            },
            options: { 
                maintainAspectRatio: false,
                plugins: { 
                    legend: { position: 'top', labels: {color: getCssVarValue('--light-muted')} }, 
                    title: { display: false }, 
                    datalabels: { 
                        formatter: (v) => v.toFixed(1) + '%', 
                        color: '#fff',
                        anchor: 'end',
                        align: 'top',
                        font: { weight: 'bold' }
                    } 
                }, 
                scales: { 
                    y: { ticks: { color: getCssVarValue('--light-muted'), callback: (v) => v + '%' } }, 
                    x: { ticks: { color: getCssVarValue('--light-muted') } } 
                } 
            }
        });

        // VitrA Markalı Aramalar
        createChart('vitraSearchVolumeChart', {
            type: 'bar',
            data: {
                labels: vitraSearchGermanyData.labels,
                datasets: [{
                    label: 'Aylık Arama Hacmi', 
                    data: vitraSearchGermanyData.monthlySearchVolume,
                    backgroundColor: chartColors
                }]
            },
            options: { 
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false }, 
                    title: { display: false }, 
                    datalabels: { 
                        anchor: 'end', 
                        align: 'top',
                        font: { weight: 'bold' },
                        color: '#fff' 
                    } 
                }, 
                scales: { 
                    x: { ticks: { color: getCssVarValue('--light-muted'), maxRotation: 45, minRotation: 30 } }, 
                    y: { ticks: { color: getCssVarValue('--light-muted') } } 
                } 
            }
        });
        
        // En Çok Trafik Getiren Kelimeler
        createChart('keywordTrafficChart', {
            type: 'bar',
            data: {
                 labels: keywordPerformanceData.labels,
                 datasets: [{
                    label: 'Tahmini Aylık Trafik',
                    data: keywordPerformanceData.traffic,
                    backgroundColor: chartColors
                 }]
            },
            options: { 
                maintainAspectRatio: false,
                indexAxis: 'y', 
                plugins: { 
                    legend: { display: false }, 
                    title: { display: false }, 
                    datalabels: { 
                        anchor: 'center', 
                        align: 'center',
                        font: { weight: 'bold' },
                        color: '#000',
                        formatter: v => v.toLocaleString() 
                    } 
                }, 
                scales: { 
                    x: { ticks: { color: getCssVarValue('--light-muted'), callback: v => v.toLocaleString() } }, 
                    y: { ticks: { color: getCssVarValue('--light-muted') } } 
                } 
            }
        });

        // Organik Trafik Dağılımı
        createChart('pageTrafficChart', {
            type: 'pie',
            data: {
                labels: pagePerformanceData.labels,
                datasets: [{
                    label: 'Trafik Yüzdesi (%)',
                    data: pagePerformanceData.trafficPercent,
                    backgroundColor: chartColors
                }]
            },
            options: { 
                maintainAspectRatio: false, // Set to false to fit container
                plugins: { 
                    legend: { position: 'top', labels: {color: getCssVarValue('--light-muted')} }, 
                    title: { display: false }, 
                    datalabels: { 
                        formatter: (v) => v + '%', 
                        color: '#000', 
                        font: { weight: 'bold' } 
                    } 
                } 
            }
        });
        
        // Keyword Bubble Chart
        createChart('germanBathroomKeywordsBubbleChart', {
            type: 'bubble',
            data: {
                datasets: germanBathroomKeywordsData.keywords.map((kw, i) => ({
                    label: kw,
                    data: [{
                        x: germanBathroomKeywordsData.monthlyVolume[i],
                        y: Math.random() * 100,
                        r: Math.sqrt(germanBathroomKeywordsData.monthlyVolume[i] / 500)
                    }],
                    backgroundColor: competitionMap[germanBathroomKeywordsData.competitionLevel[i]]
                }))
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: { display: false },
                    tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.raw.x.toLocaleString()} (Hacim)` } },
                    datalabels: {
                        color: '#fff', font: { weight: 'bold', size: 10 },
                        formatter: (v, ctx) => ctx.dataset.label
                    }
                },
                scales: {
                    x: { title: { display: true, text: 'Aylık Arama Hacmi', color: getCssVarValue('--light-muted') }, ticks: { color: getCssVarValue('--light-muted'), callback: v => (v/1000)+'k' } },
                    y: { display: false }
                }
            }
        });
    };

    renderAllCharts();
    window.addEventListener('resize', renderAllCharts);
});
