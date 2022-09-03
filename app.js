#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import unidecode from 'unidecode';
import axios from "axios";

const sleep = () => new Promise((h) => setTimeout(h, 2000));

const api = "https://eksisozluk-api.herokuapp.com/api/debe/";

async function debeListesi() {
    axios.get(api)
        .then(res => {
            for (let i = 0; i < (res["data"].entries).length; i++) {
                console.log(res["data"].entries[i]["title"]);
            }
        })
};

async function header() {
    console.clear()
    figlet('debe  in  cli', (err, data) => {
        console.log(gradient.summer.multiline(data) + '\n');
    });
    await sleep();
};

async function handleDebe(debe) {
    const checking = createSpinner("debe derhal getiriliyor...").start();
    await sleep();
};

async function debeSec() {
    const inputs = await inquirer.prompt({
        name: "debes",
        type: "rawlist",
        message: "debelerden bir debe seç...\n",
        choices: [
            "test1",
            "leonardo dicaprio",
            "fenerbahçe"
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
        process.exit(0)
    }
}

await header()
await debeSec()
await decide()