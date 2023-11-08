// Inisialisasi IndexedDB
var db;
var request = indexedDB.open("komentarDB", 1);

request.onerror = function (event) {
  console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore = db.createObjectStore("komentar", {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("nama", "nama", { unique: false });
  objectStore.createIndex("email", "email", { unique: false });
  objectStore.createIndex("komentar", "komentar", { unique: false });
};

request.onsuccess = function (event) {
  db = event.target.result;
  // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document
  .getElementById("commentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var nama = document.getElementById("nama").value;
    var email = document.getElementById("email").value;
    var komentar = document.getElementById("komentar").value;

    var transaction = db.transaction(["komentar"], "readwrite");
    var objectStore = transaction.objectStore("komentar");
    var comment = { nama: nama, email: email, komentar: komentar };
    objectStore.add(comment);

    document.getElementById("nama").value = "";
    document.getElementById("email").value = "";
    document.getElementById("komentar").value = "";

    // showComments();
  });
