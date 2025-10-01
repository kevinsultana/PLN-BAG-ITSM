/**
 * Utility function untuk mengkonversi angka menjadi format Rupiah
 * @param {number|string} amount - Jumlah angka yang akan diformat
 * @param {boolean} showPrefix - Menampilkan prefix "Rp" atau tidak (default: true)
 * @returns {string} Format Rupiah (contoh: "Rp 15.000")
 */
export const formatRupiah = (amount, showPrefix = true) => {
  // Handle null, undefined, atau empty string
  if (amount === null || amount === undefined || amount === "") {
    return showPrefix ? "Rp 0" : "0";
  }

  // Konversi ke number jika input berupa string
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  // Handle NaN
  if (isNaN(numericAmount)) {
    return showPrefix ? "Rp 0" : "0";
  }

  // Format angka dengan pemisah ribuan (titik)
  const formatted = Math.abs(numericAmount)
    .toFixed(0) // Hilangkan desimal
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Tambah titik setiap 3 digit

  // Tambahkan prefix dan tanda negatif jika diperlukan
  const prefix = showPrefix ? "Rp " : "";
  const sign = numericAmount < 0 ? "-" : "";

  return `${sign}${prefix}${formatted}`;
};

/**
 * React component untuk menampilkan format Rupiah
 * @param {object} props - Props component
 * @param {number|string} props.amount - Jumlah yang akan diformat
 * @param {boolean} props.showPrefix - Menampilkan prefix "Rp" atau tidak
 * @param {string} props.className - CSS class tambahan
 * @param {object} props.style - Inline style
 * @returns {JSX.Element} Component dengan format Rupiah
 */
export const RupiahFormat = ({
  amount,
  showPrefix = true,
  className = "",
  style = {},
  ...props
}) => {
  const formattedAmount = formatRupiah(amount, showPrefix);

  return (
    <span className={className} style={style} {...props}>
      {formattedAmount}
    </span>
  );
};

/**
 * Hook untuk menggunakan format Rupiah
 * @param {number|string} amount - Jumlah yang akan diformat
 * @param {boolean} showPrefix - Menampilkan prefix "Rp" atau tidak
 * @returns {string} Format Rupiah
 */
export const useRupiahFormat = (amount, showPrefix = true) => {
  return formatRupiah(amount, showPrefix);
};

// Default export
export default formatRupiah;
