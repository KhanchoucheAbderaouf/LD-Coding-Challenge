//function to count the most occurent word for each language
const maxOccurencesCount = (array, language) => {
    var global_array = []
    //put all the found texts of the language selected in one array
    for (const element of array) {
        if (element[language]) {
            global_array = global_array.concat(element[language].replace(/[,:;./]/g, '').split(" "))
        }
    }

    //count the occurences of each word in an object key value where the key is the word and the value is the occurences
    let counts = {}
    for (let count of global_array) {
        if (counts[count]) {
            counts[count] = counts[count] + 1;
        } else {
            counts[count] = 1
        }
    }

    //get the max of the occurences for each key(word)
    let max = 0
    //result will represent the final words that have the most occurences 
    let result = []
    for (const [key, value] of Object.entries(counts)) {
        if (max < value) {
            max = value,
                result = []
            result.push(key)
        } else if (max === value) {
            max = value,
                result.push(key)
        }
    }
    return result;
}

//function to count the most occurent word in all languages
const maxOccurencesCountForAll = (array) => {

    var global_array = []
    //put all the found texts of all languagese in one array
    for (const element of array) {
        if (element.arabic) {
            global_array = global_array.concat(element.arabic.replace(/[,:;./]/g, '').split(" "))
        }
        if (element.english) {
            global_array = global_array.concat(element.english.replace(/[,:;./]/g, '').split(" "))
        }
        if (element.french) {
            global_array = global_array.concat(element.french.replace(/[,:;./]/g, '').split(" "))
        }
    }

    //count the occurences of each word in an object key value where the key is the word and the value is the occurences
    let counts = {}
    for (let count of global_array) {
        if (counts[count]) {
            counts[count] = counts[count] + 1;
        } else {
            counts[count] = 1
        }
    }

    //get the max of the occurences for each key(word)
    let max = 0
    //result will represent the final words that have the most occurences
    let result = []
    for (const [key, value] of Object.entries(counts)) {
        if (max < value) {
            max = value,
                result = []
            result.push(key)
        } else if (max === value) {
            max = value,
                result.push(key)
        }
    }
    return result;
}



module.exports = {
    maxOccurencesCount,
    maxOccurencesCountForAll
}