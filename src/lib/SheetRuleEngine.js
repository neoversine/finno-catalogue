export function transformSheetData(data) {
    const iconMap = {
        "Fish": "🐟",
        "Farm Fresh": "🌱"
    };

    const defaultImageMap = {
        "Chicken": "photo-1618160702438-9b02ab6515c9",
        "Fruit": "photo-1465146344425-f00673922987",
        "Vegetable": "photo-1509316975850-ff9c5deb0cd9",
        "Shell Fish": "photo-1472396961693-142e6e269027",
        "Freshwater Fish": "http://res.cloudinary.com/dqbxgjov1/image/upload/v1710314023/fvzniy1tgrwf03sgry7u.jpg"
    };

    const result = [];

    for (const item of data) {
        const categoryId = item["Category"].toLowerCase().replace(/\s+/g, "-");
        const categoryName = item["Category"];
        const categoryIcon = iconMap[categoryName] || "📦";

        const subcategoryId = item["Product Type"].toLowerCase().replace(/\s+/g, "-");
        const subcategoryName = item["Product Type"];

        const productId = item["Product Id"]?.toLowerCase().replace(/\s+/g, "-") || "unknown-id";
        const productName = item["Product Name"];
        const price = (item["Price"]) || 0;
        const unit = item["unit"] || "kg";
        const stock = parseInt(item["Stock"]) || 0;
        const typesOfCut = item["Types Of Cut Available"] || 'Whole';
        const sizesOfCutsAvailable = (item["Sizes of Cut Available"] || "")
            .split(",")
            .map(size => size.trim())
            .filter(size => size !== "")
            ;
        const MinQuantityToBuy = item["Min Quantity to Buy"] || '1 piece'
        const image = item["Images"] || defaultImageMap[subcategoryName] || "photo-1465146344425-f00673922987";
        const available = item["Available"]


        // Find or create category
        let category = result.find(c => c.id === categoryId);
        if (!category) {
            category = {
                id: categoryId,
                name: categoryName,
                icon: categoryIcon,
                subcategories: []
            };
            result.push(category);
        }

        // Find or create subcategory
        let subcategory = category.subcategories.find(sc => sc.id === subcategoryId);
        if (!subcategory) {
            subcategory = {
                id: subcategoryId,
                name: subcategoryName,
                items: []
            };
            category.subcategories.push(subcategory);
        }

        // Add product
        subcategory.items.push({
            id: productId,
            name: productName,
            price: price,
            currency: "₹",
            unit: unit,
            stock: stock,
            image: image,
            available: available,
            minQuantityToBuy: MinQuantityToBuy,
            typesOfCut: typesOfCut,
            sizesOfCutsAvailable: sizesOfCutsAvailable
        });
    }

    return result;
}
