const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");
const { addSyntheticLeadingComment } = require("typescript");

if(admin.apps.length === 0){
    admin.initializeApp();
}

const ALGOLIA_APP_ID = "QX7MGM2ZGN"
const ALGOLIA_ADMIN_KEY = "7e610843ca2e4c9cafcfd88567fed682"
const ALGOLIA_INDEX_NAME = "task-manager"

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)
const index = client.initIndex(ALGOLIA_INDEX_NAME)

exports.indexTask = functions.firestore.document('tasks/{taskID}')
.onCreate((snap,context) => {
    const task = {
        id: context.params.articleID,
        title:snap.data().title,
        description:snap.data().description,
    }

    return index.saveObject(task).catch((error) => {
        console.error(context-functions.params.taskID, error)

        throw new functions.https.HttpsError(
            'internal', error.message
        )
    })
})