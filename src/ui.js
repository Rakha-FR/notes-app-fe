const UI = {
    elements: {
        taskForm: null,
        tasksContainer: null,
        loading: null,
        errorMessage: null,
        successMessage: null,
        emptyState: null,
        refreshBtn: null
    },

    /**
     * Inisialisasi elemen DOM
     */
    init() {
        this.elements.taskForm = document.getElementById('taskForm');
        this.elements.tasksContainer = document.getElementById('tasksContainer');
        this.elements.loading = document.getElementById('loading');
        this.elements.errorMessage = document.getElementById('errorMessage');
        this.elements.successMessage = document.getElementById('successMessage');
        this.elements.emptyState = document.getElementById('emptyState');
        this.elements.refreshBtn = document.getElementById('refreshBtn');
        this.elements.taskId = document.getElementById('taskId');
        this.elements.submitBtn = document.getElementById('submitBtn');
        this.elements.submitBtnText = document.getElementById('submitBtnText');
    },

    /**
     * Menampilkan loading indicator
     */
    showLoading() {
        this.elements.loading.classList.remove('hidden');
        this.elements.tasksContainer.classList.add('hidden');
        this.elements.emptyState.classList.add('hidden');
    },

    /**
     * Menyembunyikan loading indicator
     */
    hideLoading() {
        this.elements.loading.classList.add('hidden');
    },

    /**
     * Menampilkan pesan error
     * @param {string} message - Pesan error
     */
    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorMessage.classList.remove('hidden');
        
        setTimeout(() => {
            this.elements.errorMessage.classList.add('hidden');
        }, 5000);
    },

    /**
     * Menampilkan pesan sukses
     * @param {string} message - Pesan sukses
     */
    showSuccess(message) {
        this.elements.successMessage.textContent = message;
        this.elements.successMessage.classList.remove('hidden');
        
        setTimeout(() => {
            this.elements.successMessage.classList.add('hidden');
        }, 3000);
    },

    /**
     * Format timestamp ke format yang lebih readable
     * @param {string} timestamp - ISO timestamp
     * @returns {string} Formatted date
     */
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('id-ID', options);
    },

    /**
     * Membuat HTML untuk satu task card
     * @param {Object} task - Data task
     * @returns {string} HTML string
     */
    createTaskCard(task) {
        return `
            <div class="task-card" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="task-info">
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                        ${task.description ? 
                            `<p class="task-description">${this.escapeHtml(task.description)}</p>` 
                            : ''}
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-edit" onclick="App.editTask(${task.id})">
                            <span class="btn-icon">✏️</span>
                            Edit
                        </button>
                        <button class="btn btn-delete" onclick="App.deleteTask(${task.id})">
                            <span class="btn-icon">🗑️</span>
                            Hapus
                        </button>
                    </div>
                </div>
                <div class="task-meta">
                    <div class="task-meta-item">
                        <span>🆔</span>
                        <span>ID: ${task.id}</span>
                    </div>
                    <div class="task-meta-item">
                        <span>📅</span>
                        <span>${this.formatDate(task.timestamp)}</span>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Escape HTML untuk mencegah XSS
     * @param {string} text - Text yang akan di-escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Render daftar tasks
     * @param {Array} tasks - Array of tasks
     */
    renderTasks(tasks) {
        this.hideLoading();
        
        if (tasks.length === 0) {
            this.elements.tasksContainer.classList.add('hidden');
            this.elements.emptyState.classList.remove('hidden');
            return;
        }
        
        this.elements.emptyState.classList.add('hidden');
        this.elements.tasksContainer.classList.remove('hidden');
        
        const tasksHTML = tasks.map(task => this.createTaskCard(task)).join('');
        this.elements.tasksContainer.innerHTML = tasksHTML;
    },

    /**
     * Clear form input
     */
    clearForm() {
        this.elements.taskForm.reset();
        if (this.elements.taskId) {
            this.elements.taskId.value = '';
        }
        if (this.elements.submitBtnText) {
            this.elements.submitBtnText.textContent = 'Tambah Tugas';
        }
    },

    /**
     * Populate form for editing an existing task
     * @param {Object} task - { id, title, description }
     */
    fillFormForEdit(task) {
        if (!task) return;
        this.elements.taskId.value = task.id;
        this.elements.taskForm.querySelector('#title').value = task.title || '';
        this.elements.taskForm.querySelector('#description').value = task.description || '';
        if (this.elements.submitBtnText) {
            this.elements.submitBtnText.textContent = 'Perbarui Tugas';
        }
        // focus title
        this.elements.taskForm.querySelector('#title').focus();
    }
};