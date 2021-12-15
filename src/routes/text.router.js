const router = require("express").Router();

const {
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
} = require("../controllers/text.controller");

router.get("/", getTexts);
router.get("/:id/count", countTextWordsByID);
router.get("/:id/count/:language", countTextWordsByIDAndLanguage);
router.get("/:id/approve", approveText);
router.get("/:id/submit", submitText);
router.get("/:id/reject", rejectText);
router.get("/mostOccurrent", mostOccurrentWord);
router.post("/", createText);
router.post("/search", searchTextByQuery);
router.put("/:id", updateText);


module.exports = router;