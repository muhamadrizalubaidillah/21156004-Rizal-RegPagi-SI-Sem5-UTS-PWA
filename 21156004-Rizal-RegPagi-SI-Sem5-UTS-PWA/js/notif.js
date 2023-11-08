// Minta izin notifikasi
if ("Notification" in window) {
  Notification.requestPermission().then(function (permission) {
    if (permission == "granted") {
      alert("Terima kasih sudah accept");
    } else if (permission === "denied") {
      // Izin diblokir
      alert("Notifikasi diblokir");
    }
  });
}

// Fungsi untuk menampilkan notifikasi
function showNotification(title, message) {
  if ("Notification" in window && Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, {
        body: message,
        icon: "icon.png",
      });
    });
  }
}
