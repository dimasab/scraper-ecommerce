//FUNCTION SCRAPE BLIBLI
async function scrapeBlibli(browser, namafoldersekarang, cekduplikat, blibli, direktori_file_blibli_gabungan) {
    const fs = require('fs')
    const Promise = require('promise');
    const { URL } = require('url');
    const request = require('request-promise');
    //----------------------------------------SCRAPE BLIBLI----------------------------------------//
    var listalamat = [
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Acer&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'ACER'],// LAPTOP ACER HALAMAN 1
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Acer&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'ACER'],// LAPTOP ACER HALAMAN 2
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Acer&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=3&start=80', 'LAPTOP', 'ACER'],// LAPTOP ACER HALAMAN 3

        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Asus&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'ASUS'],// LAPTOP ASUS HALAMAN 1
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Asus&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'ASUS'],// LAPTOP ASUS HALAMAN 2
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Asus&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=3&start=80', 'LAPTOP', 'ASUS'],// LAPTOP ASUS HALAMAN 3

        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Lenovo&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'LENOVO'],// LAPTOP LENOVO HALAMAN 1
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Lenovo&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'LENOVO'],// LAPTOP LENOVO HALAMAN 2
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Lenovo&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=3&start=80', 'LAPTOP', 'LENOVO'],// LAPTOP LENOVO HALAMAN 3

        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=HP&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'HP'],// LAPTOP HP HALAMAN 1
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=HP&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'HP'],// LAPTOP HP HALAMAN 2
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=HP&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=3&start=80', 'LAPTOP', 'HP'],// LAPTOP HP HALAMAN 3

        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Dell&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'DELL'],// LAPTOP DELL HALAMAN 1
        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Dell&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=2&start=40', 'LAPTOP', 'DELL'],// LAPTOP DELL HALAMAN 2

        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Axioo&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'AXIOO'],// LAPTOP AXIOO HALAMAN 1

        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Huawei&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'HUAWEI'],// LAPTOP HUAWEI HALAMAN 1

        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=Infinix&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'INFINIX'],// LAPTOP INFINIX HALAMAN 1

        // ['https://www.blibli.com/c/3/laptop/LA-1000004/53270?brand=MSI&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=1500000&maxPrice=&sort=7&page=1&start=0', 'LAPTOP', 'MSI'],// LAPTOP MSI HALAMAN 1

        ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=SAMSUNG&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'SAMSUNG'],// SSD SAMSUNG HALAMAN 1

        // ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=V-GEN&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'VGEN'],// SSD VGEN HALAMAN 1

        // ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=ADATA&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'ADATA'],// SSD ADATA HALAMAN 1

        // ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=SANDISK&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'SANDISK'],// SSD SANDISK HALAMAN 1

        // ['https://www.blibli.com/c/3/ssd/SS-1000001/53270?brand=MIDASFORCE&rating=4&seller=Official%20Store&seller=Top%20rated%20seller&minPrice=100000&maxPrice=&sort=7&page=1&start=0', 'SSD', 'MIDASFORCE'],// SSD MIDASFORCE HALAMAN 1

    ]

    if (hanyaecommerce == "tokopedia" || hanyaecommerce == "lazada" || hanyaecommerce == "shopee") {
        listalamat = [];
    }


    for (i = 0; i < listalamat.length; i++) {

        async function tunggu(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
        }

        await tunggu(1000);

        console.log("Mulai scraping BLIBLI halaman "+(i+1)+" dari total "+(listalamat.length))
            
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





            var selectorSingleItemBlibli = `#productContentDiv .product .product__card .product__container`;
            var selectorGambarBlibli = `.blu-product__img-wrapper img.blu-product__img-main[lazy~='loaded']`;
            var selectorGambarAlternatifBlibli = `.blu-product__img-wrapper img.carousel-container__slide__content[lazy~='loaded']`;
            var selectorJudulBlibli = `.blu-product__name`;
            var selectorHargaBlibli = `.blu-product__price-after`;
            var selectorTerjualBlibli = `.blu-product__sold`;
            var selectorTokoBlibli = `.blu-product__location-text`;

       



            //UNTUK CEK GAMBAR SUDAH TERLOAD ATAU BELUM
            var tesgambar = await page.evaluate( ({selectorSingleItemBlibli, selectorGambarBlibli, selectorGambarAlternatifBlibli}) => {

                    var tessatuproduk = document.querySelectorAll(selectorSingleItemBlibli);
                    var tesurlgambar;
                    arraytesurlgambar = [];

                    if ( tessatuproduk ) {
                        for (j = 0; j < tessatuproduk.length; j++) {
                            if (tessatuproduk[j].querySelector(selectorGambarBlibli) || tessatuproduk[j].querySelector(selectorGambarAlternatifBlibli)) { // cek url gambar kalau src nya sudah ada class loaded
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
            }, {selectorSingleItemBlibli, selectorGambarBlibli, selectorGambarAlternatifBlibli})

            console.log(tesgambar);
            var percobaanscrollke = 1;
            while (tesgambar.includes("TIDAK") && percobaanscrollke < 3) {
                await autoScroll(page);
                await autoScrollNaik(page);
                percobaanscrollke = percobaanscrollke + 1;
                console.log("percobaan scroll ke "+percobaanscrollke);

                    var tesgambar = await page.evaluate( ({selectorSingleItemBlibli, selectorGambarBlibli, selectorGambarAlternatifBlibli}) => {
                        var tessatuproduk = document.querySelectorAll(selectorSingleItemBlibli);
                        var tesurlgambar;
                        arraytesurlgambar = [];

                        if ( tessatuproduk ) {
                            for (j = 0; j < tessatuproduk.length; j++) {
                                if (tessatuproduk[j].querySelector(selectorGambarBlibli) || tessatuproduk[j].querySelector(selectorGambarAlternatifBlibli)) { // cek url gambar kalau src nya sudah ada class loaded
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
                    }, {selectorSingleItemBlibli, selectorGambarBlibli, selectorGambarAlternatifBlibli})
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


            const array = await page.evaluate( ({blibli, cekduplikat, barang, merek, posisi_TIDAK, selectorSingleItemBlibli, selectorGambarBlibli, selectorGambarAlternatifBlibli, selectorJudulBlibli, selectorHargaBlibli, selectorTerjualBlibli, selectorTokoBlibli}) => {
                
                const satuproduk = document.querySelectorAll(selectorSingleItemBlibli);
                arrayproduk = [];
                cekduplikat = JSON.stringify(cekduplikat)
                blibli = JSON.stringify(blibli)
                
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

                    ecommerce = 'bli';

                    if (satuproduk[j].querySelector(selectorGambarBlibli)) {
                        urlgambar = satuproduk[j].querySelector(selectorGambarBlibli).src.split('?')[0];
                    } else { 
                        urlgambar = satuproduk[j].querySelector(selectorGambarAlternatifBlibli).src.split('?')[0];
                    }

                    var judulraw = satuproduk[j].querySelector(selectorJudulBlibli).textContent; //nama barang
                    var hargaraw = satuproduk[j].querySelector(selectorHargaBlibli).textContent; //harga barang 

                    if (satuproduk[j].querySelector(selectorTerjualBlibli)) {//jumlah terjual
                        var terjualraw = satuproduk[j].querySelector(selectorTerjualBlibli).textContent.trim();
                    } else {
                        var terjualraw = Math.floor(Math.random() * 50);
                    }

                    if (satuproduk[j].querySelector(selectorTokoBlibli)) {//pembungkus nama toko (span pertama) dan lokasi toko (span kedua)
                        if (satuproduk[j].querySelector(selectorTokoBlibli + " span:nth-child(2)")) { //lokasi toko ada di span kedua
                            var lokasitokoraw = satuproduk[j].querySelector(selectorTokoBlibli + " span:nth-child(2)").textContent.trim();
                        } else if (satuproduk[j].querySelector(selectorTokoBlibli + " span:nth-child(1)")) { //kalau tidak ada nama toko, maka lokasi toko ada di span pertama 
                            var lokasitokoraw = satuproduk[j].querySelector(selectorTokoBlibli + " span:nth-child(1)").textContent.trim();
                        }
                    } else {
                        var lokasitokoraw = "Jakarta";
                    }

                    if (Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => JSON.parse(script.textContent)).find(jsonObject => jsonObject['@type'] === 'ItemList') || {}) {
                        var urlprodukraw = (Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => JSON.parse(script.textContent)).find(jsonObject => jsonObject['@type'] === 'ItemList') || {}).itemListElement[j].item.url;
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
                    judul = judulraw.trim();

                    var hargaraw = hargaraw.split('-')[0]
                    var hargaraw = hargaraw.replace(/rp/gi, "");
                    var hargaraw = hargaraw.replace(/\,/gi, "");
                    var hargaraw = hargaraw.replace(/\./gi,"");
                    var hargaraw = hargaraw.replace(/[^0-9]/g, "");
                    harga = hargaraw.trim();


                    var terjualraw = terjualraw.toString();
                    var terjualraw = terjualraw.replace(/,.*/, '000'); //kalau ada koma, ganti koma dan semua setelahnya jadi '000' karena koma berarti ribu
                    var terjualraw = terjualraw.replace(/\D/g, ''); //hapus semua karakter non-numeric
                    terjual = terjualraw.trim(); //trim spasi depan belakang


                    var lokasitokoraw = lokasitokoraw.split('&')[0]
                    var lokasitokoraw = lokasitokoraw.replace(/kota/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kab/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/\./gi, "")
                    var lokasitokoraw = lokasitokoraw.trim();
                    namatoko = "Blibli "+lokasitokoraw


                    // Check if urlproduk contains "blibli.com"
                    if (urlprodukraw.indexOf("blibli.com") === -1) {
                        // If it doesn't contain "blibli.com", add "https://www.blibli.com" at the beginning and only get the part before query params (before "?")
                        urlproduk = "https://www.blibli.com" + urlprodukraw.split("?")[0];
                    } else {
                        urlproduk = urlprodukraw.split("?")[0];
                    }



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
                            namaEcommerce:ecommerce,
                            statusScrape: 1
                        })));
                    }

                }

                return arrayproduk;
                
            }, {blibli, cekduplikat, barang, merek, posisi_TIDAK, selectorSingleItemBlibli, selectorGambarBlibli, selectorGambarAlternatifBlibli, selectorJudulBlibli, selectorHargaBlibli, selectorTerjualBlibli, selectorTokoBlibli})


            if (array.length > 0) {
                bungkusnodes = {"nodes":array};
                bungkusproductOfferV2 = {"productOfferV2":bungkusnodes};
                bungkusdata = {"data":bungkusproductOfferV2};
                //cekduplikat.push(array);
                cekduplikat = cekduplikat.concat(array);
                blibli = blibli.concat(array);
                fs.writeFile('./hasil/'+namafoldersekarang+'/blibli-laptop-halaman-'+(i+1)+'.json', JSON.stringify(bungkusdata), function(err) {
                    if(err) {
                        return console.log(err);
                    } else {
                        console.log("File blibli-laptop-halaman-"+(i+1)+".json tersimpan!");
                    }
                });
            } else {}

            await page.waitForTimeout(1000);
            await page.close();

        } catch (err) {
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
    return cekduplikat;
}
//SELESAI FUNCTION SCRAPE BLIBLI

module.exports = { scrapeBlibli };