import fetch from 'node-fetch'

export const RECIPE_PAGES_COUNT = process.env.RECIPE_PAGES_COUNT || 1

export const getRecipeCount = async() => {
    const req = await fetch(`https://www.arla.se/webappsfacet/api/recipes?tags[]=7028&sortOrder=relevance&skip=0`)
    if (req.status === 200) {
        const res = await req.json()
        return res.totalCount
    }
}

export const getRecipe = async() => {
    const recipeCount = await getRecipeCount()

    const req = await fetch(`https://www.arla.se/webappsfacet/api/recipes?tags[]=7028&sortOrder=relevance&skip=${ Math.floor(Math.random() * recipeCount) }`)
    const res = await req.json()
    
    return [res.cards.pop()].map(item => {
        return {
            name: item.Name,
            url: item.Url,
            imageUrl: item.ImageUrl,
            backgroundUrl: item.FacetHeroMobileImageUrl,
            prepareTime: item.PreparationTotalTime,
            rating: item.RatingAverage
        }
    }).pop()
}