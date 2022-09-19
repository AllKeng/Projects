/**
 * Name: Allen Keng
 * Date: 8/26/2022
 * Source: https://www.youtube.com/watch?v=bHo7_zybGeo
 * Purpose: Grabs the table values of UCSD's Academic Schedule page to be used
 * elsewhere.
 */

/*
Commands ran: 
	npm init
	npm install -save puppeteer

	node scraper
 */
let year = '2022';

const puppeteer = require('puppeteer');
function isLetter(c) {
	return c.toLowerCase() != c.toUpperCase();
  }

(async function () {
	const browser = await puppeteer.launch( { headless: false });
	const page = await browser.newPage();
	await page.goto('https://blink.ucsd.edu/instructors/resources/academic/calendars/'
	+ year + '.html');

	const data = await page.evaluate(function() {
		//
		const eventsOdd = document.getElementsByClassName('odd');
		const eventsEven = document.getElementsByClassName('even');

		const arr = [];
		for(i = 0, j = 0; i < eventsOdd.length-6, j < eventsEven.length-4; i++, j++) {
			const temp1 = eventsOdd[i].innerText.split('\t');

			// Skips extra information
			if(temp1[0].charAt(0) === '-') {
				j--;
				continue;
			}

			arr.push( 
				temp1[0] + ": " + temp1[1].substring(temp1[1].indexOf(',')+2) 
			)
			
			if(i < eventsEven.length - 7 && eventsOdd[i+1].innerText.
				split('\t')[0].charAt(0) === '-') {
					j--;
			}

			// Skips deadspace
			if(i === 10) {
				j = 6;
				continue;
			}
			const temp2 = eventsEven[j].innerText.split('\t');
			arr.push( 
				temp2[0] + ": " + temp2[1].substring(temp2[1].indexOf(',')+2) 
			)
		}
		let newArr = [...new Set(arr)];
		return Array.from(newArr);
	})
	console.log(data);
	browser.close();
})();




