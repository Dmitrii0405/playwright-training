import fs from 'node:fs'
import path from 'node:path'
import { expect, test} from '@playwright/test'

type LoginCase = {
    name: string
    email: string
    password: string
    expectedHeading: string
}

const jsonPath = path.join(process.cwd(), 'test-data', 'login.json')

const jsonText = fs.readFileSync(jsonPath, 'utf8')

const loginCases = JSON.parse(jsonText) as LoginCase[]

for (const data of loginCases){
    test(`JSON data ${data.name} can log in`, async({page}) => {
        await page.goto('https://practicesoftwaretesting.com/auth/login')
        await page.getByPlaceholder('Your email').fill(data.email)
        await page.getByPlaceholder('Your password').fill(data.password)
        await page.getByRole('button', {name : 'Login'}).click()
    })
}


