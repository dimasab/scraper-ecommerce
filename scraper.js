require('dotenv').config({path: './.env'});
const shopeeJS = require("./fungsi/shopee.js");
const tokopediaJS = require("./fungsi/tokopedia.js");
const lazadaJS = require("./fungsi/lazada.js");
const blibliJS = require("./fungsi/blibli.js");
const cekduplikatJS = require("./fungsi/cekduplikat.js");
const bersihkanJS = require("./fungsi/bersihkan.js");
const express = require('express');
const app = express();
const puppeteer = require('puppeteer-extra');
const fs = require('fs')
const Promise = require('promise');
const axios = require('axios');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const os = require('os');
const PORT = process.env.PORT || 5000;

puppeteer.use(StealthPlugin());
app.use(express.json());

//UNTUK KILL TASK CHROME
async function killChrome() {
    const { spawn } = require('child_process');
    return new Promise((resolve, reject) => {
        let child;
        if (os.platform == 'win32') { //kalau Windows
            child = spawn('taskkill', ['/F', '/IM', 'chrome.exe']);
        } else if (os.platform =='darwin') { //kalau MacOS
            child = spawn('killall', ['Google Chrome']);
        }
        // Error handling for the spawn process
        child.on('error', (err) => {
            reject(new Error("Gagal memunculkan child process. Error:" + err.message));
        });
        child.on('exit', (code, signal) => {
            // Checking exit code to ensure successful execution
            if(code === 0) {
                resolve(`Chrome selesai ditutup di ${os.platform}`);
            } else {
                // Handle specific non-zero error codes if needed
                reject(new Error(`Exit code: ${code}${signal ? ', Signal: ' + signal : ''}`));
            }
        });
    });
}

async function jalankanKillChrome() {
    try {
        const result = await killChrome();
        console.log(result); // Print the success message from resolving the promise
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Melanjutkan setelah menunggu 2 detik");
    } catch (error) {
        console.error("Error:", error.message); // Log error message in case of rejection
    }
}
//SELESAI UNTUK KILL TASK CHROME










//----------------------------------------SCRAPE SEMUA (akses di http://localhost:5000/scrapesemua)----------------------------------------//
app.get('/scrapesemua', async (req, res) => {


    //Tutup dulu semua chrome
    await jalankanKillChrome();
    //selesai tutup dulu semua chrome

    //Untuk bikin folder baru tempat menyimpan hasil scrape-an
    let objekwaktu = new Date();
    let date = ("0" + objekwaktu.getDate()).slice(-2); // tanggal skrg, kasi 9 di tanggal single digit
    let month = ("0" + (objekwaktu.getMonth() + 1)).slice(-2); // bulan skrg
    let year = objekwaktu.getFullYear(); // tahun skrg
    let hours = objekwaktu.getHours(); // jam skrg
    var namafoldersekarang = (year + "-" + month + "-" + date + " " + hours); // ngeprint YYYY-MM-DD HH
    var direktoribaru = './hasil/'+namafoldersekarang+'';
    if (!fs.existsSync(direktoribaru)) {
        fs.mkdirSync(direktoribaru, { recursive: true });
    };
    //Selesai untuk bikin folder baru tempat menyimpan hasil scrape-an

    var cekduplikat = [];
    var tokopedia = [];
    var lazada = [];
    var blibli = [];
    var shopee = [];

    //Define file gabungan sebagai variabel
    var direktori_file_lazada_gabungan = './hasil/TERBARU/lazada.json';
    var direktori_file_tokopedia_gabungan = './hasil/TERBARU/tokopedia.json';
    var direktori_file_blibli_gabungan = './hasil/TERBARU/blibli.json';
    var direktori_file_shopee_gabungan = './hasil/TERBARU/shopee.json';
    var direktori_file_cekduplikat = './hasil/TERBARU/cekduplikat.json';
    //Selesai define file gabungan sebagai variabel

    res.set("X-Robots-Tag","noindex, nofollow");

    //Cek query parameter ?hanyaecommerce=[ECOMMERCE] (isi dengan lazada", "tokopedia", "blibli", atau "shopee")
    if (!req.query.hanyaecommerce) {
        hanyaecommerce = '';
    } else {
        hanyaecommerce = req.query.hanyaecommerce;
    };
    //Selesai cek query parameter ?hanyaecommerce=[ECOMMERCE] (isi dengan lazada", "tokopedia", "blibli", atau "shopee")

    //Buka chrome dengan puppeteer
    let browser;
    if (os.platform == 'win32') { //kalau Windows
        browser = await puppeteer.launch({
            dumpio: true,
            defaultViewport: null,
            args: ['--start-maximized'],
            headless: false,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            userDataDir: 'C:\\Users\\gbbl12345\\AppData\\Local\\Google\\Chrome\\User Data\\',
            ignoreDefaultArgs: ['--enable-automation'],
        })
    } else if (os.platform == 'darwin') { //kalau MacOS
        browser = await puppeteer.launch({
            dumpio: true,
            defaultViewport: null,
            args: ['--start-maximized'], // Note: This might not have the exact desired effect on Mac
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            userDataDir: '/Users/dimas/Library/Application Support/Google/Chrome/Default',
            ignoreDefaultArgs: ['--enable-automation'],
        });
    }
    //Selesai buka chrome dengan puppeteer


    //Mulai jalankan program scraping
    await shopeeJS.scrapeShopee(browser, namafoldersekarang, cekduplikat, shopee, direktori_file_shopee_gabungan)
    .then((result) => {
      cekduplikat = result;
    })
    .catch((error) => {
        console.error("Scrape shopee bermasalah:", error.message);
    });

    await tokopediaJS.scrapeTokopedia(browser, namafoldersekarang, cekduplikat, tokopedia, direktori_file_tokopedia_gabungan)
    .then((result) => {
      cekduplikat = result;
    })
    .catch((error) => {
        console.error("Scrape tokopedia bermasalah:", error.message);
    });

    await lazadaJS.scrapeLazada(browser, namafoldersekarang, cekduplikat, lazada, direktori_file_lazada_gabungan)
    .then((result) => {
      cekduplikat = result;
    })
    .catch((error) => {
        console.error("Scrape lazada bermasalah:", error.message);
    });

    await blibliJS.scrapeBlibli(browser, namafoldersekarang, cekduplikat, blibli, direktori_file_blibli_gabungan)
    .then((result) => {
      cekduplikat = result;
    })
    .catch((error) => {
        console.error("Scrape blibli bermasalah:", error.message);
    });

    await cekduplikatJS.printCekduplikat(namafoldersekarang, cekduplikat, direktori_file_cekduplikat)
    .then((result) => {
      cekduplikat = result;
    })
    .catch((error) => {
        console.error("Print cekduplikat bermasalah:", error.message);
    });
    //Selesai jalankan program scraping


    //Mulai jalankan program pembersihan
    await bersihkanJS.bersihkanSemua()
    .then( (totalDibersihkan) => {
        dibersihkan = totalDibersihkan;
    })
    .catch((error) => {
        console.error("Bersihkan produk bermasalah:", error.message);
    });
    //Selesai jalankan program pembersihan

    res.send(`Selesai scrape semua produk, dan membersihkan ${dibersihkan} produk.`);
});
//----------------------------------------SELESAI SCRAPE SEMUA----------------------------------------//










//------------------------------------------BERSIHKAN PRODUK (TERPISAH KALAU PERLU)------------------------------------------//
app.get('/bersihkanproduk', async (req, res) => {
    //Mulai jalankan program pembersihan
    await bersihkanJS.bersihkanSemua()
    .then( (totalDibersihkan) => {
        dibersihkan = totalDibersihkan;
    })
    .catch((error) => {
        console.error("Bersihkan produk bermasalah:", error.message);
    });
    //Selesai jalankan program pembersihan
});
//------------------------------------------SELESAI BERSIHKAN PRODUK------------------------------------------//









//------------------------------------------DOWNLOAD GAMBAR------------------------------------------//
app.get('/downloadgambar', async (req, res) => {

    //Tutup dulu semua chrome//
    await jalankanKillChrome();
    //selesai tutup dulu semua chrome//

    res.set("X-Robots-Tag","noindex, nofollow");

    let array_file_gabungan = [
        './hasil/TERBARU/tokopedia.json',
        './hasil/TERBARU/lazada.json',
        './hasil/TERBARU/blibli.json',
        './hasil/TERBARU/shopee.json',
    ];

    const folder_gambar = './hasil/GAMBAR';
    const folder_gambar_tokopedia = './hasil/GAMBAR/t';
    const folder_gambar_lazada = './hasil/GAMBAR/l';
    const folder_gambar_blibli = './hasil/GAMBAR/b';
    const folder_gambar_shopee = './hasil/GAMBAR/s';
    
    if (!fs.existsSync(folder_gambar)) {
      fs.mkdirSync(folder_gambar);
    }
    if (!fs.existsSync(folder_gambar_tokopedia)) {
        fs.mkdirSync(folder_gambar_tokopedia);
    }
    if (!fs.existsSync(folder_gambar_lazada)) {
        fs.mkdirSync(folder_gambar_lazada);
    }
    if (!fs.existsSync(folder_gambar_blibli)) {
        fs.mkdirSync(folder_gambar_blibli);
    }
    if (!fs.existsSync(folder_gambar_shopee)) {
        fs.mkdirSync(folder_gambar_shopee);
    }

    const browser = await puppeteer.launch({
        dumpio: true,
        defaultViewport: null,
        args: ['--start-maximized'],
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        userDataDir: 'C:\\Users\\gbbl12345\\AppData\\Local\\Google\\Chrome\\User Data\\',
        ignoreDefaultArgs: ['--enable-automation'],
    })
    const page = await browser.newPage();
    await page.waitForTimeout(1000);
    await page.emulateTimezone('Asia/Jakarta');
    await page.setDefaultNavigationTimeout(0);


    for (let i = 0; i < array_file_gabungan.length; i++) {
        if (fs.existsSync(array_file_gabungan[i])) {
            let fileSekarang = JSON.parse(fs.readFileSync(array_file_gabungan[i]));
            let produk = fileSekarang.data.productOfferV2.nodes;

            if (array_file_gabungan[i].includes('lazada')) {
                var folderSimpanSekarang = folder_gambar_lazada;
            } else if (array_file_gabungan[i].includes('tokopedia')) {
                var folderSimpanSekarang = folder_gambar_tokopedia;
            } else if (array_file_gabungan[i].includes('blibli')) {
                var folderSimpanSekarang = folder_gambar_blibli;
            } else if (array_file_gabungan[i].includes('shopee')) {
                var folderSimpanSekarang = folder_gambar_shopee;
            }

            for (let j = 0; j < produk.length; j++) {
                let alamatGambar = produk[j].imageUrl;
                let namaGambar = alamatGambar.split('/').pop();
                let filePath = `${folderSimpanSekarang}/${namaGambar}`;

                // Check if the file already exists, and skip if it does
                if (fs.existsSync(filePath)) {
                    console.log(`File ${namaGambar} already exists. Skipping.`);
                    continue;
                }

                try {
                    await page.goto(alamatGambar, { waitUntil: "networkidle0" })
                    // Download and save the image
                    const response = await axios.get(alamatGambar, { responseType: 'stream' });
                    const imageStream = response.data;
                    const imageWriteStream = fs.createWriteStream(filePath);
                    imageStream.pipe(imageWriteStream);
                    // Wait for the image to finish downloading
                    await new Promise((resolve, reject) => {
                        imageWriteStream.on('finish', resolve);
                        imageWriteStream.on('error', reject);
                    });
                    console.log(`terdownload gambar ${j} dari total ${produk.length} di ${array_file_gabungan[i]} dengan judul ${namaGambar}`);
                } catch (err) {
                    console.error(err);
                } 
            }
        } else {
            console.log(`error: no file found at ${array_file_gabungan[i]}`);
        }
    }

    try {
        await browser.close();
    } catch (err) {
        jalankanKillChrome();
        console.error(err);
    }

    res.send(`Selesai download semua gambar`);
    console.log('Selesai download semua gambar')
});
//------------------------------------------SELESAI DOWNLOAD GAMBAR------------------------------------------//



app.listen(PORT, () => console.log(`server berjalan di port ${PORT}`));
