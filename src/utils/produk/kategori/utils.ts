export const generateSearchParams = ({ show, search, page }: { show?: number | string, search?: string, page?: number }) => {
    let temp = []
    if(show){
        temp.push(`show=${show}`)
    }

    if(search){
        temp.push(`search=${search}`)
    }

    if(page){
        temp.push(`page=${page}`)
    }

    return temp.join('&')
}