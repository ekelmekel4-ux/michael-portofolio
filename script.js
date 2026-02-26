/**
 * Michael Portfolio - Logic & Interaction
 */

// --- DATA STATIC ---
// Data otomatis diperbarui dari dokumen sertifikat yang diunggah
const DEFAULT_DATA = {
    certificates: [
        { 
            title: "Designing User Interfaces and Experiences (UI/UX)", 
            meta: "IBM • 2025", 
            url: "https://coursera.org/verify/ULNEGA8JDP13" 
        },
        { 
            title: "Introduction to Information Technology and AWS Cloud", 
            meta: "Amazon Web Services • 2024", 
            url: "https://coursera.org/verify/WPO7NKECMXC1" 
        },
        { 
            title: "Foundations of Digital Marketing and E-commerce", 
            meta: "Google • 2025", 
            url: "https://coursera.org/verify/410LPB01BBB5" 
        },
        { 
            title: "Building and Managing User Interfaces", 
            meta: "Packt • 2025", 
            url: "https://coursera.org/verify/TE4214DO8D26" 
        },
        { 
            title: "Introduction to Agile Development and Scrum", 
            meta: "IBM • 2025", 
            url: "https://coursera.org/verify/0ILA0GPCG65R" 
        },
        { 
            title: "Python for Beginners: Data Structures", 
            meta: "Coursera Project Network • 2025", 
            url: "https://coursera.org/verify/8914WI8G63Y7" 
        },
        { 
            title: "Digital Business Models", 
            meta: "Lund University • 2025", 
            url: "https://coursera.org/verify/CGCKPPOSWZPX" 
        },
        { 
            title: "English for Science, Technology, Engineering, and Mathematics", 
            meta: "University of Pennsylvania • 2025", 
            url: "https://coursera.org/verify/PBD4UUKAKXA5" 
        },
        { 
            title: "Ecosystem Services: a Method for Sustainable Development", 
            meta: "University of Geneva • 2025", 
            url: "https://coursera.org/verify/L2AXZA02NA23" 
        },
        { 
            title: "Python Data Structures", 
            meta: "University of Michigan • 2024", 
            url: "file:///C:/Users/Samuel/Documents/file%20Michael/file%20kuliah/Biodata/sertifikat%20coursera/sertifikat%20python%20data%20structures%20(Michael).pdf" 
        }
    ],
    publications: [
        { 
            title: "Antara Script dan Frustrasi: Strategi Menghadapi Tantangan Coding", 
            meta: "Campus Tech Review • 2024", 
            url: "https://kumparan.com/michael-ekel/245mBn1nmPv?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=3ix1tQHbGHMN" 
        }
    ],
    projects: [
        { 
            title: "Church Management", 
            description: "Sistem administrasi terintegrasi untuk mengelola data jemaat, kegiatan, dan catatan keuangan dengan dashboard admin yang intuitif.", 
            tech: "PHP, MySQL", 
            url: "https://github.com/ekelmekel4-ux/Church-managment-base-mvc-", 
            image: "Daftar Jadwal Ibadah CRUD.png" 
        },
        { 
            title: "Product Catalog", 
            description: "Sistem katalog efisien untuk mengorganisir informasi produk, pelacakan stok, dan manajemen inventaris terkategori.", 
            tech: "CodeIgniter 3, MVC", 
            url: "https://github.com/michael-4129a7257", 
            image: "home.png" 
        }
    ]
};
// --- LOCAL STORAGE MANAGEMENT ---
const STORAGE_KEY = 'michael_portfolio_data';

function getStoredData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Error reading from localStorage:', e);
    }
    return null;
}

function saveData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Error saving to localStorage:', e);
    }
    // Update MY_DATA reference
    if (typeof MY_DATA !== 'undefined') {
        MY_DATA.certificates = data.certificates || [];
        MY_DATA.publications = data.publications || [];
        MY_DATA.projects = data.projects || [];
    }
}

function initializeData() {
    const stored = getStoredData();
    if (stored && stored.certificates && stored.publications && stored.projects) {
        return stored;
    }
    // Simpan data default ke localStorage jika tidak ada data tersimpan
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    } catch (e) {
        console.warn('Error saving default data:', e);
    }
    return DEFAULT_DATA;
}

// --- DATA OBJECT ---
let MY_DATA = initializeData();

// --- RENDER DATA ---
function renderCredentials() {
    const certList = document.getElementById('certificates-list');
    const pubList = document.getElementById('publications-list');

    if (certList) {
        certList.innerHTML = MY_DATA.certificates.map((item, index) => `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card-clean p-6 flex justify-between items-center group no-underline">
                <div>
                    <h4 class="font-bold text-sm mb-1 text-black group-hover:text-indigo-600 transition-colors">${item.title}</h4>
                    <p class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">${item.meta}</p>
                </div>
                <div class="text-zinc-300 group-hover:text-black transition-colors">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                </div>
            </a>
        `).join('');
    }

    if (pubList) {
        pubList.innerHTML = MY_DATA.publications.map((item, index) => `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card-clean p-6 flex justify-between items-center group no-underline">
                <div>
                    <h4 class="font-bold text-sm mb-1 text-black group-hover:text-emerald-600 transition-colors">${item.title}</h4>
                    <p class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">${item.meta}</p>
                </div>
                <div class="text-zinc-300 group-hover:text-black transition-colors">
                    <i data-lucide="link" class="w-4 h-4"></i>
                </div>
            </a>
        `).join('');
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    if (!projectsList) return;

    projectsList.innerHTML = MY_DATA.projects.map((item, index) => `
        <a href="${item.url}" target="_blank" class="group reveal block no-underline" style="${index % 2 === 1 ? 'transition-delay: 150ms;' : ''}">
            <div class="rounded-[3rem] bg-zinc-100 aspect-video mb-10 overflow-hidden relative border border-zinc-100 flex items-center justify-center">
                ${item.image ? 
                    `<img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700">` :
                    `<div class="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-700"></div>
                     <i data-lucide="folder" class="w-24 h-24 text-zinc-200 group-hover:text-indigo-200 group-hover:scale-110 transition-all duration-700"></i>`
                }
                <div class="absolute bottom-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <div class="bg-white p-4 rounded-full shadow-xl text-black"><i data-lucide="arrow-up-right" class="w-5 h-5"></i></div>
                </div>
            </div>
            <div class="flex justify-between items-start mb-6">
                <h3 class="text-3xl font-extrabold group-hover:text-indigo-600 transition-colors">${item.title}</h3>
                <div class="flex gap-2">
                    ${item.tech.split(',').map(t => `<span class="text-[9px] font-bold px-4 py-1.5 border border-zinc-200 rounded-full uppercase tracking-widest">${t.trim()}</span>`).join('')}
                </div>
            </div>
            <p class="text-zinc-500 text-lg leading-relaxed mb-8">${item.description}</p>
        </a>
    `).join('');

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// --- CRUD FUNCTIONS ---

// Certificates CRUD
function addCertificate(title, meta, url) {
    MY_DATA.certificates.push({ title, meta, url });
    saveData(MY_DATA);
    renderCredentials();
    renderAdminPanel();
}

function updateCertificate(index, title, meta, url) {
    MY_DATA.certificates[index] = { title, meta, url };
    saveData(MY_DATA);
    renderCredentials();
    renderAdminPanel();
}

function deleteCertificate(index) {
    MY_DATA.certificates.splice(index, 1);
    saveData(MY_DATA);
    renderCredentials();
    renderAdminPanel();
}

// Publications CRUD
function addPublication(title, meta, url) {
    MY_DATA.publications.push({ title, meta, url });
    saveData(MY_DATA);
    renderCredentials();
    renderAdminPanel();
}

function updatePublication(index, title, meta, url) {
    MY_DATA.publications[index] = { title, meta, url };
    saveData(MY_DATA);
    renderCredentials();
    renderAdminPanel();
}

function deletePublication(index) {
    MY_DATA.publications.splice(index, 1);
    saveData(MY_DATA);
    renderCredentials();
    renderAdminPanel();
}

// Projects CRUD
function addProject(title, description, tech, url, image) {
    MY_DATA.projects.push({ title, description, tech, url, image });
    saveData(MY_DATA);
    renderProjects();
    renderAdminPanel();
}

function updateProject(index, title, description, tech, url, image) {
    MY_DATA.projects[index] = { title, description, tech, url, image };
    saveData(MY_DATA);
    renderProjects();
    renderAdminPanel();
}

function deleteProject(index) {
    MY_DATA.projects.splice(index, 1);
    saveData(MY_DATA);
    renderProjects();
    renderAdminPanel();
}

// --- ADMIN PANEL ---
let isAdminOpen = false;

function toggleAdminPanel() {
    const panel = document.getElementById('admin-panel');
    isAdminOpen = !isAdminOpen;
    if (isAdminOpen) {
        panel.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        panel.classList.remove('active');
        document.body.style.overflow = '';
    }
    renderAdminPanel();
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function renderAdminPanel() {
    const panel = document.getElementById('admin-content');
    if (!panel) return;

    panel.innerHTML = `
        <div class="admin-section">
            <h3 class="admin-title">Sertifikasi (${MY_DATA.certificates.length})</h3>
            <div class="admin-list">
                ${MY_DATA.certificates.map((item, index) => `
                    <div class="admin-item">
                        <div class="admin-item-content">
                            <strong>${item.title}</strong>
                            <span>${item.meta}</span>
                        </div>
                        <div class="admin-item-actions">
                            <button onclick="editCertificate(${index})" class="btn-edit">Edit</button>
                            <button onclick="deleteCertificate(${index})" class="btn-delete">Hapus</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button onclick="showAddCertificateForm()" class="btn-add">+ Tambah Sertifikasi</button>
        </div>
        
        <div class="admin-section">
            <h3 class="admin-title">Publikasi (${MY_DATA.publications.length})</h3>
            <div class="admin-list">
                ${MY_DATA.publications.map((item, index) => `
                    <div class="admin-item">
                        <div class="admin-item-content">
                            <strong>${item.title}</strong>
                            <span>${item.meta}</span>
                        </div>
                        <div class="admin-item-actions">
                            <button onclick="editPublication(${index})" class="btn-edit">Edit</button>
                            <button onclick="deletePublication(${index})" class="btn-delete">Hapus</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button onclick="showAddPublicationForm()" class="btn-add">+ Tambah Publikasi</button>
        </div>

        <div class="admin-section">
            <h3 class="admin-title">Project (${MY_DATA.projects.length})</h3>
            <div class="admin-list">
                ${MY_DATA.projects.map((item, index) => `
                    <div class="admin-item">
                        <div class="admin-item-content">
                            <strong>${item.title}</strong>
                            <span>${item.tech}</span>
                        </div>
                        <div class="admin-item-actions">
                            <button onclick="editProject(${index})" class="btn-edit">Edit</button>
                            <button onclick="deleteProject(${index})" class="btn-delete">Hapus</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button onclick="showAddProjectForm()" class="btn-add">+ Tambah Project</button>
        </div>
        
        <div class="admin-section">
            <button onclick="exportData()" class="btn-export">📤 Export Data untuk GitHub</button>
            <button onclick="resetToDefault()" class="btn-reset">🔄 Reset ke Data Default</button>
        </div>
    `;
}

// Certificate Forms
function showAddCertificateForm() {
    const panel = document.getElementById('admin-content');
    panel.innerHTML = `
        <div class="admin-form">
            <h3 class="admin-title">Tambah Sertifikasi</h3>
            <input type="text" id="cert-title" placeholder="Judul Sertifikasi" class="admin-input">
            <input type="text" id="cert-meta" placeholder="Penyelenggara • Tahun (contoh: IBM • 2025)" class="admin-input">
            <input type="text" id="cert-url" placeholder="URL Sertifikat" class="admin-input">
            <div class="admin-form-actions">
                <button onclick="submitAddCertificate()" class="btn-save">Simpan</button>
                <button onclick="renderAdminPanel()" class="btn-cancel">Batal</button>
            </div>
        </div>
    `;
}

function submitAddCertificate() {
    const title = document.getElementById('cert-title').value;
    const meta = document.getElementById('cert-meta').value;
    const url = document.getElementById('cert-url').value;
    
    if (title && meta) {
        addCertificate(title, meta, url);
    } else {
        alert('Mohon isi judul dan meta!');
    }
}

function editCertificate(index) {
    const item = MY_DATA.certificates[index];
    const panel = document.getElementById('admin-content');
    panel.innerHTML = `
        <div class="admin-form">
            <h3 class="admin-title">Edit Sertifikasi</h3>
            <input type="text" id="cert-title" placeholder="Judul Sertifikasi" class="admin-input" value="${item.title}">
            <input type="text" id="cert-meta" placeholder="Penyelenggara • Tahun" class="admin-input" value="${item.meta}">
            <input type="text" id="cert-url" placeholder="URL Sertifikat" class="admin-input" value="${item.url}">
            <div class="admin-form-actions">
                <button onclick="submitEditCertificate(${index})" class="btn-save">Simpan</button>
                <button onclick="renderAdminPanel()" class="btn-cancel">Batal</button>
            </div>
        </div>
    `;
}

function submitEditCertificate(index) {
    const title = document.getElementById('cert-title').value;
    const meta = document.getElementById('cert-meta').value;
    const url = document.getElementById('cert-url').value;
    
    if (title && meta) {
        updateCertificate(index, title, meta, url);
    } else {
        alert('Mohon isi judul dan meta!');
    }
}

// Publication Forms
function showAddPublicationForm() {
    const panel = document.getElementById('admin-content');
    panel.innerHTML = `
        <div class="admin-form">
            <h3 class="admin-title">Tambah Publikasi</h3>
            <input type="text" id="pub-title" placeholder="Judul Publikasi" class="admin-input">
            <input type="text" id="pub-meta" placeholder="Media • Tahun (contoh: Campus Tech Review • 2024)" class="admin-input">
            <input type="text" id="pub-url" placeholder="URL Publikasi" class="admin-input">
            <div class="admin-form-actions">
                <button onclick="submitAddPublication()" class="btn-save">Simpan</button>
                <button onclick="renderAdminPanel()" class="btn-cancel">Batal</button>
            </div>
        </div>
    `;
}

function submitAddPublication() {
    const title = document.getElementById('pub-title').value;
    const meta = document.getElementById('pub-meta').value;
    const url = document.getElementById('pub-url').value;
    
    if (title && meta) {
        addPublication(title, meta, url);
    } else {
        alert('Mohon isi judul dan meta!');
    }
}

function editPublication(index) {
    const item = MY_DATA.publications[index];
    const panel = document.getElementById('admin-content');
    panel.innerHTML = `
        <div class="admin-form">
            <h3 class="admin-title">Edit Publikasi</h3>
            <input type="text" id="pub-title" placeholder="Judul Publikasi" class="admin-input" value="${item.title}">
            <input type="text" id="pub-meta" placeholder="Media • Tahun" class="admin-input" value="${item.meta}">
            <input type="text" id="pub-url" placeholder="URL Publikasi" class="admin-input" value="${item.url}">
            <div class="admin-form-actions">
                <button onclick="submitEditPublication(${index})" class="btn-save">Simpan</button>
                <button onclick="renderAdminPanel()" class="btn-cancel">Batal</button>
            </div>
        </div>
    `;
}

function submitEditPublication(index) {
    const title = document.getElementById('pub-title').value;
    const meta = document.getElementById('pub-meta').value;
    const url = document.getElementById('pub-url').value;
    
    if (title && meta) {
        updatePublication(index, title, meta, url);
    } else {
        alert('Mohon isi judul dan meta!');
    }
}

// Project Forms
function showAddProjectForm() {
    const panel = document.getElementById('admin-content');
    panel.innerHTML = `
        <div class="admin-form">
            <h3 class="admin-title">Tambah Project</h3>
            <input type="text" id="proj-title" placeholder="Judul Project" class="admin-input">
            <input type="text" id="proj-tech" placeholder="Tech Stack (contoh: PHP, MySQL)" class="admin-input">
            <input type="text" id="proj-url" placeholder="URL GitHub" class="admin-input">
            <input type="text" id="proj-image" placeholder="URL Gambar (opsional)" class="admin-input">
            <textarea id="proj-description" placeholder="Deskripsi Project" class="admin-input" rows="3"></textarea>
            <div class="admin-form-actions">
                <button onclick="submitAddProject()" class="btn-save">Simpan</button>
                <button onclick="renderAdminPanel()" class="btn-cancel">Batal</button>
            </div>
        </div>
    `;
}

function submitAddProject() {
    const title = document.getElementById('proj-title').value;
    const tech = document.getElementById('proj-tech').value;
    const url = document.getElementById('proj-url').value;
    const image = document.getElementById('proj-image').value;
    const description = document.getElementById('proj-description').value;
    
    if (title && tech) {
        addProject(title, description, tech, url, image);
    } else {
        alert('Mohon isi judul dan tech stack!');
    }
}

function editProject(index) {
    const item = MY_DATA.projects[index];
    const panel = document.getElementById('admin-content');
    panel.innerHTML = `
        <div class="admin-form">
            <h3 class="admin-title">Edit Project</h3>
            <input type="text" id="proj-title" placeholder="Judul Project" class="admin-input" value="${item.title}">
            <input type="text" id="proj-tech" placeholder="Tech Stack" class="admin-input" value="${item.tech}">
            <input type="text" id="proj-url" placeholder="URL GitHub" class="admin-input" value="${item.url}">
            <input type="text" id="proj-image" placeholder="URL Gambar (opsional)" class="admin-input" value="${item.image || ''}">
            <textarea id="proj-description" placeholder="Deskripsi Project" class="admin-input" rows="3">${item.description || ''}</textarea>
            <div class="admin-form-actions">
                <button onclick="submitEditProject(${index})" class="btn-save">Simpan</button>
                <button onclick="renderAdminPanel()" class="btn-cancel">Batal</button>
            </div>
        </div>
    `;
}

function submitEditProject(index) {
    const title = document.getElementById('proj-title').value;
    const tech = document.getElementById('proj-tech').value;
    const url = document.getElementById('proj-url').value;
    const image = document.getElementById('proj-image').value;
    const description = document.getElementById('proj-description').value;
    
    if (title && tech) {
        updateProject(index, title, description, tech, url, image);
    } else {
        alert('Mohon isi judul dan tech stack!');
    }
}

function resetToDefault() {
    if (confirm('Apakah Anda yakin ingin mereset ke data default? Semua perubahan akan hilang.')) {
        saveData(DEFAULT_DATA);
        MY_DATA = { ...DEFAULT_DATA };
        renderCredentials();
        renderProjects();
        renderAdminPanel();
    }
}

// --- EXPORT DATA FOR GITHUB ---
function exportData() {
    const certData = MY_DATA.certificates.map(c => 
        `        { \n            title: "${c.title}", \n            meta: "${c.meta}", \n            url: "${c.url}" \n        }`
    ).join(',\n');
    
    const pubData = MY_DATA.publications.map(p => 
        `        { \n            title: "${p.title}", \n            meta: "${p.meta}", \n            url: "${p.url}" \n        }`
    ).join(',\n');

    const projData = MY_DATA.projects.map(p => 
        `        { \n            title: "${p.title}", \n            description: "${p.description}", \n            tech: "${p.tech}", \n            url: "${p.url}", \n            image: "${p.image}" \n        }`
    ).join(',\n');
    
    const exportCode = `// --- DATA STATIC ---
// Data otomatis diperbarui dari dokumen sertifikat yang diunggah
const DEFAULT_DATA = {
    certificates: [
${certData}
    ],
    publications: [
${pubData}
    ],
    projects: [
${projData}
    ]
};`;
    
    const panel = document.getElementById('admin-content');
    panel.innerHTML = `
        <div class="admin-section">
            <h3 class="admin-title">📋 Kode Data untuk GitHub</h3>
            <p class="admin-desc">Copy kode di bawah ini dan paste ke file script.js (bagian DEFAULT_DATA):</p>
            <textarea id="export-code" class="admin-textarea" readonly>${exportCode}</textarea>
            <div class="admin-form-actions">
                <button onclick="copyToClipboard()" class="btn-save">📋 Copy ke Clipboard</button>
                <button onclick="renderAdminPanel()" class="btn-cancel">Tutup</button>
            </div>
        </div>
    `;
}

function copyToClipboard() {
    const textarea = document.getElementById('export-code');
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value).then(() => {
        alert('✅ Kode berhasil disalin! Sekarang paste ke file script.js');
    });
}

// --- INITIALIZATION ---
window.onload = () => {
    renderCredentials();
    renderProjects();
    
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuToggle && menuClose && mobileMenu) {
        menuToggle.onclick = () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        
        const closeMenu = () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        };
        
        menuClose.onclick = closeMenu;
        mobileLinks.forEach(link => { link.onclick = closeMenu; });
    }
    
    let clickCount = 0;
    let clickTimer = null;
    
    document.addEventListener('click', (e) => {
        if (e.target.closest('#admin-panel')) return;
        
        const x = e.clientX;
        const y = e.clientY;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        if (x > width - 100 && y > height - 100) {
            clickCount++;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
            
            if (clickCount >= 5) {
                toggleAdminPanel();
                clickCount = 0;
            }
        }
    });
};








