import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page
    .goto("http://localhost:80", {
      waitUntil: "networkidle0",
    })
    .catch(() => { });

    await page.waitForSelector('#details-button')
    await page.click('#details-button')

    // await page.waitForSelector('#proceed-link')
      // await page.click('#proceed-link')

    // await page.waitForSelector('.btn btn-primary')
    // await page.click('.btn btn-primary')
  });

  test('The user is not logged in the site', ({ given, when, then }) => {

    let password: string;
    let username: string;

    given('A not logged user', () => {
      password = "ADMSIS123$"
      username = "gertrudis"
    });


    when('The user goes to the login, fills the data in the form and presses submit', async () => {

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



    });

    then('The user enters the map page', async () => {
      await expect(page).toMatch('Map')
    });
  }, 1000000)






  afterAll(async () => {
    browser.close()
  })

});