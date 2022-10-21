const skuGenerator = (skuFormValues) => {
    let skuString = '';
    let { characterCount, sepeator, itemName, attribute_1, attribute_2, attribute_3 } = skuFormValues;
    let charCount = parseInt(characterCount);
    skuString = itemName.substring(0, charCount) + sepeator + attribute_1.substring(0, charCount);
    if (attribute_2 != '') {
        let attr2 = sepeator + attribute_2.substring(0, charCount);
        skuString += attr2;
    }
    if (attribute_3 != '') {
        let attr3 = sepeator + attribute_3.substring(0, charCount);
        skuString += attr3;
    }
    return skuString;
};

export default skuGenerator;
