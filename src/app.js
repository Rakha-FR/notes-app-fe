const App = {
    /**
     * Inisialisasi aplikasi
     */
    async init() {
        UI.init();
        this.attachEventListeners();
        await this.loadTasks();
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Form submit
        UI.elements.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateTask();
        });

        // Refresh button
        UI.elements.refreshBtn.addEventListener('click', () => {
            this.loadTasks();
        });
    },

    /**
     * Load semua tasks dari API
     */
    async loadTasks() {
        try {
            UI.showLoading();
            const tasks = await TaskAPI.getAllTasks();
            UI.renderTasks(tasks);
        } catch (error) {
            UI.hideLoading();
            UI.showError(CONFIG.MESSAGES.ERROR_NETWORK);
            console.error('Load tasks error:', error);
        }
    },

    /**
     * Handle pembuatan task baru
     */
    async handleCreateTask() {
        const formData = new FormData(UI.elements.taskForm);
        const taskData = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim()
        };

        if (!taskData.title) {
            UI.showError('Judul tugas tidak boleh kosong');
            return;
        }

        try {
            await TaskAPI.createTask(taskData);
            UI.showSuccess(CONFIG.MESSAGES.SUCCESS_CREATE);
            UI.clearForm();
            await this.loadTasks();
        } catch (error) {
            UI.showError(CONFIG.MESSAGES.ERROR_CREATE);
            console.error('Create task error:', error);
        }
    },

    /**
     * Handle penghapusan task
     * @param {number} taskId - ID task yang akan dihapus
     */
    async deleteTask(taskId) {
        if (!confirm(CONFIG.MESSAGES.CONFIRM_DELETE)) {
            return;
        }

        try {
            await TaskAPI.deleteTask(taskId);
            UI.showSuccess(CONFIG.MESSAGES.SUCCESS_DELETE);
            await this.loadTasks();
        } catch (error) {
            UI.showError(CONFIG.MESSAGES.ERROR_DELETE);
            console.error('Delete task error:', error);
        }
    }
};

// Jalankan aplikasi saat DOM ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});