export const convertMonth = (monthNumber) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    // Cek apakah monthNumber valid
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1]; // index dimulai dari 0, jadi kurangi 1
    }
    return 'Bulan tidak valid'; // Pesan default jika angka tidak valid
  }