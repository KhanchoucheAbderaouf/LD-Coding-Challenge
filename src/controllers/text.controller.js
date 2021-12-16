const Text = require("../models/Text");
const {
    maxOccurencesCount,
    maxOccurencesCountForAll
} = require("../services/text.service")

//a default texts per page in case the size is not precised
const textPerPage = 5

//get all the texts from the collection text
const getTexts = async (req, res) => {
    try {
        //define the number of text to get per page
        const size = req.query.size ? parseInt(req.query.size) : textPerPage;
        //define the page to get
        const page = req.query.page ? parseInt(req.query.page) : 1;
        //find all texts with pagination
        await Text.find().limit(size).skip((page - 1) * size).then(async (texts) => {
            if (texts) {
                //define result variable just to structure the return response
                let result = {}
                result.data = texts
                result.all_elements = await Text.count({})
                result.pages = Math.ceil(result.all_elements / size)
                result.current_page = page
                return res.json(result);
            } else {
                return res.status(404).json({
                    "error": "Texts not found"
                });
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
};

//create a new text
const createText = async (req, res) => {
    try {
        //create the text based on the data passed (in case the text in a specific language is not passed the field then will be undefined)
        const text = await Text.create({
            arabic: req.body.arabic,
            french: req.body.french,
            english: req.body.english,
        })
        text.save((error, text) => {
            if (error) {
                return res.json(error)
            }
            return res.json(text)
        })
    } catch (error) {
        return res.status(500).json(error);
    }
};


//update text by id
const updateText = async (req, res) => {
    try {
        //find the text by it's id first and then update the text in different language
        await Text.findById(req.params.id).then((text) => {
            text.arabic = req.body.arabic;
            text.french = req.body.french;
            text.english = req.body.english;
            text.save((error, text) => {
                if (error) {
                    return res.json(error)
                }
                return res.json(text)
            })
        })
    } catch (error) {
        return res.status(500).json(error);
    }
};


//count Text Words By ID
const countTextWordsByID = async (req, res) => {
    try {
        //find the text by it's id first and then update the text in different language
        await Text.findById(req.params.id).then((text) => {
            if (text) {
                const english = text.english ? text.english.split(' ').length : 0
                const french = text.french ? text.french.split(' ').length : 0
                const arabic = text.arabic ? text.arabic.split(' ').length : 0
                return res.json({
                    english: english,
                    french: french,
                    arabic: arabic,
                    total: english + french + arabic
                })
            } else {
                return res.status(404).json({
                    "error": "Text not found"
                });
            }
        })
    } catch (error) {
        return res.status(500).json(error);
    }
};

//count Text Words By ID
const countTextWordsByIDAndLanguage = async (req, res) => {
    try {
        //find the text by it's id first and then update the text in different language
        await Text.findById(req.params.id).select(req.params.language).then((text) => {
            //verify if the text was found
            if (text) {
                if (text[req.params.language]) {
                    return res.json(text[req.params.language].split(' ').length)
                } else {
                    return res.status(404).json({
                        "error": "The text with the specific language was not found"
                    });
                }
            } else {
                return res.status(404).json({
                    "error": "Text not found"
                });
            }
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

//most occurent word in all the database
const mostOccurrentWord = async (req, res) => {
    try {
        await Text.find().then(async (texts) => {
            if (texts) {
                //call the most occurences function for a specific language (in case we wanna get only a specific language)
                const english = await maxOccurencesCount(texts, 'english')
                const french = await maxOccurencesCount(texts, 'french')
                const arabic = await maxOccurencesCount(texts, 'arabic')

                //call the most occurences function for all languages (in case we wanna get all in one)
                const allLanguages = await maxOccurencesCountForAll(texts, 'arabic')

                return res.json({
                    english: english,
                    french: french,
                    arabic: arabic,
                    allLanguages: allLanguages
                });
            } else {
                return res.status(404).json({
                    "error": "Texts not found"
                });
            }
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

//submit the text
const submitText = async (req, res) => {
    try {
        //find by id and change the state to submitted only if the state is different than approved
        await Text.findById(req.params.id).then((text) => {
            //the case it is approved
            if (text.state === "Approved") {
                return res.status(403).json({
                    "error": "Cannot change state to Subbmitted! the Text is already Approved"
                })
            }
            text.state = "Submitted"
            text.save((error, text) => {
                if (error) {
                    return res.json(error)
                }
                return res.json(text)
            })
        })
    } catch (error) {
        return res.status(500).json(error);
    }
};

//approve the text
const approveText = async (req, res) => {
    try {
        //find by id and change the state to approved only if the state is submitted
        await Text.findById(req.params.id).then((text) => {
            //the case it is already approved
            if (text.state === "Approved") {
                return res.status(403).json({
                    "error": "the Text is already Approved!"
                })
                //the case it is not submitted
            } else if (text.state !== "Submitted") {
                return res.status(403).json({
                    "error": "Cannot change state to Approved! the Text is not Submitted"
                })
            }
            text.state = "Approved"
            text.save((error, text) => {
                if (error) {
                    return res.json(error)
                }
                return res.json(text)
            })
        })
    } catch (error) {
        return res.status(500).json(error);
    }
};
//reject the text
const rejectText = async (req, res) => {
    try {
        //find by id and change the state rejected only if the state is submitted
        await Text.findById(req.params.id).then((text) => {
            //the case it is not submitted
            if (text.state !== "Submitted") {
                return res.status(403).json({
                    "error": "Cannot change state to Rejected! the Text is not Submitted"
                })
            }
            text.state = "Rejected"
            text.save((error, text) => {
                if (error) {
                    return res.json(error)
                }
                return res.json(text)
            })
        })
    } catch (error) {
        return res.status(500).json(error);
    }
};

//fuzzy search 
const searchTextByQuery = async (req, res) => {
    try {
        //in case the query is not defined or is empty return all the records
        if (!req.query.q || req.query.q === "") {
            return getTexts(req, res)
        }

        //get result of search in texts 
        await Text.find({
            $or: [{
                    "english": {
                        $regex: '.*' + req.query.q + '.*',
                        $options: 'i'
                    }
                },
                {
                    "french": {
                        $regex: '.*' + req.query.q + '.*',
                        $options: 'i'
                    }
                },
                {
                    "arabic": {
                        $regex: '.*' + req.query.q + '.*',
                        $options: 'i'
                    }
                }
            ]
        }).then((result) => {
            if (result.length !== 0) {
                return res.json(result)
            } else {
                return res.status(404).json("No Result Found")
            }
        }).catch((error) => {
            return res.json({
                error: error
            })
        })

        //get texts and map it to get only the strings instead of all the object(example in case of looking for strings only)
        // const onlyString = await (await Text.find({
        //     $or:[ 
        //         {"english": {
        //             $regex: '.*' + req.query.q + '.*'
        //             $options: 'i'
        //         }},
        //         {"french": {
        //             $regex: '.*' + req.query.q + '.*'
        //             $options: 'i'
        //         }},
        //         {"arabic": {
        //             $regex: '.*' + req.query.q + '.*'
        //             $options: 'i'
        //         }}
        //       ]})).map(elem => elem = elem.english)

    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    getTexts,
    createText,
    updateText,
    countTextWordsByID,
    countTextWordsByIDAndLanguage,
    mostOccurrentWord,
    submitText,
    approveText,
    rejectText,
    searchTextByQuery
};