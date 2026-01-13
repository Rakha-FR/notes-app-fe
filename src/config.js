const CONFIG = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.75:5000/api',
    ENDPOINTS: {
        TASKS: '/tasks',
        TASK_BY_ID: (id) => `/tasks/${id}`
    },
    MESSAGES: {
        SUCCESS_CREATE: 'Tugas berhasil ditambahkan!',
        SUCCESS_UPDATE: 'Tugas berhasil diperbarui!',
        SUCCESS_DELETE: 'Tugas berhasil dihapus!',
        ERROR_FETCH: 'Gagal memuat data tugas',
        ERROR_CREATE: 'Gagal membuat tugas baru',
        ERROR_UPDATE: 'Gagal memperbarui tugas',
        ERROR_DELETE: 'Gagal menghapus tugas',
        ERROR_NETWORK: 'Kesalahan koneksi. Pastikan server backend berjalan.',
        CONFIRM_DELETE: 'Apakah Anda yakin ingin menghapus tugas ini?'
    }
};

export default CONFIG;
