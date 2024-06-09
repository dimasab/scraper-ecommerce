require('dotenv').config({path: './.env'});
const shopeeJS = require("./fungsi/shopee.js");
const tokopediaJS = require("./fungsi/tokopedia.js");
const lazadaJS = require("./fungsi/lazada.js");
const blibliJS = require("./fungsi/blibli.js");
const cekduplikatJS = require("./fungsi/cekduplikat.js");
const bersihkanJS = require("./fungsi/bersihkan.js");
const downloadgambarJS = require("./fungsi/downloadgambar.js");
const express = require('express');
const app = express();
const puppeteer = require('puppeteer-extra');
// const puppeteer = require('puppeteer');
const fs = require('fs')
const Promise = require('promise');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const os = require('os');
const PORT = process.env.PORT || 5002;
const nodemailer = require("nodemailer");

puppeteer.use(
    StealthPlugin({
      enabledEvasions: new Set([
        // "chrome.app",
        // "chrome.csi",
        // "chrome.loadTimes",
        // "chrome.runtime",
        // Remove following line to fix tokopedia issue
        // "iframe.contentWindow",
        // "media.codecs",
        // "navigator.hardwareConcurrency",
        // "navigator.languages",
        // "navigator.permissions",
        // "navigator.plugins",
        "navigator.webdriver",
        // "sourceurl",
        "user-agent-override",
        // "webgl.vendor",
        // "window.outerdimensions",
      ]),
    })
  );
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




//UNTUK EMAIL
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "delfina.willms40@ethereal.email",
      pass: "889eCusfK66naRA2kR",
    },
  });

async function kirimEmail(subject_email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Scraper Aing" <delfina.willms40@ethereal.email>', // sender address
      to: "delfina.willms40@ethereal.email", // list of receivers
      subject: subject_email, // Subject line
      text: "", // plain text body
      html: "", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
//SELESAI UNTUK EMAIL











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
      kirimEmail("Scraping Shopee Selesai").catch(console.error);
    })
    .catch((error) => {
        console.error("Scrape shopee bermasalah:", error.message);
        kirimEmail("Scraping Shopee Bermasalah").catch(console.error);
    });

    await tokopediaJS.scrapeTokopedia(browser, namafoldersekarang, cekduplikat, tokopedia, direktori_file_tokopedia_gabungan)
    .then((result) => {
      cekduplikat = result;
      kirimEmail("Scraping Tokopedia Selesai").catch(console.error);
    })
    .catch((error) => {
        console.error("Scrape tokopedia bermasalah:", error.message);
        kirimEmail("Scraping Tokopedia Bermasalah").catch(console.error);
    });

    await lazadaJS.scrapeLazada(browser, namafoldersekarang, cekduplikat, lazada, direktori_file_lazada_gabungan)
    .then((result) => {
      cekduplikat = result;
      kirimEmail("Scraping Lazada Selesai").catch(console.error);
    })
    .catch((error) => {
        console.error("Scrape lazada bermasalah:", error.message);
        kirimEmail("Scraping Lazada Bermasalah").catch(console.error);
    });

    await blibliJS.scrapeBlibli(browser, namafoldersekarang, cekduplikat, blibli, direktori_file_blibli_gabungan)
    .then((result) => {
      cekduplikat = result;
      kirimEmail("Scraping Blibli Selesai").catch(console.error);
    })
    .catch((error) => {
        console.error("Scrape blibli bermasalah:", error.message);
        kirimEmail("Scraping Blibli Bermasalah").catch(console.error);
    });

    await cekduplikatJS.printCekduplikat(namafoldersekarang, cekduplikat, direktori_file_cekduplikat)
    .then((result) => {
      cekduplikat = result;
      kirimEmail("Print Cekduplikat Selesai").catch(console.error);
    })
    .catch((error) => {
        console.error("Print cekduplikat bermasalah:", error.message);
        kirimEmail("Print Cekduplikat Bermasalah").catch(console.error);
    });
    //Selesai jalankan program scraping


    //Mulai jalankan program pembersihan
    await bersihkanJS.bersihkanSemua()
    .then( (totalDibersihkan) => {
        dibersihkan = totalDibersihkan;
        console.log(`Selesai membersihkan ${dibersihkan} gambar`);
        kirimEmail("Pembersihan Selesai").catch(console.error);
    })
    .catch((error) => {
        console.error("Bersihkan produk bermasalah:", error.message);
        kirimEmail("Pembersihan Bermasalah").catch(console.error);
    });
    //Selesai jalankan program pembersihan

    //Mulai download gambar
    await downloadgambarJS.downloadGambar(browser)
    .then( () => {
        console.log(`Selesai download semua gambar`);
        kirimEmail("Download Gambar Selesai").catch(console.error);
    })
    .catch((error) => {
        console.error("Download gambar bermasalah:", error.message);
        kirimEmail("Download Gambar Bermasalah").catch(console.error);
    });
    //Selesai download gambar

    res.send(`Selesai scrape semua produk, berishkan ${dibersihkan} produk, dan download gambar`);
});
//----------------------------------------SELESAI SCRAPE SEMUA----------------------------------------//










//------------------------------------------BERSIHKAN PRODUK (TERPISAH KALAU PERLU)------------------------------------------//
app.get('/bersihkanproduk', async (req, res) => {

    //Mulai jalankan program pembersihan
    await bersihkanJS.bersihkanSemua()
    .then( (totalDibersihkan) => {
        dibersihkan = totalDibersihkan;
        console.log(`Selesai membersihkan ${dibersihkan} gambar`);
    })
    .catch((error) => {
        console.error("Bersihkan produk bermasalah:", error.message);
    });
    //Selesai jalankan program pembersihan
    res.send(`Selesai berishkan ${dibersihkan} produk`);
});
//------------------------------------------SELESAI BERSIHKAN PRODUK (TERPISAH KALAU PERLU)------------------------------------------//









//------------------------------------------DOWNLOAD GAMBAR (TERPISAH KALAU PERLU)------------------------------------------//
app.get('/downloadgambar', async (req, res) => {

    //Tutup dulu semua chrome//
    await jalankanKillChrome();
    //selesai tutup dulu semua chrome//

    res.set("X-Robots-Tag","noindex, nofollow");

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

    //Mulai download gambar
    await downloadgambarJS.downloadGambar(browser)
    .then( () => {
        console.log(`Selesai download semua gambar`);
    })
    .catch((error) => {
        console.error("Download gambar bermasalah:", error.message);
    });
    //Selesai download gambar

    res.send(`Selesai download semua gambar`);
});
//------------------------------------------SELESAI DOWNLOAD GAMBAR (TERPISAH KALAU PERLU)------------------------------------------//



app.listen(PORT, () => console.log(`server berjalan di port ${PORT}`));
