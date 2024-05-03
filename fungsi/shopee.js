//FUNCTION SCRAPE SHOPEE
async function scrapeShopee(browser, namafoldersekarang, cekduplikat, shopee, direktori_file_shopee_gabungan) {
    const fs = require('fs')
    const Promise = require('promise');
    const { URL } = require('url');
    const request = require('request-promise');
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




    for (i = 0; i < listalamat.length; i++) {

        async function tunggu(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
        }

        await tunggu(1000);

        console.log("Mulai scraping shopee halaman "+(i+1)+" dari total "+(listalamat.length))
            
        alamat = listalamat[i][0]
    
        try {

            const barang = listalamat[i][1]
            const merek = listalamat[i][2]

            //buka tab baru
            const page = await browser.newPage();
            await page.waitForTimeout(1000);
            await page.emulateTimezone('Asia/Jakarta');
            await page.setDefaultNavigationTimeout(0); 
            // await page.setRequestInterception(true);
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

            // page.on('request', request => {
            //   const url = request.url()
            //   if (blocked_domains.some(domain => url.includes(domain))) {
            //     request.abort();
            //   } else {
            //     request.continue();
            //   }
            // });

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



            var selectorSingleItemShopee = `.shopee-search-item-result__item`;
            var selectorGambarShopee = `div.shopee_ic a.contents > div > div:nth-of-type(1) img`;
            var selectorJudulShopee = `div.shopee_ic a.contents > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1)`;
            var selectorHargaShopee = `div.shopee_ic a.contents > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1)`;
            var selectorTerjualShopee = `div.shopee_ic a.contents > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2)`;
            var selectorLokasiShopee = `div.shopee_ic a.contents > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3)`;
            var selectorUrlShopee = `div.shopee_ic a.contents`;



            //UNTUK CEK GAMBAR SUDAH TERLOAD ATAU BELUM
            var tesgambar = await page.evaluate( ({selectorSingleItemShopee, selectorGambarShopee}) => {
                var tessatuproduk = document.querySelectorAll(selectorSingleItemShopee);
                var tesurlgambar;
                arraytesurlgambar = [];
                
                if ( tessatuproduk ) {
                    for (j = 0; j < tessatuproduk.length; j++) {
                        if (
                            tessatuproduk[j].querySelector(selectorGambarShopee)?.src.includes("shopee.co.id") || tessatuproduk[j].querySelector(selectorGambarShopee)?.src.includes("down-id.img.susercontent.com")
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
            }, {selectorSingleItemShopee, selectorGambarShopee})

            console.log(tesgambar);
            var percobaanscrollke = 1;
            while (tesgambar.includes("TIDAK") && percobaanscrollke < 3) {
                await autoScroll(page);
                await autoScrollNaik(page);
                percobaanscrollke = percobaanscrollke + 1;
                console.log("percobaan scroll ke "+percobaanscrollke);
                var tesgambar = await page.evaluate( ({selectorSingleItemShopee, selectorGambarShopee}) => {
                    var tessatuproduk = document.querySelectorAll(selectorSingleItemShopee);
                    var tesurlgambar;
                    arraytesurlgambar = [];
                    if ( tessatuproduk ) {
                        for (j = 0; j < tessatuproduk.length; j++) {
                               if (
                                tessatuproduk[j].querySelector(selectorGambarShopee)?.src.includes("shopee.co.id") || tessatuproduk[j].querySelector(selectorGambarShopee)?.src.includes("down-id.img.susercontent.com")
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
                }, {selectorSingleItemShopee, selectorGambarShopee})
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


            const array = await page.evaluate( ({shopee, cekduplikat, barang, merek, posisi_TIDAK, selectorSingleItemShopee, selectorGambarShopee, selectorLokasiShopee, selectorTerjualShopee, selectorHargaShopee, selectorJudulShopee, selectorUrlShopee}) => {
                
                const satuproduk = document.querySelectorAll(selectorSingleItemShopee);
                arrayproduk = [];
                cekduplikat = JSON.stringify(cekduplikat)
                shopee = JSON.stringify(shopee)
                
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

                    ecommerce = 'shp';
                    urlgambar = satuproduk[j].querySelector(selectorGambarShopee).src.split('?')[0]; // url gambar
                    var judulraw = satuproduk[j].querySelector(selectorJudulShopee).textContent; //judul produk
                    var hargaraw = satuproduk[j].querySelector(selectorHargaShopee).textContent; //harga produk
                    var namatokoraw = "Shopee";
                    
                    if (satuproduk[j].querySelector(selectorTerjualShopee).textContent.length < 1) {
                        var terjualraw = "0"; //jumlah terjual
                    } else {
                        var terjualraw = satuproduk[j].querySelector(selectorTerjualShopee).textContent //jumlah terjual
                    }

                    if (satuproduk[j].querySelector(selectorLokasiShopee)) { //lokasi toko
                        var lokasitokoraw = satuproduk[j].querySelector(selectorLokasiShopee).textContent;
                    } else {
                        var lokasitokoraw = "Indonesia";
                    }

                    var urlprodukraw = satuproduk[j].querySelector(selectorUrlShopee).href



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


                    var terjualraw = terjualraw.toString();
                    var terjualraw = terjualraw.replace(/,.*/, '000'); //kalau ada koma, ganti koma dan semua setelahnya jadi '000' karena koma berarti ribu
                    var terjualraw = terjualraw.replace(/\D/g, ''); //hapus semua karakter non-numeric
                    terjual = terjualraw.trim(); //trim spasi depan belakang


                    var lokasitokoraw = lokasitokoraw.replace(/[^a-zA-Z ]/g, "");
                    var lokasitokoraw = lokasitokoraw.replace(/hari/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kota/gi, "")
                    var lokasitokoraw = lokasitokoraw.replace(/kab/gi, "")
                    var lokasitokoraw = lokasitokoraw.trim(); //trim spasi depan belakang
                    var lokasitokoraw = lokasitokoraw.toLowerCase();
                    namatoko = namatokoraw+" "+lokasitokoraw;

                    urlproduk = urlprodukraw.split('?')[0].replace("/shopee.co.id/", "/shopee.co.id/product/");

                    if (
                        !satuproduk[j].querySelector(".F7xq8U div[data-sqe='ad']") && 
                        j > 9 && 
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
                            namaEcommerce:ecommerce,
                            statusScrape: 1
                        })));
                    }
                }

                return arrayproduk;
                
            }, {shopee, cekduplikat, barang, merek, posisi_TIDAK, selectorSingleItemShopee, selectorGambarShopee, selectorLokasiShopee, selectorTerjualShopee, selectorHargaShopee, selectorJudulShopee, selectorUrlShopee})



            if (array.length > 0) {
                bungkusnodes = {"nodes":array};
                bungkusproductOfferV2 = {"productOfferV2":bungkusnodes};
                bungkusdata = {"data":bungkusproductOfferV2};
                //cekduplikat.push(array);
                cekduplikat = cekduplikat.concat(array);
                shopee = shopee.concat(array);
                fs.writeFile('./hasil/'+namafoldersekarang+'/shopee-laptop-halaman-'+(i+1)+'.json', JSON.stringify(bungkusdata), function(err) {
                    if(err) {
                        return console.log(err);
                    } else {
                        console.log("File shopee-laptop-halaman-"+(i+1)+".json tersimpan!");
                    }
                }); 
            } else {}

            await page.waitForTimeout(1000);
            await page.close();

        } catch (err) {
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
    return cekduplikat;
}
//SELESAI FUNCTION SCRAPE SHOPEE

module.exports = { scrapeShopee };
