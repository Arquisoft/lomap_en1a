import { waitFor } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/friendsmanagement.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => { });
  });

  test('The user wants to see the friends management tab', ({ given, when, then }) => {

    let password: string;
    let username: string;

    given('A not logged user', () => {
      password = "ADMSIS123$"
      username = "gertrudis"

    });


    when('The user logs opens the friends management tab', async () => {
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
      await page.goto("http://localhost:3000/friends")

      //Espero a que se cargue la pagina de añadir lugar






    });

    then('The user sees the friends management view', async () => {
      await expect(page).toMatch('Friend management menu')
    });
  })






  afterAll(async () => {
    browser.close()
  })

});