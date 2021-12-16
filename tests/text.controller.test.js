//test the rest api
const request = require("supertest")
const app = require("../app")

//test the api is working
describe("just a simple test to ensure that the api started successfully", () => {

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header of the response", async () => {
        const response = await request(app).get("/")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //the standard answer of the api
    test("the standard answer of the api", async () => {
        const response = await request(app).get("/")
        expect(response.body).toEqual({
            status: 'Working',
            name: "LD Coding Challenge",
        })
    })

})


//test the create text
describe("create the text with 3 languages", () => {

    //body to send
    const body = {
        english: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        french: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
        arabic: "لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه بروشور او فلاير على سبيل المثال او نماذج مواقع انترنت"
    }

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/text").send(body)
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header of the response", async () => {
        const response = await request(app).post("/text").send(body)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //verify that the response is defined the way it should be defined
    test("response attributes should be defined", async () => {
        const response = await request(app).post("/text").send(body)
        expect(response.body._id).toBeDefined()
        expect(response.body.english).toBe(body.english)
        expect(response.body.french).toBe(body.french)
        expect(response.body.arabic).toBe(body.arabic)
        expect(response.body.state).toBe("Draft")
    })

})

//test the get all texts
describe("return all the texts of the database with 3 languages", () => {

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/text")
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header", async () => {
        const response = await request(app).get("/text")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //verify that the response is defined the way it should be defined
    test("response should be an array of Texts", async () => {
        const response = await request(app).get("/text")
        const expected = [{
            _id: '61b9cba8ee947d86e3cc57a1',
            arabic: 'تست',
            french: 'teste',
            english: 'test',
            state: 'Approved',
            createdAt: '2021-12-15T11:04:08.795Z',
            updatedAt: '2021-12-15T17:52:24.693Z',
            __v: 0
        }]
        expect(response.body.data).toEqual(expect.arrayContaining(expected));
        expect(response.body.data.length).toBe(5);
        expect(response.body.all_elements).toBeDefined();
        expect(response.body.current_page).toBeDefined();
        expect(response.body.pages).toBeDefined();
    })

})

//test the updateText text
describe("update the text content with 3 languages by id", () => {

    //body to send
    const body = {
        english: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        french: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
        arabic: "لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه بروشور او فلاير على سبيل المثال او نماذج مواقع انترنت"
    }

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).put("/text/61bb3b6c5dfa5768e07af7d4").send(body)
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header of the response", async () => {
        const response = await request(app).put("/text/61bb3b6c5dfa5768e07af7d4").send(body)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //verify that the response is defined the way it should be defined
    test("response attributes should be defined", async () => {
        const response = await request(app).put("/text/61bb3b6c5dfa5768e07af7d4").send(body)
        expect(response.body._id).toBe('61bb3b6c5dfa5768e07af7d4')
        expect(response.body.english).toBe(body.english)
        expect(response.body.french).toBe(body.french)
        expect(response.body.arabic).toBe(body.arabic)
        expect(response.body.state).toBeDefined()
    })

})

//test the get count texts by id
describe("get the count of words of a text by id", () => {

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/count")
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/count")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //verify that the response is defined the way it should be defined
    test("response should be an object containing the count of each language and the total", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/count")
        const expected = {
            english: 91,
            french: 114,
            arabic: 30,
            total: 235
        }
        expect(response.body).toEqual(expected);
    })

})

//test the get count texts by id and language
describe("get the count of words of a text by id and language", () => {

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/count/english")
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/count/english")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //verify that the response is defined the way it should be defined
    test("response should be an object containing the count of the english language", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/count/english")
        expect(response.body).toBe(91);
    })

})

//get the most occurent word in the whole database
describe("get the most occurent word in the whole database", () => {

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/text/mostOccurrent")
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header", async () => {
        const response = await request(app).get("/text/mostOccurrent")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //verify that the response is defined the way it should be defined
    test("response should be an object containing the count of each language and the total", async () => {
        const response = await request(app).get("/text/mostOccurrent")
        const expected = {
            english: [
                "the"
            ],
            french: [
                "de"
            ],
            arabic: [
                "على",
                "او"
            ],
            allLanguages: [
                "de"
            ]
        }
        expect(response.body).toEqual(expected);
    })

})

//change states
describe("get the most occurent word in the whole database", () => {

    //verify that the status 403
    test("should respond with a 403 status code", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/approve")
        expect(response.statusCode).toBe(403)
    })

    //verify that the status 403
    test("should respond with a 403 status code", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/reject")
        expect(response.statusCode).toBe(403)
    })

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/text/61bb3ba496dc99863a32d957/submit")
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header", async () => {
        const response = await request(app).get("/text/mostOccurrent")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //test the process from draft to approve : draft -> submitted -> rejected -> submitted -> approved
    
    //NOTE : Just took an example of a text that starts from draft state after executing the test changes will happen to the 
    // text so the text can't be retested until the state change back to draft
    //first submit
    test("response state should be submit", async () => {
        const submit = await request(app).get("/text/61bb3ba496dc99863a32d957/submit")
        expect(submit.body.state).toEqual("Submitted");
    })

    //then reject
    test("response state should be submit", async () => {
        const reject = await request(app).get("/text/61bb3ba496dc99863a32d957/reject")
        expect(reject.body.state).toEqual("Rejected");
    })

    //then submit again
    test("response state should be submit", async () => {
        const submit = await request(app).get("/text/61bb3ba496dc99863a32d957/submit")
        expect(submit.body.state).toEqual("Submitted");
    })

    //finally approve
    test("response state should be submit", async () => {
        const approve = await request(app).get("/text/61bb3ba496dc99863a32d957/approve")
        expect(approve.body.state).toEqual("Approved");
    })

})

//test the fuzzy search
describe("fuzzy search", () => {

    //verify that the status 200
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/text/search?q=the").send({})
        expect(response.statusCode).toBe(200)
    })

    //content type of the return is a json type
    test("should specify json in the content type header of the response", async () => {
        const response = await request(app).post("/text/search?q=the").send({})
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //verify that the response is defined the way it should be defined when the query is defined
    test("response attributes should be defined", async () => {
        const response = await request(app).post("/text/search?q=the").send({})
        const expected = [{
            "_id": "61bb3b27d9aeb6fe37c528b5",
            "arabic": "لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه بروشور او فلاير على سبيل المثال او نماذج مواقع انترنت",
            "french": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
            "english": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "state": "Draft",
            "createdAt": "2021-12-16T13:12:07.182Z",
            "updatedAt": "2021-12-16T13:12:07.182Z",
            "__v": 0
        }]
        expect(response.body).toEqual(expect.arrayContaining(expected));
    })

    //verify that the response is defined the way it should be defined when the query is not defined
    test("response attributes should be defined", async () => {
        const response = await request(app).post("/text/search").send({})
        const expected = [{
            _id: '61b9cba8ee947d86e3cc57a1',
            arabic: 'تست',
            french: 'teste',
            english: 'test',
            state: 'Approved',
            createdAt: '2021-12-15T11:04:08.795Z',
            updatedAt: '2021-12-15T17:52:24.693Z',
            __v: 0
        }]
        expect(response.body.data).toEqual(expect.arrayContaining(expected));
        expect(response.body.data.length).toBe(5);
        expect(response.body.all_elements).toBeDefined();
        expect(response.body.current_page).toBeDefined();
        expect(response.body.pages).toBeDefined();
    })

})