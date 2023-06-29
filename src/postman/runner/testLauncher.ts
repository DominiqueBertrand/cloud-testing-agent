import { getCollectionById } from "../widgets/getCollectionById";
import { getEnvById } from "../widgets/getEnvById";
import { TestRunner } from "./postmanRunner";

function getEnv(id: string) {
    const data: Object = getEnvById(id);

    return data
}

function getCollection(id: string) {
    const data: Object = getCollectionById(id);

    return data
}

export function testLauncher(title: string,env_id: string, test: object): Object{
    const envJSON: Object = getEnv(env_id)
    const collectionJSON: Object = getCollection(test[0].id_collection)
    var testChecking : Array<any> = [];
    
    
    TestRunner.newmanRunner(collectionJSON[0], envJSON[0])
    if (!TestRunner.testResult) {
       return {
            status: 'pending'
        }
    } else {
        TestRunner.testResult.run.executions.map(function(value) {
            testChecking.push({
                id : value.item.id,
                name : value.item.name,
                response : value.response.status,
                code : value.response.code,
                responseTime : value.response.responseTime,
                responseSize : value.response.responseSize
            })
        })
        return  {
            title : title,
            collectionId : test[0].id_collection,
            envId : env_id,
            run : {
                stats: TestRunner.testResult.run.stats,
                time : TestRunner.testResult.run.timings,
                execution : testChecking,
            },
        }

    }

}