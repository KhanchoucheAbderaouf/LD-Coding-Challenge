//test the function of the services
const {
    maxOccurencesCount,
    maxOccurencesCountForAll
} = require("../src/services/text.service")

test('Count the max occurences for a specific language', () => {
    const array = [{
            "_id": "61b9cba8ee947d86e3cc57a1",
            "arabic": "تست",
            "french": "teste",
            "english": "test",
            "state": "Approved",
            "createdAt": "2021-12-15T11:04:08.795Z",
            "updatedAt": "2021-12-15T17:52:24.693Z",
            "__v": 0
        },
        {
            "_id": "61b9cdb18ddea9330d8211b2",
            "french": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
            "english": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec vehicula nisi. Aliquam consequat tempor condimentum. Praesent commodo finibus accumsan. Praesent quam metus, efficitur a mattis vitae, sagittis vitae felis. Donec consequat ultricies dignissim. Integer eget purus gravida, congue justo eu, pharetra mi. Cras a maximus lorem, sed mattis orci.",
            "state": "Draft",
            "createdAt": "2021-12-15T11:12:49.607Z",
            "updatedAt": "2021-12-15T11:22:18.819Z",
            "__v": 0,
            "arabic": "خسائر اللازمة ومطالبة حدة بل. الآخر الحلفاء أن غزو, إجلاء وتنامت عدد مع. لقهر معركة لبلجيكا، بـ انه, ربع الأثنان المقيتة في, اقتصّت المحور حدة و. هذه ما طرفاً عالمية استسلام, الصين وتنامت حين ٣٠, ونتج والحزب المذابح كل جوي. أسر كارثة المشتّتون بل, وبعض وبداية الصفحة غزو قد, أي بحث تعداد الجنوب."
        }
    ]
    const language = 'english'
    expect(Array.isArray(maxOccurencesCount(array, language))).toBe(true);
    expect(maxOccurencesCount(array, language)).toEqual([
        "Aliquam",
        "consequat",
        "Praesent",
        "a",
        "mattis",
        "vitae"
    ]);
});

test('Count the max occurences', () => {
    const array = [{
            "_id": "61b9cba8ee947d86e3cc57a1",
            "arabic": "تست",
            "french": "teste",
            "english": "test",
            "state": "Approved",
            "createdAt": "2021-12-15T11:04:08.795Z",
            "updatedAt": "2021-12-15T17:52:24.693Z",
            "__v": 0
        },
        {
            "_id": "61b9cdb18ddea9330d8211b2",
            "french": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
            "english": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec vehicula nisi. Aliquam consequat tempor condimentum. Praesent commodo finibus accumsan. Praesent quam metus, efficitur a mattis vitae, sagittis vitae felis. Donec consequat ultricies dignissim. Integer eget purus gravida, congue justo eu, pharetra mi. Cras a maximus lorem, sed mattis orci.",
            "state": "Draft",
            "createdAt": "2021-12-15T11:12:49.607Z",
            "updatedAt": "2021-12-15T11:22:18.819Z",
            "__v": 0,
            "arabic": "خسائر اللازمة ومطالبة حدة بل. الآخر الحلفاء أن غزو, إجلاء وتنامت عدد مع. لقهر معركة لبلجيكا، بـ انه, ربع الأثنان المقيتة في, اقتصّت المحور حدة و. هذه ما طرفاً عالمية استسلام, الصين وتنامت حين ٣٠, ونتج والحزب المذابح كل جوي. أسر كارثة المشتّتون بل, وبعض وبداية الصفحة غزو قد, أي بحث تعداد الجنوب."
        }
    ]
    expect(Array.isArray(maxOccurencesCountForAll(array))).toBe(true);
    expect(maxOccurencesCountForAll(array)).toEqual([
        'de'
    ]);
});