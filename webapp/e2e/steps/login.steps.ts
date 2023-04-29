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
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not logged in the site', ({given,when,then}) => {
    
    let password:string;
    let username:string;

    given('A not logged user', () => {
      password = "#AliceLoMapEN1A"
      username = "AliceLoMapEN1A"
    });
    

    when('The user goes to the login, fills the data in the form and presses submit', async () => {
       await page.goto("http://localhost:3000/login")

      await expect(page).toFillForm('form', {
        username: username,
        password: password,
      })
      await expect(page).toClick('button', { text: 'Log in' })
    });

    then('The user enters the map page', async () => {
      await expect(page).toMatch('You have been registered in the system!')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});