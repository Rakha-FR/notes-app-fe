const TaskAPI = {
    /**
     * Mengambil semua tugas dari server
     * @returns {Promise<Array>} Array of tasks
     */
    async getAllTasks() {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.TASKS}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result.data || [];
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    /**
     * Membuat tugas baru
     * @param {Object} taskData - Data tugas (title, description)
     * @returns {Promise<Object>} Task yang baru dibuat
     */
    async createTask(taskData) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.TASKS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    /**
     * Menghapus tugas berdasarkan ID
     * @param {number} taskId - ID tugas yang akan dihapus
     * @returns {Promise<Object>} Task yang dihapus
     */
    async deleteTask(taskId) {
        try {
            const response = await fetch(
                `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.TASK_BY_ID(taskId)}`,
                { method: 'DELETE' }
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
,

    /**
     * Memperbarui tugas berdasarkan ID
     * @param {number} taskId - ID tugas yang akan diperbarui
     * @param {Object} taskData - Data tugas baru (title, description)
     * @returns {Promise<Object>} Task yang diperbarui
     */
    async updateTask(taskId, taskData) {
        try {
            const response = await fetch(
                `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.TASK_BY_ID(taskId)}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(taskData)
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }
};