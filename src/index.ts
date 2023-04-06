import * as express from 'express'
import * as path from 'path'
import * as ejs from 'ejs'
import fetch from 'node-fetch'
import { RECIPE_PAGES_COUNT, getRecipe, getRecipeCount } from './arla'

const PORT = process.env.PORT || 80
const ROOT_PATH = path.parse(__dirname ).dir
const app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(ROOT_PATH, 'public')))

const getBaseUrl = (req) => `${ req.protocol }://127.0.0.1:${ PORT }`

const getTemplate = async (req, template) => {
    const templateUrl = `${ getBaseUrl(req) }/public/${ template }`
    const request = await fetch(templateUrl)
    if (request.status === 200) return await request.text()
}

const getRating = (recipe) => {
    let ratingCalc = recipe.rating
    let stars = []
    
    for (let i = 0; i < 5; i++) {
        if (ratingCalc >= 1) {
            stars.push('on')
        } else if (ratingCalc <= 0) {
            stars.push('')
        } else {
            stars.push('half')
        }

        ratingCalc--
    }

    return stars
}

app.get('/', async (req, res) => {
    const recipe = await getRecipe()
    const rating = getRating(recipe)
    const recipeCount = await getRecipeCount()

    const template = await getTemplate(req, 'index.ejs')
    const html = ejs.render(template, { recipe, rating, RECIPE_PAGES_COUNT, recipeCount })

    res.send(html)
})

app.get('/status', (req, res) => {
    res.send('Server is up!')
})

app.listen(PORT, () => console.log(`Listening on port ${ PORT }`))