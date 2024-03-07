//FUNCTION SCRAPE LAZADA
async function scrapeLazada(browser, namafoldersekarang, cekduplikat, lazada, direktori_file_lazada_gabungan) {
    const fs = require('fs')
    const Promise = require('promise');
    const { URL } = require('url');
    const request = require('request-promise');
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

    for (i = 0; i < listalamat.length; i++) {

        async function tunggu(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
        }

        await tunggu(1000);

        console.log("Mulai scraping lazada halaman "+(i+1)+" dari total "+(listalamat.length))
            
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




            var selectorSingleItemLazada = `[data-qa-locator="product-item"]`;
            var selectorGambarLazada = `.picture-wrapper img`;
            var selectorJudulLazada = `.RfADt a`;
            var selectorHargaLazada = `.aBrP0 span`;
            var selectorTerjualLazada = `._6uN7R ._1cEkb`;
            var selectorLokasiLazada = `.oa6ri`;
            var selectorUrlLazada = `.RfADt a`;

       


            //UNTUK CEK GAMBAR SUDAH TERLOAD ATAU BELUM
            var tesgambar = await page.evaluate( ({selectorSingleItemLazada, selectorGambarLazada}) => {

                    var tessatuproduk = document.querySelectorAll(selectorSingleItemLazada);
                    var tesurlgambar;
                    arraytesurlgambar = [];

                    if ( tessatuproduk ) {
                        for (j = 0; j < tessatuproduk.length; j++) {
                            if (tessatuproduk[j].querySelector(selectorGambarLazada).src.includes("data:image") == false) { // cek url gambar kalau src nya sudah jadi http
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
            }, {selectorSingleItemLazada, selectorGambarLazada})

            console.log(tesgambar);
            var percobaanscrollke = 1;
            while (tesgambar.includes("TIDAK") && percobaanscrollke < 3) {
                await autoScroll(page);
                await autoScrollNaik(page);
                percobaanscrollke = percobaanscrollke + 1;
                console.log("percobaan scroll ke "+percobaanscrollke);

                    var tesgambar = await page.evaluate( ({selectorSingleItemLazada, selectorGambarLazada}) => {
                        var tessatuproduk = document.querySelectorAll(selectorSingleItemLazada);
                        var tesurlgambar;
                        arraytesurlgambar = [];

                        if ( tessatuproduk ) {
                            for (j = 0; j < tessatuproduk.length; j++) {
                                if (tessatuproduk[j].querySelector(selectorGambarLazada).src.includes("data:image") == false) { // cek url gambar kalau src nya sudah jadi http
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
                        
                    }, {selectorSingleItemLazada, selectorGambarLazada})
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

            
            const array = await page.evaluate( ({lazada, cekduplikat, barang, merek, posisi_TIDAK, selectorSingleItemLazada, selectorGambarLazada, selectorJudulLazada, selectorHargaLazada, selectorTerjualLazada, selectorLokasiLazada, selectorUrlLazada}) => {
                
                const satuproduk = document.querySelectorAll(selectorSingleItemLazada);
                arrayproduk = [];
                cekduplikat = JSON.stringify(cekduplikat)
                lazada = JSON.stringify(lazada)
                
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

                    ecommerce = 'lzd';
                    urlgambar = satuproduk[j].querySelector(selectorGambarLazada).src.split('?')[0]; //url gambar
                    var judulraw = satuproduk[j].querySelector(selectorJudulLazada).textContent;
                    var hargaraw = satuproduk[j].querySelector(selectorHargaLazada).textContent;
                    if (satuproduk[j].querySelector(selectorTerjualLazada)) {//jumlah terjual
                        var terjualraw = satuproduk[j].querySelector(selectorTerjualLazada).textContent.trim();
                    } else {
                        var terjualraw = Math.floor(Math.random() * 50);
                    }
                    if (satuproduk[j].querySelector(selectorLokasiLazada)) {//lokasi toko
                        var lokasitokoraw = satuproduk[j].querySelector(selectorLokasiLazada).textContent.trim();
                    } else {
                        var lokasitokoraw = "Indonesia";
                    }
                    //var urlproduk = satuproduk[j].querySelector(".RfADt a").href.split('?')[0];

                    var urlprodukraw = satuproduk[j].querySelector(selectorUrlLazada).href;


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

                    var lokasitokoraw = lokasitokoraw.replace(/kota/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kab/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/\./gi, "")
                    var lokasitokoraw = lokasitokoraw.trim();
                    namatoko = "Lazada "+lokasitokoraw


                    var hargaraw = hargaraw.replace(/rp/gi, "");
                    var hargaraw = hargaraw.replace(/\./gi,"");
                    var hargaraw = hargaraw.replace(/[^0-9]/g, "");
                    harga = hargaraw.trim();


                    var terjualraw = terjualraw.toString();
                    var terjualraw = terjualraw.replace(/,.*/, '000'); //kalau ada koma, ganti koma dan semua setelahnya jadi '000' karena koma berarti ribu
                    var terjualraw = terjualraw.replace(/\D/g, ''); //hapus semua karakter non-numeric
                    terjual = terjualraw.trim(); //trim spasi depan belakang

                    urlproduk = urlprodukraw.split('?')[0];


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
                            namaEcommerce:ecommerce,
                            statusScrape: 1
                        })));
                    }

                }

                return arrayproduk;
                
            }, {lazada, cekduplikat, barang, merek, posisi_TIDAK, selectorSingleItemLazada, selectorGambarLazada, selectorJudulLazada, selectorHargaLazada, selectorTerjualLazada, selectorLokasiLazada, selectorUrlLazada})


            
            if (array.length > 0) {
                bungkusnodes = {"nodes":array};
                bungkusproductOfferV2 = {"productOfferV2":bungkusnodes};
                bungkusdata = {"data":bungkusproductOfferV2};
                //cekduplikat.push(array);
                cekduplikat = cekduplikat.concat(array);
                lazada = lazada.concat(array)
                fs.writeFile('./hasil/'+namafoldersekarang+'/lazada-laptop-halaman-'+(i+1)+'.json', JSON.stringify(bungkusdata), function(err) {
                    if(err) {
                        return console.log(err);
                    } else {
                        console.log("File lazada-laptop-halaman-"+(i+1)+".json tersimpan!");
                    }
                });
            } else {}

            await page.waitForTimeout(1000);
            await page.close();

        } catch (err) {
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
    return cekduplikat;
}
//SELESAI FUNCTION SCRAPE LAZADA

module.exports = { scrapeLazada };