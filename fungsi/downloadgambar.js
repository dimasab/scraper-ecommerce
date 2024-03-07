//FUNCTION DOWNLOAD GAMBAR
async function downloadGambar(browser) {

    const fs = require('fs')
    const Promise = require('promise');
    const axios = require('axios');

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

    console.log('Selesai download semua gambar')
}
//FUNCTION DOWNLOAD GAMBAR

module.exports = { downloadGambar };