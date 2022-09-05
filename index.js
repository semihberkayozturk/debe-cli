#!/usr/bin/env node

import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import axios from "axios";

const eksi = `
                       ,
                      / \\
                     (   )
                      "-"
 `

const sleep = () => new Promise((h) => setTimeout(h, 2000));
const api = "https://eksisozluk-api.herokuapp.com/api/debe/";

async function header() {
    console.clear()
    await console.log(eksi)
    await figlet(`debe  in  cli`, (err, data) => {
        console.log(gradient.summer.multiline(data) + '\n');
    });
    await sleep();
};

async function debeList() {
    let debes = [];
    axios.get(api)
        .then(res => {
            for (let i = 0; i < (res["data"].entries).length; i++) {
                debes.push(res["data"].entries[i]["title"]);
            }
            return debes
        })
};

async function selectDebe() {
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
    if (inputs.decide) {
        selectDebe()
    } else {
        process.exit(1)
    }
};

async function handleDebe(debe) {
    const checking = createSpinner("debe derhal getiriliyor...\n").start();
    await sleep()
    checking.success({ text: "selam" })
    await decide()
};

//----------------

await header()
await selectDebe()