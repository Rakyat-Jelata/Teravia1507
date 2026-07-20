document.addEventListener('DOMContentLoaded', function () {
    // Tambahan efek opsional jika dibutuhkan nanti
    const kartu = document.querySelectorAll('.kartu-layanan');
    kartu.forEach(k => {
        k.addEventListener('touchstart', () => k.style.transform = 'scale(0.98)');
        k.addEventListener('touchend', () => k.style.transform = 'scale(1)');
    });
});
