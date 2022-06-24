import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp();
// const firestore = admin.firestore();

const cors = require('cors')({
    origin: true
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const apiarduino = functions.https.onRequest((request, response) => {

    return cors(request, response, async () => {

            response.set('Access-Control-Allow-Origin', '*');
            response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
            response.set('Access-Control-Allow-Headers', '*');
            // const data = request.body as RequestApi;
            console.log("hola desde api arduino")
            // if (data.numero1 != undefined && data.numero2 != undefined) {
            //     const res: ResponseApi = {
            //         respuesta: data.numero1 + data.numero2,
            //         numeroMayor: data.numero1 <= data.numero2 ? data.numero2 : data.numero1,
            //         numeroMenor: data.numero1 < data.numero2 ? data.numero1 : data.numero2,
            //         estado: 'success'       
            //     }
            //     const path = 'sumas/1';
            //     await firestore.doc(path).create(res);
            //     const collection = await firestore.collection('Usuarios').get();
            //     if (!collection.empty) {
            //         collection.docs.forEach(doc => {
            //             console.log(doc.data());
                        
            //         })
            //     }
            //     response.send(res);
            // } else {
            //     const res: ResponseApi = {
            //         respuesta: 0,
            //         numeroMayor: 0, 
            //         numeroMenor: 0,
            //         estado: 'error, falta info'       
            //     }
            //     response.send(res);
            // }
    });




});


export const scheduledTest = functions.pubsub.schedule('every 1 minutes').onRun( async (context) => {
    
    console.log('scheduledNotificationsBibliaFunction');

});

// interface RequestApi {
//     numero1: number;
//     numero2: number;
// }

// interface ResponseApi {
//   respuesta: number;
//   numeroMayor: number;
//   numeroMenor: number;
//   estado: string;
// }