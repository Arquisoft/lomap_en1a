import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/profile.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true, slowMo: 50 });
    page = await browser.newPage();

    await page
      .goto("https://localhost:80", {
        waitUntil: "networkidle0",
      })
      .catch(() => { });
  });

  test('The user wants to see the profile', ({ given, when, then }) => {

    let password: string;
    let username: string;

    given('A not logged user', () => {
      password = "ADMSIS123$"
      username = "gertrudis"

    });


    when('The user logs opens the profile', async () => {
      await expect(page).toClick('a', { text: 'Log in' })
      await expect(page).toClick('button', { text: 'Solid Community' })
      //Hago submit con el boton de Go
      await page.waitForSelector('button[type="submit"]')
      await page.click('button[type="submit"]')


      //Espero a que se cargue la pagina de login
      await page.waitForSelector('#username')
      //Relleno el campo de username
      await expect(page).toFill('#username', username)
      //Relleno el campo de password
      await expect(page).toFill('#password', password)
      //Hago submit con el boton de login
      await expect(page).toClick('button', { text: 'Log In' })
      //¿Cannot get /map?
      await page.waitForSelector('a[href="/map"]')
      await page.waitForSelector('img')
      //Hago clic en el dropdown de perfil
      await page.goto("http://localhost:80/profile")

      //Espero a que se cargue la pagina de añadir lugar






    });

    then('The user sees his profile', async () => {
      await expect(page).toMatch('Username')
    });
  }, 1000000)






  afterAll(async () => {
    browser.close()
  })

});