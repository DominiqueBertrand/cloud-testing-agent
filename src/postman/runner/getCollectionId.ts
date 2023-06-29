import * as collect from '@collection/nevidis/nevidis/[NEVIDIS] VIVENCIA CROISÉE ASSOCIÉS (GENERALI).postman_collection.json'

export function getCollectionId(title: string) {
    require
    console.log("title : ", title)
    if (collect.info._postman_id)
        return collect.info._postman_id       
    console.log(collect.info._postman_id)
  
    return 'no id'
}