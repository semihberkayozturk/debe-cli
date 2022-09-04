#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import axios from "axios";

const eksi = `
                       ,
                      / \\
                     (   )
                      "-"
 `

const eksi1 = "\u{1F4A7}"
console.log(eksi1)

console.log(eksi)

const sleep = () => new Promise((h) => setTimeout(h, 2000));
const api = "https://eksisozluk-api.herokuapp.com/api/debe/";

async function header() {
    console.clear()
    await figlet(`debe in cli`, (err, data) => {
        console.log(gradient.summer.multiline(data) + '\n');
    });
    await console.log(eksi)
    await sleep();
};


async function debeListesi() {
    axios.get(api)
        .then(res => {
            for (let i = 0; i < (res["data"].entries).length; i++) {
                console.log(res["data"].entries[i]["title"]);
            }
        })
};

async function debeSec() {
    const inputs = await inquirer.prompt({
        name: "debes",
        type: "list",
        message: "debelerden bir debe seç...\n",
        choices: [
            "deneme1",
            "kendini suçlamak",
            "mustafa kemal atatürk"
        ],
    });
    return handleDebe(inputs.debes);
};

async function decide()  {
    const inputs = await inquirer.prompt({
        name: "decide",
        type: "confirm",
        message: "başka bir debe daha istiyor musun acaba?\n",
        default: "false"
    })
    if (inputs.decide === true) {
        debeSec()
    } else {
        process.exit(1)
    }
}

async function handleDebe(debe) {
    const checking = createSpinner("debe derhal getiriliyor...\n").start();
    await sleep()
    checking.success({ text: "debe icerigi burada olacak, o kadar." })
    await decide()
};

await header()
await debeSec()