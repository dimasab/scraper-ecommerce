//FUNCTION PRINT CEKDUPLIKAT
async function printCekduplikat(namafoldersekarang, cekduplikat, direktori_file_cekduplikat) {
    const fs = require('fs')
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
    return cekduplikat;
}
//SELESAI FUNCTION PRINT CEKDUPLIKAT

module.exports = { printCekduplikat };