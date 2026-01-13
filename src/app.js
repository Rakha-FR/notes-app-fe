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
        // Form submit (create or update)
        UI.elements.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
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
     * Handle submit for create or update
     */
    async handleSubmit() {
        const formData = new FormData(UI.elements.taskForm);
        const taskId = formData.get('taskId');
        const taskData = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim()
        };

        if (!taskData.title) {
            UI.showError('Judul tugas tidak boleh kosong');
            return;
        }

        try {
            if (taskId) {
                await TaskAPI.updateTask(taskId, taskData);
                UI.showSuccess(CONFIG.MESSAGES.SUCCESS_UPDATE);
            } else {
                await TaskAPI.createTask(taskData);
                UI.showSuccess(CONFIG.MESSAGES.SUCCESS_CREATE);
            }

            UI.clearForm();
            await this.loadTasks();
        } catch (error) {
            UI.showError(taskId ? CONFIG.MESSAGES.ERROR_UPDATE : CONFIG.MESSAGES.ERROR_CREATE);
            console.error('Submit task error:', error);
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
    },

    /**
     * Prepare form for editing a task
     * @param {number} taskId
     */
    async editTask(taskId) {
        // Try to read values from DOM to avoid extra API call
        const card = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
        let title = '';
        let description = '';
        if (card) {
            const titleEl = card.querySelector('.task-title');
            const descEl = card.querySelector('.task-description');
            title = titleEl ? titleEl.textContent.trim() : '';
            description = descEl ? descEl.textContent.trim() : '';
        }

        UI.fillFormForEdit({ id: taskId, title, description });
    }
};

// Jalankan aplikasi saat DOM ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});