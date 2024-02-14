//SELESAI FUNCTION BERSIHKAN SEMUA
async function bersihkanSemua() {
    const fs = require('fs')
    const Promise = require('promise');

    let totalDibersihkan = 0;
    let totalProdukSebelumDibersihkan = 0;
    let totalProdukSesudaDibersihkan = 0;
    let batas_maksimum_statusScrape = 30;
    let array_file_gabungan = [
        './hasil/TERBARU/lazada.json',
        './hasil/TERBARU/tokopedia.json',
        './hasil/TERBARU/blibli.json',
        './hasil/TERBARU/shopee.json',
        './hasil/TERBARU/cekduplikat.json'
    ];

    for (let i = 0; i < array_file_gabungan.length; i++) {
      if (fs.existsSync(array_file_gabungan[i])) {

        let oldData = JSON.parse(fs.readFileSync(array_file_gabungan[i]));
        let totalProdukLama = oldData.data.productOfferV2.nodes.length;
        totalProdukSebelumDibersihkan += totalProdukLama;
        console.log(`Membuang ${array_file_gabungan[i]} yang status scrape nya diatas ${batas_maksimum_statusScrape}, dan membuang semua produk yang namanya tidak relevan dengan brand nya`);
        console.log(`- banyaknya produk sebelum dibersihkan adalah ${totalProdukLama}`);
        // Create a Promise to wrap the filtering operation
        const filterPromise = new Promise((resolve, reject) => {
            oldData.data.productOfferV2.nodes = oldData.data.productOfferV2.nodes.filter(
            node => node.statusScrape <= batas_maksimum_statusScrape && 
                    !(node.namaBarang === "LAPTOP" && /\b(iphone|ipad|imac|airpod|airpods|magsafe|watch|testing|purifier|purifer|harman kardon|pencil|keyboard|adapter)\b/i.test(node.productName)) &&
                    !(node.namaBarang === "KEYBOARD" && /\b(iphone|ipad|imac|airpod|airpods|magsafe|watch|testing|purifier|purifer|harman kardon|pencil|adapter)\b/i.test(node.productName)) &&
                    !(node.namaBarang === "SMARTPHONE" && /\b(imac|airpod|airpods|magsafe|watch|testing|purifier|purifer|harman kardon|pencil|keyboard|adapter)\b/i.test(node.productName)) &&
                    !(node.namaBarang === "SSD" && /\b(iphone|ipad|imac|airpod|airpods|magsafe|watch|testing|purifier|purifer|harman kardon|pencil|keyboard|adapter)\b/i.test(node.productName)) &&
                    !(node.namaBarang === "RAM" && /\b(iphone|ipad|imac|airpod|airpods|magsafe|watch|testing|purifier|purifer|harman kardon|pencil|keyboard|adapter)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "ACER" && /\b(apple|asus|axioo|dell|infinix|lenovo|razer|toshiba|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "ASUS" && /\b(acer|apple|axioo|dell|infinix|lenovo|razer|toshiba|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "APPLE" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "AXIOO" && /\b(acer|asus|apple|dell|infinix|lenovo|razer|toshiba|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "DELL" && /\b(acer|asus|axioo|apple|infinix|lenovo|razer|toshiba|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "INFINIX" && /\b(acer|asus|axioo|dell|apple|lenovo|razer|toshiba|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "LENOVO" && /\b(acer|asus|axioo|dell|infinix|apple|razer|toshiba|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "RAZER" && /\b(acer|asus|axioo|dell|infinix|lenovo|apple|toshiba|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "TOSHIBA" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|apple|zyrex|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "ZYREX" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|apple|nokia|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "NOKIA" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|apple|zyrex|xiaomi|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "XIAOMI" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|apple|nokia|zyrex|samsung|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "SAMSUNG" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|apple|nokia|xiaomi|zyrex|huawei|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "HUAWEI" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|apple|nokia|xiaomi|samsung|zyrex|vivo|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "VIVO" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|apple|nokia|xiaomi|samsung|huawei|zyrex|realme|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "REALME" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|apple|nokia|xiaomi|samsung|huawei|vivo|zyrex|oppo)\b/i.test(node.productName)) &&
                    !(node.namaMerek === "OPPO" && /\b(acer|asus|axioo|dell|infinix|lenovo|razer|toshiba|apple|nokia|xiaomi|samsung|huawei|vivo|realme|zyrex)\b/i.test(node.productName))
            );
            resolve(oldData);
        });
        // Wait for the Promise to resolve and then write the file
        try {
          const filteredData = await filterPromise;
          await new Promise((resolve, reject) => {
            fs.writeFile(array_file_gabungan[i], JSON.stringify(filteredData), function (err) {
              if (err) {
                reject(err);
              } else {
                let totalProdukBaru = filteredData.data.productOfferV2.nodes.length;
                totalProdukSesudaDibersihkan += totalProdukBaru;
                console.log(`- banyaknya produk setelah dibersihkan adalah ${totalProdukBaru}`)
                resolve();
              }
            });
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log(`error: no file found at ${array_file_gabungan[i]}`);
      }
    }
    totalDibersihkan = totalProdukSebelumDibersihkan - totalProdukSesudaDibersihkan;
    return totalDibersihkan;
}
//SELESAI FUNCTION BERSIHKAN SEMUA

module.exports = { bersihkanSemua };