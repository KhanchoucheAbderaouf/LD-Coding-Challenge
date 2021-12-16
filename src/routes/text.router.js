//Define different endpoints for the texts
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
router.get("/mostOccurrent", mostOccurrentWord);
router.post("/", createText);
router.post("/search", searchTextByQuery);
router.put("/:id", updateText);
router.put("/:id/approve", approveText);
router.put("/:id/submit", submitText);
router.put("/:id/reject", rejectText);


module.exports = router;