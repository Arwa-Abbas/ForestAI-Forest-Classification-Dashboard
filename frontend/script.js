
let featureChart, distributionChart, elevationChart;
let totalPredictions = 0;
let isLoading = false;

const coverTypes = {
    1: {
        name: "Spruce/Fir",
        description: "Dense stands of spruce and fir trees, typically found at higher elevations with cool, moist conditions. These forests are characterized by their tolerance to cold temperatures and ability to thrive in areas with heavy snowfall.",
        icon: "fas fa-tree",
        color: "#166534",
        characteristics: ["Cool Climate", "High Elevation", "Dense Canopy", "Snow Tolerant"]
    },
    2: {
        name: "Lodgepole Pine",
        description: "Even-aged stands of lodgepole pine, often resulting from fire disturbance and regeneration cycles. These forests are known for their straight, slender trunks and ability to quickly colonize burned areas.",
        icon: "fas fa-tree",
        color: "#15803d",
        characteristics: ["Fire Adapted", "Even-aged", "Fast Growing", "Post-fire Regeneration"]
    },
    3: {
        name: "Ponderosa Pine",
        description: "Open stands of large ponderosa pine trees with grassy understory, found in drier locations. These forests feature widely spaced mature trees with distinctive orange-red bark.",
        icon: "fas fa-tree",
        color: "#16a34a",
        characteristics: ["Dry Climate", "Open Canopy", "Large Trees", "Fire Resistant"]
    },
    4: {
        name: "Cottonwood/Willow",
        description: "Riparian zones with cottonwood and willow trees along stream courses and wet areas. These forests depend on seasonal flooding and high water tables for survival.",
        icon: "fas fa-tree",
        color: "#22c55e",
        characteristics: ["Riparian", "Near Water", "Flood Tolerant", "Deciduous"]
    },
    5: {
        name: "Aspen",
        description: "Quaking aspen forests, often forming clones through root sprouting, with distinctive white bark. These deciduous forests create stunning golden displays in autumn.",
        icon: "fas fa-tree",
        color: "#4ade80",
        characteristics: ["Deciduous", "Clonal Growth", "White Bark", "Autumn Colors"]
    },
    6: {
        name: "Douglas-fir",
        description: "Douglas-fir dominated forests, common in montane environments with moderate moisture. These versatile conifers are important for both ecological and economic reasons.",
        icon: "fas fa-tree",
        color: "#65e89a",
        characteristics: ["Moderate Climate", "Montane", "Versatile", "Economically Important"]
    },
    7: {
        name: "Krummholz",
        description: "Stunted, twisted trees at alpine treelines, shaped by harsh wind and weather conditions. These hardy survivors represent the extreme limits of tree growth.",
        icon: "fas fa-tree",
        color: "#86efac",
        characteristics: ["Wind Exposed", "Alpine", "Stunted Growth", "Extreme Conditions"]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeCharts();
    initializeForm();
    initializeSliders();
    populateSoilTypes();
    startAnimations();
});

// Initialize particle background
function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#2dd4bf', '#a7f3d0', '#10b981']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2dd4bf',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Initialize charts
function initializeCharts() {
    initializeFeatureImportanceChart();
    initializeDistributionChart();
    initializeElevationChart();
}

function initializeFeatureImportanceChart() {
    const ctx = document.getElementById('feature-importance-chart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#2dd4bf');
    gradient.addColorStop(1, '#0d9488');
    
    featureChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Elevation', 'Aspect', 'Slope', 'Hydrology H', 'Hydrology V', 'Roadways', 'Hillshade 9AM', 'Hillshade Noon', 'Hillshade 3PM', 'Fire Points'],
            datasets: [{
                label: 'Importance Score',
                data: [0.18, 0.06, 0.08, 0.09, 0.07, 0.11, 0.05, 0.06, 0.07, 0.12],
                backgroundColor: gradient,
                borderColor: '#2dd4bf',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 61, 46, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#d1d5db',
                    borderColor: '#2dd4bf',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Importance: ${(context.parsed.y * 100).toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 0.2,
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#9ca3af',
                        maxRotation: 45
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initializeDistributionChart() {
    const ctx = document.getElementById('distribution-chart').getContext('2d');
    
    distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Spruce/Fir', 'Lodgepole Pine', 'Ponderosa Pine', 'Cottonwood/Willow', 'Aspen', 'Douglas-fir', 'Krummholz'],
            datasets: [{
                data: [36.5, 28.7, 14.2, 2.8, 9.6, 6.2, 2.0],
                backgroundColor: [
                    '#166534', '#15803d', '#16a34a', 
                    '#22c55e', '#4ade80', '#65e89a', '#86efac'
                ],
                borderColor: '#0f0f0f',
                borderWidth: 3,
                hoverBorderWidth: 4,
                hoverBorderColor: '#2dd4bf'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#d1d5db',
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 61, 46, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#d1d5db',
                    borderColor: '#2dd4bf',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

function initializeElevationChart() {
    const ctx = document.getElementById('elevation-chart').getContext('2d');
    
    // Sample elevation distribution data
    const elevationData = [
        { elevation: 1900, spruce: 5, lodgepole: 15, ponderosa: 35, cottonwood: 25, aspen: 15, douglas: 5, krummholz: 0 },
        { elevation: 2200, spruce: 15, lodgepole: 25, ponderosa: 25, cottonwood: 15, aspen: 15, douglas: 5, krummholz: 0 },
        { elevation: 2500, spruce: 25, lodgepole: 30, ponderosa: 15, cottonwood: 10, aspen: 15, douglas: 5, krummholz: 0 },
        { elevation: 2800, spruce: 35, lodgepole: 25, ponderosa: 10, cottonwood: 5, aspen: 20, douglas: 5, krummholz: 0 },
        { elevation: 3100, spruce: 45, lodgepole: 20, ponderosa: 5, cottonwood: 0, aspen: 25, douglas: 5, krummholz: 0 },
        { elevation: 3400, spruce: 40, lodgepole: 15, ponderosa: 0, cottonwood: 0, aspen: 15, douglas: 10, krummholz: 20 },
        { elevation: 3700, spruce: 25, lodgepole: 5, ponderosa: 0, cottonwood: 0, aspen: 5, douglas: 15, krummholz: 50 }
    ];
    
    elevationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: elevationData.map(d => d.elevation + 'm'),
            datasets: [
                {
                    label: 'Spruce/Fir',
                    data: elevationData.map(d => d.spruce),
                    borderColor: '#166534',
                    backgroundColor: 'rgba(22, 101, 52, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Lodgepole Pine',
                    data: elevationData.map(d => d.lodgepole),
                    borderColor: '#15803d',
                    backgroundColor: 'rgba(21, 128, 61, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Krummholz',
                    data: elevationData.map(d => d.krummholz),
                    borderColor: '#86efac',
                    backgroundColor: 'rgba(134, 239, 172, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#d1d5db',
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 61, 46, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#d1d5db',
                    borderColor: '#2dd4bf',
                    borderWidth: 1,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Initialize form functionality
function initializeForm() {
    const form = document.getElementById('prediction-form');
    const resetBtn = document.getElementById('reset-btn');
    
    form.addEventListener('submit', handlePrediction);
    resetBtn.addEventListener('click', resetForm);
    
    // Add form validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

// Initialize slider-input synchronization
function initializeSliders() {
    const sliderPairs = [
        { slider: 'elevation-slider', input: 'elevation' },
        { slider: 'aspect-slider', input: 'aspect' },
        { slider: 'slope-slider', input: 'slope' },
        { slider: 'hydrology-h-slider', input: 'horizontal_hydrology' },
        { slider: 'hydrology-v-slider', input: 'vertical_hydrology' },
        { slider: 'roadways-slider', input: 'horizontal_roadways' },
        { slider: 'hillshade-9-slider', input: 'hillshade_9am' },
        { slider: 'hillshade-12-slider', input: 'hillshade_noon' },
        { slider: 'hillshade-15-slider', input: 'hillshade_3pm' },
        { slider: 'fire-slider', input: 'horizontal_fire' }
    ];
    
    sliderPairs.forEach(pair => {
        const slider = document.getElementById(pair.slider);
        const input = document.getElementById(pair.input);
        
        if (slider && input) {
            slider.addEventListener('input', function() {
                input.value = this.value;
                animateSliderChange(this);
            });
            
            input.addEventListener('input', function() {
                slider.value = this.value;
                animateSliderChange(slider);
            });
        }
    });
}

function animateSliderChange(slider) {
    slider.style.transform = 'scale(1.02)';
    setTimeout(() => {
        slider.style.transform = 'scale(1)';
    }, 100);
}

// Populate soil types
function populateSoilTypes() {
    const select = document.getElementById('soil_type');
    select.innerHTML = '';
    
    for (let i = 1; i <= 40; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Soil Type ${i.toString().padStart(2, '0')}`;
        select.appendChild(option);
    }
}

async function handlePrediction(e) {
    e.preventDefault();
    
    if (isLoading) return;
    
    isLoading = true;
    showLoadingState();
    
    try {
        const formData = new FormData(e.target);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = isNaN(value) ? value : Number(value);
        });
        
        const processedData = processFormData(data);

        const response = await fetch('https://your-backend-url/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(processedData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
 
        displayPredictionResult(result);
        const predictedClass = result.predicted_cover_type;
        const probabilities = result.probabilities;
        const confidence = Math.max(...probabilities);
        updateTotalPredictions();
        try {
            const importanceResponse = await fetch('/feature_importance');
            if (importanceResponse.ok) {
                const importanceData = await importanceResponse.json();
                updateFeatureImportanceChart(importanceData);
            }
        } catch (importanceError) {
            console.warn('Could not fetch feature importance:', importanceError);
        }
        
    } catch (error) {
        console.error('Prediction error:', error);
        showErrorState(error.message || 'An error occurred during prediction');
    } finally {
        isLoading = false;
        hideLoadingState();
    }
}

function updateFeatureImportanceChart(importanceData) {
    // Convert the importance data object to an array
    const importanceValues = Object.values(importanceData);
    
    // Update the chart data
    featureChart.data.datasets[0].data = importanceValues;
    featureChart.update();
}

// Process form data for API
function processFormData(data) {
    const wildernessValue = parseInt(data['Wilderness_Area']);
    const soilValue = parseInt(data['Soil_Type']);
    

    delete data['Wilderness_Area'];
    delete data['Soil_Type'];

    for (let i = 1; i <= 4; i++) {
        data[`Wilderness_Area${i}`] = i === wildernessValue ? 1 : 0;
    }
 
    for (let i = 1; i <= 40; i++) {
        data[`Soil_Type${i}`] = i === soilValue ? 1 : 0;
    }
    
    return data;
}

async function simulatePrediction(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let predictedType = 1;
    
    if (data.Elevation > 3200) {
        predictedType = Math.random() > 0.5 ? 7 : 1; 
    } else if (data.Elevation > 2800) {
        predictedType = Math.random() > 0.3 ? 1 : 5; 
    } else if (data.Elevation > 2400) {
        predictedType = Math.random() > 0.4 ? 2 : 6; 
    } else if (data.Horizontal_Distance_To_Hydrology < 100) {
        predictedType = 4; 
    } else {
        predictedType = Math.random() > 0.5 ? 3 : 2; 
    }
    
    const confidence = Math.random() * 0.25 + 0.7; 
    
    // Generate probability distribution
    const probabilities = Array(7).fill(0).map(() => Math.random() * 0.1);
    probabilities[predictedType - 1] = confidence;
    
    // Normalize probabilities
    const sum = probabilities.reduce((a, b) => a + b, 0);
    const normalizedProbs = probabilities.map(p => p / sum);
    
    return {
        predicted_cover_type: predictedType,
        confidence: confidence,
        probabilities: normalizedProbs
    };
}

// Display prediction results
function displayPredictionResult(result) {
    const { predicted_cover_type, confidence, probabilities } = result;
    const coverType = coverTypes[predicted_cover_type];
    
    // Hide placeholder and show results
    document.getElementById('result-placeholder').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    // Update prediction display
    document.getElementById('prediction-result').textContent = predicted_cover_type;
    document.getElementById('cover-type-name').textContent = coverType.name;
    document.getElementById('cover-type-description').textContent = coverType.description;
    
    // Update confidence
    const confidencePercentage = Math.round(confidence * 100);
    document.getElementById('confidence-value').textContent = `${confidencePercentage}%`;
    document.getElementById('confidence-fill').style.width = `${confidencePercentage}%`;
    
    // Update confidence badge
    const confidenceBadge = document.getElementById('confidence-badge');
    const confidenceText = document.getElementById('confidence-text');
    
    if (confidence > 0.8) {
        confidenceBadge.className = 'confidence-badge high';
        confidenceText.textContent = 'High Confidence';
    } else if (confidence > 0.6) {
        confidenceBadge.className = 'confidence-badge medium';
        confidenceText.textContent = 'Medium Confidence';
    } else {
        confidenceBadge.className = 'confidence-badge low';
        confidenceText.textContent = 'Low Confidence';
    }
    
    // Update probability bars
    updateProbabilityBars(probabilities);
    
    // Animate result container
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.add('animate-fade-in');
    
    // Update cover type icon
    const coverTypeIcon = document.getElementById('cover-type-icon');
    coverTypeIcon.innerHTML = `<i class="${coverType.icon}"></i>`;
    coverTypeIcon.style.background = `linear-gradient(135deg, ${coverType.color}, #2dd4bf)`;
}

// Update probability distribution bars
function updateProbabilityBars(probabilities) {
    const container = document.getElementById('probability-bars');
    container.innerHTML = '';
    
    Object.keys(coverTypes).forEach((type, index) => {
        const probability = probabilities[index];
        const percentage = Math.round(probability * 100);
        
        const barElement = document.createElement('div');
        barElement.className = 'probability-bar';
        barElement.innerHTML = `
            <div class="probability-label">${coverTypes[type].name}</div>
            <div class="probability-track">
                <div class="probability-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="probability-value">${percentage}%</div>
        `;
        
        container.appendChild(barElement);
        
        // Animate bar fill
        setTimeout(() => {
            const fill = barElement.querySelector('.probability-fill');
            fill.style.transition = 'width 1s ease-out';
        }, index * 100);
    });
}

// Form validation
function validateInput(e) {
    const input = e.target;
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    if (isNaN(value) || value < min || value > max) {
        showInputError(input, `Value must be between ${min} and ${max}`);
    } else {
        clearInputError(input);
    }
}

function showInputError(input, message) {
    clearInputError(input);
    
    input.style.borderColor = '#ef4444';
    const errorElement = document.createElement('div');
    errorElement.className = 'input-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    
    input.parentNode.appendChild(errorElement);
}

function clearInputError(input) {
    input.style.borderColor = '';
    const errorElement = input.parentNode.querySelector('.input-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearValidationError(e) {
    clearInputError(e.target);
}

// Reset form
function resetForm() {
    const form = document.getElementById('prediction-form');
    form.reset();
    
    // Reset sliders to default values
    document.getElementById('elevation-slider').value = 2000;
    document.getElementById('elevation').value = 2000;
    document.getElementById('aspect-slider').value = 180;
    document.getElementById('aspect').value = 180;

    
    // Hide results
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('result-placeholder').style.display = 'block';
    
    // Clear validation errors
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(clearInputError);
    
    // Animate reset
    form.classList.add('animate-fade-in');
    setTimeout(() => form.classList.remove('animate-fade-in'), 600);
}

// Loading states
function showLoadingState() {
    const btn = document.getElementById('predict-btn');
    btn.classList.add('loading');
    btn.disabled = true;
    
    const form = document.querySelector('.prediction-inputs');
    form.classList.add('loading');
}

function hideLoadingState() {
    const btn = document.getElementById('predict-btn');
    btn.classList.remove('loading');
    btn.disabled = false;
    
    const form = document.querySelector('.prediction-inputs');
    form.classList.remove('loading');
}

function showErrorState() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ef4444; margin-bottom: 1rem;"></i>
            <h4>Prediction Error</h4>
            <p>An error occurred while making the prediction. Please check your inputs and try again.</p>
        </div>
    `;
    resultContainer.style.display = 'block';
    document.getElementById('result-placeholder').style.display = 'none';
}

// Update prediction counter
function updateTotalPredictions() {
    totalPredictions++;
    const counter = document.getElementById('total-predictions');
    
    // Animate counter
    let start = totalPredictions - 1;
    const duration = 500;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + progress * (totalPredictions - start));
        
        counter.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Start background animations
function startAnimations() {
    // Animate hero stats periodically
    setInterval(() => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    stat.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }, 5000);
    
    // Animate tree icons
    setInterval(() => {
        const trees = document.querySelectorAll('.tree-icon');
        trees.forEach((tree, index) => {
            setTimeout(() => {
                tree.style.color = '#a7f3d0';
                setTimeout(() => {
                    tree.style.color = '#2dd4bf';
                }, 500);
            }, index * 200);
        });
    }, 8000);
}

// Chart refresh functionality
document.addEventListener('DOMContentLoaded', function() {
    const refreshBtn = document.getElementById('refresh-charts');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.querySelector('i').style.animation = 'spin 1s linear';
            
            // Refresh charts with new data
            setTimeout(() => {
                if (featureChart) featureChart.update();
                if (distributionChart) distributionChart.update();
                if (elevationChart) elevationChart.update();
                
                this.querySelector('i').style.animation = '';
            }, 1000);
        });
    }
});

// Cover type card interactions
document.addEventListener('DOMContentLoaded', function() {
    const coverTypeCards = document.querySelectorAll('.cover-type-card');
    
    coverTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.dataset.type;
            highlightCoverType(type);
        });
    });
});

function highlightCoverType(type) {
    // Remove previous highlights
    document.querySelectorAll('.cover-type-card').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Add highlight to selected card
    const selectedCard = document.querySelector(`[data-type="${type}"]`);
    if (selectedCard) {
        selectedCard.classList.add('highlighted');
        
        // Scroll to card
        selectedCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            selectedCard.classList.remove('highlighted');
        }, 3000);
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const target = this.getAttribute('href');
            if (target.startsWith('#')) {
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Chart toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const chartToggles = document.querySelectorAll('.chart-toggle');
    
    chartToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const chartType = this.dataset.chart;
            
            // Remove active class from siblings
            this.parentNode.querySelectorAll('.chart-toggle').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked toggle
            this.classList.add('active');
            
            // Update chart based on type
            updateChartDisplay(chartType);
        });
    });
});

function updateChartDisplay(chartType) {
    // Animate chart transition
    const chartContainer = document.querySelector(`[data-chart="${chartType}"]`).closest('.chart-card');
    chartContainer.style.opacity = '0.5';
    
    setTimeout(() => {
        // Update chart data here based on chartType
        chartContainer.style.opacity = '1';
    }, 300);
}


document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            updateParameterPreview();
            validateRange(this);
        });
    });
});

function updateParameterPreview() {
    const elevation = parseFloat(document.getElementById('elevation').value) || 0;
    const slope = parseFloat(document.getElementById('slope').value) || 0;
    
    // Update hero stats with current parameters
    const elevationStat = document.querySelector('.stat-value');
    if (elevation > 0) {
        elevationStat.textContent = elevation + 'm';
    }
}

function validateRange(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    if (value < min || value > max) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    } else {
        input.style.borderColor = '#2dd4bf';
        input.style.boxShadow = '0 0 0 3px rgba(45, 212, 191, 0.1)';
    }
}

// Advanced animations
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 5; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'floating-leaf';
        leaf.innerHTML = '<i class="fas fa-leaf"></i>';
        leaf.style.cssText = `
            position: absolute;
            color: rgba(45, 212, 191, 0.3);
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 15}s infinite linear;
            z-index: 1;
        `;
        
        hero.appendChild(leaf);
    }
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .cover-type-card.highlighted {
        border-color: #2dd4bf;
        box-shadow: 0 0 20px rgba(45, 212, 191, 0.3);
        transform: translateY(-5px) scale(1.02);
    }
    
    .confidence-badge.high {
        background: #10b981;
    }
    
    .confidence-badge.medium {
        background: #f59e0b;
    }
    
    .confidence-badge.low {
        background: #ef4444;
    }
    
    .error-state {
        text-align: center;
        padding: 2rem;
        color: #9ca3af;
    }
    
    .error-state h4 {
        color: #ef4444;
        margin-bottom: 0.5rem;
    }
`;

document.head.appendChild(style);

// Initialize floating elements
setTimeout(createFloatingElements, 1000);

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Advanced chart interactions
document.addEventListener('DOMContentLoaded', function() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.card, .stat-card, .cover-type-card');
    elementsToAnimate.forEach(el => observer.observe(el));
});


function generateAdvancedAnalytics(result) {
    const { predicted_cover_type, confidence, probabilities } = result;
 
    const features = ['Elevation', 'Aspect', 'Slope', 'Hydrology H', 'Hydrology V', 'Roadways', 'Hillshade 9AM', 'Hillshade Noon', 'Hillshade 3PM', 'Fire Points'];
    const currentImportance = featureChart.data.datasets[0].data;

    const newImportance = currentImportance.map((value, index) => {
        const variation = (Math.random() - 0.5) * 0.02;
        return Math.max(0, Math.min(0.3, value + variation));
    });
    
    featureChart.data.datasets[0].data = newImportance;
    featureChart.update('active');
}


document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.querySelector('.header-actions .btn-secondary');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportPredictionData();
        });
    }
});



function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#2dd4bf'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
 
    const form = document.getElementById('prediction-form');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            saveFormState();
            showNotification('Parameters auto-saved', 'info');
        });
    });

    loadFormState();
});

function saveFormState() {
    const form = document.getElementById('prediction-form');
    const formData = new FormData(form);
    const state = {};
    
    formData.forEach((value, key) => {
        state[key] = value;
    });
    

    window.savedFormState = state;
}

function loadFormState() {
    if (window.savedFormState) {
        const state = window.savedFormState;
        
        Object.keys(state).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = state[key];
                

                const slider = document.querySelector(`#${input.id}-slider`);
                if (slider) {
                    slider.value = state[key];
                }
            }
        });
    }
}


let performanceMetrics = {
    predictionTimes: [],
    chartRenderTimes: [],
    userInteractions: 0
};

function trackPerformance(operation, startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (operation === 'prediction') {
        performanceMetrics.predictionTimes.push(duration);
    } else if (operation === 'chart') {
        performanceMetrics.chartRenderTimes.push(duration);
    }
    

    updatePerformanceDisplay();
}

function updatePerformanceDisplay() {
    const avgPredictionTime = performanceMetrics.predictionTimes.length > 0 
        ? performanceMetrics.predictionTimes.reduce((a, b) => a + b) / performanceMetrics.predictionTimes.length 
        : 0;
    

    const speedStat = document.querySelector('.stat-card:last-child .stat-value');
    if (speedStat && avgPredictionTime > 0) {
        speedStat.textContent = (avgPredictionTime / 1000).toFixed(2) + 's';
    }
}

function initializeThemeCustomization() {

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2dd4bf, #a7f3d0);
        border: none;
        color: #0a3d2e;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', function() {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        cycleAccentColor();
    });
    
    document.body.appendChild(themeToggle);
}

function cycleAccentColor() {
    const colors = ['#2dd4bf', '#10b981', '#059669', '#047857', '#065f46'];
    const currentIndex = colors.indexOf(getComputedStyle(document.documentElement).getPropertyValue('--accent-green').trim());
    const nextIndex = (currentIndex + 1) % colors.length;
    
    document.documentElement.style.setProperty('--accent-green', colors[nextIndex]);
    

    setTimeout(() => {
        if (featureChart) featureChart.update();
        if (distributionChart) distributionChart.update();
        if (elevationChart) elevationChart.update();
    }, 100);
}


setTimeout(initializeThemeCustomization, 2000);

document.addEventListener('keydown', function(e) {
 
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const form = document.getElementById('prediction-form');
        if (form && !isLoading) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    

    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        resetForm();
    }
  
    if (e.key === 'Escape') {
        const resultContainer = document.getElementById('result-container');
        if (resultContainer.style.display !== 'none') {
            resultContainer.style.display = 'none';
            document.getElementById('result-placeholder').style.display = 'block';
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
});

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(10, 61, 46, 0.95);
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 10000;
        border: 1px solid #2dd4bf;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        transform: translateY(-10px);
        opacity: 0;
        transition: all 0.2s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);
    
    e.target.tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target.tooltip) {
        const tooltip = e.target.tooltip;
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 200);
        
        delete e.target.tooltip;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
 
    console.log('Forest Classification Dashboard initialized successfully!');

    document.addEventListener('click', () => {
        performanceMetrics.userInteractions++;
    });

});
