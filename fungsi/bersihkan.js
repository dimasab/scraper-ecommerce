//MULAI FUNCTION BERSIHKAN SEMUA
async function bersihkanSemua() {
    const fs = require('fs');
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
  
                // Apply the atur_kapital function on productName
                oldData.data.productOfferV2.nodes.forEach(node => {
                    node.productName = aturKapital(node.productName);
                });
  
                // aturKapital("macbook ssd hdd Ram, laptop 9 juta-an , pro, 13.3\" generasi 9 - - - - - - ---- haha ")
  
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
  
  
  //MULAI FUNCTION ATURKAPITAL
  function aturKapital(judulraw) {
  
    const paksa_kapital = ['SSD', 'HDD', 'RAM', 'SDRAM', 'ROM', 'GTX', 'RTX', 'FHD', 'HD', 'VGA', 'GB', 'TB', 'IPS', 'OHS', 'RGB', 'SRGB', 'USB', 'PCB', 'PC', 'TV', 'AMD', 'UHD', 'MSI', 'HP', 'US', 'SKU', 'SD', 'TUF', 'CPU', 'GPU', 'SIM', '2GB', '4GB', '6GB', '8GB', '16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB', 'AI', 'NFC', 'GT', 'ROG', 'DDR', 'DDR3', 'DDR4', 'DDR5', 'GDDR', 'GDDR3', 'GDDR4', 'GDDR5', 'DIMM', 'SODIMM', 'III', 'II'];
    const paksa_kecil_depan = ['I3', 'I5', 'I7', 'I9', 'IPHONE', 'IOS', 'IPAD'];
    const abaikan = ['NVME', 'PCIE', 'MACOS', 'IN', 'UP', 'TO', 'S/D'];
    const arrayhapusteks = [
      /\bl+a+p+t+o+p+\b/i,
      /\bn+o+t+e+b+o+o+k+\b/i,
      /\bt+e+r+m+u+r+a+h+\b/i,
      /\bm+u+r+a+h+\b/i,
      /\bt+e+r+l+a+r+i+s+\b/i,
      /\bo+b+r+a+l+\b/i,
      /\bj+u+a+l+\b/i,
      /\be+l+e+g+a+n+t+\b/i,
      /\be+l+e+g+a+n+\b/i,
      /\bb+e+s+t+\b/i,
      /\bs+e+l+l+e+r+\b/i,
      /\bh+a+r+g+a+\b/i,
      /\bb+a+n+g+e+t+\b/i,
      /\bk+o+n+d+i+s+i+\b/i,
      /\bm+a+s+i+h+\b/i,
      /\bp+r+o+m+o+\b/i,
      /\bi+m+u+t+\b/i,
      /\bb+u+a+t+\b/i,
      /\bp+a+l+i+n+g+\b/i,
      /\bs+a+n+g+a+t+\b/i,
      /\bl+e+b+i+h+\b/i,
      /\bd+a+r+i+n+g+\b/i,
      /\bs+i+k+a+t+\b/i,
      /\bb+o+s+k+u+\b/i,
      /\bo+l+s+h+o+p+\b/i,
      /\bb+a+n+d+e+l+\b/i,
      /\bl+e+m+b+u+r+\b/i,
      /\bk+u+l+i+a+h+a+n+\b/i,
      /\bk+u+l+i+a+h+\b/i,
      /\bk+e+r+j+a+a+n+\b/i,
      /\bp+e+k+e+r+j+a+\b/i,
      /\bk+e+r+j+a+\b/i,
      /\bk+a+n+t+o+r+a+n+\b/i,
      /\bk+a+n+t+o+r+\b/i,
      /\bp+e+l+a+j+a+r\b/i,
      /\bu+n+t+u+k+\b/i,
      /\bh+a+n+y+a+\b/i,
      /\bc+o+c+o+k+\b/i,
      /\bd+a+n+\b/i,
      /\bu+t+k+\b/i,
      /\bo+n+l+i+n+e+\b/i,
      /\bb+e+r+g+a+r+a+n+s+i+\b/i,
      /\bt+e+r+b+a+i+k+\b/i,
      /\bf+l+a+s+h\b/i,
      /\bh+o+t+\b/i,
      /\bb+i+g+\b/i,
      /\bb+i+g+g+e+r+\b/i,
      /\bs+a+l+e\b/i,
      /\bl+e+p+t+o+p+\b/i,
      /\bb+i+s+n+i+s+\b/i,
      /\bs+i+a+p+\b/i,
      /\be+d+i+t+i+n+g+\b/i,
      /\bp+a+k+a+i+\b/i,
      /\b1+j+u+t+a+a+n+\b/i,
      /\b2+j+u+t+a+a+n+\b/i,
      /\b3+j+u+t+a+a+n+\b/i,
      /\b4+j+u+t+a+a+n+\b/i,
      /\b5+j+u+t+a+a+n+\b/i,
      /\b6+j+u+t+a+a+n+\b/i,
      /\b7+j+u+t+a+a+n+\b/i,
      /\b8+j+u+t+a+a+n+\b/i,
      /\b9+j+u+t+a+a+n+\b/i,
      /\b1+j+u+t+a+-+a+n+\b/i,
      /\b2+j+u+t+a+-+a+n+\b/i,
      /\b3+j+u+t+a+-+a+n+\b/i,
      /\b4+j+u+t+a+-+a+n+\b/i,
      /\b5+j+u+t+a+-+a+n+\b/i,
      /\b6+j+u+t+a+-+a+n+\b/i,
      /\b7+j+u+t+a+-+a+n+\b/i,
      /\b8+j+u+t+a+-+a+n+\b/i,
      /\b9+j+u+t+a+-+a+n+\b/i,
      /\b1+ j+u+t+a+a+n+\b/i,
      /\b2+ j+u+t+a+a+n+\b/i,
      /\b3+ j+u+t+a+a+n+\b/i,
      /\b4+ j+u+t+a+a+n+\b/i,
      /\b5+ j+u+t+a+a+n+\b/i,
      /\b6+ j+u+t+a+a+n+\b/i,
      /\b7+ j+u+t+a+a+n+\b/i,
      /\b8+ j+u+t+a+a+n+\b/i,
      /\b9+ j+u+t+a+a+n+\b/i,
      /\b1+ j+u+t+a+-+a+n+\b/i,
      /\b2+ j+u+t+a+-+a+n+\b/i,
      /\b3+ j+u+t+a+-+a+n+\b/i,
      /\b4+ j+u+t+a+-+a+n+\b/i,
      /\b5+ j+u+t+a+-+a+n+\b/i,
      /\b6+ j+u+t+a+-+a+n+\b/i,
      /\b7+ j+u+t+a+-+a+n+\b/i,
      /\b8+ j+u+t+a+-+a+n+\b/i,
      /\b9+ j+u+t+a+-+a+n+\b/i,
      /\bj+u+t+a+a+n+\b/i,
      /\bj+u+t+a+\b/i,
      /\bb+a+g+u+s+\b/i,
      /\bl+e+l+e+t+\b/i,
      /\ba+n+t+i+\b/i,
      /\bf+r+e+e+\b/i,
      /\bu+p+g+r+a+d+e+\b/i,
      /\bs+e+n+i+l+a+i+\b/i,
      /\bm+o+s+u+e+\b/i,
      /\bb+e+r+k+e+l+a+s+\b/i,
      /\bk+e+r+e+n+\b/i,
      /\bt+e+k+n+o+ k+i+t+a+\b/i,
      /\bb+i+s+a+\b/i,
      /\bd+i+l+i+p+a+t+\b/i,
      /\bt+e+r+b+a+r+u+\b/i,
      /\bb+a+r+u+\b/i,
      /\bm+u+n+g+i+l+\b/i,
      /\bt+e+r+j+a+n+g+k+a+u+\b/i,
      /\bi+n+s+t+a+n+t+\b/i,
      /\bi+n+s+t+a+n+\b/i,
      /\bg+o+j+e+k+\b/i,
      /\bg+r+a+b+\b/i,
      /\bs+a+m+e+d+a+y+\b/i,
      /\bs+a+m+e+ d+a+y+\b/i,
      /\bv+a+r+i+a+s+i+\b/i,
      /\b1+\ +t+a+h+u+n+\b/i,
      /\b2+\ +t+a+h+u+n+\b/i,
      /\b1+\ +b+u+l+a+n+\b/i,
      /\b2+\ +b+u+l+a+n+\b/i,
      /\b1+t+a+h+u+n+\b/i,
      /\b2+t+a+h+u+n+\b/i,
      /\b1+b+u+l+a+n+\b/i,
      /\b2+b+u+l+a+n+\b/i,
      /\bt+a+h+u+n+\b/i,
      /\bb+u+l+a+n+\b/i,
      /\b1+\ +t+h+n+\b/i,
      /\b2+\ +t+h+n+\b/i,
      /\b1+\ +b+l+n+\b/i,
      /\b2+\ +b+l+n+\b/i,
      /\b1+t+h+n+\b/i,
      /\b2+t+h+n+\b/i,
      /\b1+b+l+n+\b/i,
      /\b2+b+l+n+\b/i,
      /\bt+h+n+\b/i,
      /\bb+l+n+\b/i,
      /\bo+k+\b/i,
      /\bs+e+r+i+\b/i,
      /\bl+e+n+g+k+a+p+\b/i,
      /\bi+s+t+i+m+e+w+a+\b/i,
      /\bn+g+e+b+u+t+\b/i,
      /\bm+a+l+a+n+g+\b/i,
      /\bb+e+r+k+u+a+l+i+t+a+s+\b/i,
      /\bb+e+r+k+w+a+l+i+t+a+s+\b/i,
      /\bs+e+p+e+c+i+a+l+\b/i,
      /\bs+e+p+e+s+i+a+l+\b/i,
      /\bd+e+a+l+\b/i,
      /\be+v+e+r+\b/i,
      /\bc+n+c+i+n+t+e+l+\b/i,
      /\bc+n+c+a+m+d+\b/i,
      /\bc+n+c+\b/i,
      /\bh+a+n+d+p+h+o+n+e+\b/i,
      /\bs+m+a+r+t+p+h+o+n+e+\b/i,
      /\bb+a+t+e+r+a+i+\b/i,
      /\bb+a+t+t+e+r+y+\b/i,
      /\bb+a+t+e+r+r+y+\b/i,
      /\bb+a+t+e+r+y+\b/i,
      /\bs+e+g+e+l+\b/i,
      /\bl+i+k+e+\b/i,
      /\bn+e+w+\b/i,
      /\bl+i+k+e+n+e+w+\b/i,
      /\ba+s+l+i+\b/i,
      /\b1+0+0+\%+\b/i,
      /\bn+o+\ +m+i+n+u+s+\b/i,
      /\bn+o+m+i+n+u+s+\b/i,
      /\bm+u+l+u+s+1+0+0+\%+\b/i,
      /\bd+i+p+a+k+e+\b/i,
      /\bd+i+p+a+k+a+i+\b/i,
      /\bb+e+b+e+r+a+p+a+\b/i,
      /\bs+e+l+a+m+a+\b/i,
      /\bm+e+w+a+h+\b/i,
      /\bm+o+u+s+\b/i,
      /\bk+u+r+i+r+\b/i,
      /\bl+a+u+n+c+h+\b/i,
      /\ba+r+r+i+v+a+l+\b/i,
      /\be+x+c+l+u+s+i+v+e+\b/i,
      /\be+k+s+k+l+u+s+i+f+\b/i,
      /\br+e+c+o+m+m+e+n+d+e+d+\b/i,
      /\br+e+c+o+m+m+e+n+d+\b/i,
      /\br+e+k+o+m+e+n+d+e+d+\b/i,
      /\br+e+k+o+m+e+n+\b/i,
      /\bb+a+n+y+a+k+\b/i,
      /\bl+a+y+a+r+\b/i,
      /\bs+e+n+t+u+h+\b/i,
      /\bm+e+m+o+r+i+\b/i,
      /\bk+o+m+p+u+t+e+r+\b/i,
      /\bo+r+i+\b/i,
      /\bd+e+n+g+a+n+\b/i,
      /\bp+a+k+e+t+\b/i,
      /\bb+a+r+a+n+g+\b/i,
      /\bm+e+r+i+a+h+\b/i,
      /\bb+e+l+a+j+a+r+\b/i,
      /\bl+a+y+a+k+\b/i,
      /\bs+e+k+o+l+a+h+\b/i,
      /\bd+e+s+a+i+n+\b/i,
      /\bc+u+m+a+\b/i,
      /\bm+u+l+t+i+t+a+s+k+i+n+g+\b/i,
      /\br+i+n+g+a+n+\b/i,
      /\bw+a+r+n+a+\b/i,
      /\bi+t+e+m+\b/i,
      /\br+u+g+i+\b/i,
      /\be+k+o+n+o+m+i+s+\b/i,
      /\bk+e+n+c+a+n+g+\b/i,
      /\bc+u+c+i+\b/i,
      /\bg+u+d+a+n+g+\b/i,
      /\bu+j+i+a+n+\b/i,
      /\bu+s+a+h+a+\b/i,
      /\bm+a+h+a+s+i+s+w+a+\b/i,
      /\ba+n+a+k+\b/i,
      /™+/i,
      /®+/i,
      /[^\x00-\x7F]+/u, //semua non-ASCII
      /\【.*?\】/, //semua yg diantara bracket aneh ini emg seller bgst
    ];
  
    judulraw = arrayhapusteks.reduce((str, pattern) => str.replace(pattern, ''), judulraw).trim();
  
    judulraw = judulraw.trim().replace(/\bgenerasi\b/gi, 'gen')
      .trim().replace(/\s+/g, ' ')
      .trim().replace(/ \,+/g, ',')
      .trim().replace(/ \.+/g, '.')
      .trim().replace(/\(+\ +/g, '(')
      .trim().replace(/ \)+/g, ')')
      .trim().replace(/\[+\ +/g, '[')
      .trim().replace(/ \]+/g, ']')
      .trim().replace(/\(+/g, ' (')
      .trim().replace(/\)+/g, ') ')
      .trim().replace(/\[+/g, ' [')
      .trim().replace(/\]+/g, '] ')
      .trim().replace(/\-+\ +\-+\ +\-+/gi, '-')
  
    const untuksisaan = [
      /(\- )\1+/, // adalah - - dan - - - dan seterusnya
      /(\/ )\1+/, // adalah / / dan / / / dan seterusnya
      /(\. )\1+/, // adalah . . dan . . . dan seterusnya
      /(\, )\1+/, // adalah , , dan , , , dan seterusnya
      /(\| )\1+/, // adalah | | dan | | | dan seterusnya
      /(\(+ )+\)+/, // adalah ( )
      /(\[+ )+\]+/, // adalah [ ]
      /(\{+ )+\}+/, // adalah { }
      /(\-{2,})/, // adalah -- dan seterusnya
      /(\/{2,})/, // adalah // dan seterusnya
      /(\.{2,})/, // adalah .. dan seterusnya
      /(\,{2,})/, // adalah ,, dan seterusnya
      /(\|{2,})/, // adalah || dan seterusnya
      /(\(+)+\)+/, // adalah () dan seterusnya
      /(\[+)+\]+/, // adalah [] dan seterusnya
      /(\{+)+\}+/, // adalah {} dan seterusnya
      /(&)+/, // adalah &
      /(\#+)/, // adalah #
      /(\!+)/, // adalah !
      /(\?+)/, // adalah ?
      /(\s\s+)/, // adalah satu spasi (atau lebih)
    ];
  
    for (let i = 0; i < 10; i++) {
      judulraw = untuksisaan.reduce((str, pattern) => str.replace(pattern, ' '), judulraw).trim();
    }
  
    judulraw = judulraw.replace(/\bbukan\b|not\b/gi, match => match.toUpperCase());
    judulraw = judulraw.split(/ BUKAN | NOT /)[0];
  
    for (let i = 0; i < 10; i++) {
      judulraw = judulraw.trim().replace(/^[-\/|.,]+|[-\/|.,]+$/g, '');
    }
  
    judulraw_CHECKER = judulraw.toUpperCase().split(' ').map(word => word.replace(/[^a-zA-Z0-9]/g, ''));
    judulraw = judulraw.split(' ');
    array_kata_unik = [];
    array_kata_unik_KAPITAL = [];

    for(let i = 0; i < judulraw_CHECKER.length; i++) {
        let checker_sekarang = judulraw_CHECKER[i];
        if((array_kata_unik_KAPITAL.indexOf(checker_sekarang) < 0 || checker_sekarang.length < 3) && abaikan.indexOf(checker_sekarang) < 0) {
            array_kata_unik_KAPITAL.push(checker_sekarang);
            if(paksa_kapital.indexOf(checker_sekarang) < 0 && !(/\d/.test(checker_sekarang))) {
                judulraw[i] = judulraw[i].charAt(0).toUpperCase() + judulraw[i].slice(1).toLowerCase();
            } else if (paksa_kapital.indexOf(checker_sekarang) >= 0) {
                judulraw[i] = judulraw[i].toUpperCase();
            } else if (paksa_kecil_depan.indexOf(checker_sekarang) >= 0) {
                judulraw[i] = judulraw[i].charAt(0).toLowerCase() + judulraw[i].slice(1);
            }
            array_kata_unik.push(judulraw[i]);
        } else {
            continue;
        }
    }
  
    // console.log(array_kata_unik.join(' '))
  
    return array_kata_unik.join(' ');
  }
  //SELESAI FUNCTION ATURKAPITAL
  
  module.exports = { bersihkanSemua };
