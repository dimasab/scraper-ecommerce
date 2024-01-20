const express = require('express');
const request = require('request-promise');
require('dotenv').config({path: './.env'});
const puppeteer = require('puppeteer-extra');
const fs = require('fs')
var Promise = require('promise');
const { URL } = require('url');
const axios = require('axios'); // Import the axios library
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const blocked_domains = [
  'googlesyndication.com',
  'adservice.google.com',
  'googletagmanager.com',
  'google-analytics.com',
  'twitter.com',
  'doubleclick.net',
  'google.com',
  'tiktok.com',
  'facebook.net',
  'facebook.com',
  'crazyegg.com'
];


const schedule = require('node-schedule');
const http = require('http');

const url = 'http://localhost:5000/scrapesemua'; // The URL to access

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 18;
rule.minute = 15;

// const job = schedule.scheduleJob(rule, function() {
//     http.get(url, (res) => {
//         console.log(`statusCode: ${res.statusCode}`);
//         res.on('data', (d) => {
//             process.stdout.write(d);
//         });
//     }).on('error', (error) => {
//         console.error(error);
//     });
// });




//UNTUK KILL TASK CHROME
const { spawn } = require('child_process');
async function killChrome() {
  return new Promise((resolve, reject) => {
    const child = spawn('taskkill', ['/F', '/IM', 'chrome.exe']);
    child.on('exit', (code, signal) => {
      resolve();
    });
  });
}
//SELESAI UNTUK KILL TASK CHROME
            


//----------------------------------------SCRAPE SEMUA (akses di http://localhost:5000/scrapesemua)----------------------------------------//
app.get('/scrapesemua', async (req, res) => {

    //Tutup dulu semua chrome//
    await killChrome();
    //selesai tutup dulu semua chrome//

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

    //Mulai define file gabungan sebagai variabel
    var direktori_file_lazada_gabungan = './hasil/TERBARU/lazada.json';
    var direktori_file_tokopedia_gabungan = './hasil/TERBARU/tokopedia.json';
    var direktori_file_blibli_gabungan = './hasil/TERBARU/blibli.json';
    var direktori_file_shopee_gabungan = './hasil/TERBARU/shopee.json';
    var direktori_file_cekduplikat = './hasil/TERBARU/cekduplikat.json';
    //Selesai define file gabungan sebagai variabel

    res.set("X-Robots-Tag","noindex, nofollow");

    //ambil parameter hanyaecommerec (isi "lazada", "tokopedia", "blibli", atau "shopee")
    // akses /scrapesemua?hanyaecommerce=[PILIHANNYA]
    if (!req.query.hanyaecommerce) {
        hanyaecommerce = '';
    } else {
        hanyaecommerce = req.query.hanyaecommerce;
    };









    //----------------------------------------SCRAPE SHOPEE----------------------------------------//
    var listalamat = [
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=MSI&page=0', 'LAPTOP', 'MSI'], // 1 - LAPTOP MSI HALAMAN 1
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=MSI&page=1', 'LAPTOP', 'MSI'], // 2 - LAPTOP MSI HALAMAN 2
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=MSI&page=2', 'LAPTOP', 'MSI'], // 3 - LAPTOP MSI HALAMAN 3
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ASUS&page=0', 'LAPTOP', 'ASUS'], // 4 - LAPTOP ASUS HALAMAN 1
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ASUS&page=1', 'LAPTOP', 'ASUS'], // 5 - LAPTOP ASUS HALAMAN 2
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ASUS&page=2', 'LAPTOP', 'ASUS'], // 6 - LAPTOP ASUS HALAMAN 3
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ASUS&page=3', 'LAPTOP', 'ASUS'], // 7 - LAPTOP ASUS HALAMAN 4
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ASUS&page=4', 'LAPTOP', 'ASUS'], // 8 - LAPTOP ASUS HALAMAN 5
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ACER&page=0', 'LAPTOP', 'ACER'], // 9 - LAPTOP ACER HALAMAN 1
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ACER&page=1', 'LAPTOP', 'ACER'], // 10 - LAPTOP ACER HALAMAN 2
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ACER&page=2', 'LAPTOP', 'ACER'], // 11 - LAPTOP ACER HALAMAN 3
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ACER&page=3', 'LAPTOP', 'ACER'], // 12 - LAPTOP ACER HALAMAN 4
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ACER&page=4', 'LAPTOP', 'ACER'], // 13 - LAPTOP ACER HALAMAN 5
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=LENOVO&page=0', 'LAPTOP', 'LENOVO'], // 14 - LAPTOP LENOVO HALAMAN 1
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=LENOVO&page=1', 'LAPTOP', 'LENOVO'], // 15 - LAPTOP LENOVO HALAMAN 2
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=LENOVO&page=2', 'LAPTOP', 'LENOVO'], // 16 - LAPTOP LENOVO HALAMAN 3
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=LENOVO&page=3', 'LAPTOP', 'LENOVO'], // 17 - LAPTOP LENOVO HALAMAN 4
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=LENOVO&page=4', 'LAPTOP', 'LENOVO'], // 18 - LAPTOP LENOVO HALAMAN 5
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=MACBOOK&page=0', 'LAPTOP', 'APPLE'], // 19 - LAPTOP MACBOOK HALAMAN 1
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=MACBOOK&page=1', 'LAPTOP', 'APPLE'], // 20 - LAPTOP MACBOOK HALAMAN 2
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=MACBOOK&page=2', 'LAPTOP', 'APPLE'], // 21 - LAPTOP MACBOOK HALAMAN 3
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=MACBOOK&page=3', 'LAPTOP', 'APPLE'], // 22 - LAPTOP MACBOOK HALAMAN 4
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=MACBOOK&page=4', 'LAPTOP', 'APPLE'], // 23 - LAPTOP MACBOOK HALAMAN 5
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=DELL&page=0', 'LAPTOP', 'DELL'], // 24 - LAPTOP DELL HALAMAN 1       
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=DELL&page=1', 'LAPTOP', 'DELL'], // 25 - LAPTOP DELL HALAMAN 2            
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=DELL&page=2', 'LAPTOP', 'DELL'], // 26 - LAPTOP DELL HALAMAN 3            
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=DELL&page=3', 'LAPTOP', 'DELL'], // 27 - LAPTOP DELL HALAMAN 4            
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=DELL&page=4', 'LAPTOP', 'DELL'], // 28 - LAPTOP DELL HALAMAN 5            
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=AXIOO&page=0', 'LAPTOP', 'AXIOO'], // 29 - LAPTOP AXIOO HALAMAN 1
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=AXIOO&page=1', 'LAPTOP', 'AXIOO'], // 30 - LAPTOP AXIOO HALAMAN 2
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ZYREX&page=0', 'LAPTOP', 'ZYREX'], // 31 - LAPTOP ZYREX HALAMAN 1  
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=HUAWEI&page=0', 'LAPTOP', 'HUAWEI'], // 32 - LAPTOP HUAWEI HALAMAN 1    
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=INFINIX&page=0', 'LAPTOP', 'INFINIX'], // 33 - LAPTOP INFINIX HALAMAN 1        
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=AVITA&page=0', 'LAPTOP', 'AVITA'], // 34 - LAPTOP AVITA HALAMAN 1
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=HP&page=0', 'LAPTOP', 'HP'], // 35 - LAPTOP HP HALAMAN 1
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=HP&page=1', 'LAPTOP', 'HP'], // 36 - LAPTOP HP HALAMAN 2             
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=HP&page=2', 'LAPTOP', 'HP'], // 37 - LAPTOP HP HALAMAN 3
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=HP&page=3', 'LAPTOP', 'HP'], // 38 - LAPTOP HP HALAMAN 4
        ['https://shopee.co.id/search?facet=11044440&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=HP&page=4', 'LAPTOP', 'HP'], // 39 - LAPTOP HP HALAMAN 5

        ['https://shopee.co.id/search?facet=11044383&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=ADATA&page=0', 'SSD', 'ADATA'], // 40 - SSD ADATA HALAMAN 1
        ['https://shopee.co.id/search?facet=11044383&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=SAMSUNG&page=0', 'SSD', 'SAMSUNG'], // 41 - SSD SAMSUNG HALAMAN 1
        ['https://shopee.co.id/search?facet=11044383&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=WD&page=0', 'SSD', 'WD'], // 42 - SSD WD HALAMAN 1
        ['https://shopee.co.id/search?facet=11044383&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=1000000&keyword=SEAGATE&page=0', 'SSD', 'SEAGATE'], // 43 - SSD SEAGATE HALAMAN 1


        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=SAMSUNG&page=0', 'SMARTPHONE', 'SAMSUNG'], // 40 - SMARTPHONE SAMSUNG HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=SAMSUNG&page=1', 'SMARTPHONE', 'SAMSUNG'], // 41 - SMARTPHONE SAMSUNG HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=SAMSUNG&page=2', 'SMARTPHONE', 'SAMSUNG'], // 42 - SMARTPHONE SAMSUNG HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=SAMSUNG&page=3', 'SMARTPHONE', 'SAMSUNG'], // 43 - SMARTPHONE SAMSUNG HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=SAMSUNG&page=4', 'SMARTPHONE', 'SAMSUNG'], // 44 - SMARTPHONE SAMSUNG HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=IPHONE&page=0', 'SMARTPHONE', 'APPLE'], // 45 - SMARTPHONE IPHONE HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=IPHONE&page=1', 'SMARTPHONE', 'APPLE'], // 46 - SMARTPHONE IPHONE HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=IPHONE&page=2', 'SMARTPHONE', 'APPLE'], // 47 - SMARTPHONE IPHONE HALAMAN 3
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=IPHONE&page=3', 'SMARTPHONE', 'APPLE'], // 48 - SMARTPHONE IPHONE HALAMAN 4
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=IPHONE&page=4', 'SMARTPHONE', 'APPLE'], // 49 - SMARTPHONE IPHONE HALAMAN 5
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=VIVO&page=0', 'SMARTPHONE', 'VIVO'], // 50 - SMARTPHONE VIVO HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=VIVO&page=1', 'SMARTPHONE', 'VIVO'], // 51 - SMARTPHONE VIVO HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=VIVO&page=2', 'SMARTPHONE', 'VIVO'], // 52 - SMARTPHONE VIVO HALAMAN 3
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=VIVO&page=3', 'SMARTPHONE', 'VIVO'], // 53 - SMARTPHONE VIVO HALAMAN 4
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=VIVO&page=4', 'SMARTPHONE', 'VIVO'], // 54 - SMARTPHONE VIVO HALAMAN 5
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=OPPO&page=0', 'SMARTPHONE', 'OPPO'], // 55 - SMARTPHONE OPPO HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=OPPO&page=1', 'SMARTPHONE', 'OPPO'], // 56 - SMARTPHONE OPPO HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=OPPO&page=2', 'SMARTPHONE', 'OPPO'], // 57 - SMARTPHONE OPPO HALAMAN 3
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=OPPO&page=3', 'SMARTPHONE', 'OPPO'], // 58 - SMARTPHONE OPPO HALAMAN 4
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=OPPO&page=4', 'SMARTPHONE', 'OPPO'], // 59 - SMARTPHONE OPPO HALAMAN 5
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=XIAOMI&page=0', 'SMARTPHONE', 'XIAOMI'], // 60 - SMARTPHONE XIAOMI HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=XIAOMI&page=1', 'SMARTPHONE', 'XIAOMI'], // 61 - SMARTPHONE XIAOMI HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=XIAOMI&page=2', 'SMARTPHONE', 'XIAOMI'], // 62 - SMARTPHONE XIAOMI HALAMAN 3
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=XIAOMI&page=3', 'SMARTPHONE', 'XIAOMI'], // 63 - SMARTPHONE XIAOMI HALAMAN 4
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=XIAOMI&page=4', 'SMARTPHONE', 'XIAOMI'], // 64 - SMARTPHONE XIAOMI HALAMAN 5
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=HUAWEI&page=0', 'SMARTPHONE', 'HUAWEI'], // 65 - SMARTPHONE HUAWEI HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=HUAWEI&page=1', 'SMARTPHONE', 'HUAWEI'], // 66 - SMARTPHONE HUAWEI HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=REALME&page=0', 'SMARTPHONE', 'REALME'], // 67 - SMARTPHONE REALME HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=REALME&page=1', 'SMARTPHONE', 'REALME'], // 68 - SMARTPHONE REALME HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=REALME&page=2', 'SMARTPHONE', 'REALME'], // 69 - SMARTPHONE REALME HALAMAN 3
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=REALME&page=3', 'SMARTPHONE', 'REALME'], // 70 - SMARTPHONE REALME HALAMAN 4
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=REALME&page=4', 'SMARTPHONE', 'REALME'], // 71 - SMARTPHONE REALME HALAMAN 5
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=INFINIX&page=0', 'SMARTPHONE', 'INFINIX'], // 72 - SMARTPHONE INFINIX HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=INFINIX&page=1', 'SMARTPHONE', 'INFINIX'], // 73 - SMARTPHONE INFINIX HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=INFINIX&page=2', 'SMARTPHONE', 'HINFINIXP'], // 74 - SMARTPHONE INFINIX HALAMAN 3
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=INFINIX&page=3', 'SMARTPHONE', 'INFINIX'], // 75 - SMARTPHONE INFINIX HALAMAN 4
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=INFINIX&page=4', 'SMARTPHONE', 'INFINIX'], // 76 - SMARTPHONE INFINIX HALAMAN 5
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=NOKIA&page=0', 'SMARTPHONE', 'NOKIA'], // 77 - SMARTPHONE NOKIA HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=NOKIA&page=1', 'SMARTPHONE', 'NOKIA'], // 78 - SMARTPHONE NOKIA HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=POCO&page=0', 'SMARTPHONE', 'POCO'], // 79 - SMARTPHONE POCO HALAMAN 1
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=POCO&page=1', 'SMARTPHONE', 'POCO'], // 80 - SMARTPHONE POCO HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=ASUS&page=0', 'SMARTPHONE', 'ASUS'], // 81 - SMARTPHONE ASUS HALAMAN 1   
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=ASUS&page=1', 'SMARTPHONE', 'ASUS'], // 82 - SMARTPHONE ASUS HALAMAN 2
        ['https://shopee.co.id/search?facet=11044476&filters=7%2C6%2C5&noCorrection=true&pLabelIds=1000953&ratingFilter=3&sortBy=&&minPrice=500000&keyword=GOOGLE&page=0', 'SMARTPHONE', 'GOOGLE'], // 83 - SMARTPHONE GOOGLE HALAMAN 1
    ]

    if (hanyaecommerce == "tokopedia" || hanyaecommerce == "blibli" || hanyaecommerce == "lazada") {
        listalamat = [];
    }




    for (v=0; v < listalamat.length; v++) {
    console.log("Mulai scraping shopee halaman "+(v+1)+" dari total "+(listalamat.length))
        
    alamat = listalamat[v][0]
    
    
        try {

            const barang = listalamat[v][1]
            const merek = listalamat[v][2]

            const browser = await puppeteer.launch({
                dumpio: true,
                defaultViewport: null,
                args: ['--start-maximized'],
                headless: false,
                executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                userDataDir: 'C:\\Users\\gbbl12345\\AppData\\Local\\Google\\Chrome\\User Data\\',
                ignoreDefaultArgs: ['--enable-automation'],
            })
            const page = await browser.newPage();
            await page.emulateTimezone('Asia/Jakarta');
            await page.setDefaultNavigationTimeout(0); 
            await page.waitForTimeout(1000);

            //await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36')            

            await page.setRequestInterception(true);
            page.on('request', request => {
              const url = request.url()
              if (blocked_domains.some(domain => url.includes(domain))) {
                request.abort();
              } else {
                request.continue();
              }
            });


            await page.goto(alamat, { waitUntil: "networkidle0" });
            
            async function autoScroll(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = Math.floor(Math.random() * 2) + 4; //random 4-6;
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
            
                            if(totalHeight >= scrollHeight - window.innerHeight){
                                clearInterval(timer);
                                resolve();
                            }
                            document.body.style.width = "auto";
                        }, Math.floor(Math.random() * 6) + 20 ); //random 20-25
                    });
                });
            };

            async function autoScrollNaik(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = Math.floor(Math.random() * 6) - 30; //random (-30) - (-25);
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += -distance;
            
                            if(totalHeight >= scrollHeight - window.innerHeight){
                                clearInterval(timer);
                                resolve();
                            }
                            document.body.style.width = "auto";
                        }, Math.floor(Math.random() * 3) + 1 ); //random 1 - 3;
                    });
                });
            };

            // Generate random coordinates between 400 and 500
            let randomX = Math.floor(Math.random() * 501) + 400;
            let randomY = Math.floor(Math.random() * 501) + 400;
            // Move the mouse cursor to the random coordinates
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1000) //random 1000-1500

            await autoScroll(page);

            // buat koordinat random baru
            randomX = Math.floor(Math.random() * 501) + 400;
            randomY = Math.floor(Math.random() * 501) + 400;
            // gerakkan lagi mouse nya
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1000) //random 1000-1500

            await autoScrollNaik(page);

            // buat koordinat random baru
            randomX = Math.floor(Math.random() * 501) + 400;
            randomY = Math.floor(Math.random() * 501) + 400;
            // gerakkan lagi mouse nya
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1000) //random 1000-1500



            //UNTUK CEK GAMBAR SUDAH TERLOAD ATAU BELUM
            var tesgambar = await page.evaluate( () => {

                    var tessatuproduk = document.querySelectorAll(".shopee-search-item-result__item");
                    var tesurlgambar;
                    arraytesurlgambar = [];
                    
                    if ( tessatuproduk ) {
                        for (vi = 0; vi < tessatuproduk.length; vi++) {
                            if (
                                tessatuproduk[vi].querySelector("img.QPVlig")?.src.includes("shopee.co.id") || tessatuproduk[vi].querySelector("img.QPVlig")?.src.includes("down-id.img.susercontent.com")
                                ) 
                            {
                                var tesurlgambar = "ADA";
                            } else {
                                var tesurlgambar = "TIDAK";
                            } 
                            arraytesurlgambar.push(tesurlgambar)
                        }
                    } else {
                        var tesurlgambar = "TIDAK";
                        arraytesurlgambar.push(tesurlgambar)
                    }
                    return arraytesurlgambar;
            })

            console.log(tesgambar);
            var percobaanscrollke = 1;
            while (tesgambar.includes("TIDAK") && percobaanscrollke < 10) {
                await autoScroll(page);
                await autoScrollNaik(page);
                percobaanscrollke = percobaanscrollke + 1;
                console.log("percobaan scroll ke "+percobaanscrollke);

                var tesgambar = await page.evaluate( () => {
                    var tessatuproduk = document.querySelectorAll(".shopee-search-item-result__item");
                    var tesurlgambar;
                    arraytesurlgambar = [];
                    
                    if ( tessatuproduk ) {
                        for (vi = 0; vi < tessatuproduk.length; vi++) {
                               if (
                                tessatuproduk[vi].querySelector("img.QPVlig")?.src.includes("shopee.co.id") || tessatuproduk[vi].querySelector("img.QPVlig")?.src.includes("down-id.img.susercontent.com")
                                ) 
                            {
                                var tesurlgambar = "ADA";
                            } else {
                                var tesurlgambar = "TIDAK";
                            } 
                            arraytesurlgambar.push(tesurlgambar)
                        }
                    } else {
                        var tesurlgambar = "TIDAK";
                        arraytesurlgambar.push(tesurlgambar)
                    }
                    return arraytesurlgambar; 
                })
            }
            //SELESAI CEK GAMBAR SUDAH TERLOAD ATAU BELUM


            //MULAI CARI POSISI "TIDAK" UNTUK FILTER PRODUK KETIKA OUTPUT NANTI
            const posisi_TIDAK = [];
            let posisi = tesgambar.indexOf("TIDAK");
            while (posisi !== -1) {
              posisi_TIDAK.push(posisi);
              posisi = tesgambar.indexOf("TIDAK", posisi + 1);
            }
            console.log("Posisi 'TIDAK': ", posisi_TIDAK);
            //SELESAI CARI POSISI "TIDAK" UNTUK FILTER PRODUK KETIKA OUTPUT NANTI


            const array = await page.evaluate( ({shopee, cekduplikat, barang, merek, posisi_TIDAK}) => {
                
                const satuproduk = document.querySelectorAll(".shopee-search-item-result__item");
                arrayproduk = [];
                cekduplikat = JSON.stringify(cekduplikat)
                shopee = JSON.stringify(shopee)
                
                for (vi = 0; vi < satuproduk.length; vi++) {

                    if (posisi_TIDAK.includes(vi)) {
                        continue;
                    }

                    var judulraw = satuproduk[vi].querySelector(".uR5B0O").textContent; //judul produk
                    var hargaraw = satuproduk[vi].querySelector(".fcuizU").textContent; //harga produk
                    var urlgambar = satuproduk[vi].querySelector("img.QPVlig").src.split('?')[0]; // url gambar
                    var namatokoraw = "Shopee";
                    
                    if (satuproduk[vi].querySelector(".njN-1c").textContent.length < 1) {
                        var terjualraw = "0"; //jumlah terjual
                    } else {
                        var terjualraw = satuproduk[vi].querySelector(".njN-1c").textContent //jumlah terjual
                    }

                    if (satuproduk[vi].querySelector(".iMriCi")) { //lokasi toko
                        var lokasitokoraw = satuproduk[vi].querySelector(".iMriCi").textContent;
                    } else {
                        var lokasitokoraw = "Indonesia";
                    }

                    const urlproduk = satuproduk[vi].querySelector("a").href.split('?')[0].replace("/shopee.co.id/", "/shopee.co.id/product/"); //url produk



                    //UNTUK HAPUS 
                    var judulraw = judulraw.replace(/\bl+a+p+t+o+p+\b/gi, "") //optimasi judul karena aneh2 namanya
                    var judulraw = judulraw.replace(/\bt+e+r+m+u+r+a+h+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bm+u+r+a+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+l+u+s+\b/gi, "mulus")
                    var judulraw = judulraw.replace(/\bt+e+r+l+a+r+i+s+\b/gi, "")          
                    var judulraw = judulraw.replace(/\bo+b+r+a+l+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bj+u+a+l+\b/gi, "")      
                    var judulraw = judulraw.replace(/\be+l+e+g+a+n+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+l+e+g+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+s+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+l+l+e+r+\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+a+r+g+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+n+g+e+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+o+n+d+i+s+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+a+s+i+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+r+o+m+o+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+m+u+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+u+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+a+l+i+n+g+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bs+a+n+g+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+b+i+h+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bd+a+r+i+n+g+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bs+i+k+a+t+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bb+o+s+k+u+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bo+l+s+h+o+p+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bb+a+n+d+e+l+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bl+e+m+b+u+r+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bk+u+l+i+a+h+a+n+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bk+u+l+i+a+h+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bk+e+r+j+a+a+n+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bp+e+k+e+r+j+a+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bk+e+r+j+a+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bk+a+n+t+o+r+a+n+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bk+a+n+t+o+r+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bp+e+l+a+j+a+r\b/gi, "")     
                    var judulraw = judulraw.replace(/\bu+n+t+u+k+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bh+a+n+y+a+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bc+o+c+o+k+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bd+a+n+\b/gi, " ") 
                    var judulraw = judulraw.replace(/\bu+t+k+\b/gi, " ") 
                    var judulraw = judulraw.replace(/\bo+n+l+i+n+e+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bb+e+r+g+a+r+a+n+s+i+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bt+e+r+b+a+i+k+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bf+l+a+s+h\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+o+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+l+e\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+p+t+o+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+s+n+i+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+i+a+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+d+i+t+i+n+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+a+k+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b2+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b3+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b4+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b5+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b6+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b7+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b8+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b9+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b2+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b3+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b4+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b5+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b6+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b7+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b8+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b9+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bj+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bj+u+t+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+g+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+l+e+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\ba+n+t+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bf+r+e+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bu+p+g+r+a+d+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+n+i+l+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+o+s+u+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+e+l+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+e+r+e+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bt+e+k+n+o+ k+i+t+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+s+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+l+i+p+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+r+u+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+n+g+i+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bt+e+r+j+a+n+g+k+a+u+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+n+s+t+a+n+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+n+s+t+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bg+o+j+e+k+\b/gi, "")
                    var judulraw = judulraw.replace(/\bg+r+a+b+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+m+e+d+a+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+m+e+ d+a+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bv+a+r+i+a+s+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bo+k+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+r+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+n+g+k+a+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+s+t+i+m+e+w+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+g+e+b+u+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+a+l+a+n+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+u+a+l+i+t+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+w+a+l+i+t+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+p+e+c+i+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+p+e+s+i+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+e+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+v+e+r+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+i+n+t+e+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+a+m+d+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+a+n+d+p+h+o+n+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+m+a+r+t+p+h+o+n+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+t+e+r+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+t+t+e+r+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+g+e+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+i+k+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+e+w+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+i+k+e+n+e+w+\b/gi, "")
                    var judulraw = judulraw.replace(/\ba+s+l+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+0+0+\%+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+o+\ +m+i+n+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+o+m+i+n+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+l+u+s+1+0+0+\%+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+p+a+k+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+p+a+k+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+b+e+r+a+p+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+l+a+m+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+e+w+a+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+o+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+u+r+i+r+\b/gi, "")
                    var judulraw = judulraw.replace(/™+/gi, "")
                    var judulraw = judulraw.replace(/®+/gi, "")
                    var judulraw = judulraw.replace(/\【.*?\】/gi, "")

                    //UNTUK REPLACE CUSTOM
                    var judulraw = judulraw.replace(/\bgenerasi\b/gi, "gen")
                    var judulraw = judulraw.replace(/\s+/gi, " ") //satu spasi atau lebih jadi 1 spasi
                    var judulraw = judulraw.replace(/\(+\ +/gi, "(") // "( " jadi "("
                    var judulraw = judulraw.replace(/\ +\)+/gi, ")") // " )" jadi ")"
                    var judulraw = judulraw.replace(/\[+\ +/gi, "[") // "[ " jadi "["
                    var judulraw = judulraw.replace(/\ +\]+/gi, "]") // " ]" jadi "]"
                    var judulraw = judulraw.replace(/\-+\ +\-+\ +\-+/gi, "-") // "- - -" jadi "-"
                    var judulraw = judulraw.replace(/\/+\ +\/+\ +\/+/gi, "/") // "/ / /" jadi "/"
                    var judulraw = judulraw.replace(/\.+\ +\.+\ +\.+/gi, ".") // ". . ." jadi "."
                    var judulraw = judulraw.replace(/\,+\ +\,+\ +\,+/gi, "/") // ", , ," jadi ","
                    var judulraw = judulraw.replace(/\-+\ +\-+/gi, "-") // "- -" jadi "-" 
                    var judulraw = judulraw.replace(/\/+\ +\/+/gi, "/") // "/ /" jadi "/"
                    var judulraw = judulraw.replace(/\.+\ +\.+/gi, ".") // ". ." jadi "."
                    var judulraw = judulraw.replace(/\,+\ +\,+/gi, ",") // ", ," jadi ","
                    var judulraw = judulraw.replace(/\-\-+/gi, "-") // "--" jadi "-"
                    var judulraw = judulraw.replace(/\/\/+/gi, "/") // "//" jadi "/"
                    var judulraw = judulraw.replace(/\.\.+/gi, ".") // ".." jadi "."
                    var judulraw = judulraw.replace(/\,\,+/gi, ",") // ",," jadi ","

                    //UNTUK JADI SATU SPASI
                    var judulraw = judulraw.replace(/\ \,+\ /gi, " ") //adalah " , "
                    var judulraw = judulraw.replace(/\(+\ +\)+/gi, " ") //adalah ( )
                    var judulraw = judulraw.replace(/\[+\ +\]+/gi, " ") //adalah [ ]
                    var judulraw = judulraw.replace(/\{+\ +\}+/gi, " ") //adalah { }
                    var judulraw = judulraw.replace(/\(+\)+/gi, " ") //adalah ()
                    var judulraw = judulraw.replace(/\[+\]+/gi, " ") //adalah []
                    var judulraw = judulraw.replace(/\{+\}+/gi, " ") //adalah {}
                    var judulraw = judulraw.replace(/\&+/gi, " ") //adalah &
                    var judulraw = judulraw.replace(/\#+/gi, " ") //adalah #
                    var judulraw = judulraw.replace(/\!+/gi, " ") //adalah !
                    var judulraw = judulraw.replace(/\?+/gi, " ") //adalah ?

                    var judulraw = judulraw.replace(/\s+/gi, " ") //satu spasi atau lebih jadi satu spaso
                    const judul = judulraw.trim();

                    var hargaraw = hargaraw.replace(/rp/gi, "");
                    var hargaraw = hargaraw.replace(/\./gi,"");
                    var hargaraw = hargaraw.replace(/[^0-9]/g, "");
                    const harga = hargaraw.trim();


                    var terjualraw = terjualraw.toString();
                    var terjualraw = terjualraw.replace(/,.*/, '000'); //kalau ada koma, ganti koma dan semua setelahnya jadi '000' karena koma berarti ribu
                    var terjualraw = terjualraw.replace(/\D/g, ''); //hapus semua karakter non-numeric
                    const terjual = terjualraw.trim(); //trim spasi depan belakang


                    var lokasitokoraw = lokasitokoraw.replace(/kota/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kab/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/\./gi, "")
                    var lokasitokoraw = lokasitokoraw.trim(); //trim spasi depan belakang
                    var lokasitokoraw = lokasitokoraw.toLowerCase();
                    const namatoko = namatokoraw+" "+lokasitokoraw;

                    if (
                        !satuproduk[vi].querySelector(".F7xq8U div[data-sqe='ad']") && 
                        vi > 9 && 
                        !cekduplikat.includes(urlproduk) && 
                        ( urlgambar.includes("shopee.co.id") || urlgambar.includes("down-id.img.susercontent.com") )
                        ) 
                    {
                        arrayproduk.push(JSON.parse(JSON.stringify({
                            productName:judul,
                            price:harga,
                            imageUrl:urlgambar,
                            sales:terjual,
                            shopName:namatoko,
                            productLink:urlproduk,
                            namaBarang:barang,
                            namaMerek:merek,
                            namaEcommerce: 'shp',
                            statusScrape: 1
                        })));
                    }
                }

                return arrayproduk;
                
            }, {shopee, cekduplikat, barang, merek, posisi_TIDAK})



            if (array.length > 0) {
                bungkusnodes = {"nodes":array};
                bungkusproductOfferV2 = {"productOfferV2":bungkusnodes};
                bungkusdata = {"data":bungkusproductOfferV2};
                //cekduplikat.push(array);
                cekduplikat = cekduplikat.concat(array);
                shopee = shopee.concat(array);
                fs.writeFile('./hasil/'+namafoldersekarang+'/shopee-laptop-halaman-'+(v+1)+'.json', JSON.stringify(bungkusdata), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                }); 
                console.log("File shopee-laptop-halaman-"+(v+1)+".json tersimpan!");
                await page.waitForTimeout(1000)
                await browser.close()
            } else {
                await browser.close();
            }




        } catch (err) {
            await killChrome();
            console.error(err);
        }

    }

    if (shopee.length > 0) {
        bungkusnodes_shopee = {"nodes":shopee};
        bungkusproductOfferV2_shopee = {"productOfferV2":bungkusnodes_shopee};
        bungkusdata_shopee = {"data":bungkusproductOfferV2_shopee};
        fs.writeFile('./hasil/'+namafoldersekarang+'/shopee.json', JSON.stringify(bungkusdata_shopee), function(err) {
            if(err) {
                return console.log(err);
            }
        });

        if (fs.existsSync(direktori_file_shopee_gabungan)) {
            let oldData = JSON.parse(fs.readFileSync(direktori_file_shopee_gabungan)); // baca data lama di /hasil/TERBARU/shopee.json
            let newData = bungkusdata_shopee;
            oldData.data.productOfferV2.nodes.forEach(node => { // loop semua produk lama
              node.statusScrape = node.statusScrape + 1; // +1 semua statusScrape produk lama
            });
            // Loop data baru, bandingkan PATH nya dengan data lama, kalau match maka update node nya
            newData.data.productOfferV2.nodes.forEach(newNode => {
              // Ekstrak komponen path dari productLink menggunakan URL module
              let newLinkPath = new URL(newNode.productLink).pathname;
              let oldNodeIndex = oldData.data.productOfferV2.nodes.findIndex(oldNode => {
                // Ekstrak komponen path dari productLink (data lama) menggunakan URL module
                let oldLinkPath = new URL(oldNode.productLink).pathname;
                // Bandingkan path, kalau beda maka return '-1'
                return oldLinkPath === newLinkPath;
              });
              if (oldNodeIndex !== -1) {
                oldData.data.productOfferV2.nodes[oldNodeIndex] = newNode;
              } else {
                oldData.data.productOfferV2.nodes.push(newNode);
              }
            });
            fs.writeFile(direktori_file_shopee_gabungan, JSON.stringify(oldData), function(err) {
              if(err) {
                return console.log(err);
              }
            });
        } else {
            `eror: gak ada file di ${direktori_file_shopee_gabungan}`
        }
        console.log("File shopee tersimpan!");
    }
    //----------------------------------------SELESAI SCRAPE SHOPEE----------------------------------------//

    res.send("oke"); //Gak penting, cuma output hasil scrape terakhir ke browser. Gak akan ada lagi respon ke browser









    //----------------------------------------SCRAPE TOKOPEDIA----------------------------------------//
    var listalamat = [
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5030', 'LAPTOP', 'RAZER'], // 1 - LAPTOP RAZER HALAMAN 1

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=4775', 'LAPTOP', 'INFINIX'], // 2 - LAPTOP INFINIX HALAMAN 1

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5004', 'LAPTOP', 'MICROSOFT'], // 3 - LAPTOP MICROSOFT HALAMAN 1

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=8204', 'LAPTOP', 'AXIOO'], // 4 - LAPTOP AXIOO HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=8204', 'LAPTOP', 'AXIOO'], // 5 - LAPTOP AXIOO HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=8204', 'LAPTOP', 'AXIOO'], // 6 - LAPTOP AXIOO HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=8204', 'LAPTOP', 'AXIOO'], // 7 - LAPTOP AXIOO HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=8204', 'LAPTOP', 'AXIOO'], // 8 - LAPTOP AXIOO HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5023', 'LAPTOP', 'ZYREX'], // 9 - LAPTOP ZYREX HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5023', 'LAPTOP', 'ZYREX'], // 10 - LAPTOP ZYREX HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5023', 'LAPTOP', 'ZYREX'], // 11 - LAPTOP ZYREX HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5023', 'LAPTOP', 'ZYREX'], // 12 - LAPTOP ZYREX HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5023', 'LAPTOP', 'ZYREX'], // 13 - LAPTOP ZYREX HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5020', 'LAPTOP', 'ACER'], // 14 - LAPTOP ACER HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5020', 'LAPTOP', 'ACER'], // 15 - LAPTOP ACER HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5020', 'LAPTOP', 'ACER'], // 16 - LAPTOP ACER HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5020', 'LAPTOP', 'ACER'], // 17 - LAPTOP ACER HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5020', 'LAPTOP', 'ACER'], // 18 - LAPTOP ACER HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5019', 'LAPTOP', 'ASUS'], // 19 - LAPTOP ASUS HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5019', 'LAPTOP', 'ASUS'], // 20 - LAPTOP ASUS HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5019', 'LAPTOP', 'ASUS'], // 21 - LAPTOP ASUS HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5019', 'LAPTOP', 'ASUS'], // 22 - LAPTOP ASUS HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5019', 'LAPTOP', 'ASUS'], // 23 - LAPTOP ASUS HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=4870', 'LAPTOP', 'APPLE'], // 24 - LAPTOP APPLE HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=4870', 'LAPTOP', 'APPLE'], // 25 - LAPTOP APPLE HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=4870', 'LAPTOP', 'APPLE'], // 26 - LAPTOP APPLE HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=4870', 'LAPTOP', 'APPLE'], // 27 - LAPTOP APPLE HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=4870', 'LAPTOP', 'APPLE'], // 28 - LAPTOP APPLE HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5022', 'LAPTOP', 'DELL'], // 29 - LAPTOP DELL HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5022', 'LAPTOP', 'DELL'], // 30 - LAPTOP DELL HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5022', 'LAPTOP', 'DELL'], // 31 - LAPTOP DELL HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5022', 'LAPTOP', 'DELL'], // 32 - LAPTOP DELL HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5022', 'LAPTOP', 'DELL'], // 33 - LAPTOP DELL HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5002', 'LAPTOP', 'HP'], // 34 - LAPTOP HP HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5002', 'LAPTOP', 'HP'], // 35 - LAPTOP HP HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5002', 'LAPTOP', 'HP'], // 36 - LAPTOP HP HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5002', 'LAPTOP', 'HP'], // 37 - LAPTOP HP HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5002', 'LAPTOP', 'HP'], // 38 - LAPTOP HP HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5053', 'LAPTOP', 'HUAWEI'], // 39 - LAPTOP HUAWEI HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5053', 'LAPTOP', 'HUAWEI'], // 40 - LAPTOP HUAWEI HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5053', 'LAPTOP', 'HUAWEI'], // 41 - LAPTOP HUAWEI HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5053', 'LAPTOP', 'HUAWEI'], // 42 - LAPTOP HUAWEI HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5053', 'LAPTOP', 'HUAWEI'], // 43 - LAPTOP HUAWEI HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5021', 'LAPTOP', 'LENOVO'], // 44 - LAPTOP LENOVO HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5021', 'LAPTOP', 'LENOVO'], // 45 - LAPTOP LENOVO HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5021', 'LAPTOP', 'LENOVO'], // 46 - LAPTOP LENOVO HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5021', 'LAPTOP', 'LENOVO'], // 47 - LAPTOP LENOVO HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5021', 'LAPTOP', 'LENOVO'], // 48 - LAPTOP LENOVO HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=1&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5061', 'LAPTOP', 'MSI'], // 49 - LAPTOP MSI HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=2&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5061', 'LAPTOP', 'MSI'], // 50 - LAPTOP MSI HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=3&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5061', 'LAPTOP', 'MSI'], // 51 - LAPTOP MSI HALAMAN 3
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=4&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5061', 'LAPTOP', 'MSI'], // 52 - LAPTOP MSI HALAMAN 4
        ['https://www.tokopedia.com/p/komputer-laptop/laptop?page=5&shop_tier=1-3-2&pmin=1500000&anno_id_merek=5061', 'LAPTOP', 'MSI'], // 53 - LAPTOP MSI HALAMAN 5

        ['https://www.tokopedia.com/p/komputer-laptop/aksesoris-komputer-laptop/keyboard?page=1&shop_tier=1-3-2&pmin=50000&anno_id_merek=5001', 'KEYBOARD', 'LOGITECH'], // 54 - KEYBOARD LOGITECH HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/aksesoris-komputer-laptop/keyboard?page=2&shop_tier=1-3-2&pmin=50000&anno_id_merek=5001', 'KEYBOARD', 'LOGITECH'], // 55 - KEYBOARD LOGITECH HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/aksesoris-komputer-laptop/keyboard?page=3&shop_tier=1-3-2&pmin=50000&anno_id_merek=5001', 'KEYBOARD', 'LOGITECH'], // 56 - KEYBOARD LOGITECH HALAMAN 3

        ['https://www.tokopedia.com/p/komputer-laptop/komponen-laptop/ram-laptop?page=1&shop_tier=1-3-2&pmin=50000', 'RAM', 'SEMUAMEREK'], // 57 RAM SEMUAMEREK HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/komponen-laptop/ram-laptop?page=2&shop_tier=1-3-2&pmin=50000', 'RAM', 'SEMUAMEREK'], // 58 RAM SEMUAMEREK HALAMAN 2
        ['https://www.tokopedia.com/p/komputer-laptop/komponen-laptop/ram-laptop?page=3&shop_tier=1-3-2&pmin=50000', 'RAM', 'SEMUAMEREK'], // 59 RAM SEMUAMEREK HALAMAN 3

        ['https://www.tokopedia.com/p/komputer-laptop/media-penyimpanan-data/ssd?page=1&shop_tier=1-3-2&pmin=100000&anno_id_merek=4999', 'SSD', 'ADATA'], // 60 SSD ADATA HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/media-penyimpanan-data/ssd?page=1&shop_tier=1-3-2&pmin=100000&anno_id_merek=4997', 'SSD', 'SAMSUNG'], // 61 SSD SAMSUNG HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/media-penyimpanan-data/ssd?page=1&shop_tier=1-3-2&pmin=100000&anno_id_merek=4994', 'SSD', 'SANDISK'], // 62 SSD SANDISK HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/media-penyimpanan-data/ssd?page=1&shop_tier=1-3-2&pmin=100000&anno_id_merek=5012', 'SSD', 'SEAGATE'], // 63 SSD SEAGATE HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/media-penyimpanan-data/ssd?page=1&shop_tier=1-3-2&pmin=100000&anno_id_merek=4995', 'SSD', 'VGEN'], // 64 SSD VGEN HALAMAN 1
        ['https://www.tokopedia.com/p/komputer-laptop/media-penyimpanan-data/ssd?page=1&shop_tier=1-3-2&pmin=100000&anno_id_merek=5011', 'SSD', 'WD'], // 65 SSD WD HALAMAN 1

        ['https://www.tokopedia.com/p/handphone-tablet/handphone?page=1&shop_tier=1-3-2&pmin=1000000&anno_id_merek=4870', 'SMARTPHONE', 'APPLE'], // 66 - SMARTPHONE APPLE HALAMAN 1
        ['https://www.tokopedia.com/p/handphone-tablet/handphone?page=1&shop_tier=1-3-2&pmin=1000000&anno_id_merek=4912', 'SMARTPHONE', 'VIVO'], // 67 - SMARTPHONE VIVO HALAMAN 1
        ['https://www.tokopedia.com/p/handphone-tablet/handphone?page=1&shop_tier=1-3-2&pmin=1000000&anno_id_merek=4902', 'SMARTPHONE', 'OPPO'], // 68 - SMARTPHONE OOPO HALAMAN 1
        ['https://www.tokopedia.com/p/handphone-tablet/handphone?page=1&shop_tier=1-3-2&pmin=1000000&anno_id_merek=5114', 'SMARTPHONE', 'XIAOMI'], // 69 - SMARTPHONE XIAOMI HALAMAN 1
        ['https://www.tokopedia.com/p/handphone-tablet/handphone?page=1&shop_tier=1-3-2&pmin=1000000&anno_id_merek=4997', 'SMARTPHONE', 'SAMSUNG'], // 70 - SMARTPHONE SAMSUNG HALAMAN 1
        ['https://www.tokopedia.com/p/handphone-tablet/handphone?page=1&shop_tier=1-3-2&pmin=1000000&anno_id_merek=5019', 'SMARTPHONE', 'ASUS'], // 71 - SMARTPHONE ASUS HALAMAN 1
        ['https://www.tokopedia.com/p/handphone-tablet/handphone?page=1&shop_tier=1-3-2&pmin=1000000&anno_id_merek=5053', 'SMARTPHONE', 'HUAWEI'], // 72 - SMARTPHONE HUAWEI HALAMAN 1
    ]

    if (hanyaecommerce == "lazada" || hanyaecommerce == "blibli" || hanyaecommerce == "shopee") {
        listalamat = [];
    }

    for (w=0; w < listalamat.length; w++) {
    console.log("Mulai scraping tokopedia halaman "+(w+1)+" dari total "+(listalamat.length))
        
    alamat = listalamat[w][0]    
    
        try {

            const barang = listalamat[w][1]
            const merek = listalamat[w][2]

            const browser = await puppeteer.launch({
                dumpio: true,
                defaultViewport: null,
                args: ['--start-maximized'],
                headless: false,
                executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                userDataDir: 'C:\\Users\\gbbl12345\\AppData\\Local\\Google\\Chrome\\User Data\\',
                ignoreDefaultArgs: ['--enable-automation'],
            })
            const page = await browser.newPage();
            await page.emulateTimezone('Asia/Jakarta');
            await page.setDefaultNavigationTimeout(0); 
            await page.waitForTimeout(1000);

            await page.setRequestInterception(true);
            page.on('request', request => {
              const url = request.url()
              if (blocked_domains.some(domain => url.includes(domain))) {
                request.abort();
              } else {
                request.continue();
              }
            });


            await page.goto(alamat, { waitUntil: "networkidle0" });

            async function autoScroll(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = Math.floor(Math.random() * 2) + 4; //random 4-5
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
            
                            if(totalHeight >= scrollHeight - window.innerHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, Math.floor(Math.random() * 6) + 20 ); //random 20-25;
                    });
                });
            };

            async function autoScrollNaik(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = Math.floor(Math.random() * 6) - 30; //random (-30) - (-25);
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += -distance;
            
                            if(totalHeight >= scrollHeight - window.innerHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, Math.floor(Math.random() * 3) + 1 ); //random 1-2
                    });
                });
            };

            // Generate random coordinates between 400 and 500
            let randomX = Math.floor(Math.random() * 501) + 400;
            let randomY = Math.floor(Math.random() * 501) + 400;
            // Move the mouse cursor to the random coordinates
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1500) //random 1500-2000

            await autoScroll(page);

            // buat koordinat random baru
            randomX = Math.floor(Math.random() * 501) + 400;
            randomY = Math.floor(Math.random() * 501) + 400;
            // gerakkan lagi mouse nya
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1500) //random 1500-2000

            await autoScrollNaik(page);

            randomX = Math.floor(Math.random() * 501) + 400;
            randomY = Math.floor(Math.random() * 501) + 400;
            // gerakkan lagi mouse nya
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1500) //random 1500-2000



            //UNTUK CEK GAMBAR SUDAH TERLOAD ATAU BELUM
            var tesgambar = await page.evaluate( () => {

                    var tessatuproduk = document.querySelectorAll(".css-bk6tzz");
                    var tesurlgambar;
                    arraytesurlgambar = [];
                    
                    if ( tessatuproduk ) {
                        for (wi = 0; wi < tessatuproduk.length; wi++) {
                            if (tessatuproduk[wi].querySelector(".css-16vw0vn img.success")) { // URL GAMBAR
                                var tesurlgambar = "ADA";
                            } else {
                                var tesurlgambar = "TIDAK";
                            } 
                            arraytesurlgambar.push(tesurlgambar)
                        }
                    } else {
                        var tesurlgambar = "TIDAK";
                        arraytesurlgambar.push(tesurlgambar)
                    }
                    return arraytesurlgambar;
            })

            console.log(tesgambar);
            var percobaanscrollke = 1;
            while (tesgambar.includes("TIDAK") && percobaanscrollke < 10) {
                await autoScroll(page);
                await autoScrollNaik(page);
                percobaanscrollke = percobaanscrollke + 1;
                console.log("percobaan scroll ke "+percobaanscrollke);

                    var tesgambar = await page.evaluate( () => {
                        var tessatuproduk = document.querySelectorAll(".css-bk6tzz");
                        var tesurlgambar;
                        arraytesurlgambar = [];
                        
                        if ( tessatuproduk ) {
                            for (wi = 0; wi < tessatuproduk.length; wi++) {
                                if (tessatuproduk[wi].querySelector(".css-16vw0vn img.success")) { // url gambar
                                    var tesurlgambar = "ADA";
                                } else {
                                    var tesurlgambar = "TIDAK";
                                } 
                                arraytesurlgambar.push(tesurlgambar)
                            }
                        } else {
                            var tesurlgambar = "TIDAK";
                            arraytesurlgambar.push(tesurlgambar)
                        }
                        return arraytesurlgambar; 
                    })
            }
            //SELESAI CEK GAMBAR SUDAH TERLOAD ATAU BELUM


            //MULAI CARI POSISI "TIDAK" UNTUK FILTER PRODUK KETIKA OUTPUT NANTI
            const posisi_TIDAK = [];
            let posisi = tesgambar.indexOf("TIDAK");
            while (posisi !== -1) {
              posisi_TIDAK.push(posisi);
              posisi = tesgambar.indexOf("TIDAK", posisi + 1);
            }
            console.log("Posisi 'TIDAK': ", posisi_TIDAK);
            //SELESAI CARI POSISI "TIDAK" UNTUK FILTER PRODUK KETIKA OUTPUT NANTI


            const array = await page.evaluate( ({tokopedia, cekduplikat, barang, merek, posisi_TIDAK}) => {
                
                const satuproduk = document.querySelectorAll(".css-bk6tzz");
                arrayproduk = [];
                cekduplikat = JSON.stringify(cekduplikat)
                tokopedia = JSON.stringify(tokopedia)
                
                for (wi = 0; wi < satuproduk.length; wi++) {

                    if (posisi_TIDAK.includes(wi)) {
                        continue;
                    }

                    var judulraw = satuproduk[wi].querySelector(".css-20kt3o").textContent; //judul produk
                    var hargaraw = satuproduk[wi].querySelector(".css-pp6b3e span").textContent; //harga produk
                    var urlgambar = satuproduk[wi].querySelector(".css-16vw0vn img.success").src.split('?')[0]; // url gambar
                    if (satuproduk[wi].querySelector(".css-1riykrk")) {//jumlah terjual
                        var terjualraw = satuproduk[wi].querySelector(".css-1riykrk").textContent.trim();
                    } else {
                        var terjualraw = Math.floor(Math.random() * 50);
                    }
                    if (satuproduk[wi].querySelector(".css-vbihp9 span + span")) {//nama toko
                        var namatokoraw = satuproduk[wi].querySelector(".css-vbihp9 span + span").textContent;
                    } else {
                        var namatokoraw = "Tokopedia";
                    }
                    if (satuproduk[wi].querySelector(".css-vbihp9 span")) {//lokasi toko
                        var lokasitokoraw = satuproduk[wi].querySelector(".css-vbihp9 span").textContent;
                    } else {
                            var lokasitokoraw = "Indonesia";
                    }
                    const urlproduk = satuproduk[wi].querySelector("a").href.split('?')[0]; //url produk


                    //UNTUK HAPUS 
                    var judulraw = judulraw.replace(/\bl+a+p+t+o+p+\b/gi, "") //optimasi judul karena aneh2 namanya
                    var judulraw = judulraw.replace(/\bt+e+r+m+u+r+a+h+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bm+u+r+a+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+l+u+s+\b/gi, "mulus")
                    var judulraw = judulraw.replace(/\bt+e+r+l+a+r+i+s+\b/gi, "")          
                    var judulraw = judulraw.replace(/\bo+b+r+a+l+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bj+u+a+l+\b/gi, "")      
                    var judulraw = judulraw.replace(/\be+l+e+g+a+n+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+l+e+g+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+s+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+l+l+e+r+\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+a+r+g+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+n+g+e+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+o+n+d+i+s+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+a+s+i+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+r+o+m+o+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+m+u+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+u+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+a+l+i+n+g+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bs+a+n+g+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+b+i+h+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bd+a+r+i+n+g+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bs+i+k+a+t+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bb+o+s+k+u+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bo+l+s+h+o+p+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bb+a+n+d+e+l+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bl+e+m+b+u+r+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bk+u+l+i+a+h+a+n+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bk+u+l+i+a+h+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bk+e+r+j+a+a+n+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bp+e+k+e+r+j+a+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bk+e+r+j+a+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bk+a+n+t+o+r+a+n+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bk+a+n+t+o+r+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bp+e+l+a+j+a+r\b/gi, "")     
                    var judulraw = judulraw.replace(/\bu+n+t+u+k+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bh+a+n+y+a+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bc+o+c+o+k+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bd+a+n+\b/gi, " ") 
                    var judulraw = judulraw.replace(/\bu+t+k+\b/gi, " ") 
                    var judulraw = judulraw.replace(/\bo+n+l+i+n+e+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bb+e+r+g+a+r+a+n+s+i+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bt+e+r+b+a+i+k+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bf+l+a+s+h\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+o+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+l+e\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+p+t+o+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+s+n+i+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+i+a+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+d+i+t+i+n+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+a+k+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b2+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b3+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b4+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b5+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b6+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b7+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b8+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b9+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b2+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b3+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b4+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b5+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b6+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b7+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b8+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b9+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bj+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bj+u+t+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+g+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+l+e+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\ba+n+t+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bf+r+e+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bu+p+g+r+a+d+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+n+i+l+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+o+s+u+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+e+l+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+e+r+e+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bt+e+k+n+o+ k+i+t+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+s+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+l+i+p+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+r+u+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+n+g+i+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bt+e+r+j+a+n+g+k+a+u+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+n+s+t+a+n+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+n+s+t+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bg+o+j+e+k+\b/gi, "")
                    var judulraw = judulraw.replace(/\bg+r+a+b+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+m+e+d+a+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+m+e+ d+a+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bv+a+r+i+a+s+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bo+k+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+r+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+n+g+k+a+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+s+t+i+m+e+w+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+g+e+b+u+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+a+l+a+n+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+u+a+l+i+t+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+w+a+l+i+t+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+p+e+c+i+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+p+e+s+i+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+e+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+v+e+r+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+i+n+t+e+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+a+m+d+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+a+n+d+p+h+o+n+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+m+a+r+t+p+h+o+n+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+t+e+r+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+t+t+e+r+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+g+e+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+i+k+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+e+w+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+i+k+e+n+e+w+\b/gi, "")
                    var judulraw = judulraw.replace(/\ba+s+l+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+0+0+\%+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+o+\ +m+i+n+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+o+m+i+n+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+l+u+s+1+0+0+\%+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+p+a+k+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+p+a+k+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+b+e+r+a+p+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+l+a+m+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+e+w+a+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+o+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+u+r+i+r+\b/gi, "")
                    var judulraw = judulraw.replace(/™+/gi, "")
                    var judulraw = judulraw.replace(/®+/gi, "")
                    var judulraw = judulraw.replace(/\【.*?\】/gi, "")

                    //UNTUK REPLACE CUSTOM
                    var judulraw = judulraw.replace(/\bgenerasi\b/gi, "gen")
                    var judulraw = judulraw.replace(/\s+/gi, " ") //satu spasi atau lebih jadi 1 spasi
                    var judulraw = judulraw.replace(/\(+\ +/gi, "(") // "( " jadi "("
                    var judulraw = judulraw.replace(/\ +\)+/gi, ")") // " )" jadi ")"
                    var judulraw = judulraw.replace(/\[+\ +/gi, "[") // "[ " jadi "["
                    var judulraw = judulraw.replace(/\ +\]+/gi, "]") // " ]" jadi "]"
                    var judulraw = judulraw.replace(/\-+\ +\-+\ +\-+/gi, "-") // "- - -" jadi "-"
                    var judulraw = judulraw.replace(/\/+\ +\/+\ +\/+/gi, "/") // "/ / /" jadi "/"
                    var judulraw = judulraw.replace(/\.+\ +\.+\ +\.+/gi, ".") // ". . ." jadi "."
                    var judulraw = judulraw.replace(/\,+\ +\,+\ +\,+/gi, "/") // ", , ," jadi ","
                    var judulraw = judulraw.replace(/\-+\ +\-+/gi, "-") // "- -" jadi "-" 
                    var judulraw = judulraw.replace(/\/+\ +\/+/gi, "/") // "/ /" jadi "/"
                    var judulraw = judulraw.replace(/\.+\ +\.+/gi, ".") // ". ." jadi "."
                    var judulraw = judulraw.replace(/\,+\ +\,+/gi, ",") // ", ," jadi ","
                    var judulraw = judulraw.replace(/\-\-+/gi, "-") // "--" jadi "-"
                    var judulraw = judulraw.replace(/\/\/+/gi, "/") // "//" jadi "/"
                    var judulraw = judulraw.replace(/\.\.+/gi, ".") // ".." jadi "."
                    var judulraw = judulraw.replace(/\,\,+/gi, ",") // ",," jadi ","

                    //UNTUK JADI SATU SPASI
                    var judulraw = judulraw.replace(/\ \,+\ /gi, " ") //adalah " , "
                    var judulraw = judulraw.replace(/\(+\ +\)+/gi, " ") //adalah ( )
                    var judulraw = judulraw.replace(/\[+\ +\]+/gi, " ") //adalah [ ]
                    var judulraw = judulraw.replace(/\{+\ +\}+/gi, " ") //adalah { }
                    var judulraw = judulraw.replace(/\(+\)+/gi, " ") //adalah ()
                    var judulraw = judulraw.replace(/\[+\]+/gi, " ") //adalah []
                    var judulraw = judulraw.replace(/\{+\}+/gi, " ") //adalah {}
                    var judulraw = judulraw.replace(/\&+/gi, " ") //adalah &
                    var judulraw = judulraw.replace(/\#+/gi, " ") //adalah #
                    var judulraw = judulraw.replace(/\!+/gi, " ") //adalah !
                    var judulraw = judulraw.replace(/\?+/gi, " ") //adalah ?

                    var judulraw = judulraw.replace(/\s+/gi, " ") //satu spasi atau lebih jadi satu spaso
                    const judul = judulraw.trim();

                    var hargaraw = hargaraw.replace(/rp/gi, "");
                    var hargaraw = hargaraw.replace(/\./gi,"");
                    var hargaraw = hargaraw.replace(/[^0-9]/g, "");
                    const harga = hargaraw.trim();

                    var lokasitokoraw = lokasitokoraw.replace(/kota/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kab/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/\./gi, "")
                    var lokasitokoraw = lokasitokoraw.trim();
                    const namatoko = namatokoraw+" - "+lokasitokoraw;


                    var terjualraw = terjualraw.toString();
                    var terjualraw = terjualraw.replace(/,.*/, '000'); //kalau ada koma, ganti koma dan semua setelahnya jadi '000' karena koma berarti ribu
                    var terjualraw = terjualraw.replace(/\D/g, ''); //hapus semua karakter non-numeric
                    const terjual = terjualraw.trim(); //trim spasi depan belakang


                    if (urlproduk.indexOf("/promo/") < 0 && !cekduplikat.includes(urlproduk)) {
                        arrayproduk.push(JSON.parse(JSON.stringify({
                            productName:judul,
                            price:harga,
                            imageUrl:urlgambar,
                            sales:terjual,
                            shopName:namatoko,
                            productLink:urlproduk,
                            namaBarang:barang,
                            namaMerek:merek,
                            namaEcommerce: 'tkp',
                            statusScrape: 1
                        })));
                    }

                }

                return arrayproduk; 
                
            }, {tokopedia, cekduplikat, barang, merek, posisi_TIDAK})
            
            
            if (array.length > 0) { //cek arraynya kosong atau tidak , bisa aja kosong kalau diblokir, kalau kosong ya jangan sampe jadi file.
                bungkusnodes = {"nodes":array};
                bungkusproductOfferV2 = {"productOfferV2":bungkusnodes};
                bungkusdata = {"data":bungkusproductOfferV2};
                //cekduplikat.push(array);
                cekduplikat = cekduplikat.concat(array);
                tokopedia = tokopedia.concat(array);
                fs.writeFile('./hasil/'+namafoldersekarang+'/tokopedia-laptop-halaman-'+(w+1)+'.json', JSON.stringify(bungkusdata), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                }); 
                console.log("File tokopedia-laptop-halaman-"+(w+1)+".json tersimpan!");
                await page.waitForTimeout(1000)
                await browser.close()
            } else { //kalau arraynya kosong
                await browser.close()
            }



        } catch (err) {
            await killChrome();
            console.error(err);
        }

    }
    if (tokopedia.length > 0) {
        bungkusnodes_tokopedia = {"nodes":tokopedia};
        bungkusproductOfferV2_tokopedia = {"productOfferV2":bungkusnodes_tokopedia};
        bungkusdata_tokopedia = {"data":bungkusproductOfferV2_tokopedia};
        fs.writeFile('./hasil/'+namafoldersekarang+'/tokopedia.json', JSON.stringify(bungkusdata_tokopedia), function(err) {
            if(err) {
                return console.log(err);
            }
        });

        if (fs.existsSync(direktori_file_tokopedia_gabungan)) {
            let oldData = JSON.parse(fs.readFileSync(direktori_file_tokopedia_gabungan)); // baca data lama di /hasil/TERBARU/tokopedia.json
            let newData = bungkusdata_tokopedia;
            oldData.data.productOfferV2.nodes.forEach(node => { // loop semua produk lama
              node.statusScrape = node.statusScrape + 1; // +1 semua statusScrape produk lama
            });
            // Loop data baru, bandingkan PATH nya dengan data lama, kalau match maka update node nya
            newData.data.productOfferV2.nodes.forEach(newNode => {
              // Ekstrak komponen path dari productLink menggunakan URL module
              let newLinkPath = new URL(newNode.productLink).pathname;
              let oldNodeIndex = oldData.data.productOfferV2.nodes.findIndex(oldNode => {
                // Ekstrak komponen path dari productLink (data lama) menggunakan URL module
                let oldLinkPath = new URL(oldNode.productLink).pathname;
                // Bandingkan path, kalau beda maka return '-1'
                return oldLinkPath === newLinkPath;
              });
              if (oldNodeIndex !== -1) {
                oldData.data.productOfferV2.nodes[oldNodeIndex] = newNode;
              } else {
                oldData.data.productOfferV2.nodes.push(newNode);
              }
            });
            fs.writeFile(direktori_file_tokopedia_gabungan, JSON.stringify(oldData), function(err) {
              if(err) {
                return console.log(err);
              }
            });
        } else {
            `eror: gak ada file di ${direktori_file_tokopedia_gabungan}`
        }
        console.log("File tokopedia tersimpan!");
    }
    //----------------------------------------SELESAI SCRAPE TOKOPEDIA----------------------------------------//










    //----------------------------------------SCRAPE LAZADA----------------------------------------//
    var listalamat = [
        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1500000-&q=laptop%20lenovo', 'LAPTOP', 'LENOVO'], //LAPTOP LENOVO HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1500000-&q=laptop%20lenovo', 'LAPTOP', 'LENOVO'], //LAPTOP LENOVO HALAMAN 2
        ['https://www.lazada.co.id/catalog/?from=input&page=3&price=1500000-&q=laptop%20lenovo', 'LAPTOP', 'LENOVO'], //LAPTOP LENOVO HALAMAN 3

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1500000-&q=laptop%20asus', 'LAPTOP', 'ASUS'], //LAPTOP ASUS HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1500000-&q=laptop%20asus', 'LAPTOP', 'ASUS'], //LAPTOP ASUS HALAMAN 2
        ['https://www.lazada.co.id/catalog/?from=input&page=3&price=1500000-&q=laptop%20asus', 'LAPTOP', 'ASUS'], //LAPTOP ASUS HALAMAN 3

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1500000-&q=laptop%20acer', 'LAPTOP', 'ACER'], //LAPTOP ACER HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1500000-&q=laptop%20acer', 'LAPTOP', 'ACER'], //LAPTOP ACER HALAMAN 2
        ['https://www.lazada.co.id/catalog/?from=input&page=3&price=1500000-&q=laptop%20acer', 'LAPTOP', 'ACER'], //LAPTOP ACER HALAMAN 3

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1500000-&q=laptop%20hp', 'LAPTOP', 'HP'], //LAPTOP HP HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1500000-&q=laptop%20hp', 'LAPTOP', 'HP'], //LAPTOP HP HALAMAN 2
        ['https://www.lazada.co.id/catalog/?from=input&page=3&price=1500000-&q=laptop%20hp', 'LAPTOP', 'HP'], //LAPTOP HP HALAMAN 3

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1500000-&q=laptop%20dell', 'LAPTOP', 'DELL'], //LAPTOP DELL HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1500000-&q=laptop%20dell', 'LAPTOP', 'DELL'], //LAPTOP DELL HALAMAN 2
        ['https://www.lazada.co.id/catalog/?from=input&page=3&price=1500000-&q=laptop%20dell', 'LAPTOP', 'DELL'], //LAPTOP DELL HALAMAN 3

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1500000-&q=macbook', 'LAPTOP', 'APPLE'], //LAPTOP APPLE HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1500000-&q=macbook', 'LAPTOP', 'APPLE'], //LAPTOP APPLE HALAMAN 2
        ['https://www.lazada.co.id/catalog/?from=input&page=3&price=1500000-&q=macbook', 'LAPTOP', 'APPLE'], //LAPTOP APPLE HALAMAN 3

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=100000-&q=ssd%20samsung', 'SSD', 'SAMSUNG'], //SSD SAMSUNG HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=100000-&q=ssd%20samsung', 'SSD', 'SAMSUNG'], //SSD SAMSUNG HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=100000-&q=ssd%20wd', 'SSD', 'WD'], //SSD WD HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=100000-&q=ssd%20wd', 'SSD', 'WD'], //SSD WD HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=100000-&q=ssd%20adata', 'SSD', 'ADATA'], //SSD WD HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=100000-&q=ssd%20adata', 'SSD', 'ADATA'], //SSD WD HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=100000-&q=ssd%20sandisk', 'SSD', 'SANDISK'], //SSD SANDISK HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=100000-&q=ssd%20sandisk', 'SSD', 'SANDISK'], //SSD SANDISK HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=100000-&q=ssd%20seagate', 'SSD', 'SEAGATE'], //SSD SEAGATE HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=100000-&q=ssd%20seagate', 'SSD', 'SEAGATE'], //SSD SEAGATE HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=100000-&q=ssd%20vgen', 'SSD', 'VGEN'], //SSD VGEN HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=100000-&q=ssd%20vgen', 'SSD', 'VGEN'], //SSD VGEN HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=50000-&q=keyboard%20logitech', 'KEYBOARD', 'LOGITECH'], //KEYBOARD LOGITECH HALAMAN 1

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=50000-&q=ram%20sodimm', 'RAM', 'SEMUAMEREK'], //RAM SEMUAMEREK HALAMAN 1

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20samsung', 'SMARTPHONE', 'SAMSUNG'], //SMARTPHONE SAMSUNG HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1000000-&q=hp%20samsung', 'SMARTPHONE', 'SAMSUNG'], //SMARTPHONE SAMSUNG HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20xiaomi', 'SMARTPHONE', 'XIAOMI'], //SMARTPHONE XIAOMI HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1000000-&q=hp%20xiaomi', 'SMARTPHONE', 'XIAOMI'], //SMARTPHONE XIAOMI HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20huawei', 'SMARTPHONE', 'HUAWEI'], //SMARTPHONE HUAWEI HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1000000-&q=hp%20huawei', 'SMARTPHONE', 'HUAWEI'], //SMARTPHONE HUAWEI HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20oppo', 'SMARTPHONE', 'OPPO'], //SMARTPHONE OPPO HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1000000-&q=hp%20oppo', 'SMARTPHONE', 'OPPO'], //SMARTPHONE OPPO HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20vivo', 'SMARTPHONE', 'VIVO'], //SMARTPHONE VIVO HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1000000-&q=hp%20vivo', 'SMARTPHONE', 'VIVO'], //SMARTPHONE VIVO HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=iphone', 'SMARTPHONE', 'APPLE'], //SMARTPHONE APPLE HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1000000-&q=iphone', 'SMARTPHONE', 'APPLE'], //SMARTPHONE APPLE HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20realme', 'SMARTPHONE', 'REALME'], //SMARTPHONE REALME HALAMAN 1
        ['https://www.lazada.co.id/catalog/?from=input&page=2&price=1000000-&q=hp%20realme', 'SMARTPHONE', 'REALME'], //SMARTPHONE REALME HALAMAN 2

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20infinix', 'SMARTPHONE', 'INFINIX'], //SMARTPHONE INFINIX HALAMAN 1

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20asus', 'SMARTPHONE', 'ASUS'], //SMARTPHONE ASUS HALAMAN 1

        ['https://www.lazada.co.id/catalog/?from=input&page=1&price=1000000-&q=hp%20nokia', 'SMARTPHONE', 'NOKIA'], //SMARTPHONE NOKIA HALAMAN 1

    ]

    if (hanyaecommerce == "tokopedia" || hanyaecommerce == "blibli" || hanyaecommerce == "shopee") {
        listalamat = [];
    }

    for (x=0; x < listalamat.length; x++) {
    console.log("Mulai scraping lazada halaman "+(x+1)+" dari total "+(listalamat.length))
        
    alamat = listalamat[x][0]

    
        try {

            const barang = listalamat[x][1]
            const merek = listalamat[x][2]

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
            await page.emulateTimezone('Asia/Jakarta');
            await page.setDefaultNavigationTimeout(0);
            await page.waitForTimeout(1000);


            await page.goto(alamat, { waitUntil: "networkidle0" })

            async function autoScroll(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = Math.floor(Math.random() * 6) + 4; //random 4-5
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
            
                            if(totalHeight >= scrollHeight - window.innerHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, Math.floor(Math.random() * 6) + 20 ); //random 20-25);
                    });
                });
            };

            async function autoScrollNaik(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = Math.floor(Math.random() * 6) - 30; //random (-30) - (-25);
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += -distance;
            
                            if(totalHeight >= scrollHeight - window.innerHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, Math.floor(Math.random() * 3) + 1 ); //random 1-2
                    });
                });
            };

            let randomX = Math.floor(Math.random() * 501) + 400;
            let randomY = Math.floor(Math.random() * 501) + 400;
            // Move the mouse cursor to the random coordinates
            await page.mouse.move(randomX,randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1000) //random 1000-1500

            await autoScroll(page);

            randomX = Math.floor(Math.random() * 501) + 400;
            randomY = Math.floor(Math.random() * 501) + 400;
            // gerakkan lagi mouse nya
            await page.mouse.move(randomX,randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1000) //random 1000-1500

            await autoScrollNaik(page);

            randomX = Math.floor(Math.random() * 501) + 400;
            randomY = Math.floor(Math.random() * 501) + 400;
            // gerakkan lagi mouse nya
            await page.mouse.move(randomX,randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1000) //random 1000-1500

       


            //UNTUK CEK GAMBAR SUDAH TERLOAD ATAU BELUM
            var tesgambar = await page.evaluate( () => {

                    var tessatuproduk = document.querySelectorAll('[data-qa-locator="product-item"]');
                    var tesurlgambar;
                    arraytesurlgambar = [];

                    if ( tessatuproduk ) {
                        for (xi = 0; xi < tessatuproduk.length; xi++) {
                            if (tessatuproduk[xi].querySelector(".picture-wrapper img").src.includes("data:image") == false) { // cek url gambar kalau src nya sudah jadi http
                                var tesurlgambar = "ADA";
                            } else {
                                var tesurlgambar = "TIDAK";
                            } 
                            arraytesurlgambar.push(tesurlgambar)
                        }
                    } else {
                        var tesurlgambar = "TIDAK";
                        arraytesurlgambar.push(tesurlgambar)
                    }
                    return arraytesurlgambar;
            })

            console.log(tesgambar);
            var percobaanscrollke = 1;
            while (tesgambar.includes("TIDAK") && percobaanscrollke < 10) {
                await autoScroll(page);
                await autoScrollNaik(page);
                percobaanscrollke = percobaanscrollke + 1;
                console.log("percobaan scroll ke "+percobaanscrollke);

                    var tesgambar = await page.evaluate( () => {
                        var tessatuproduk = document.querySelectorAll('[data-qa-locator="product-item"]');
                        var tesurlgambar;
                        arraytesurlgambar = [];

                        if ( tessatuproduk ) {
                            for (xi = 0; xi < tessatuproduk.length; xi++) {
                                if (tessatuproduk[xi].querySelector(".picture-wrapper img").src.includes("data:image") == false) { // cek url gambar kalau src nya sudah jadi http
                                    var tesurlgambar = "ADA";
                                } else {
                                    var tesurlgambar = "TIDAK";
                                } 
                                arraytesurlgambar.push(tesurlgambar)
                            }
                        } else {
                            var tesurlgambar = "TIDAK";
                            arraytesurlgambar.push(tesurlgambar)
                        }
                        return arraytesurlgambar; 
                        
                    })
            }
            //SELESAI CEK GAMBAR SUDAH TERLOAD ATAU BELUM


            //MULAI CARI POSISI "TIDAK" UNTUK FILTER PRODUK KETIKA OUTPUT NANTI
            const posisi_TIDAK = [];
            let posisi = tesgambar.indexOf("TIDAK");
            while (posisi !== -1) {
              posisi_TIDAK.push(posisi);
              posisi = tesgambar.indexOf("TIDAK", posisi + 1);
            }
            console.log("Posisi 'TIDAK': ", posisi_TIDAK);
            //SELESAI CARI POSISI "TIDAK" UNTUK FILTER PRODUK KETIKA OUTPUT NANTI

            
            const array = await page.evaluate( ({lazada, cekduplikat, barang, merek, posisi_TIDAK}) => {
                
                const satuproduk = document.querySelectorAll('[data-qa-locator="product-item"]');
                arrayproduk = [];
                cekduplikat = JSON.stringify(cekduplikat)
                lazada = JSON.stringify(lazada)
                
                for (xi = 0; xi < satuproduk.length; xi++) {

                    if (posisi_TIDAK.includes(xi)) {
                        continue;
                    }

                    var judulraw = satuproduk[xi].querySelector(".RfADt a").textContent;
                    var hargaraw = satuproduk[xi].querySelector(".aBrP0 span").textContent;
                    var urlgambar = satuproduk[xi].querySelector(".picture-wrapper img").src.split('?')[0]; //url gambar
                    if (satuproduk[xi].querySelector("._6uN7R ._1cEkb")) {//jumlah terjual
                        var terjualraw = satuproduk[xi].querySelector("._6uN7R ._1cEkb").textContent.trim();
                    } else {
                        var terjualraw = Math.floor(Math.random() * 50);
                    }
                    if (satuproduk[xi].querySelector(".oa6ri")) {//lokasi toko
                        var lokasitokoraw = satuproduk[xi].querySelector(".oa6ri").textContent.trim();
                    } else {
                        var lokasitokoraw = "Indonesia";
                    }
                    const urlproduk = satuproduk[xi].querySelector(".RfADt a").href.split('?')[0];


                    //UNTUK HAPUS 
                    var judulraw = judulraw.replace(/\bl+a+p+t+o+p+\b/gi, "") //optimasi judul karena aneh2 namanya
                    var judulraw = judulraw.replace(/\bt+e+r+m+u+r+a+h+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bm+u+r+a+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+l+u+s+\b/gi, "mulus")
                    var judulraw = judulraw.replace(/\bt+e+r+l+a+r+i+s+\b/gi, "")          
                    var judulraw = judulraw.replace(/\bo+b+r+a+l+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bj+u+a+l+\b/gi, "")      
                    var judulraw = judulraw.replace(/\be+l+e+g+a+n+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+l+e+g+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+s+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+l+l+e+r+\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+a+r+g+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+n+g+e+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+o+n+d+i+s+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+a+s+i+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+r+o+m+o+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+m+u+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+u+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+a+l+i+n+g+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bs+a+n+g+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+b+i+h+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bd+a+r+i+n+g+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bs+i+k+a+t+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bb+o+s+k+u+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bo+l+s+h+o+p+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bb+a+n+d+e+l+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bl+e+m+b+u+r+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bk+u+l+i+a+h+a+n+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bk+u+l+i+a+h+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bk+e+r+j+a+a+n+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bp+e+k+e+r+j+a+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bk+e+r+j+a+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bk+a+n+t+o+r+a+n+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bk+a+n+t+o+r+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bp+e+l+a+j+a+r\b/gi, "")     
                    var judulraw = judulraw.replace(/\bu+n+t+u+k+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bh+a+n+y+a+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bc+o+c+o+k+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bd+a+n+\b/gi, " ") 
                    var judulraw = judulraw.replace(/\bu+t+k+\b/gi, " ") 
                    var judulraw = judulraw.replace(/\bo+n+l+i+n+e+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bb+e+r+g+a+r+a+n+s+i+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bt+e+r+b+a+i+k+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bf+l+a+s+h\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+o+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+l+e\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+p+t+o+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+s+n+i+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+i+a+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+d+i+t+i+n+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+a+k+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b2+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b3+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b4+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b5+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b6+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b7+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b8+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b9+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b2+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b3+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b4+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b5+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b6+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b7+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b8+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b9+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bj+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bj+u+t+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+g+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+l+e+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\ba+n+t+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bf+r+e+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bu+p+g+r+a+d+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+n+i+l+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+o+s+u+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+e+l+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+e+r+e+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bt+e+k+n+o+ k+i+t+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+s+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+l+i+p+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+r+u+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+n+g+i+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bt+e+r+j+a+n+g+k+a+u+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+n+s+t+a+n+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+n+s+t+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bg+o+j+e+k+\b/gi, "")
                    var judulraw = judulraw.replace(/\bg+r+a+b+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+m+e+d+a+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+m+e+ d+a+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bv+a+r+i+a+s+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bo+k+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+r+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+n+g+k+a+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+s+t+i+m+e+w+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+g+e+b+u+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+a+l+a+n+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+u+a+l+i+t+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+w+a+l+i+t+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+p+e+c+i+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+p+e+s+i+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+e+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+v+e+r+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+i+n+t+e+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+a+m+d+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+a+n+d+p+h+o+n+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+m+a+r+t+p+h+o+n+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+t+e+r+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+t+t+e+r+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+g+e+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+i+k+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+e+w+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+i+k+e+n+e+w+\b/gi, "")
                    var judulraw = judulraw.replace(/\ba+s+l+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+0+0+\%+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+o+\ +m+i+n+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+o+m+i+n+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+l+u+s+1+0+0+\%+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+p+a+k+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+p+a+k+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+b+e+r+a+p+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+l+a+m+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+e+w+a+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+o+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+u+r+i+r+\b/gi, "")
                    var judulraw = judulraw.replace(/™+/gi, "")
                    var judulraw = judulraw.replace(/®+/gi, "")
                    var judulraw = judulraw.replace(/\【.*?\】/gi, "")

                    //UNTUK REPLACE CUSTOM
                    var judulraw = judulraw.replace(/\bgenerasi\b/gi, "gen")
                    var judulraw = judulraw.replace(/\s+/gi, " ") //satu spasi atau lebih jadi 1 spasi
                    var judulraw = judulraw.replace(/\(+\ +/gi, "(") // "( " jadi "("
                    var judulraw = judulraw.replace(/\ +\)+/gi, ")") // " )" jadi ")"
                    var judulraw = judulraw.replace(/\[+\ +/gi, "[") // "[ " jadi "["
                    var judulraw = judulraw.replace(/\ +\]+/gi, "]") // " ]" jadi "]"
                    var judulraw = judulraw.replace(/\-+\ +\-+\ +\-+/gi, "-") // "- - -" jadi "-"
                    var judulraw = judulraw.replace(/\/+\ +\/+\ +\/+/gi, "/") // "/ / /" jadi "/"
                    var judulraw = judulraw.replace(/\.+\ +\.+\ +\.+/gi, ".") // ". . ." jadi "."
                    var judulraw = judulraw.replace(/\,+\ +\,+\ +\,+/gi, "/") // ", , ," jadi ","
                    var judulraw = judulraw.replace(/\-+\ +\-+/gi, "-") // "- -" jadi "-" 
                    var judulraw = judulraw.replace(/\/+\ +\/+/gi, "/") // "/ /" jadi "/"
                    var judulraw = judulraw.replace(/\.+\ +\.+/gi, ".") // ". ." jadi "."
                    var judulraw = judulraw.replace(/\,+\ +\,+/gi, ",") // ", ," jadi ","
                    var judulraw = judulraw.replace(/\-\-+/gi, "-") // "--" jadi "-"
                    var judulraw = judulraw.replace(/\/\/+/gi, "/") // "//" jadi "/"
                    var judulraw = judulraw.replace(/\.\.+/gi, ".") // ".." jadi "."
                    var judulraw = judulraw.replace(/\,\,+/gi, ",") // ",," jadi ","

                    //UNTUK JADI SATU SPASI
                    var judulraw = judulraw.replace(/\ \,+\ /gi, " ") //adalah " , "
                    var judulraw = judulraw.replace(/\(+\ +\)+/gi, " ") //adalah ( )
                    var judulraw = judulraw.replace(/\[+\ +\]+/gi, " ") //adalah [ ]
                    var judulraw = judulraw.replace(/\{+\ +\}+/gi, " ") //adalah { }
                    var judulraw = judulraw.replace(/\(+\)+/gi, " ") //adalah ()
                    var judulraw = judulraw.replace(/\[+\]+/gi, " ") //adalah []
                    var judulraw = judulraw.replace(/\{+\}+/gi, " ") //adalah {}
                    var judulraw = judulraw.replace(/\&+/gi, " ") //adalah &
                    var judulraw = judulraw.replace(/\#+/gi, " ") //adalah #
                    var judulraw = judulraw.replace(/\!+/gi, " ") //adalah !
                    var judulraw = judulraw.replace(/\?+/gi, " ") //adalah ?

                    var judulraw = judulraw.replace(/\s+/gi, " ") //satu spasi atau lebih jadi satu spaso
                    const judul = judulraw.trim();

                    var lokasitokoraw = lokasitokoraw.replace(/kota/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kab/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/\./gi, "")
                    var lokasitokoraw = lokasitokoraw.trim();
                    const namatoko = "Lazada "+lokasitokoraw


                    var hargaraw = hargaraw.replace(/rp/gi, "");
                    var hargaraw = hargaraw.replace(/\./gi,"");
                    var hargaraw = hargaraw.replace(/[^0-9]/g, "");
                    const harga = hargaraw.trim();


                    var terjualraw = terjualraw.toString();
                    var terjualraw = terjualraw.replace(/,.*/, '000'); //kalau ada koma, ganti koma dan semua setelahnya jadi '000' karena koma berarti ribu
                    var terjualraw = terjualraw.replace(/\D/g, ''); //hapus semua karakter non-numeric
                    const terjual = terjualraw.trim(); //trim spasi depan belakang


                    if (!cekduplikat.includes(urlproduk)) {
                        arrayproduk.push(JSON.parse(JSON.stringify({
                            productName:judul,
                            price:harga,
                            imageUrl:urlgambar,
                            sales:terjual,
                            shopName:namatoko,
                            productLink:urlproduk,
                            namaBarang:barang,
                            namaMerek:merek,
                            namaEcommerce: 'lzd',
                            statusScrape: 1
                        })));
                    }

                }

                return arrayproduk;
                
            }, {lazada, cekduplikat, barang, merek, posisi_TIDAK})


            
            if (array.length > 0) {
                bungkusnodes = {"nodes":array};
                bungkusproductOfferV2 = {"productOfferV2":bungkusnodes};
                bungkusdata = {"data":bungkusproductOfferV2};
                //cekduplikat.push(array);
                cekduplikat = cekduplikat.concat(array);
                lazada = lazada.concat(array)
                fs.writeFile('./hasil/'+namafoldersekarang+'/lazada-laptop-halaman-'+(x+1)+'.json', JSON.stringify(bungkusdata), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("File lazada-laptop-halaman-"+(x+1)+".json tersimpan!");
                });
                await page.waitForTimeout(1000)
                await browser.close()
            } else {
                await browser.close();
            }
            


        } catch (err) {
            await killChrome();
            console.error(err);
        }

    }
    if (lazada.length > 0) {
        bungkusnodes_lazada = {"nodes":lazada};
        bungkusproductOfferV2_lazada = {"productOfferV2":bungkusnodes_lazada};
        bungkusdata_lazada = {"data":bungkusproductOfferV2_lazada};
        fs.writeFile('./hasil/'+namafoldersekarang+'/lazada.json', JSON.stringify(bungkusdata_lazada), function(err) {
            if(err) {
                return console.log(err);
            }
        });

        if (fs.existsSync(direktori_file_lazada_gabungan)) {
            let oldData = JSON.parse(fs.readFileSync(direktori_file_lazada_gabungan)); // baca data lama di /hasil/TERBARU/lazada.json
            let newData = bungkusdata_lazada;
            oldData.data.productOfferV2.nodes.forEach(node => { // loop semua produk lama
              node.statusScrape = node.statusScrape + 1; // +1 semua statusScrape produk lama
            });
            // Loop data baru, bandingkan PATH nya dengan data lama, kalau match maka update node nya
            newData.data.productOfferV2.nodes.forEach(newNode => {
              // Ekstrak komponen path dari productLink menggunakan URL module
              let newLinkPath = new URL(newNode.productLink).pathname;
              let oldNodeIndex = oldData.data.productOfferV2.nodes.findIndex(oldNode => {
                // Ekstrak komponen path dari productLink (data lama) menggunakan URL module
                let oldLinkPath = new URL(oldNode.productLink).pathname;
                // Bandingkan path, kalau beda maka return '-1'
                return oldLinkPath === newLinkPath;
              });
              if (oldNodeIndex !== -1) {
                oldData.data.productOfferV2.nodes[oldNodeIndex] = newNode;
              } else {
                oldData.data.productOfferV2.nodes.push(newNode);
              }
            });
            fs.writeFile(direktori_file_lazada_gabungan, JSON.stringify(oldData), function(err) {
              if(err) {
                return console.log(err);
              }
            });
        } else {
            `eror: gak ada file di ${direktori_file_lazada_gabungan}`
        }
        console.log("File lazada tersimpan!");
    }
    //----------------------------------------SELESAI SCRAPE LAZADA----------------------------------------//










    //----------------------------------------SCRAPE BLIBLI----------------------------------------//
    var listalamat = [
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Acer&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'ACER'],// LAPTOP ACER HALAMAN 1
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Acer&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'ACER'],// LAPTOP ACER HALAMAN 2
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Acer&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=3&start=80', 'LAPTOP', 'ACER'],// LAPTOP ACER HALAMAN 3

        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Asus&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'ASUS'],// LAPTOP ASUS HALAMAN 1
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Asus&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'ASUS'],// LAPTOP ASUS HALAMAN 2
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Asus&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=3&start=80', 'LAPTOP', 'ASUS'],// LAPTOP ASUS HALAMAN 3

        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Lenovo&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'LENOVO'],// LAPTOP LENOVO HALAMAN 1
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Lenovo&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'LENOVO'],// LAPTOP LENOVO HALAMAN 2
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Lenovo&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=3&start=80', 'LAPTOP', 'LENOVO'],// LAPTOP LENOVO HALAMAN 3

        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=HP&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'HP'],// LAPTOP HP HALAMAN 1
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=HP&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'HP'],// LAPTOP HP HALAMAN 2
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=HP&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=3&start=80', 'LAPTOP', 'HP'],// LAPTOP HP HALAMAN 3

        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Dell&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'DELL'],// LAPTOP DELL HALAMAN 1
        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Dell&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'DELL'],// LAPTOP DELL HALAMAN 2

        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Axioo&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'AXIOO'],// LAPTOP AXIOO HALAMAN 1

        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Huawei&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'HUAWEI'],// LAPTOP HUAWEI HALAMAN 1

        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Infinix&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'INFINIX'],// LAPTOP INFINIX HALAMAN 1

        ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=MSI&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'MSI'],// LAPTOP MSI HALAMAN 1

        ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=SAMSUNG&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'SAMSUNG'],// SSD SAMSUNG HALAMAN 1

        ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=V-GEN&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'VGEN'],// SSD VGEN HALAMAN 1

        ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=ADATA&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'ADATA'],// SSD ADATA HALAMAN 1

        ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=SANDISK&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'SANDISK'],// SSD SANDISK HALAMAN 1

        ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=MIDASFORCE&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'MIDASFORCE'],// SSD MIDASFORCE HALAMAN 1

    ]

    if (hanyaecommerce == "tokopedia" || hanyaecommerce == "lazada" || hanyaecommerce == "shopee") {
        listalamat = [];
    }


    for (z=0; z < listalamat.length; z++) {
    console.log("Mulai scraping BLIBLI halaman "+(z+1)+" dari total "+(listalamat.length))
        
    alamat = listalamat[z][0]

    
        try {

            const barang = listalamat[z][1]
            const merek = listalamat[z][2]

            const browser = await puppeteer.launch({
                dumpio: true,
                defaultViewport: null,
                args: ['--start-maximized'],
                headless: false,
                executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                userDataDir: 'C:\\Users\\gbbl12345\\AppData\\Local\\Google\\Chrome\\User Data\\',
                ignoreDefaultArgs: ['--enable-automation'],
            })
            const page = await browser.newPage();
            await page.emulateTimezone('Asia/Jakarta');
            await page.setDefaultNavigationTimeout(0); 
            await page.waitForTimeout(1000);

            await page.setRequestInterception(true);
            page.on('request', request => {
              const url = request.url()
              if (blocked_domains.some(domain => url.includes(domain))) {
                request.abort();
              } else {
                request.continue();
              }
            });


            await page.goto(alamat, { waitUntil: "networkidle0" })

            async function autoScroll(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = Math.floor(Math.random() * 11) + 90; //random 90-100
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
            
                            if(totalHeight >= scrollHeight - window.innerHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, Math.floor(Math.random() * 501) + 1500 ); //random 1500-2000
                    });
                });
            };

            async function autoScrollNaik(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = Math.floor(Math.random() * 11) - 100; //random (-100) - (-90);
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += -distance;
            
                            if(totalHeight >= scrollHeight - window.innerHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, Math.floor(Math.random() * 21) + 90 ); //random 90-110
                    });
                });
            };

            // Generate random coordinates between 400 and 500
            let randomX = Math.floor(Math.random() * 501) + 400;
            let randomY = Math.floor(Math.random() * 501) + 400;
            // Move the mouse cursor to the random coordinates
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1500) //random 1500-2000

            await autoScroll(page);

            // buat koordinat random baru
            randomX = Math.floor(Math.random() * 501) + 400;
            randomY = Math.floor(Math.random() * 501) + 400;
            // gerakkan lagi mouse nya
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1500) //random 1500-2000

            await autoScrollNaik(page);

            // buat koordinat random baru
            randomX = Math.floor(Math.random() * 501) + 400;
            randomY = Math.floor(Math.random() * 501) + 400;
            // gerakkan lagi mouse nya
            await page.mouse.move(randomX, randomY);
            await page.waitForTimeout(Math.floor(Math.random() * 501) + 1500) //random 1500-2000

       



            //UNTUK CEK GAMBAR SUDAH TERLOAD ATAU BELUM
            var tesgambar = await page.evaluate( () => {

                    var tessatuproduk = document.querySelectorAll("#productContentDiv .product .product__card .product__container");
                    var tesurlgambar;
                    arraytesurlgambar = [];

                    if ( tessatuproduk ) {
                        for (zi = 0; zi < tessatuproduk.length; zi++) {
                            if (tessatuproduk[zi].querySelector(".blu-product__img-wrapper img.blu-product__img-main[lazy~='loaded']") || tessatuproduk[zi].querySelector(".blu-product__img-wrapper img.carousel-container__slide__content[lazy~='loaded']")) { // cek url gambar kalau src nya sudah ada class loaded
                                var tesurlgambar = "ADA";
                            } else {
                                var tesurlgambar = "TIDAK";
                            } 
                            arraytesurlgambar.push(tesurlgambar)
                        }
                    } else {
                        var tesurlgambar = "TIDAK";
                        arraytesurlgambar.push(tesurlgambar)
                    }
                    return arraytesurlgambar;
            })

            console.log(tesgambar);
            var percobaanscrollke = 1;
            while (tesgambar.includes("TIDAK") && percobaanscrollke < 10) {
                await autoScroll(page);
                await autoScrollNaik(page);
                percobaanscrollke = percobaanscrollke + 1;
                console.log("percobaan scroll ke "+percobaanscrollke);

                    var tesgambar = await page.evaluate( () => {
                        var tessatuproduk = document.querySelectorAll("#productContentDiv .product .product__card .product__container");
                        var tesurlgambar;
                        arraytesurlgambar = [];

                        if ( tessatuproduk ) {
                            for (zi = 0; zi < tessatuproduk.length; zi++) {
                                if (tessatuproduk[zi].querySelector(".blu-product__img-wrapper img.blu-product__img-main[lazy~='loaded']") || tessatuproduk[zi].querySelector(".blu-product__img-wrapper img.carousel-container__slide__content[lazy~='loaded']")) { // cek url gambar kalau src nya sudah ada class loaded
                                    var tesurlgambar = "ADA";
                                } else {
                                    var tesurlgambar = "TIDAK";
                                } 
                                arraytesurlgambar.push(tesurlgambar)
                            }
                        } else {
                            var tesurlgambar = "TIDAK";
                            arraytesurlgambar.push(tesurlgambar)
                        }
                        return arraytesurlgambar; 
                    })
            }
            //SELESAI CEK GAMBAR SUDAH TERLOAD ATAU BELUM


            //MULAI CARI POSISI "TIDAK" UNTUK FILTER PRODUK KETIKA OUTPUT NANTI
            const posisi_TIDAK = [];
            let posisi = tesgambar.indexOf("TIDAK");
            while (posisi !== -1) {
              posisi_TIDAK.push(posisi);
              posisi = tesgambar.indexOf("TIDAK", posisi + 1);
            }
            console.log("Posisi 'TIDAK': ", posisi_TIDAK);
            //SELESAI CARI POSISI "TIDAK" UNTUK FILTER PRODUK KETIKA OUTPUT NANTI


            const array = await page.evaluate( ({blibli, cekduplikat, barang, merek, posisi_TIDAK}) => {
                
                const satuproduk = document.querySelectorAll("#productContentDiv .product .product__card .product__container");
                arrayproduk = [];
                cekduplikat = JSON.stringify(cekduplikat)
                blibli = JSON.stringify(blibli)
                
                for (zi = 0; zi < satuproduk.length; zi++) {

                    if (posisi_TIDAK.includes(zi)) {
                        continue;
                    }

                    var judulraw = satuproduk[zi].querySelector(".blu-product__name").textContent; //nama barang
                    var hargaraw = satuproduk[zi].querySelector(".blu-product__price-after").textContent; //harga barang 

                    if (satuproduk[zi].querySelector(".blu-product__img-wrapper img.blu-product__img-main[lazy~='loaded']")) {
                        var urlgambar = satuproduk[zi].querySelector(".blu-product__img-wrapper img.blu-product__img-main[lazy~='loaded']").src.split('?')[0];
                    } else { 
                        var urlgambar = satuproduk[zi].querySelector(".blu-product__img-wrapper img.carousel-container__slide__content[lazy~='loaded']").src.split('?')[0];
                    }

                    if (satuproduk[zi].querySelector(".blu-product__sold")) {//jumlah terjual
                        var terjualraw = satuproduk[zi].querySelector(".blu-product__sold").textContent.trim();
                    } else {
                        var terjualraw = Math.floor(Math.random() * 50);
                    }

                    if (satuproduk[zi].querySelector(".blu-product__location-text")) {//pembungkus nama toko (span pertama) dan lokasi toko (span kedua)
                        if (satuproduk[zi].querySelector(".blu-product__location-text span:nth-child(2)")) { //lokasi toko ada di span kedua
                            var lokasitokoraw = satuproduk[zi].querySelector(".blu-product__location-text span:nth-child(2)").textContent.trim();
                        } else if (satuproduk[zi].querySelector(".blu-product__location-text span:nth-child(1)")) { //kalau tidak ada nama toko, maka lokasi toko ada di span pertama 
                            var lokasitokoraw = satuproduk[zi].querySelector(".blu-product__location-text span:nth-child(1)").textContent.trim();
                        }
                    } else {
                        var lokasitokoraw = "Jakarta";
                    }

                    if (Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => JSON.parse(script.textContent)).find(jsonObject => jsonObject['@type'] === 'ItemList') || {}) {
                        var urlprodukraw = (Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => JSON.parse(script.textContent)).find(jsonObject => jsonObject['@type'] === 'ItemList') || {}).itemListElement[zi].item.url;
                        // Check if urlproduk contains "blibli.com"
                        if (urlprodukraw.indexOf("blibli.com") === -1) {
                            // If it doesn't contain "blibli.com", add "https://www.blibli.com" at the beginning and only get the part before query params (before "?")
                            var urlproduk = "https://www.blibli.com" + urlprodukraw.split("?")[0];
                        } else {
                            var urlproduk = urlprodukraw.split("?")[0];
                        }
                    }


                    //UNTUK HAPUS 
                    var judulraw = judulraw.replace(/\bl+a+p+t+o+p+\b/gi, "") //optimasi judul karena aneh2 namanya
                    var judulraw = judulraw.replace(/\bt+e+r+m+u+r+a+h+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bm+u+r+a+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+l+u+s+\b/gi, "mulus")
                    var judulraw = judulraw.replace(/\bt+e+r+l+a+r+i+s+\b/gi, "")          
                    var judulraw = judulraw.replace(/\bo+b+r+a+l+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bj+u+a+l+\b/gi, "")      
                    var judulraw = judulraw.replace(/\be+l+e+g+a+n+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+l+e+g+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+s+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+l+l+e+r+\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+a+r+g+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+n+g+e+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+o+n+d+i+s+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+a+s+i+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+r+o+m+o+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+m+u+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+u+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+a+l+i+n+g+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bs+a+n+g+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+b+i+h+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bd+a+r+i+n+g+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bs+i+k+a+t+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bb+o+s+k+u+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bo+l+s+h+o+p+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bb+a+n+d+e+l+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bl+e+m+b+u+r+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bk+u+l+i+a+h+a+n+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bk+u+l+i+a+h+\b/gi, "")    
                    var judulraw = judulraw.replace(/\bk+e+r+j+a+a+n+\b/gi, "")   
                    var judulraw = judulraw.replace(/\bp+e+k+e+r+j+a+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bk+e+r+j+a+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bk+a+n+t+o+r+a+n+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bk+a+n+t+o+r+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bp+e+l+a+j+a+r\b/gi, "")     
                    var judulraw = judulraw.replace(/\bu+n+t+u+k+\b/gi, "")  
                    var judulraw = judulraw.replace(/\bh+a+n+y+a+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bc+o+c+o+k+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bd+a+n+\b/gi, " ") 
                    var judulraw = judulraw.replace(/\bu+t+k+\b/gi, " ") 
                    var judulraw = judulraw.replace(/\bo+n+l+i+n+e+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bb+e+r+g+a+r+a+n+s+i+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bt+e+r+b+a+i+k+\b/gi, "") 
                    var judulraw = judulraw.replace(/\bf+l+a+s+h\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+o+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+l+e\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+p+t+o+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+s+n+i+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+i+a+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+d+i+t+i+n+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bp+a+k+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b2+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b3+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b4+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b5+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b6+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b7+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b8+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b9+j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b2+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b3+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b4+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b5+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b6+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b7+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b8+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\b9+ j+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bj+u+t+a+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bj+u+t+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+g+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+l+e+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\ba+n+t+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bf+r+e+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bu+p+g+r+a+d+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+n+i+l+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+o+s+u+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+e+l+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+e+r+e+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bt+e+k+n+o+ k+i+t+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+i+s+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+l+i+p+a+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+r+u+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+n+g+i+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bt+e+r+j+a+n+g+k+a+u+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+n+s+t+a+n+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+n+s+t+a+n+\b/gi, "")
                    var judulraw = judulraw.replace(/\bg+o+j+e+k+\b/gi, "")
                    var judulraw = judulraw.replace(/\bg+r+a+b+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+m+e+d+a+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+a+m+e+ d+a+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bv+a+r+i+a+s+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bo+k+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+r+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+e+n+g+k+a+p+\b/gi, "")
                    var judulraw = judulraw.replace(/\bi+s+t+i+m+e+w+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+g+e+b+u+t+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+a+l+a+n+g+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+u+a+l+i+t+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+r+k+w+a+l+i+t+a+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+p+e+c+i+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+p+e+s+i+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+e+a+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\be+v+e+r+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+i+n+t+e+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+a+m+d+\b/gi, "")
                    var judulraw = judulraw.replace(/\bc+n+c+\b/gi, "")
                    var judulraw = judulraw.replace(/\bh+a+n+d+p+h+o+n+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+m+a+r+t+p+h+o+n+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+t+e+r+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+a+t+t+e+r+y+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+g+e+l+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+i+k+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+e+w+\b/gi, "")
                    var judulraw = judulraw.replace(/\bl+i+k+e+n+e+w+\b/gi, "")
                    var judulraw = judulraw.replace(/\ba+s+l+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\b1+0+0+\%+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+o+\ +m+i+n+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bn+o+m+i+n+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+u+l+u+s+1+0+0+\%+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+p+a+k+e+\b/gi, "")
                    var judulraw = judulraw.replace(/\bd+i+p+a+k+a+i+\b/gi, "")
                    var judulraw = judulraw.replace(/\bb+e+b+e+r+a+p+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bs+e+l+a+m+a+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+e+w+a+h+\b/gi, "")
                    var judulraw = judulraw.replace(/\bm+o+u+s+\b/gi, "")
                    var judulraw = judulraw.replace(/\bk+u+r+i+r+\b/gi, "")
                    var judulraw = judulraw.replace(/™+/gi, "")
                    var judulraw = judulraw.replace(/®+/gi, "")
                    var judulraw = judulraw.replace(/\【.*?\】/gi, "")

                    //UNTUK REPLACE CUSTOM
                    var judulraw = judulraw.replace(/\bgenerasi\b/gi, "gen")
                    var judulraw = judulraw.replace(/\s+/gi, " ") //satu spasi atau lebih jadi 1 spasi
                    var judulraw = judulraw.replace(/\(+\ +/gi, "(") // "( " jadi "("
                    var judulraw = judulraw.replace(/\ +\)+/gi, ")") // " )" jadi ")"
                    var judulraw = judulraw.replace(/\[+\ +/gi, "[") // "[ " jadi "["
                    var judulraw = judulraw.replace(/\ +\]+/gi, "]") // " ]" jadi "]"
                    var judulraw = judulraw.replace(/\-+\ +\-+\ +\-+/gi, "-") // "- - -" jadi "-"
                    var judulraw = judulraw.replace(/\/+\ +\/+\ +\/+/gi, "/") // "/ / /" jadi "/"
                    var judulraw = judulraw.replace(/\.+\ +\.+\ +\.+/gi, ".") // ". . ." jadi "."
                    var judulraw = judulraw.replace(/\,+\ +\,+\ +\,+/gi, "/") // ", , ," jadi ","
                    var judulraw = judulraw.replace(/\-+\ +\-+/gi, "-") // "- -" jadi "-" 
                    var judulraw = judulraw.replace(/\/+\ +\/+/gi, "/") // "/ /" jadi "/"
                    var judulraw = judulraw.replace(/\.+\ +\.+/gi, ".") // ". ." jadi "."
                    var judulraw = judulraw.replace(/\,+\ +\,+/gi, ",") // ", ," jadi ","
                    var judulraw = judulraw.replace(/\-\-+/gi, "-") // "--" jadi "-"
                    var judulraw = judulraw.replace(/\/\/+/gi, "/") // "//" jadi "/"
                    var judulraw = judulraw.replace(/\.\.+/gi, ".") // ".." jadi "."
                    var judulraw = judulraw.replace(/\,\,+/gi, ",") // ",," jadi ","

                    //UNTUK JADI SATU SPASI
                    var judulraw = judulraw.replace(/\ \,+\ /gi, " ") //adalah " , "
                    var judulraw = judulraw.replace(/\(+\ +\)+/gi, " ") //adalah ( )
                    var judulraw = judulraw.replace(/\[+\ +\]+/gi, " ") //adalah [ ]
                    var judulraw = judulraw.replace(/\{+\ +\}+/gi, " ") //adalah { }
                    var judulraw = judulraw.replace(/\(+\)+/gi, " ") //adalah ()
                    var judulraw = judulraw.replace(/\[+\]+/gi, " ") //adalah []
                    var judulraw = judulraw.replace(/\{+\}+/gi, " ") //adalah {}
                    var judulraw = judulraw.replace(/\&+/gi, " ") //adalah &
                    var judulraw = judulraw.replace(/\#+/gi, " ") //adalah #
                    var judulraw = judulraw.replace(/\!+/gi, " ") //adalah !
                    var judulraw = judulraw.replace(/\?+/gi, " ") //adalah ?

                    var judulraw = judulraw.replace(/\s+/gi, " ") //satu spasi atau lebih jadi satu spaso
                    const judul = judulraw.trim();

                    var hargaraw = hargaraw.split('-')[0]
                    var hargaraw = hargaraw.replace(/rp/gi, "");
                    var hargaraw = hargaraw.replace(/\,/gi, "");
                    var hargaraw = hargaraw.replace(/\./gi,"");
                    var hargaraw = hargaraw.replace(/[^0-9]/g, "");
                    const harga = hargaraw.trim();


                    var terjualraw = terjualraw.toString();
                    var terjualraw = terjualraw.replace(/,.*/, '000'); //kalau ada koma, ganti koma dan semua setelahnya jadi '000' karena koma berarti ribu
                    var terjualraw = terjualraw.replace(/\D/g, ''); //hapus semua karakter non-numeric
                    const terjual = terjualraw.trim(); //trim spasi depan belakang


                    var lokasitokoraw = lokasitokoraw.split('&')[0]
                    var lokasitokoraw = lokasitokoraw.replace(/kota/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kab/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/\./gi, "")
                    var lokasitokoraw = lokasitokoraw.trim();
                    const namatoko = "Blibli "+lokasitokoraw



                    if (urlproduk !== "URLKOSONG" && !cekduplikat.includes(urlproduk)) { //hanya ambil yang URL nya tidak kosong
                        arrayproduk.push(JSON.parse(JSON.stringify({
                            productName:judul,
                            price:harga,
                            imageUrl:urlgambar,
                            sales:terjual,
                            shopName:namatoko,
                            productLink:urlproduk,
                            namaBarang:barang,
                            namaMerek:merek,
                            namaEcommerce: 'bli',
                            statusScrape: 1
                        })));
                    }

                }

                return arrayproduk;
                
            }, {blibli, cekduplikat, barang, merek, posisi_TIDAK})


            if (array.length > 0) {
                bungkusnodes = {"nodes":array};
                bungkusproductOfferV2 = {"productOfferV2":bungkusnodes};
                bungkusdata = {"data":bungkusproductOfferV2};
                //cekduplikat.push(array);
                cekduplikat = cekduplikat.concat(array);
                blibli = blibli.concat(array);
                fs.writeFile('./hasil/'+namafoldersekarang+'/blibli-laptop-halaman-'+(z+1)+'.json', JSON.stringify(bungkusdata), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("File blibli-laptop-halaman-"+(z+1)+".json tersimpan!");
                });
                await page.waitForTimeout(1000)
                await browser.close()
            } else {
                await browser.close();
            }


        } catch (err) {
            await killChrome();
            console.error(err);
        }

    }

    if (blibli.length > 0) {
        bungkusnodes_blibli = {"nodes":blibli};
        bungkusproductOfferV2_blibli = {"productOfferV2":bungkusnodes_blibli};
        bungkusdata_blibli = {"data":bungkusproductOfferV2_blibli};
        fs.writeFile('./hasil/'+namafoldersekarang+'/blibli.json', JSON.stringify(bungkusdata_blibli), function(err) {
            if(err) {
                return console.log(err);
            }
        });

        if (fs.existsSync(direktori_file_blibli_gabungan)) {
            let oldData = JSON.parse(fs.readFileSync(direktori_file_blibli_gabungan)); // baca data lama di /hasil/TERBARU/blibli.json
            let newData = bungkusdata_blibli;
            oldData.data.productOfferV2.nodes.forEach(node => { // loop semua produk lama
              node.statusScrape = node.statusScrape + 1; // +1 semua statusScrape produk lama
            });
            // Loop data baru, bandingkan PATH nya dengan data lama, kalau match maka update node nya
            newData.data.productOfferV2.nodes.forEach(newNode => {
              // Ekstrak komponen path dari productLink menggunakan URL module
              let newLinkPath = new URL(newNode.productLink).pathname;
              let oldNodeIndex = oldData.data.productOfferV2.nodes.findIndex(oldNode => {
                // Ekstrak komponen path dari productLink (data lama) menggunakan URL module
                let oldLinkPath = new URL(oldNode.productLink).pathname;
                // Bandingkan path, kalau beda maka return '-1'
                return oldLinkPath === newLinkPath;
              });
              if (oldNodeIndex !== -1) {
                oldData.data.productOfferV2.nodes[oldNodeIndex] = newNode;
              } else {
                oldData.data.productOfferV2.nodes.push(newNode);
              }
            });
            fs.writeFile(direktori_file_blibli_gabungan, JSON.stringify(oldData), function(err) {
              if(err) {
                return console.log(err);
              }
            });
        } else {
            `eror: gak ada file di ${direktori_file_blibli_gabungan}`
        }
        console.log("File blibli tersimpan!");
    }
    //----------------------------------------SELESAI SCRAPE BLIBLI----------------------------------------//









    //----------------------------------------URUSAN FILE CEKDUPLIKAT----------------------------------------//
    bungkusnodes_cekduplikat = {"nodes":cekduplikat};
    bungkusproductOfferV2_cekduplikat = {"productOfferV2":bungkusnodes_cekduplikat};
    bungkusdata_cekduplikat = {"data":bungkusproductOfferV2_cekduplikat};
    fs.writeFile('./hasil/'+namafoldersekarang+'/cekduplikat.json', JSON.stringify(bungkusdata_cekduplikat), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    const oldData = JSON.parse(fs.readFileSync(direktori_file_cekduplikat)); // Baca data lama di /hasil/TERBARU/cekduplikat.json
    const newData = bungkusdata_cekduplikat;
    oldData.data.productOfferV2.nodes.forEach(node => { // loop semua produk lama
      node.statusScrape = node.statusScrape + 1; // +1 semua statusScrape produk lama
    });
    // Loop data lama lalu update data lama
    newData.data.productOfferV2.nodes.forEach(newNode => {
      const oldNodeIndex = oldData.data.productOfferV2.nodes.findIndex(oldNode => oldNode.productLink === newNode.productLink);
      if (oldNodeIndex !== -1) {
        oldData.data.productOfferV2.nodes[oldNodeIndex] = newNode;
      } else {
        oldData.data.productOfferV2.nodes.push(newNode);
      }
    });
    fs.writeFile(direktori_file_cekduplikat, JSON.stringify(oldData), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    console.log("File cekduplikat tersimpan!");
    //----------------------------------------SELESAI URUSAN FILE CEKDUPLIKAT----------------------------------------//

});
//----------------------------------------SELESAI SCRAPE SEMUA----------------------------------------//










//------------------------------------------BERSIHKAN PRODUK------------------------------------------//
app.get('/bersihkanproduk', async (req, res) => {

    let array_file_gabungan = [
        './hasil/TERBARU/lazada.json',
        './hasil/TERBARU/tokopedia.json',
        './hasil/TERBARU/blibli.json',
        './hasil/TERBARU/shopee.json',
        './hasil/TERBARU/cekduplikat.json'
    ];
    let batas_maksimum_statusScrape = 30;

    async function filterDanTulisFile() {
        for (let i = 0; i < array_file_gabungan.length; i++) {
          if (fs.existsSync(array_file_gabungan[i])) {

            let oldData = JSON.parse(fs.readFileSync(array_file_gabungan[i]));
            let totalProdukLama = oldData.data.productOfferV2.nodes.length;
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
      }
      filterDanTulisFile();
      res.send(`Selesai membuang semua produk yang status scrape nya diatas ${batas_maksimum_statusScrape}, dan selesai membuang semua produk yang namanya tidak relevan dengan brand nya.`);
});
//------------------------------------------SELESAI BERSIHKAN PRODUK------------------------------------------//









//------------------------------------------DOWNLOAD GAMBAR------------------------------------------//
app.get('/downloadgambar', async (req, res) => {

    //Tutup dulu semua chrome//
    await killChrome();
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
                    await page.emulateTimezone('Asia/Jakarta');
                    await page.setDefaultNavigationTimeout(0); 
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

                    await browser.close();
                    console.log(`terdownload gambar ${j} dari total ${produk.length} di ${array_file_gabungan[i]} dengan judul ${namaGambar}`);
                } catch (err) {
                    await killChrome();
                    console.error(err);
                } 
            }
        } else {
        console.log(`error: no file found at ${array_file_gabungan[i]}`);
        }
    }
      res.send(`Selesai download semua gambar`);
      console.log('Selesai download semua gambar')
});
//------------------------------------------SELESAI DOWNLOAD GAMBAR------------------------------------------//



app.listen(PORT, () => console.log(`server berjalan di port ${PORT}`));
