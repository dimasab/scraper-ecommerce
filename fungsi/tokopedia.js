//FUNCTION SCRAPE TOKOPEDIA
async function scrapeTokopedia(browser, namafoldersekarang, cekduplikat, tokopedia, direktori_file_tokopedia_gabungan) {
    const fs = require('fs')
    const Promise = require('promise');
    const { URL } = require('url');
    const request = require('request-promise');
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

    for (i = 0; i < listalamat.length; i++) {

        async function tunggu(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
        }

        await tunggu(1000);

        console.log("Mulai scraping tokopedia halaman "+(i+1)+" dari total "+(listalamat.length))
            
        alamat = listalamat[i][0]    
    
        try {

            const barang = listalamat[i][1]
            const merek = listalamat[i][2]

            //buka tab baru
            const page = await browser.newPage();
            await page.waitForTimeout(1000);
            await page.emulateTimezone('Asia/Jakarta');
            await page.setDefaultNavigationTimeout(0); 
            await page.setRequestInterception(true);
            //selesai buka tab baru

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

            page.on('request', request => {
              const url = request.url()
              if (blocked_domains.some(domain => url.includes(domain))) {
                request.abort();
              } else {
                request.continue();
              }
            });

            await page.goto(alamat, { waitUntil: "networkidle0", timeout: 360000 });

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



            var selectorSingleItemTokopedia = `.css-bk6tzz`;
            var selectorGambarTokopedia = `.css-16vw0vn img.success`;
            var selectorJudulTokopedia = `.css-20kt3o`;
            var selectorHargaTokopedia = `.css-pp6b3e span`;
            var selectorTerjualTokopedia = `.css-1riykrk`;
            var selectorTokoTokopedia = `.css-vbihp9 span + span`;
            var selectorLokasiTokopedia = `.css-vbihp9 span`;
            var selectorUrlTokopedia = `a`;



            //UNTUK CEK GAMBAR SUDAH TERLOAD ATAU BELUM
            var tesgambar = await page.evaluate( ({selectorSingleItemTokopedia, selectorGambarTokopedia}) => {
                var tessatuproduk = document.querySelectorAll(selectorSingleItemTokopedia);
                var tesurlgambar;
                arraytesurlgambar = [];

                if ( tessatuproduk ) {
                    for (j = 0; j < tessatuproduk.length; j++) {
                        if (tessatuproduk[j].querySelector(selectorGambarTokopedia)) { // URL GAMBAR
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
            }, {selectorSingleItemTokopedia, selectorGambarTokopedia})

            console.log(tesgambar);
            var percobaanscrollke = 1;
            while (tesgambar.includes("TIDAK") && percobaanscrollke < 3) {
                await autoScroll(page);
                await autoScrollNaik(page);
                percobaanscrollke = percobaanscrollke + 1;
                console.log("percobaan scroll ke "+percobaanscrollke);
                var tesgambar = await page.evaluate( ({selectorSingleItemTokopedia, selectorGambarTokopedia}) => {
                    var tessatuproduk = document.querySelectorAll(selectorSingleItemTokopedia);
                    var tesurlgambar;
                    arraytesurlgambar = [];
                    
                    if ( tessatuproduk ) {
                        for (j = 0; j < tessatuproduk.length; j++) {
                            if (tessatuproduk[j].querySelector(selectorGambarTokopedia)) { // url gambar
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
                }, {selectorSingleItemTokopedia, selectorGambarTokopedia})
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


            const array = await page.evaluate( ({tokopedia, cekduplikat, barang, merek, posisi_TIDAK, selectorSingleItemTokopedia, selectorGambarTokopedia, selectorJudulTokopedia, selectorHargaTokopedia, selectorTerjualTokopedia, selectorTokoTokopedia, selectorLokasiTokopedia, selectorUrlTokopedia}) => {
                
                const satuproduk = document.querySelectorAll(selectorSingleItemTokopedia);
                arrayproduk = [];
                cekduplikat = JSON.stringify(cekduplikat)
                tokopedia = JSON.stringify(tokopedia)
                
                for (j = 0; j < satuproduk.length; j++) {

                    let ecommerce;
                    let urlgambar;
                    let judul;
                    let harga;
                    let terjual;
                    let namatoko;
                    let urlproduk;

                    if (posisi_TIDAK.includes(j)) {
                        continue;
                    }

                    ecommerce = 'tkp';
                    urlgambar = satuproduk[j].querySelector(selectorGambarTokopedia).src.split('?')[0]; // url gambar
                    var judulraw = satuproduk[j].querySelector(selectorJudulTokopedia).textContent; //judul produk
                    var hargaraw = satuproduk[j].querySelector(selectorHargaTokopedia).textContent; //harga produk
                    if (satuproduk[j].querySelector(selectorTerjualTokopedia)) {//jumlah terjual
                        var terjualraw = satuproduk[j].querySelector(selectorTerjualTokopedia).textContent.trim();
                    } else {
                        var terjualraw = Math.floor(Math.random() * 50);
                    }
                    if (satuproduk[j].querySelector(selectorTokoTokopedia)) {//nama toko
                        var namatokoraw = satuproduk[j].querySelector(selectorTokoTokopedia).textContent;
                    } else {
                        var namatokoraw = "Tokopedia";
                    }
                    if (satuproduk[j].querySelector(selectorLokasiTokopedia)) {//lokasi toko
                        var lokasitokoraw = satuproduk[j].querySelector(selectorLokasiTokopedia).textContent;
                    } else {
                        var lokasitokoraw = "Indonesia";
                    }
                    //var urlproduk = satuproduk[j].querySelector("a").href.split('?')[0]; //url produk
                    var urlprodukraw = satuproduk[j].querySelector(selectorUrlTokopedia).href;



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
                    judul = judulraw.trim();

                    var hargaraw = hargaraw.replace(/rp/gi, "");
                    var hargaraw = hargaraw.replace(/\./gi,"");
                    var hargaraw = hargaraw.replace(/[^0-9]/g, "");
                    harga = hargaraw.trim();

                    var lokasitokoraw = lokasitokoraw.replace(/kota/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kab/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/\./gi, "")
                    var lokasitokoraw = lokasitokoraw.trim();
                    namatoko = namatokoraw+" - "+lokasitokoraw;


                    var terjualraw = terjualraw.toString();
                    var terjualraw = terjualraw.replace(/,.*/, '000'); //kalau ada koma, ganti koma dan semua setelahnya jadi '000' karena koma berarti ribu
                    var terjualraw = terjualraw.replace(/\D/g, ''); //hapus semua karakter non-numeric
                    terjual = terjualraw.trim(); //trim spasi depan belakang

                    urlproduk = urlprodukraw.split('?')[0];


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
                            namaEcommerce:ecommerce,
                            statusScrape: 1
                        })));
                    }

                }

                return arrayproduk; 
                
            }, {tokopedia, cekduplikat, barang, merek, posisi_TIDAK, selectorSingleItemTokopedia, selectorGambarTokopedia, selectorJudulTokopedia, selectorHargaTokopedia, selectorTerjualTokopedia, selectorTokoTokopedia, selectorLokasiTokopedia, selectorUrlTokopedia})
            
            
            if (array.length > 0) { //cek arraynya kosong atau tidak , bisa aja kosong kalau diblokir, kalau kosong ya jangan sampe jadi file.
                bungkusnodes = {"nodes":array};
                bungkusproductOfferV2 = {"productOfferV2":bungkusnodes};
                bungkusdata = {"data":bungkusproductOfferV2};
                //cekduplikat.push(array);
                cekduplikat = cekduplikat.concat(array);
                tokopedia = tokopedia.concat(array);
                fs.writeFile('./hasil/'+namafoldersekarang+'/tokopedia-laptop-halaman-'+(i+1)+'.json', JSON.stringify(bungkusdata), function(err) {
                    if(err) {
                        return console.log(err);
                    } else {
                        console.log("File tokopedia-laptop-halaman-"+(i+1)+".json tersimpan!");
                    }
                }); 
            } else {}

            await page.waitForTimeout(1000);
            await page.close();

        } catch (err) {
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
    return cekduplikat;
}
//SELESAI FUNCTION SCRAPE TOKOPEDIA

module.exports = { scrapeTokopedia };